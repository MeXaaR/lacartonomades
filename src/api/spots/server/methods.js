import { ValidatedMethod } from "meteor/mdg:validated-method";
import Places from "../model";
import allCategories from "../../../settings/categories";
import { mailjetClient } from "/src/api/emails/index";

export const placeGetAround = new ValidatedMethod({
  name: "places.methods.get_around",
  validate: null,
  applyOptions: {
    noRetry: true,
  },
  async run({
    categories,
    filters,
    favorites,
    private,
    presences,
    searchCenter,
    search,
    list,
  }) {
    try {
      let query = {};
      if (search) {
        const regex = { $regex: new RegExp(search, "i") };
        query.$or = [
          { name: regex },
          { description: regex },
          { address: regex },
        ];
      }
      if (!private && !favorites && !presences) {
        query.category = { $in: categories };
      }
      if (!private && !favorites && !search && !presences && Meteor.settings.public.LIMIT_SEARCH_SURFACE) {
        query.geoJSON = {
          $nearSphere: {
            $geometry: {
              type: "Point",
              coordinates: searchCenter,
            },
            $maxDistance: Meteor.settings.public.LIMIT_SEARCH_DISTANCE,
            $minDistance: 0,
          },
        };
      }

      categories.forEach((category) => {
        if (filters[category]) {
          Object.keys(filters[category]).forEach((field) => {
            const categObject = allCategories.find(
              (categ) => categ.name === category
            );
            const fieldObject = categObject.fields.find(
              (f) => f.name === field
            );

            if (!!fieldObject && fieldObject.options) {
              const isAllToggled =
                !!filters[field] && filters[field].length === 0;
              if (
                !isAllToggled &&
                !!filters[category][field] &&
                !!filters[category][field].length
              ) {
                if (fieldObject.type === "radios") {
                  query[field] = filters[category][field];
                } else if (fieldObject.type === "checkboxes") {
                  query[field] = { $nin: filters[category][field] };
                }
              }
            } else if (fieldObject.type !== "input") {
              query[field] = filters[category][field];
            }
          });
        }
      });

      if (favorites && this.userId) {
        const user = Meteor.users.findOne({ _id: this.userId });
        query._id = { $in: user.profile.favorites || [] };
      } else if (!private && !this.userId) {
        query.private = false;
      } else if (private) {
        query.private = true;
        query.createdBy = this.userId;
      } else if (presences) {
        const usersWithPresence = Meteor.users
          .find(
            { "profile.presentInPlace": { $exists: true } },
            { fields: { "profile.presentInPlace": 1 } }
          )
          .fetch();

        query._id = {
          $in: usersWithPresence.map(
            ({ profile: { presentInPlace } }) => presentInPlace
          ),
        };
      } else if (this.userId) {
        const { geoJSON, ...restOfQuery } = query;
        query = {
          geoJSON,
          $or: [
            { ...restOfQuery, private: false },
            { ...restOfQuery, private: true, createdBy: this.userId }
          ],
        };
      }

      const params = {
        sort: { name: 1 },
        limit: list ? 100 : 10000000,
      };

      if (!list) {
        params.fields = {
          name: 1,
          latitude: 1,
          longitude: 1,
          category: 1,
          private: 1,
        };
      } else {
        params.fields = {
          parkID: 0,
        };
      }
      return Places.find(query, params).fetch();
    } catch (error) {
      throw new Meteor.Error(error.code, error.reason);
    }
  },
});

export const getOnePlace = new ValidatedMethod({
  name: "places.methods.getOne",
  validate: null,
  applyOptions: {
    noRetry: true,
  },
  async run({ _id }) {
    try {
      return Places.findOne({ _id });
    } catch (error) {
      throw new Meteor.Error(error.code, error.reason);
    }
  },
});

export const placeSendEmail = new ValidatedMethod({
  name: "places.methods.send_email",
  validate: null,
  applyOptions: {
    noRetry: true,
  },
  async run({ text, placeId }) {
    const place = Places.findOne({ _id: placeId });
    if (!this.userId) {
      throw new Meteor.Error("405", "you_need_an_account");
    }
    const user = Meteor.users.findOne({ _id: this.userId });

    const request = mailjetClient.post("send", { version: "v3.1" }).request({
      // SandboxMode: Meteor.isDevelopment,
      Messages: [
        {
          From: {
            Email: "<ne-pas-repondre@lacartonomades.fr>",
            Name: "La Carto'Nomades",
          },
          To: [
            {
              Email: place.email,
              Name: place.name,
            },
          ],
          TemplateID: 2286197,
          TemplateLanguage: true,
          Subject: "Un message d'un utilisateur",
          Variables: {
            username: user.username,
            message: text,
            link: `https://lacartonomades.fr/map/places/${placeId}`,
          },
        },
      ],
    });
    return request
      .then((result) => {
        console.log(`Email sent to place ${place.name} by ${user.username}`);
        return true;
      })
      .catch((err) => {
        throw new Meteor.Error(
          "403",
          "There was an error while sending the email"
        );
      });
  },
});

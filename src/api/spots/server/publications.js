import Places from "../model";
import allCategories from "../../../settings/categories";

Meteor.publish("places.category", function ({
  categories,
  filters,
  favorites,
  searchCenter,
  search,
  list,
}) {
  let query = {};
  if (search) {
    const regex = { $regex: new RegExp(search, "i") };
    query.$or = [{ name: regex }, { description: regex }, { address: regex }];
  }
  if (!favorites) {
    query.category = { $in: categories };
  }
  if (!favorites && !search && Meteor.settings.public.LIMIT_SEARCH_SURFACE) {
    query.geoJSON = {
      $nearSphere: {
        $geometry: {
          type: "Point",
          coordinates: searchCenter,
        },
        $maxDistance: Meteor.settings.public.LIMIT_SEARCH_DISTANCE,
        $minDistance: 1,
      },
    };
  }

  categories.forEach((category) => {
    if (filters[category]) {
      Object.keys(filters[category]).forEach((field) => {
        const categObject = allCategories.find(
          (categ) => categ.name === category
        );
        const fieldObject = categObject.fields.find((f) => f.name === field);

        if (!!fieldObject && fieldObject.options) {
          const isAllToggled = !!filters[field] && filters[field].length === 0;
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
  }

  const params = {
    sort: { name: 1 },
    limit: list ? 100 : 10000000,
  };
  Counts.publish(this, "places.category.count", Places.find(query, params));

  if (!list) {
    params.fields = {
      name: 1,
      latitude: 1,
      longitude: 1,
      category: 1,
    };
  }
  return Places.find(query, params);
});

Meteor.publish("places.search", function ({
  categories,
  favorites,
  search,
}) {
  if (search) {
    const query = {
      category: { $in: categories },
    };
    const regex = { $regex: new RegExp(search, "i") };
    query.$or = [{ name: regex }, { description: regex }, { address: regex }];

    if (favorites && this.userId) {
      const user = Meteor.users.findOne({ _id: this.userId });
      query._id = { $in: user.profile.favorites || [] };
    }

    const params = {
      sort: { name: 1 },
      limit: 10,
      fields: { name: 1, latitude: 1, longitude: 1, category: 1 },
    };
    return Places.find(query, params);
  } else {
    this.ready();
  }
});

Meteor.publish("places.one.details", function ({ _id }) {
  return Places.find(
    { _id },
    { sort: { name: 1 }, limit: 1, fields: { geoJSON: 0 } }
  );
});

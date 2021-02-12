import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { preventClientModifications } from "../utils/preventClientModifications";
import allCategories from "/src/settings/categories/index";

const Places = new Mongo.Collection("places");

const GeoJSON = new SimpleSchema({
  type: {
    type: String,
  },
  coordinates: {
    type: Array,
  },
  "coordinates.$": {
    type: Number,
  },
});

const dontUpdate = function () {
  if (this.isInsert) {
    return this.value;
  } else if (this.isUpsert) {
    return { $setOnInsert: this.value };
  } else {
    this.unset(); // Prevent update
  }
};
export const PlacesSchemaBase = {
  _id: SimpleSchema.RegEx.Id,
  name: {
    type: String,
    index: true,
  },
  description: {
    type: String,
    optional: true,
  },
  private: {
    type: Boolean,
    defaultValue: false,
    optional: true,
  },
  address: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  geoJSON: {
    type: GeoJSON,
    index: true,
    autoValue: function () {
      if (this.field("longitude").value) {
        return {
          type: "Point",
          coordinates: [
            Number(this.field("longitude").value),
            Number(this.field("latitude").value),
          ],
        };
      }
    },
  },
  category: {
    type: Array,
    index: true,
  },
  "category.$": {
    type: String,
    allowedValues: allCategories.map(({ name }) => name),
  },
  photo: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
  },
  createdBy: {
    type: SimpleSchema.RegEx.Id,
    autoValue: function () {
      if (this.isInsert) {
        return this.userId || "Anonymous";
      } else if (this.isUpsert) {
        return { $setOnInsert: this.userId || "Anonymous" };
      } else {
        this.unset(); // Prevent user from supplying their own value
      }
    },
  },
  updatedBy: {
    type: SimpleSchema.RegEx.Id,
    autoValue: function () {
      if (this.isUpdate) {
        return this.userId || "Anonymous";
      }
    },
    optional: true,
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      } else {
        this.unset(); // Prevent user from supplying their own value
      }
    },
  },
  updatedAt: {
    type: Date,
    autoValue: function () {
      return new Date();
    },
    optional: true,
  },
  delete_steps: {
    type: Array,
    optional: true,
  },
  "delete_steps.$": {
    type: String,
    optional: true,
  },
};

const CategoriesSchema = {};

const additionnalFields = {};
allCategories.forEach(({ name, fields }) => {
  fields.forEach((field) => {
    additionnalFields[field.name] = field;
  });
});

Object.values(additionnalFields).forEach((field) => {
  if (["radios", "select", "input"].indexOf(field.type) > -1) {
    CategoriesSchema[field.name] = {
      type: String,
      optional: true,
      label: field.label,
    };
    if (field.defaultValue) {
      CategoriesSchema[field.name].defaultValue = field.defaultValue;
    }
    if (field.type !== "input") {
      CategoriesSchema[field.name].allowedValues = field.options;
    }
  } else if (["checkbox"].indexOf(field.type) > -1) {
    CategoriesSchema[field.name] = {
      type: Boolean,
      optional: true,
      label: field.label,
    };
  } else if (["checkboxes"].indexOf(field.type) > -1) {
    CategoriesSchema[field.name] = {
      type: Array,
      optional: true,
      label: field.label,
    };
    CategoriesSchema[`${field.name}.$`] = {
      type: String,
      optional: true,
      allowedValues: field.options,
    };
  }
});

const Schemas = new SimpleSchema({
  ...PlacesSchemaBase,
  ...CategoriesSchema,
});

Places.attachSchema(Schemas);
if (Meteor.isServer) {
  Places._ensureIndex({ geoJSON: "2dsphere" });
}

preventClientModifications(Places);

export default Places;
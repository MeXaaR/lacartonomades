import allCategories, { SPECIAL_CATEGORIES } from "../../settings/categories";

const categoryFinder = (category) =>
  allCategories.find((categ) => categ.name === category);
const fieldFinder = (field, category) =>
  category.fields.find((fieldData) => fieldData.name === field);

const categories_actions = {
  "categories.change": (state, data) => {
    const filters = {};

    const { FAVORITES, PRIVATES, PRESENCES } = SPECIAL_CATEGORIES;
    const exceptions = [PRIVATES.NAME, FAVORITES.NAME, PRESENCES.NAME];
    const isExceptionCateg = exceptions.find((e) => data.indexOf(e) > -1);

    if (isExceptionCateg) {
      allCategories.forEach((category) => {
        filters[category.name] = {};
        category.fields.forEach((field) => {
          filters[category.name][field.name] = [];
        });
      });
    } else {
      data.forEach((category) => {
        const categoryData = categoryFinder(category);
        filters[category] = {};
        categoryData.fields.forEach((field) => {
          filters[category][field.name] = [];
        });
      });
    }

    return {
      ...state,
      selected: data,
      filters,
    };
  },
  "filters.field.remove": (state, { field, category }) => {
    const newState = JSON.parse(JSON.stringify(state));
    newState.filters[category][field] = [];
    return newState;
  },
  "filters.field.add": (state, { field, category }) => {
    const categoryData = categoryFinder(category);
    const fieldData = fieldFinder(field, categoryData);
    const newState = JSON.parse(JSON.stringify(state));
    newState.filters[category][field] = fieldData.options;
    return newState;
  },
  "filters.option.remove": (state, { field, category, opt }) => {
    const newState = JSON.parse(JSON.stringify(state));
    newState.filters[category][field] = newState.filters[category][
      field
    ].filter((o) => o !== opt);
    return newState;
  },
  "filters.option.add": (state, { field, category, opt }) => {
    const newState = JSON.parse(JSON.stringify(state));
    newState.filters[category][field].push(opt);
    return newState;
  },
};
export default categories_actions;

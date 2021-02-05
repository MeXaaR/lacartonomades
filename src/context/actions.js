import map_actions from "./actions/map";
import uploads_actions from "./actions/upload";
import categories_actions from "./actions/categories";
import { MOBILE_SIZE, TABLET_SIZE } from "./appContext";

const reducer = (state, action) => {
  const { type, data = {} } = action;
  const actions = {
    user: (state, data) => ({
      ...state,
      ...data,
    }),
    "menu.toggle": (state, data) => ({
      ...state,
      menuOpened: typeof data !== undefined ? data : !state.menuOpened,
    }),
    devtools: (state, devtools) => ({
      ...state,
      devtools,
    }),
    isMobile: (state, width) => ({
      ...state,
      isMobile: Meteor.isCordova || width < MOBILE_SIZE,
      isTablet: width < TABLET_SIZE && width > MOBILE_SIZE,
    }),
    online: (state, online) => ({
      ...state,
      online,
    }),
    news: (state, news) => ({
      ...state,
      news,
    }),
    language: (state, language) => ({
      ...state,
      language,
    }),
    ...uploads_actions,
  };

  return actions[type](state, data);
};

export const reducerMapContext = (state, action) => {
  const { type, data = {} } = action;
  const actions = {
    ...categories_actions,
    ...map_actions,
  };

  return actions[type](state, data);
};

export default reducer;

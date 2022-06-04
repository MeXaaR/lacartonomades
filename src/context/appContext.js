import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';
// import { Roles } from 'meteor/alanning:roles';

import actions from './actions';
import { useLocalStorage, useWindowSize } from '../api/utils/hooks';
import { useTranslation } from 'react-i18next';
import { updateUserLanguage } from '../api/users/methods';

export const MOBILE_SIZE = 768;
export const TABLET_SIZE = 1200;

const IS_MOBILE = window.innerWidth < MOBILE_SIZE;
const IS_TABLET =
  window.innerWidth < TABLET_SIZE && window.innerWidth > MOBILE_SIZE;

const initialState = {
  user: Meteor.user(),
  userId: null,
  loggingIn: Accounts.loggingIn(),
  authenticated: false,
  uploads: [],
  isMobile: IS_MOBILE,
  isTablet: IS_TABLET,
  menuOpened: IS_MOBILE ? false : true,
  devtools: false,
  online: Meteor.status().connected,
  news: 0,
  guidedTour: false,
  map: null,
};

const logger = (state, action) => {
  const newState = actions(state, action);
  if (Meteor.isDevelopment) {
    console.groupCollapsed('Action Type:', action.type);
    console.log('Prev state: ', state);
    console.log('Next state: ', newState);
    console.groupEnd();
  }
  return newState;
};

const Store = ({
  children,
  loggingIn,
  user,
  userId,
  authenticated,
  roles,
  favorites,
  online,
}) => {
  const [storedState = initialState, setStored] = useLocalStorage(
    Meteor.settings.public.LOCALSTORAGE_STATE,
    initialState
  );
  const [state, dispatch] = useReducer(logger, storedState);
  const { width } = useWindowSize();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch({
      type: 'user',
      data: {
        loggingIn,
        user,
        userId,
        authenticated,
        roles,
        favorites,
      },
    });

    if (user && user.profile && user.profile.language !== state.language) {
      i18n.changeLanguage(user.profile.language);
    }
  }, [
    loggingIn,
    user,
    userId,
    authenticated,
    roles,
    favorites,
    state.language,
  ]);

  useEffect(() => {
    dispatch({
      type: 'online',
      data: online,
    });
  }, [online]);

  useEffect(() => {
    const { map, ...restState } = state;
    const newState = JSON.parse(JSON.stringify(restState));
    delete newState.isMobile;
    setStored(newState);
  }, [state]);

  useEffect(() => {
    dispatch({
      type: 'isMobile',
      data: width,
    });
  }, [width]);
  if (Meteor.isProduction && Meteor.isClient && !Meteor.isCordova) {
    Package.reload.Reload._onMigrate(() => {
      msg.info(t('system.updated'), {
        toastId: 'updatedToast',
      });
      return [false];
    });
  }

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export const useAppContext = () => useContext(Context);

const DynamicStore = withTracker(() => {
  Meteor.subscribe('users.current.profile');
  Meteor.users.attachPersister({ _id: Meteor.userId() });
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.users.findOne({ _id: Meteor.userId() });

  return {
    loggingIn,
    authenticated: !loggingIn && !!user,
    user,
    userId: Meteor.userId(),
    favorites: user && user.profile && user.profile.favorites,
    online: Meteor.status().connected,
  };
})(Store);

export default DynamicStore;

import React, { createContext, useReducer, useContext, useEffect } from 'react';

import { reducerMapContext } from './actions';
import allCategories from '../settings/categories';
import { DEFAULT_VIEWPORT } from '../components/Map/MapWrapper';
import { useLocalStorage } from '../api/utils/hooks';

const constantState = {
  selected: allCategories.map(({ name }) => name),
  filters: [],
  refresh: false,
  loading: false,
  locateMe: null,
};

const initialState = {
  location: {
    lat: 0,
    lng: 0,
  },
  viewport: DEFAULT_VIEWPORT,
  ...constantState,
};

const logger = (state, action) => {
  const newState = reducerMapContext(state, action);
  if (Meteor.isDevelopment) {
    console.groupCollapsed('Action Type:', action.type);
    console.log('Prev state: ', state);
    console.log('Next state: ', newState);
    console.groupEnd();
  }
  return newState;
};

const StoreMap = ({ children }) => {
  const [storedState, setStored] = useLocalStorage(
    Meteor.settings.public.LOCALSTORAGE_STATE_MAP,
    initialState,
    constantState
  );
  const [search, updateMapParams] = useReducer(logger, storedState);

  useEffect(() => {
    const newState = JSON.parse(JSON.stringify(search));
    setStored(newState);
  }, [search]);

  return (
    <Context.Provider value={[search, updateMapParams]}>
      {children}
    </Context.Provider>
  );
};

export const Context = createContext(initialState);
export const useMapContext = () => useContext(Context);

export default StoreMap;

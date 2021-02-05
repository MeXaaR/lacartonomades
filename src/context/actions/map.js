const map_actions = {
  "map.loading": (state, data) => ({
    ...state,
    loading: data,
  }),
  "map.data.loading": (state, data) => ({
    ...state,
    loadingData: data,
  }),
  "map.locateMe": (state, data) => ({
    ...state,
    loading: true,
    locateMe: "trying",
  }),
  "map.location": (state, data) => ({
    ...state,
    location: data,
    loading: false,
    locateMe: data.lat ? "success" : "error",
  }),
  "map.location.follow": (state, data) => ({
    ...state,
    location: data,
  }),
  "map.viewport": (state, viewport) => ({
    ...state,
    viewport,
    locateMe: null,
  }),
  "map.refresh": (state, refresh) => ({
    ...state,
    refresh,
  }),
  "map.placesFound": (state, data) => ({
    ...state,
    refresh: false,
    places_total: data
  })
};

export default map_actions;

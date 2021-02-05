const uploads_actions = {
  "uploads.add": (state, data) => {
    state.uploads.push(data);

    return {
      ...state,
    };
  },
  "uploads.remove": (state, data) => ({
    ...state,
    uploads: state.uploads.filter((img) => img.fileName !== data.fileName),
  }),
  "uploads.remove": (state, data) => ({
    ...state,
    uploads: { ...data },
  }),
};
export default uploads_actions;

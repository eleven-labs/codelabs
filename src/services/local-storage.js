export const getPersistedState = key => {
  try {
    const json = JSON.parse(localStorage.getItem(key));
    return json || {};
  } catch (ex) {
    console.log(ex);
    return {};
  }
};

export const persistState = (key, state) => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (ex) {
    console.log(ex);
  }
};

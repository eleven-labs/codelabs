export const getPersistedProgress = key => new Promise((resolve, reject) => {
  try {
    const json = JSON.parse(localStorage.getItem(key));
    resolve(json || {});
  } catch (ex) {
    reject(ex);
  }
});

export const persistProgress = (key, state) => new Promise((resolve, reject) => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
    resolve();
  } catch (ex) {
    reject(ex);
  }
});

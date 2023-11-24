import { types } from "mobx-state-tree";

const AppStore = types.model("AppStore", {
  isAuthenticated: false,
}).actions((self) => ({
  setAuthenticated(value) {
    self.isAuthenticated = value;
  },
}));

const store = AppStore.create();

export default store;
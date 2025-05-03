import { makeAutoObservable } from "mobx";

class AuthStore {
  isAuthorized: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuthorized(isAuth: boolean) {
    this.isAuthorized = isAuth;
  }
}

export const authStore = new AuthStore();

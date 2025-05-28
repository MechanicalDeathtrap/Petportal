import { makeAutoObservable } from "mobx";
import { UserData } from "../types/user-data.ts";

class UserStore {
  user: UserData = {
    id: "",
    avatarUrl: "",
    firstName: "",
    lastName: "",
    country: "",
    town: "",
    phoneNumber: "",
    email: "",
    telegram: "",
    education: [],
    experience: [],
    stack: [],
  };

  constructor() {
    makeAutoObservable(this);
  }

  setUser(userData: Partial<UserData>) {
    this.user = {
      ...this.user,
      ...userData,
      education: userData.education ?? [],
      experience: userData.experience ?? [],
      stack: userData.stack ?? [],
    };
  }

  // Обновить отдельное поле пользователя
  updateField<K extends keyof UserData>(key: K, value: UserData[K]) {
    this.user[key] = value;
  }

  clearUser() {
    this.user = {
      id: "",
      avatarUrl: "",
      firstName: "",
      lastName: "",
      country: "",
      town: "",
      phoneNumber: "",
      email: "",
      telegram: "",
      education: [],
      experience: [],
      stack: [],
    };
  }
}

export const userStore = new UserStore();

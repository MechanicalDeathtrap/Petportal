import { makeAutoObservable } from "mobx";

class PopupsStore {
  isAccountPopupOpen: boolean = false;
  isNotificationPopupOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleAccountPopupOpen() {
    this.isAccountPopupOpen = !this.isAccountPopupOpen;
  }

  toggleNotificationPopupOpen() {
    this.isNotificationPopupOpen = !this.isNotificationPopupOpen;
  }
}

export const popupStore = new PopupsStore();

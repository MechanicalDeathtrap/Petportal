
import { deleteAuthCookie } from "./cookies.ts";
import { authStore } from "../stores/auth-store";
import { userStore } from "../stores/user-store";
import { useNavigate } from "react-router-dom";

export const logout = (navigate: ReturnType<typeof useNavigate>) => {

  deleteAuthCookie();
  authStore.setAuthorized(false);
  userStore.clearUser();

  navigate("/projects");
};
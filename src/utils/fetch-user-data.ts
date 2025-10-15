import axios from "axios";
import { API_BASE_URL, API_BASE_PATH } from "../config/api";

export const fetchUserData = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${API_BASE_PATH}/Authorization/me`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error: unknown) {
    console.log(error);
  }
};

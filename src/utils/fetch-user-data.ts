import axios from "axios";

export const fetchUserData = async () => {
  try {
    const response = await axios.get(
      "/api/Authorization/me",
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error: unknown) {
    console.log(error);
  }
};

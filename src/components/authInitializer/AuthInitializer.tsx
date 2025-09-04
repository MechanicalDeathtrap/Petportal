// src/components/AuthInitializer/AuthInitializer.tsx
import { useEffect } from "react";
import { userStore } from "../../stores/user-store";
import { authStore } from "../../stores/auth-store";
import axios from "axios";

const API_BASE = "http://localhost:5140";

export const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/Authorization/me`, {
          withCredentials: true,
        });

        const userData = response.data;

        const nameParts = userData.name?.split(" ").filter(Boolean) || [];
        const firstName = nameParts[0] || "";
        const lastName = nameParts[1] || "";

        let avatarBlobUrl = "/img/blank-avatar.png";

        if (userData.avatarUrl) {
          try {
            const avatarResponse = await axios.get(
              `${API_BASE}/api/Avatar/download/${userData.avatarUrl}`,
              {
                responseType: "blob",
                withCredentials: true,
              }
            );

            const blob = avatarResponse.data;
            avatarBlobUrl = URL.createObjectURL(blob);
          } catch (error) {
            console.error("Failed to load avatar", error);
            avatarBlobUrl = "/img/blank-avatar.png";
          }
        }
        
        userStore.setUser({
          id: userData.id,
          email: userData.email,
          firstName,
          lastName,
          country: userData.country || "",
          town: userData.city || "",
          phoneNumber: userData.phone || "",
          telegram: userData.telegram || "",
          avatarUrl: avatarBlobUrl,
          education: userData.educations || [],
          experience: userData.experiences || [],
          stack: userData.stacks || [],
        });

        authStore.setAuthorized(true);
      } catch (error) {
        // Пользователь не авторизован
        authStore.setAuthorized(false);
        userStore.clearUser();
      }
    };

    checkAuth();
  }, []);

  // Пока не важно, что рендерится — главное, чтобы children отработали
  return <>{children}</>;
};
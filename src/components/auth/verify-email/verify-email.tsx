import styles from "../auth-layout/auth-layout.module.sass";
import { Button } from "../../button/button.tsx";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL, API_BASE_PATH } from "../../../config/api";

export const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      if (!token || !userId) {
        setStatus("error");
        setMessage("Некорректная ссылка подтверждения.");
        return;
      }

      try {
        const res = await fetch(
          `${API_BASE_URL}${API_BASE_PATH}/Authorization/VerifyEmail?token=${encodeURIComponent(token)}&userId=${encodeURIComponent(userId)}`,
          { method: "POST", credentials: "include" }
        );
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setStatus("error");
          setMessage(data.message || data.Message || "Не удалось подтвердить email.");
          return;
        }
        setStatus("success");
        setMessage(data.message || data.Message || "Email успешно подтверждён.");
      } catch {
        setStatus("error");
        setMessage("Ошибка сети. Попробуйте позже.");
      }
    };

    void verify();
  }, [token, userId]);

  return (
    <div className={styles["authorization__form-side"]}>
      <h1>Подтверждение email</h1>
      {status === "loading" && <p>Подтверждаем вашу почту…</p>}
      {status === "success" && (
        <>
          <p>{message}</p>
          <Button
            type="button"
            style="blue-button-header"
            text="Войти"
            onClick={() => navigate("/login")}
          />
        </>
      )}
      {status === "error" && (
        <>
          <p className={styles["authorization__message--error"]}>{message}</p>
          <p>
            <Link to="/login">Вернуться ко входу</Link>
          </p>
        </>
      )}
    </div>
  );
};

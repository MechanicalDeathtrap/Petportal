import styles from "../auth-layout/auth-layout.module.sass";
import { Button } from "../../button/button.tsx";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { API_BASE_URL, API_BASE_PATH } from "../../../config/api";

type VerifyMessageKey =
  | "auth.verify.invalidLink"
  | "auth.verify.expiredLink"
  | "auth.verify.failed"
  | "auth.verify.success"
  | "auth.verify.networkError";

export const VerifyEmail = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  // храним ключ, а не текст: сообщение переведётся и при смене языка
  const [messageKey, setMessageKey] = useState<VerifyMessageKey | null>(null);

  useEffect(() => {
    const verify = async () => {
      if (!token || !userId) {
        setStatus("error");
        setMessageKey("auth.verify.invalidLink");
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
          // бэкенд отвечает по-русски; отдельно узнаём только просроченную ссылку
          const serverMsg: string = data.message || data.Message || "";
          setMessageKey(
            serverMsg.includes("истёк") ? "auth.verify.expiredLink" : "auth.verify.failed",
          );
          return;
        }
        setStatus("success");
        setMessageKey("auth.verify.success");
      } catch {
        setStatus("error");
        setMessageKey("auth.verify.networkError");
      }
    };

    void verify();
  }, [token, userId]);

  return (
    <div className={styles["authorization__form-side"]}>
      <h1>{t("auth.verify.heading")}</h1>
      {status === "loading" && <p>{t("auth.verify.verifying")}</p>}
      {status === "success" && (
        <>
          <p>{messageKey && t(messageKey)}</p>
          <Button
            type="button"
            style="blue-button-header"
            text={t("common.login")}
            onClick={() => navigate("/login")}
          />
        </>
      )}
      {status === "error" && (
        <>
          <p className={styles["authorization__message--error"]}>{messageKey && t(messageKey)}</p>
          <p>
            <Link to="/login">{t("common.backToLogin")}</Link>
          </p>
        </>
      )}
    </div>
  );
};

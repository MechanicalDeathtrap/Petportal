import styles from "../auth-layout/auth-layout.module.sass";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../button/button.tsx";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, API_BASE_PATH } from "../../../config/api";
import { userStore } from "../../../stores/user-store.ts";

type AuthorizationProps = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const Login = () => {
  const { t } = useTranslation();
  const [isMessageOpen, setMessageOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");
  const [resendStatus, setResendStatus] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("auth.validation.emailInvalid"))
      .required(t("auth.validation.emailRequired")),
    password: Yup.string()
      .min(8, t("auth.validation.passwordRule"))
      .max(30, t("auth.validation.passwordTooLong"))
      .required(t("auth.validation.passwordRequired")),
  });

  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const handleSubmit = async (values: AuthorizationProps) => {
    try {
      await axios.post(
        `${API_BASE_URL}${API_BASE_PATH}/Authorization/login`,
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      const meResponse = await axios.get(`${API_BASE_URL}${API_BASE_PATH}/Authorization/me`, {
        headers: { accept: "*/*" },
        withCredentials: true,
      });

      const userData = meResponse.data;

      const nameParts = userData.name?.split(" ").filter(Boolean) || [];
      const firstName = nameParts[0] || "";
      const lastName = nameParts[1] || "";

      userStore.setUser({
        id: userData.id,
        email: userData.email,
        firstName,
        lastName,
        country: userData.country || "",
        town: userData.city || "", 
        phoneNumber: userData.phone || "",
        telegram: userData.telegram || "",
        avatarUrl: userData.avatarUrl || "",
        education: userData.educations || [],
        experience: userData.experiences || [],
        stack: userData.stacks || [],
      });

      navigate("/projects");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        switch (status) {
          case 400:
            setErrorMessage(t("auth.errors.invalidData"));
            break;
          case 401: {
            const serverMsg =
              (error.response?.data as { Message?: string; message?: string })?.Message ||
              (error.response?.data as { Message?: string; message?: string })?.message ||
              "";
            // бэкенд отвечает по-русски, поэтому показываем свой текст на текущем языке
            if (serverMsg.toLowerCase().includes("подтвердите email")) {
              setErrorMessage(t("auth.login.emailNotConfirmed"));
              setPendingEmail(values.email);
            } else {
              setErrorMessage(t("auth.login.invalidCredentials"));
              setPendingEmail("");
            }
            break;
          }
          case 500:
            setErrorMessage(t("auth.errors.server"));
            break;
          default:
            setErrorMessage(t("auth.login.failed"));
        }
      } else if (axios.isAxiosError(error) && error.request) {
        setErrorMessage(t("auth.errors.unavailable"));
      } else {
        setErrorMessage(t("auth.errors.unexpected"));
      }

      setMessageOpen(true);
    }
  };

  const setMessageTimer = () => {
    setTimeout(() => setMessageOpen(false), 5000);
  };

  useEffect(() => {
    if (isMessageOpen) {
      setMessageTimer();
    }
  }, [isMessageOpen]);

  const resendConfirmation = async () => {
    if (!pendingEmail) return;
    setResendStatus(t("auth.login.resending"));
    try {
      await fetch(
        `${API_BASE_URL}${API_BASE_PATH}/Authorization/ResendConfirmationEmail?email=${encodeURIComponent(pendingEmail)}`,
        { method: "POST", credentials: "include" }
      );
      setResendStatus(t("auth.login.resent"));
    } catch {
      setResendStatus(t("auth.login.resendFailed"));
    }
  };

  return (
    <div className={styles["authorization__form-side"]}>
      <h1>{t("auth.login.heading")}</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form className={styles["authorization__form"]}>
            <div className={styles["authorization__text-fields"]}>
              <Field
                name="email"
                type="email"
                placeholder={t("auth.fields.email")}
                className={styles["authorization__form-field"]}
              />
              {errors.email && touched.email && (
                <div className={styles["authorization__form--error"]}>
                  {errors.email}
                </div>
              )}

              <Field
                name="password"
                type="password"
                placeholder={t("auth.fields.password")}
                className={styles["authorization__form-field"]}
              />
              {errors.password && touched.password && (
                <div className={styles["authorization__form--error"]}>
                  {errors.password}
                </div>
              )}
            </div>

            <div className={styles["authorization__options"]}>
              <label>
                <Field type="checkbox" name="rememberMe" />
                {t("auth.login.rememberMe")}
              </label>
              <Link to="/forget-password">{t("auth.login.forgotPassword")}</Link>
            </div>
            <Button
              type="submit"
              style="blue-button-header"
              text={t("common.continue")}
            />
          </Form>
        )}
      </Formik>

      {isMessageOpen && (
        <div className={styles["authorization__message"]}>
          <p className={styles["authorization__message--error"]}>
            {errorMessage}
          </p>
          {pendingEmail && (
            <p>
              <button type="button" onClick={resendConfirmation}>
                {t("auth.login.resend")}
              </button>
            </p>
          )}
          {resendStatus && <p>{resendStatus}</p>}
        </div>
      )}
    </div>
  );
};

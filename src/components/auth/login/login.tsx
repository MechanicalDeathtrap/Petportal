import styles from "../auth-layout/auth-layout.module.sass";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../button/button.tsx";
import * as Yup from "yup";
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
  const [isMessageOpen, setMessageOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");
  const [resendStatus, setResendStatus] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Некорректная почта. Она должна содержать знак @")
      .required("Введите почту"),
    password: Yup.string()
      .min(
        8,
        "Пароль должен содержать минимум 8 символов, включая минимум одну заглавную букву, одну цифру",
      )
      .max(30, "Слишком длинный пароль")
      .required("Введите пароль"),
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
            setErrorMessage(
              "Некорректные данные. Проверьте введенные значения.",
            );
            break;
          case 401: {
            const serverMsg =
              (error.response?.data as { Message?: string; message?: string })?.Message ||
              (error.response?.data as { Message?: string; message?: string })?.message ||
              "Неверный email или пароль.";
            setErrorMessage(serverMsg);
            if (serverMsg.toLowerCase().includes("подтвердите email")) {
              setPendingEmail(values.email);
            } else {
              setPendingEmail("");
            }
            break;
          }
          case 500:
            setErrorMessage("Ошибка сервера. Попробуйте позже.");
            break;
          default:
            setErrorMessage("Произошла ошибка при авторизации.");
        }
      } else if (axios.isAxiosError(error) && error.request) {
        setErrorMessage(
          "Сервер недоступен. Проверьте подключение к интернету.",
        );
      } else {
        setErrorMessage("Произошла непредвиденная ошибка.");
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
    setResendStatus("Отправляем…");
    try {
      await fetch(
        `${API_BASE_URL}${API_BASE_PATH}/Authorization/ResendConfirmationEmail?email=${encodeURIComponent(pendingEmail)}`,
        { method: "POST", credentials: "include" }
      );
      setResendStatus("Письмо отправлено повторно. Проверьте почту.");
    } catch {
      setResendStatus("Не удалось отправить письмо. Попробуйте позже.");
    }
  };

  return (
    <div className={styles["authorization__form-side"]}>
      <h1>Войти в профиль</h1>
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
                placeholder="Электронная почта"
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
                placeholder="Пароль"
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
                Запомнить меня
              </label>
              <Link to="/forget-password">Забыли пароль?</Link>
            </div>
            <Button
              type="submit"
              style="blue-button-header"
              text="Продолжить"
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
                Отправить письмо подтверждения повторно
              </button>
            </p>
          )}
          {resendStatus && <p>{resendStatus}</p>}
        </div>
      )}
    </div>
  );
};

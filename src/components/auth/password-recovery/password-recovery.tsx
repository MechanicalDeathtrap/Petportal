import styles from "../auth-layout/auth-layout.module.sass";
import { Field, Form, Formik } from "formik";
import { Button } from "../../button/button.tsx";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { API_BASE_URL, API_BASE_PATH } from "../../../config/api";

type emailProps = {
  email: string;
};

type passwdProps = {
  password: string;
  confirmPassword: string;
};

export const PasswordRecovery = () => {
  const [step, setStep] = useState(1);
  const [isMessageOpen, setMessageOpen] = useState(0);
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get("token");
  const userIdFromUrl = searchParams.get("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (tokenFromUrl && userIdFromUrl) {
      setStep(3);
    }
  }, [tokenFromUrl, userIdFromUrl]);

  const closeMessage = () => setMessageOpen(0);
  const handleMessage = (code: number) => setMessageOpen(code);

  const validationEmailSchema = Yup.object().shape({
    email: Yup.string()
      .email("Некорректная почта. Она должна содержать знак @")
      .required("Введите почту"),
  });
  const validationPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(
        8,
        "Пароль должен содержать минимум 8 символов, включая минимум одну заглавную букву, одну цифру",
      )
      .max(30, "Слишком длинный пароль")
      .required("Введите новый пароль"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Пароли не совпадают")
      .required("Повторите новый пароль"),
  });

  useEffect(() => {
    if (isMessageOpen) {
      setTimeout(closeMessage, 5000);
    }
  }, [isMessageOpen]);

  const sendEmail = async (value: emailProps) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}${API_BASE_PATH}/Authorization/ForgotPassword?Email=${encodeURIComponent(value.email)}`,
        { method: "POST", credentials: "include" },
      );
      if (!res.ok) {
        handleMessage(1);
        return;
      }
      setStep(2);
    } catch {
      handleMessage(1);
    }
  };

  const sendPassword = async (value: passwdProps) => {
    if (!tokenFromUrl || !userIdFromUrl) {
      handleMessage(3);
      return;
    }
    try {
      const params = new URLSearchParams({
        token: tokenFromUrl,
        userId: userIdFromUrl,
        newPassword1: value.password,
        newPassword2: value.confirmPassword,
      });
      const res = await fetch(
        `${API_BASE_URL}${API_BASE_PATH}/Authorization/ResetPassword?${params.toString()}`,
        { method: "POST", credentials: "include" },
      );
      if (!res.ok) {
        handleMessage(3);
        return;
      }
      alert("Пароль успешно сменён");
      navigate("/login");
    } catch {
      handleMessage(3);
    }
  };

  return (
    <div
      className={`${styles["authorization__form-side"]} ${styles["authorization__forgotpasswd-container"]}`}
    >
      <h1>Восстановление пароля</h1>

      {step === 1 && (
        <>
          <p>
            Введите адрес электронной почты, указанный при создании аккаунта. На
            него мы отправим ссылку для восстановления пароля.
          </p>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={sendEmail}
            validationSchema={validationEmailSchema}
          >
            {({ handleSubmit, errors, touched }) => (
              <Form
                noValidate
                onSubmit={handleSubmit}
                className={styles["authorization__form"]}
              >
                <div>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Электронная почта"
                    className={styles["authorization__form-field"]}
                  />

                  {errors.email && touched.email ? (
                    <div
                      className={`${styles["authorization__form--error"]} ${styles["authorization__form--error-margin"]}`}
                    >
                      {errors.email}
                    </div>
                  ) : null}
                </div>
                <div
                  className={styles["authorization__forget-password-buttons"]}
                >
                  <Button
                    type="submit"
                    style="blue-button-header"
                    text="Продолжить"
                  />
                  <Link to="/login">Назад</Link>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}

      {step === 2 && (
        <>
          <p>
            Если аккаунт с такой почтой существует, мы отправили ссылку для
            сброса пароля. Откройте письмо и перейдите по ссылке.
          </p>
          <div className={styles["authorization__forget-password-buttons"]}>
            <Link to="/login">Вернуться ко входу</Link>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <p>
            Пароль должен содержать минимум 8 символов, включая одну заглавную
            букву, одну цифру
          </p>
          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            onSubmit={sendPassword}
            validationSchema={validationPasswordSchema}
          >
            {({ handleSubmit, errors, touched }) => (
              <Form
                noValidate
                onSubmit={handleSubmit}
                className={styles["authorization__form"]}
              >
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Пароль"
                  className={styles["authorization__form-field"]}
                />

                {errors.password && touched.password ? (
                  <div className={styles["authorization__form--error"]}>
                    {errors.password}
                  </div>
                ) : null}

                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Повторите пароль"
                  className={styles["authorization__form-field"]}
                />

                {errors.confirmPassword && touched.confirmPassword ? (
                  <div className={styles["authorization__form--error"]}>
                    {errors.confirmPassword}
                  </div>
                ) : null}

                <Button
                  type="submit"
                  style="blue-button-header"
                  text="Сохранить пароль"
                />
              </Form>
            )}
          </Formik>
        </>
      )}

      {isMessageOpen === 1 && (
        <div className={styles["authorization__message"]}>
          <p className={styles["authorization__message--error"]}>
            Не удалось отправить письмо. Попробуйте позже.
          </p>
        </div>
      )}

      {isMessageOpen === 3 && (
        <div className={styles["authorization__message"]}>
          <p className={styles["authorization__message--error"]}>
            Произошла ошибка при смене пароля. Ссылка могла устареть.
          </p>
        </div>
      )}
    </div>
  );
};

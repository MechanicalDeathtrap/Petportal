import styles from "../auth-layout/auth-layout.module.sass";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../button/button.tsx";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";

type AuthorizationProps = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const Login = () => {
  const [isMessageOpen, setMessageOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
        "http://localhost:5140/api/Authorization/login",
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      navigate("/");
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;
        switch (status) {
          case 400:
            setErrorMessage(
              "Некорректные данные. Проверьте введенные значения.",
            );
            break;
          case 401:
            setErrorMessage("Неверный email или пароль.");
            break;
          case 500:
            setErrorMessage("Ошибка сервера. Попробуйте позже.");
            break;
          default:
            setErrorMessage("Произошла ошибка при авторизации.");
        }
      } else if (error.request) {
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
              <Link to="/forgot-password">Забыли пароль?</Link>
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
        </div>
      )}
    </div>
  );
};

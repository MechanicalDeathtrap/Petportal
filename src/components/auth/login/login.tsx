import styles from "../auth-layout.module.sass";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../button/button.tsx";
import * as Yup from "yup";
import { useEffect, useState } from "react";

type AuthorizationProps = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const Login = () => {
  const [isMessageOpen, setMessageOpen] = useState(false);
  const handleMessage = () => setMessageOpen((prev) => !prev);

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

  // Имитация сервера
  const save = async () => {
    console.log("save");
    return {
      error: Math.random() > 0.5 ? "500" : "200",
    };
  };

  // Имитация сервера
  const handleSubmit = async (values: AuthorizationProps) => {
    const { error } = await save();
    console.log(values.email);
    switch (error) {
      case "200":
        navigate("/");
        break;

      case "500":
        handleMessage();
        break;
    }
  };

  const setMessageTimer = () => {
    setTimeout(handleMessage, 5000);
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
        {({ handleSubmit, errors, touched }) => (
          <Form
            noValidate
            onSubmit={(e) => {
              console.log("handleSubmit вызван");
              handleSubmit(e);
            }}
            className={styles["authorization__form"]}
          >
            <div className={styles["authorization__text-fields"]}>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Электронная почта"
                className={styles["authorization__form-field"]}
              />
              {errors.email && touched.email ? (
                <div className={styles["authorization__form--error"]}>
                  {errors.email}
                </div>
              ) : null}
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
            </div>
            <div>
              <label
                htmlFor="authCheckbox"
                className={styles["authorization__form-checkbox"]}
              >
                <div
                  className={`${styles["authorization__form-checkbox-container"]} ${styles["authorization__form-checkbox-container--centered"]}`}
                >
                  <Field
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    className={styles["authorization__form-checkbox-input"]}
                  />
                  <p>Запомнить меня</p>
                </div>
              </label>
              <Link to="/forget-password">Забыли пароль?</Link>{" "}
              {/*TODO путь к станице с восстановлением */}
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
          <p>
            Произошла ошибка при авторизации! Попробуйте авторизироваться снова!
            😓
          </p>
          {/*<p className={styles["authorization__message--error"]}> Аккаунт с такой почтой уже существует! Пожалуйста, поменяйте почту и повторите попытку 😓</p>*/}
        </div>
      )}
    </div>
  );
};

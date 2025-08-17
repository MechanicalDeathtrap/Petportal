import styles from "../auth-layout/auth-layout.module.sass";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../button/button.tsx";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";

type RegistrationProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

export const Registration = () => {
  const [isMessageOpen, setMessageOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Имя должно содержать не менее 3 символов")
      .max(30, "Слишком длинное имя")
      .required("Введите имя"),
    lastName: Yup.string()
      .min(2, "Фамилия должна содержать не менее 2 символов")
      .max(30, "Слишком длинная фамилия")
      .required("Введите фамилию"),
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
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Пароли не совпадают")
      .required("Повторите пароль"),
    acceptTerms: Yup.boolean().oneOf([true], "Примите условия").required(),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  };

  const handleSubmit = async (values: RegistrationProps) => {
    try {
      const requestBody = {
        Name: `${values.firstName} ${values.lastName}`,
        Email: values.email,
        Password: values.password,
      };

      await axios.post(
        "/api/Authorization/register",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        switch (status) {
          case 400:
            setErrorMessage(
              "Некорректные данные. Проверьте введенные значения.",
            );
            break;
          case 409:
            setErrorMessage("Аккаунт с такой почтой уже существует.");
            break;
          case 500:
            setErrorMessage("Ошибка сервера. Попробуйте позже.");
            break;
          default:
            setErrorMessage("Произошла ошибка при регистрации.");
        }
      } else if (axios.isAxiosError(error) && error.request) {
        // Ошибка сети (например, сервер недоступен)
        setErrorMessage(
          "Сервер недоступен. Проверьте подключение к интернету.",
        );
      } else {
        // Другие ошибки
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
      <h1>Регистрация</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form className={styles["authorization__form"]}>
            <div className={styles["authorization__text-fields"]}>
              <Field
                name="firstName"
                type="text"
                placeholder="Имя"
                className={styles["authorization__form-field"]}
              />
              {errors.firstName && touched.firstName && (
                <div className={styles["authorization__form--error"]}>
                  {errors.firstName}
                </div>
              )}

              <Field
                name="lastName"
                type="text"
                placeholder="Фамилия"
                className={styles["authorization__form-field"]}
              />
              {errors.lastName && touched.lastName && (
                <div className={styles["authorization__form--error"]}>
                  {errors.lastName}
                </div>
              )}

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

              <Field
                name="confirmPassword"
                type="password"
                placeholder="Повторите пароль"
                className={styles["authorization__form-field"]}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <div className={styles["authorization__form--error"]}>
                  {errors.confirmPassword}
                </div>
              )}
            </div>
            <label
              htmlFor="registrationCheckbox"
              className={styles["authorization__form-checkbox"]}
            >
              <div className={styles["authorization__form-checkbox-container"]}>
                <Field
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  className={styles["authorization__form-checkbox-input"]}
                />
                <p>
                  Я принимаю
                  <Link
                    to="/"
                    className={styles["authorization__form-checkbox-link"]}
                  >
                    {" "}
                    политику конфеденциальности{" "}
                  </Link>
                  и{" "}
                  <Link
                    to="/"
                    className={styles["authorization__form-checkbox-link"]}
                  >
                    правила пользования сервисом
                  </Link>
                  <span style={{ color: "red" }}>*</span>
                  {errors.acceptTerms && touched.acceptTerms && (
                    <div
                      className={styles["authorization__form--error-checkbox"]}
                    >
                      {errors.acceptTerms}
                    </div>
                  )}
                </p>
                {/*//TODO пути к докам*/}
              </div>
            </label>
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

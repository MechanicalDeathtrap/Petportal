import styles from "../auth-layout/auth-layout.module.sass";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../button/button.tsx";
import * as Yup from "yup";
import { Trans, useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, API_BASE_PATH } from "../../../config/api";

type RegistrationProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

export const Registration = () => {
  const { t } = useTranslation();
  const [isMessageOpen, setMessageOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, t("auth.validation.firstNameMin"))
      .max(30, t("auth.validation.firstNameMax"))
      .required(t("auth.validation.firstNameRequired")),
    lastName: Yup.string()
      .min(2, t("auth.validation.lastNameMin"))
      .max(30, t("auth.validation.lastNameMax"))
      .required(t("auth.validation.lastNameRequired")),
    email: Yup.string()
      .email(t("auth.validation.emailInvalid"))
      .required(t("auth.validation.emailRequired")),
    password: Yup.string()
      .min(8, t("auth.validation.passwordRule"))
      .max(30, t("auth.validation.passwordTooLong"))
      .required(t("auth.validation.passwordRequired")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t("auth.validation.passwordsMismatch"))
      .required(t("auth.validation.confirmPasswordRequired")),
    acceptTerms: Yup.boolean().oneOf([true], t("auth.validation.acceptTerms")).required(),
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
        `${API_BASE_URL}${API_BASE_PATH}/Authorization/register`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      setRegisteredEmail(values.email);
      setRegistrationSuccess(true);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        switch (status) {
          case 400:
            setErrorMessage(t("auth.errors.invalidData"));
            break;
          case 409:
            setErrorMessage(t("auth.registration.emailTaken"));
            break;
          case 500:
            setErrorMessage(t("auth.errors.server"));
            break;
          default:
            setErrorMessage(t("auth.registration.failed"));
        }
      } else if (axios.isAxiosError(error) && error.request) {
        // Ошибка сети (например, сервер недоступен)
        setErrorMessage(t("auth.errors.unavailable"));
      } else {
        // Другие ошибки
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

  return (
    <div className={styles["authorization__form-side"]}>
      <h1>{t("auth.registration.heading")}</h1>
      {registrationSuccess ? (
        <div>
          <p>
            <Trans
              i18nKey="auth.registration.success"
              values={{ email: registeredEmail }}
              components={{ strong: <strong /> }}
            />
          </p>
          <Button
            type="button"
            style="blue-button-header"
            text={t("auth.registration.goToLogin")}
            onClick={() => navigate("/login")}
          />
        </div>
      ) : (
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
                placeholder={t("auth.fields.firstName")}
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
                placeholder={t("auth.fields.lastName")}
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

              <Field
                name="confirmPassword"
                type="password"
                placeholder={t("auth.fields.confirmPassword")}
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
                  <Trans
                    i18nKey="auth.registration.acceptTerms"
                    components={{
                      privacy: (
                        <Link
                          to="/"
                          className={styles["authorization__form-checkbox-link"]}
                        />
                      ),
                      rules: (
                        <Link
                          to="/"
                          className={styles["authorization__form-checkbox-link"]}
                        />
                      ),
                    }}
                  />
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
              text={t("common.continue")}
            />
          </Form>
        )}
      </Formik>
      )}

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

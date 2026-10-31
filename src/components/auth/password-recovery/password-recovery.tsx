import styles from "../auth-layout/auth-layout.module.sass";
import { Field, Form, Formik } from "formik";
import { Button } from "../../button/button.tsx";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
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

  const { t } = useTranslation();
  const closeMessage = () => setMessageOpen(0);
  const handleMessage = (code: number) => setMessageOpen(code);

  const validationEmailSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("auth.validation.emailInvalid"))
      .required(t("auth.validation.emailRequired")),
  });
  const validationPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, t("auth.validation.passwordRule"))
      .max(30, t("auth.validation.passwordTooLong"))
      .required(t("auth.validation.newPasswordRequired")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t("auth.validation.passwordsMismatch"))
      .required(t("auth.validation.confirmNewPasswordRequired")),
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
      alert(t("auth.recovery.changed"));
      navigate("/login");
    } catch {
      handleMessage(3);
    }
  };

  return (
    <div
      className={`${styles["authorization__form-side"]} ${styles["authorization__forgotpasswd-container"]}`}
    >
      <h1>{t("auth.recovery.heading")}</h1>

      {step === 1 && (
        <>
          <p>{t("auth.recovery.emailStepText")}</p>
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
                    placeholder={t("auth.fields.email")}
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
                    text={t("common.continue")}
                  />
                  <Link to="/login">{t("common.back")}</Link>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}

      {step === 2 && (
        <>
          <p>{t("auth.recovery.sentText")}</p>
          <div className={styles["authorization__forget-password-buttons"]}>
            <Link to="/login">{t("common.backToLogin")}</Link>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <p>{t("auth.recovery.passwordRuleHint")}</p>
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
                  placeholder={t("auth.fields.password")}
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
                  placeholder={t("auth.fields.confirmPassword")}
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
                  text={t("auth.recovery.savePassword")}
                />
              </Form>
            )}
          </Formik>
        </>
      )}

      {isMessageOpen === 1 && (
        <div className={styles["authorization__message"]}>
          <p className={styles["authorization__message--error"]}>
            {t("auth.recovery.sendFailed")}
          </p>
        </div>
      )}

      {isMessageOpen === 3 && (
        <div className={styles["authorization__message"]}>
          <p className={styles["authorization__message--error"]}>
            {t("auth.recovery.changeFailed")}
          </p>
        </div>
      )}
    </div>
  );
};

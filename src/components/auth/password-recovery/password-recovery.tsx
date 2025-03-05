import styles from "../auth-layout.module.sass";
import { Field, Form, Formik } from "formik";
import { Button } from "../../button/button.tsx";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

type emailProps = {
  email: string;
};

type codeProps = {
  code: string;
};

type passwdProps = {
  password: string;
  confirmPassword: string;
};

export const PasswordRecovery = () => {
  const [step, setStep] = useState(1);
  const [userEmail, setEmail] = useState("");
  const [isMessageOpen, setMessageOpen] = useState(0);

  const navigate = useNavigate();

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePrevStep = () => setStep((prev) => prev - 1);
  const handleEmail = (email: string) => setEmail(email);
  const closeMessage = () => setMessageOpen(0);
  const handleMessage = () =>
    setMessageOpen(() => {
      switch (step) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 3:
          return 3;
        default:
          return 0;
      }
    });

  const validationEmailSchema = Yup.object().shape({
    email: Yup.string()
      .email("Некорректная почта. Она должна содержать знак @")
      .required("Введите почту"),
  });
  const validationCodeSchema = Yup.object().shape({
    code: Yup.string()
      .min(6, "Код слишком короткий. Он должен содержать 6 символов")
      .required("Введите код"),
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

  const setMessageTimer = () => {
    setTimeout(closeMessage, 5000);
  };

  // Имитация сервера
  const save = async () => {
    console.log("save");
    return {
      error: Math.random() > 0.5 ? "500" : "200",
    };
  };

  // Имитация сервера
  const sendEmail = async (value: emailProps) => {
    const { error } = await save();
    console.log(error);
    switch (error) {
      case "200":
        handleEmail(value.email);
        handleNextStep();
        break;
      case "500":
        handleMessage();
        break;
    }
  };

  // Имитация сервера
  const sendCode = async (value: codeProps) => {
    const { error } = await save();
    console.log(value);
    switch (error) {
      case "200":
        handleNextStep();
        break;
      case "500":
        handleMessage();
        break;
    }
  };
  // Имитация сервера
  const sendPassword = async (value: passwdProps) => {
    const { error } = await save();
    console.log(value);
    switch (error) {
      case "200":
        alert("Пароль успешно сменён! 😊"); /*TODO переделать ибо жуть*/
        navigate("/login");
        break;
      case "500":
        handleMessage();
        break;
    }
  };

  useEffect(() => {
    if (isMessageOpen) {
      setMessageTimer();
    }
  }, [isMessageOpen]);

  return (
    <div
      className={`${styles["authorization__form-side"]} ${styles["authorization__forgotpasswd-container"]}`}
    >
      <h1>Восстановление пароля</h1>

      {step === 1 && (
        <>
          <p>
            Введите адрес электронной почты, указанный при создании аккаунта. На
            него мы отправим письмо с кодом для восстановления пароля.
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
            Введите адрес электронной почты, указанный при создании аккаунта. На
            него мы отправим письмо с кодом для восстановления пароля.
          </p>
          <Formik
            initialValues={{ code: "" }}
            onSubmit={sendCode}
            validationSchema={validationCodeSchema}
          >
            {({ handleSubmit, errors, touched }) => (
              <Form
                noValidate
                onSubmit={handleSubmit}
                className={styles["authorization__form"]}
              >
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder={userEmail || "Электронная почта"}
                  className={styles["authorization__form-field"]}
                  disabled
                />
                <label htmlFor="forgetpaswdCode">
                  <p>Введите 6-значный код из письма </p>
                  <Field
                    id="code"
                    name="code"
                    type="text"
                    placeholder="Код"
                    className={styles["authorization__form-field"]}
                    maxLength={6}
                  />

                  {errors.code && touched.code ? (
                    <div className={styles["authorization__form--error"]}>
                      {errors.code}
                    </div>
                  ) : null}
                </label>
                <div
                  className={styles["authorization__forget-password-buttons"]}
                >
                  <Button
                    type="submit"
                    style="blue-button-header"
                    text="Продолжить"
                  />
                  <p onClick={handlePrevStep}>Назад</p>
                </div>
              </Form>
            )}
          </Formik>
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
                  type="text"
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
                  type="text"
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
                  text="Продолжить"
                />
              </Form>
            )}
          </Formik>
        </>
      )}

      {isMessageOpen === 1 && (
        <div className={styles["authorization__message"]}>
          <p className={styles["authorization__message--error"]}>
            {" "}
            Аккаунта с такой почтой не существует! 😓
          </p>
        </div>
      )}

      {isMessageOpen === 2 && (
        <div className={styles["authorization__message"]}>
          <p className={styles["authorization__message--error"]}>
            {" "}
            Код введён неправильно! Повторите попытку! 😓
          </p>
        </div>
      )}

      {isMessageOpen === 3 && (
        <div className={styles["authorization__message"]}>
          <p className={styles["authorization__message--error"]}>
            {" "}
            Произошла ошибка при смене пароля! Пожалуйста, повторите попытку 😓
          </p>
        </div>
      )}
    </div>
  );
};

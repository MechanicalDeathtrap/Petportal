import { Box, Typography } from "@mui/material";
import { forwardRef } from "react";
import { Field, Form, Formik } from "formik";
import style from "./delete-account-modal.module.sass";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/button/button.tsx";
import * as Yup from "yup";
import axios from "axios";
import { API_BASE_URL, API_BASE_PATH } from "../../config/api";

type DeleteAccountProps = {
  password: string;
};
type DeleteAccountPropsModal = {
  onClose: () => void;
};

export const DeleteAccountModal = forwardRef(
  (props: DeleteAccountPropsModal, ref) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const initialValues = {
      password: "",
    };

    const validationSchema = Yup.object().shape({
      password: Yup.string()
        .min(8, t("auth.validation.passwordRule"))
        .max(30, t("auth.validation.passwordTooLong"))
        .required(t("auth.validation.passwordRequired")),
    });

    const handleDelete = async (_values: DeleteAccountProps) => {
      try {
        await axios.delete(`${API_BASE_URL}${API_BASE_PATH}/Users`, {
          withCredentials: true,
        });
        document.cookie = "jwttoken=; Max-Age=0; path=/";
        navigate("/");
        window.location.reload();
      } catch (error) {
        console.error("Ошибка удаления аккаунта:", error);
        alert(t("account.deleteAccount.failed"));
      }
    };

    return (
      <Box ref={ref} className={style["delete-account-modal"]}>
        <div className={style["delete-account-modal__typography"]}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("account.deleteAccount.heading")}
          </Typography>
          <Typography id="modal-modal-description">
            <p>{t("account.deleteAccount.modalText")}</p>
          </Typography>
        </div>
        <div>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleDelete}
          >
            {({ handleSubmit, errors, touched }) => (
              <Form
                noValidate
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder={t("auth.fields.password")}
                  className={style["delete-account-modal__form-field"]}
                />
                {errors.password && touched.password ? (
                  <div className={style["delete-account-modal__form--error"]}>
                    {errors.password}
                  </div>
                ) : null}
                <div className={style["delete-account-modal__buttons"]}>
                  <Button
                    text={t("account.deleteAccount.action")}
                    style={"blue-button-header"}
                    type="submit"
                  />
                  <Button
                    text={t("common.cancel")}
                    style={"grey-button"}
                    type="button"
                    onClick={props.onClose}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Box>
    );
  },
);

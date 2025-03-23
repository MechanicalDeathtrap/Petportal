import { Box, Typography } from "@mui/material";
import { forwardRef } from "react";
import { Field, Form, Formik } from "formik";
import style from "./delete-account-modal.module.sass"
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/button.tsx";
import * as Yup from "yup";

type DeleteAccountProps = {
  password: string;
}
type DeleteAccountPropsModal = {
  onClose: () => void;
}

export const DeleteAccountModal = forwardRef((props: DeleteAccountPropsModal, ref) => {

  const navigate = useNavigate();

  const initialValues = {
    password: "",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(
        8,
        "Пароль должен содержать минимум 8 символов, включая минимум одну заглавную букву, одну цифру",
      )
      .max(30, "Слишком длинный пароль")
      .required("Введите пароль")
  })

  const save = async () => {
    console.log("save");
    return {
      error: Math.random() > 0.5 ? "500" : "200",
    };
  };

  const handleDelete = async (values: DeleteAccountProps) => {
    const { error } = await save();
    console.log(values)
    switch (error) {
      case "200":
        navigate("/");
        break;

    }
  };

  return(
    <Box ref={ref} className={style["delete-account-modal"]}>
      <div className={style["delete-account-modal__typography"]}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Удаление аккаунта
        </Typography>
        <Typography id="modal-modal-description">
          <p>Данное действие приведет к безвозвратному удалению всех данных и утрате доступа к аккаунту. Пожалуйста, подтвердите свое решение.</p>
        </Typography>
      </div>
      <div>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleDelete}>
          {({ handleSubmit, errors, touched }) => (
          <Form
            noValidate
            onSubmit={(e) => {
              handleSubmit(e);
            }}>
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="Пароль"
              className={style["delete-account-modal__form-field"]}
            />
            {errors.password && touched.password ? (
              <div className={style["delete-account-modal__form--error"]}>
                {errors.password}
              </div>
            ) : null}
            <div className={style["delete-account-modal__buttons"]}>
              <Button text="Удалить аккаунт" style={"blue-button-header"} type="submit"/>
              <Button text="Отменить" style={"grey-button"} type="button" onClick={props.onClose}/>
            </div>
          </Form>
            )}
        </Formik>
      </div>
    </Box>
  )
})
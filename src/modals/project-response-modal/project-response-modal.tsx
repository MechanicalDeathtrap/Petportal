import { Box, Typography } from "@mui/material";
import style from "./project-response-modal.module.sass";
import { forwardRef } from "react";
import { Field, Form, Formik, FieldProps } from "formik";
import { Button } from "../../components/button/button.tsx";
import * as Yup from "yup";

type ProjectResponse = {
  radios: string;
  comment: string;
};
type ProjectResponseModal = {
  onClose: () => void;
};

export const ProjectResponseModal = forwardRef(
  (props: ProjectResponseModal, ref) => {
    const roles = ["Ux/Ui", "Backend developer"];

    const initialValues = {
      radios: "",
      comment: "",
    };

    const validationSchema = Yup.object().shape({
      radios: Yup.string().required("Выберите хотя бы одну роль"),
      comment: Yup.string(),
    });

    const handleProjectResponse = (values: ProjectResponse) => {
      console.log(values);
    };

    return (
      <Box ref={ref}>
        <div className={style["project-response"]}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Какую бы роль вы хотели взять?
          </Typography>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              handleProjectResponse(values);
              props.onClose();
              setSubmitting(false);
            }}
          >
            {({ handleSubmit, errors }) => (
              <Form
                noValidate
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                {roles.map((role) => {
                  return (
                    <label key={role}>
                      <Field name="radios" id="radios">
                        {({ field }: FieldProps) => (
                          <input
                            {...field}
                            type="radio"
                            value={role}
                            checked={field.value === role}
                            className={style["project-response__radio-input"]}
                          />
                        )}
                      </Field>
                      {role}
                    </label>
                  );
                })}

                {errors.radios && (
                  <div className={style["project-response__form--error"]}>
                    {errors.radios}
                  </div>
                )}

                <div className={style["project-response__textarea-container"]}>
                  <Typography variant="h6" component="h2">
                    Комментарий к отклику
                  </Typography>
                  <Field
                    as="textarea"
                    className={style["project-response__textarea"]}
                    type="textarea"
                    name="comment"
                    id="comment"
                    placeholder="Если у вас есть что сказать..."
                  />
                </div>
                <Button
                  text="Отправить отклик"
                  style={"blue-button-header"}
                  type="submit"
                />
              </Form>
            )}
          </Formik>
          <button onClick={props.onClose} className={style["project-response__close-button"]}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M1.23242 1L12.9999 13" stroke="#666666" strokeWidth="2" strokeLinecap="round" />
              <path d="M12.7676 1L1.00011 13" stroke="#666666" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </Box>
    );
  },
);

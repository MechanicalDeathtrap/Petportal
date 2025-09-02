import { Box, Typography } from "@mui/material";
import style from "./project-response-modal.module.sass";
import { forwardRef } from "react";
import { Field, Form, Formik, FieldProps } from "formik";
import { Button } from "../../components/button/button.tsx";
import * as Yup from "yup";
import axios from "axios";
import { userStore } from "../../stores/user-store.ts";


type ProjectResponse = {
  radios: string;
  comment: string;
};

type ProjectResponseModalProps = {
  onClose: () => void;
  projectId: string; 
};

const validationSchema = Yup.object().shape({
  radios: Yup.string().required("Выберите хотя бы одну роль"),
  comment: Yup.string().optional(),
});

export const ProjectResponseModal = forwardRef(
  ({ onClose, projectId }: ProjectResponseModalProps, ref) => {
    const roles = ["Ux/Ui", "Backend developer"];

    const initialValues: ProjectResponse = {
      radios: "",
      comment: "",
    };

    const userId = userStore.user.id;

    if (!userId) {
      console.error("Пользователь не авторизован");
    }

    const handleProjectResponse = async (values: ProjectResponse, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
      const payload = {
        role: values.radios,
        comment: values.comment,
        userId,
        projectId,
      };

      try {
        const response = await axios.post(
          "http://localhost:5140/api/Responds/AddRespond",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              accept: "text/plain",
            },
            withCredentials: true, 
          }
        );

        if (response.status === 200 || response.status === 201) {
          console.log("Отклик успешно отправлен");
          onClose(); 
        } else {
          alert("Не удалось отправить отклик. Попробуйте позже.");
        }
      } catch (error: unknown) {
        console.error("Ошибка при отправке отклика:", error);

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 409) {
            alert("Вы уже откликнулись на этот проект.");
          } else if (error.response?.status === 400) {
            alert("Некорректные данные. Попробуйте снова.");
          } else {
            alert("Ошибка сети или сервера. Попробуйте позже.");
          }
        } else {
          alert("Произошла неизвестная ошибка.");
        }
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <Box ref={ref}>
        <div className={style["project-response"]}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Какую роль вы бы хотели занять?
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleProjectResponse}
          >
            {({ handleSubmit, errors, isSubmitting }) => (
              <Form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                {roles.map((role) => (
                  <label key={role} className={style["project-response__radio-label"]}>
                    <Field name="radios" id="radios">
                      {({ field }: FieldProps) => (
                        <input
                          {...field}
                          type="radio"
                          value={role}
                          checked={field.value === role}
                          className={style["project-response__radio-input"]}
                          disabled={isSubmitting}
                        />
                      )}
                    </Field>
                    {role}
                  </label>
                ))}

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
                    name="comment"
                    id="comment"
                    placeholder="Если у вас есть что сказать..."
                    disabled={isSubmitting}
                  />
                </div>

                <Button
                  text={isSubmitting ? "Отправка..." : "Отправить отклик"}
                  style="blue-button-header"
                  type="submit"
                  disabled={isSubmitting}
                />
              </Form>
            )}
          </Formik>

          <button
            type="button"
            onClick={onClose}
            className={style["project-response__close-button"]}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M1.23242 1L12.9999 13"
                stroke="#666666"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12.7676 1L1.00011 13"
                stroke="#666666"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </Box>
    );
  }
);

// Рекомендуется указывать displayName для forwardRef
ProjectResponseModal.displayName = "ProjectResponseModal";
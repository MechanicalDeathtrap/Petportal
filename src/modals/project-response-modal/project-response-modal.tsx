import { Box, Typography } from "@mui/material";
import style from "./project-response-modal.module.sass";
import { forwardRef, useState } from "react";
import { Field, Form, Formik, FieldProps } from "formik";
import { Button } from "../../components/button/button.tsx";
import * as Yup from "yup";
import axios from "axios";
import { userStore } from "../../stores/user-store.ts";
import { API_BASE_URL, API_BASE_PATH } from "../../config/api";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { lazyT } from "../../i18n/index.ts";
import { getRoleLabel } from "../../data/role-categories.ts";

type ProjectResponse = {
  radios: string;
  comment: string;
};

type ProjectResponseModalProps = {
  onClose: () => void;
  projectId: string;
  roles: string[];
};

const validationSchema = Yup.object().shape({
  radios: Yup.string().required(lazyT("respondModal.roleRequired")),
  comment: Yup.string().optional(),
});

export const ProjectResponseModal = forwardRef(
  ({ onClose, projectId, roles }: ProjectResponseModalProps, ref) => {
    const { t } = useTranslation();
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const initialValues: ProjectResponse = {
      radios: "",
      comment: "",
    };

    const handleProjectResponse = async (
      values: ProjectResponse,
      { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
    ) => {
      const userId = userStore.user.id;

      if (!userId) {
        alert(t("respondModal.notAuthorized"));
        setSubmitting(false);
        return;
      }

      const payload = {
        role: values.radios,
        comment: values.comment,
        userId,
        projectId,
      };

      try {
        const response = await axios.post(
          `${API_BASE_URL}${API_BASE_PATH}/Responds/AddRespond`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              accept: "text/plain",
            },
            withCredentials: true,
          },
        );

        if (response.status === 200 || response.status === 201) {
          setSuccess(true);
        } else {
          alert(t("respondModal.failed"));
        }
      } catch (error: unknown) {
        console.error("Ошибка при отправке отклика:", error);

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 409) {
            alert(t("respondModal.alreadyResponded"));
          } else if (error.response?.status === 400) {
            // бэкенд отвечает текстом на русском; узнаём известный случай по нему
            const serverText =
              typeof error.response.data === "string" ? error.response.data : "";
            alert(
              serverText.includes("собственный проект")
                ? t("respondModal.ownProject")
                : t("respondModal.invalidData"),
            );
          } else if (error.response?.status === 401) {
            alert(t("respondModal.authRequired"));
            navigate("/login");
          } else {
            alert(t("respondModal.networkError"));
          }
        } else {
          alert(t("respondModal.unknownError"));
        }
      } finally {
        setSubmitting(false);
      }
    };

    if (success) {
      return (
        <Box ref={ref}>
          <div className={`${style["project-response"]} ${style["project-response--success"]}`}>
            <div className={style["project-response__success-check"]} aria-hidden>
              <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="36" cy="36" r="36" fill="#2E7D32" />
                <path
                  d="M20 37.5L31 48.5L52 25.5"
                  stroke="white"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className={style["project-response__success-text"]}>
              {t("respondModal.success")}
            </p>
            <div className={style["project-response__success-actions"]}>
              <Button
                text={t("respondModal.goToChat")}
                style="blue-button-header"
                type="button"
                onClick={() => {
                  onClose();
                  navigate("/chat");
                }}
              />
              <Button
                text={t("common.close")}
                style="grey-button"
                type="button"
                onClick={onClose}
              />
            </div>
            <button
              type="button"
              onClick={onClose}
              className={style["project-response__close-button"]}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M1.23242 1L12.9999 13" stroke="#666666" strokeWidth="2" strokeLinecap="round" />
                <path d="M12.7676 1L1.00011 13" stroke="#666666" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </Box>
      );
    }

    return (
      <Box ref={ref}>
        <div className={style["project-response"]}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("respondModal.heading")}
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
                    {getRoleLabel(role)}
                  </label>
                ))}

                {errors.radios && (
                  <div className={style["project-response__form--error"]}>
                    {errors.radios}
                  </div>
                )}

                <div className={style["project-response__textarea-container"]}>
                  <Typography variant="h6" component="h2">
                    {t("respondModal.comment")}
                  </Typography>
                  <Field
                    as="textarea"
                    className={style["project-response__textarea"]}
                    name="comment"
                    id="comment"
                    placeholder={t("respondModal.commentPlaceholder")}
                    disabled={isSubmitting}
                  />
                </div>

                <Button
                  text={isSubmitting ? t("respondModal.submitting") : t("respondModal.submit")}
                  style="blue-button-header"
                  type="submit"
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
  },
);

ProjectResponseModal.displayName = "ProjectResponseModal";

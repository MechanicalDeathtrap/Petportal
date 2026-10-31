import style from "../create-project/create-project.module.sass";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Button } from "../../button/button.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API_BASE_URL, API_BASE_PATH } from "../../../config/api";
import axios from "axios";
import { Project, StateOfProject } from "../../../types/project-type.ts";
import {
  getMaxApplyingDeadline,
  getMaxApplyingDeadlineMessage,
  toDateInputValue,
} from "../../../utils/applying-deadline.ts";

const toDateInput = (value?: string) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
};

type EditErrorKey =
  | "projects.archive.failed"
  | "projects.edit.loadFailed"
  | "projects.edit.saveFailed";

export const EditProject = () => {
  const { t } = useTranslation();
  const { projectId } = useParams() as { projectId: string };
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  // храним ключ, а не текст: сообщение переведётся и при смене языка
  const [error, setError] = useState<EditErrorKey | null>(null);
  const [loading, setLoading] = useState(true);
  const [isArchiving, setIsArchiving] = useState(false);

  const archiveProject = async () => {
    if (!window.confirm(t("projects.archive.confirm"))) {
      return;
    }

    setError(null);
    setIsArchiving(true);
    try {
      await axios.post(
        `${API_BASE_URL}${API_BASE_PATH}/Projects/${projectId}/archive`,
        null,
        { withCredentials: true },
      );
      navigate(`/projects/${projectId}`);
    } catch (e) {
      console.error(e);
      setError("projects.archive.failed");
    } finally {
      setIsArchiving(false);
    }
  };

  useEffect(() => {
    axios
      .get<Project>(`${API_BASE_URL}${API_BASE_PATH}/Projects/${projectId}`, {
        withCredentials: true,
      })
      .then((res) => setProject(res.data))
      .catch(() => setError("projects.edit.loadFailed"))
      .finally(() => setLoading(false));
  }, [projectId]);

  if (loading) return <section className={style["create-project"]}><div><p>{t("common.loading")}</p></div></section>;
  if (!project) {
    return (
      <section className={style["create-project"]}>
        <div>
          <p>{t(error ?? "projects.edit.notFound")}</p>
          <Button text={t("common.back")} style="grey-button" type="button" onClick={() => navigate(-1)} />
        </div>
      </section>
    );
  }

  const initialValues = {
    name: project.name || "",
    description: project.description || "",
    teamDescription: project.teamDescription || "",
    requirements: project.requirements || "",
    result: project.result || "",
    plan: project.plan || "",
    budget: project.budget ?? 0,
    isBusinessProject: project.isBusinessProject ?? false,
    applyingDeadline: toDateInput(project.applyingDeadline),
    deadline: toDateInput(project.deadline),
  };

  // потолок отсчитывается от даты публикации объявления, а не от сегодняшнего дня
  const maxApplyingDeadline = getMaxApplyingDeadline(project.createdDate);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(8, t("projects.validation.nameMin"))
      .required(t("projects.validation.nameRequired")),
    description: Yup.string()
      .min(20, t("projects.validation.descriptionMin"))
      .required(t("projects.validation.descriptionRequired")),
    applyingDeadline: Yup.date()
      .max(maxApplyingDeadline, getMaxApplyingDeadlineMessage)
      .required(t("projects.validation.applyingDeadlineRequired")),
    deadline: Yup.date()
      .min(Yup.ref("applyingDeadline"), t("projects.validation.deadlineAfterApplying"))
      .required(t("projects.validation.deadlineRequired")),
  });

  return (
    <section className={style["create-project"]}>
      <div>
        <h2>{t("projects.edit.heading")}</h2>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setError(null);
            try {
              await axios.put(
                `${API_BASE_URL}${API_BASE_PATH}/Projects/${projectId}`,
                {
                  id: projectId,
                  name: values.name,
                  description: values.description,
                  requirements: values.requirements,
                  teamDescription: values.teamDescription,
                  result: values.result,
                  plan: values.plan || "",
                  budget: Number(values.budget) || 0,
                  isBusinessProject: values.isBusinessProject,
                  deadline: values.deadline
                    ? new Date(values.deadline).toISOString()
                    : null,
                  applyingDeadline: values.applyingDeadline
                    ? new Date(values.applyingDeadline).toISOString()
                    : null,
                },
                { withCredentials: true },
              );
              navigate(`/projects/${projectId}`);
            } catch (e) {
              console.error(e);
              setError("projects.edit.saveFailed");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, values, setFieldValue, isSubmitting }) => (
            <Form className={style["create-project__form"]}>
              <label>
                {t("projects.form.name")}
                <Field name="name" className={style["create-project__form-field"]} />
                {errors.name && touched.name && (
                  <div className={style["create-project__form--error-no-floating"]}>{errors.name}</div>
                )}
              </label>
              <label>
                {t("projects.form.description")}
                <Field as="textarea" name="description" className={style["create-project__form-field"]} />
                {errors.description && touched.description && (
                  <div className={style["create-project__form--error-no-floating"]}>{errors.description}</div>
                )}
              </label>
              <label>
                {t("projects.form.teamDescription")}
                <Field as="textarea" name="teamDescription" className={style["create-project__form-field"]} />
              </label>
              <label>
                {t("projects.form.requirements")}
                <Field as="textarea" name="requirements" className={style["create-project__form-field"]} />
              </label>
              <label>
                {t("projects.form.result")}
                <Field as="textarea" name="result" className={style["create-project__form-field"]} />
              </label>
              <label>
                {t("projects.form.applyingDeadline")}
                <Field
                  type="date"
                  name="applyingDeadline"
                  max={toDateInputValue(maxApplyingDeadline)}
                  className={style["create-project__form-field"]}
                />
              </label>
              <label>
                {t("projects.form.deadline")}
                <Field type="date" name="deadline" className={style["create-project__form-field"]} />
              </label>
              <label>
                {t("projects.form.budget")}
                <Field
                  type="number"
                  name="budget"
                  className={style["create-project__form-field"]}
                  disabled={values.isBusinessProject}
                />
                <div className={style["create-project__form-checkbox"]}>
                  <Field
                    type="checkbox"
                    name="isBusinessProject"
                    checked={values.isBusinessProject}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("isBusinessProject", e.target.checked);
                      if (e.target.checked) setFieldValue("budget", 0);
                    }}
                  />
                  <label>{t("projects.form.negotiable")}</label>
                </div>
              </label>

              {error && (
                <div className={style["create-project__form--error-no-floating"]} role="alert">
                  {t(error)}
                </div>
              )}

              <div className={style["create-project__form-button"]}>
                <Button
                  type="button"
                  style="grey-button"
                  text={t("projects.edit.cancel")}
                  onClick={() => navigate(`/projects/${projectId}`)}
                />
                {project.stateOfProject !== StateOfProject.Archived && (
                  <Button
                    type="button"
                    style="grey-button"
                    text={isArchiving ? t("projects.archive.inProgress") : t("projects.archive.action")}
                    onClick={archiveProject}
                    disabled={isArchiving || isSubmitting}
                  />
                )}
                <Button
                  type="submit"
                  style="blue-button-header"
                  text={isSubmitting ? t("common.saving") : t("common.save")}
                  disabled={isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

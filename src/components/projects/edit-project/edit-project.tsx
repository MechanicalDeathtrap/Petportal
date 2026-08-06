import style from "../create-project/create-project.module.sass";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Button } from "../../button/button.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL, API_BASE_PATH } from "../../../config/api";
import axios from "axios";
import { Project } from "../../../types/project-type.ts";

const toDateInput = (value?: string) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
};

export const EditProject = () => {
  const { projectId } = useParams() as { projectId: string };
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Project>(`${API_BASE_URL}${API_BASE_PATH}/Projects/${projectId}`, {
        withCredentials: true,
      })
      .then((res) => setProject(res.data))
      .catch(() => setError("Не удалось загрузить проект"))
      .finally(() => setLoading(false));
  }, [projectId]);

  if (loading) return <section className={style["create-project"]}><div><p>Загрузка...</p></div></section>;
  if (!project) {
    return (
      <section className={style["create-project"]}>
        <div>
          <p>{error || "Проект не найден"}</p>
          <Button text="Назад" style="grey-button" type="button" onClick={() => navigate(-1)} />
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

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(8, "Минимум 8 символов").required("Введите название"),
    description: Yup.string().min(20, "Опишите подробнее").required("Введите описание"),
    applyingDeadline: Yup.date().required("Укажите срок приёма заявок"),
    deadline: Yup.date()
      .min(Yup.ref("applyingDeadline"), "Срок выполнения должен быть позже")
      .required("Укажите срок выполнения"),
  });

  return (
    <section className={style["create-project"]}>
      <div>
        <h2>Редактирование проекта</h2>
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
              setError("Не удалось сохранить изменения");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, values, setFieldValue, isSubmitting }) => (
            <Form className={style["create-project__form"]}>
              <label>
                Название проекта
                <Field name="name" className={style["create-project__form-field"]} />
                {errors.name && touched.name && (
                  <div className={style["create-project__form--error-no-floating"]}>{errors.name}</div>
                )}
              </label>
              <label>
                Описание задания
                <Field as="textarea" name="description" className={style["create-project__form-field"]} />
                {errors.description && touched.description && (
                  <div className={style["create-project__form--error-no-floating"]}>{errors.description}</div>
                )}
              </label>
              <label>
                Описание команды
                <Field as="textarea" name="teamDescription" className={style["create-project__form-field"]} />
              </label>
              <label>
                Ожидание от исполнителя
                <Field as="textarea" name="requirements" className={style["create-project__form-field"]} />
              </label>
              <label>
                Формат результата
                <Field as="textarea" name="result" className={style["create-project__form-field"]} />
              </label>
              <label>
                Крайний срок приёма заявок
                <Field type="date" name="applyingDeadline" className={style["create-project__form-field"]} />
              </label>
              <label>
                Сроки выполнения
                <Field type="date" name="deadline" className={style["create-project__form-field"]} />
              </label>
              <label>
                Бюджет проекта
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
                  <label>По договорённости</label>
                </div>
              </label>

              {error && (
                <div className={style["create-project__form--error-no-floating"]} role="alert">
                  {error}
                </div>
              )}

              <div className={style["create-project__form-button"]}>
                <Button
                  type="button"
                  style="grey-button"
                  text="Отмена"
                  onClick={() => navigate(`/projects/${projectId}`)}
                />
                <Button
                  type="submit"
                  style="blue-button-header"
                  text={isSubmitting ? "Сохраняем..." : "Сохранить"}
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

import style from "./create-project.module.sass"
import { Field, Form, Formik} from "formik";
import {StateOfProject, Project} from "../../../types/project-type"
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Button } from "../../button/button.tsx";
import { TagsInput } from "../../tags-input/tags-input.tsx";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, API_BASE_PATH } from "../../../config/api";
import { groupRoleNames } from "../../../data/role-categories.ts";

type CatalogueRole = { id: string; name: string };

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const formatDateInput = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const defaultApplyingDeadline = () => {
  const d = startOfToday();
  d.setDate(d.getDate() + 7);
  return formatDateInput(d);
};

const defaultDeadline = () => {
  const d = startOfToday();
  d.setDate(d.getDate() + 30);
  return formatDateInput(d);
};

type PlacementQuota = {
  projectsCount: number;
  freeProjectsLimit: number;
  freeProjectsRemaining: number;
  nextProjectRequiresPayment: boolean;
};

export const CreateProject = () => {
  const [charCounts, setCharCounts] = useState<Record<string, number>>({
    name: 0,
    description: 0,
    teamDescription: 0,
    requirements: 0,
    result: 0,
  })

  const [inputTag, setInputTag] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const stackTags = ["Node.js", "React", "TypeScript", "Python", "Sass"];

  const [inputExecutor, setInputExecutor] = useState("");
  const [suggestionsExecutors, setSuggestionsExecutors] = useState<string[]>([]);
  const [catalogueRoles, setCatalogueRoles] = useState<CatalogueRole[]>([]);
  const [quota, setQuota] = useState<PlacementQuota | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate()

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}${API_BASE_PATH}/Roles/AllRoles`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : []))
      .then((roles: CatalogueRole[]) => setCatalogueRoles(Array.isArray(roles) ? roles : []))
      .catch(() => setCatalogueRoles([]));

    fetch(`${API_BASE_URL}${API_BASE_PATH}/Projects/quota`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data) return;
        setQuota({
          projectsCount: data.projectsCount ?? data.ProjectsCount ?? 0,
          freeProjectsLimit: data.freeProjectsLimit ?? data.FreeProjectsLimit ?? 5,
          freeProjectsRemaining: data.freeProjectsRemaining ?? data.FreeProjectsRemaining ?? 0,
          nextProjectRequiresPayment:
            data.nextProjectRequiresPayment ?? data.NextProjectRequiresPayment ?? false,
        });
      })
      .catch(() => setQuota(null));
  }, []);

  const executorSuggestions = catalogueRoles.length > 0
    ? catalogueRoles.map((r) => r.name)
    : ["Backend Developer", "Frontend Developer", "Fullstack Developer", "QA Engineer"];

  const initialValues: Project = {
    id: "",
    name: "",
    description: "",
    requirements: "",
    teamDescription: "",
    plan: "",
    result: "",
    ownerId: "",
    ownerName: "",
    deadline: defaultDeadline(),
    applyingDeadline: defaultApplyingDeadline(),
    stateOfProject: StateOfProject.Open,
    isBusinessProject: false,
    avatarImageBase64: "",
    avatarUrl: "",
    budget: 0,
    tags: [],
    executors: [],
    requiredRoles: []
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(8, "Название должно содержать минимум 8 символов")
      .required("Введите название проекта"),

    description: Yup.string()
      .min(20, "Опишите проект более подробно!")
      .required("Введите описание проекта"),

    teamDescription: Yup.string().nullable().notRequired(),
    requirements: Yup.string().nullable().notRequired(),
    result: Yup.string().nullable().notRequired(),

    budget: Yup.number()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? undefined : value
      )
      .notRequired()
      .min(0, "Бюджет не может быть отрицательным")
      .test(
        "no-leading-zero",
        "Бюджет не должен начинаться с нуля",
        function (value) {
          if (value === undefined || value === null) return true;
          const original = this.originalValue?.toString();
          return !/^0\d+/.test(original);
        }
      ),

    tags: Yup.array().of(Yup.string()),
    executors: Yup.array().of(Yup.string()).min(1, "Добавьте хотя бы одного исполнителя"),

    applyingDeadline: Yup.date()
      .typeError("Укажите крайний срок приёма заявок")
      .min(startOfToday(), "Дата не может быть в прошлом")
      .required("Укажите крайний срок приёма заявок"),

    deadline: Yup.date()
      .typeError("Укажите срок выполнения")
      .min(Yup.ref("applyingDeadline"), "Срок выполнения должен быть позже срока приёма заявок")
      .required("Укажите срок выполнения"),
  });

  const handleCharCount = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const value = e.target.value;
    setCharCounts(prev => ({ ...prev, [fieldName]: value.length }));
    setFieldValue(fieldName, value);
  }

  const showError = (errors: Record<string, unknown>, touched: Record<string, unknown>, submitCount: number, field: string) =>
    Boolean((touched[field] || submitCount > 0) && errors[field]);

const handleSubmit = async (values: Project, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
  setIsSubmitting(true);
  setSubmitError(null);

  try {
    const requiredRoles = values.executors.map((executor) => {
      const match = catalogueRoles.find(
        (r) => r.name.toLowerCase() === executor.toLowerCase(),
      );
      return {
        roleId: match?.id ?? "00000000-0000-0000-0000-000000000000",
        systemRoleName: match?.name ?? executor,
        customRoleName: executor,
      };
    });

    const payload = {
      name: values.name,
      description: values.description,
      requirements: values.requirements || null,
      teamDescription: values.teamDescription || null,
      plan: values.plan || "",
      result: values.result || null,
      deadline: values.deadline ? new Date(values.deadline).toISOString() : undefined,
      applyingDeadline: values.applyingDeadline ? new Date(values.applyingDeadline).toISOString() : undefined,
      tags: values.tags.map(tag => ({
        id: crypto.randomUUID(),
        name: tag
      })),
      requiredRoles,
      isBusinesProject: values.isBusinessProject,
      budget: Number(values.budget) || 0,
    };

    const response = await fetch(`${API_BASE_URL}${API_BASE_PATH}/Projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include"
    });

    if (!response.ok) {
      const bodyText = await response.text();
      let message = `Не удалось создать проект (ошибка ${response.status}).`;
      if (bodyText.includes("лимит")) {
        message = "Вы превысили лимит проектов.";
      } else if (response.status === 401) {
        message = "Нужна авторизация. Войдите в аккаунт и попробуйте снова.";
      }
      throw new Error(message);
    }

    const data = await response.json() as {
      projectId?: string;
      paymentUrl?: string | null;
      requiresPayment?: boolean;
      ProjectId?: string;
      PaymentUrl?: string | null;
      RequiresPayment?: boolean;
    };
    const paymentUrl = data.paymentUrl ?? data.PaymentUrl;
    const requiresPayment = data.requiresPayment ?? data.RequiresPayment ?? Boolean(paymentUrl);
    if (requiresPayment && paymentUrl) {
      window.location.href = paymentUrl;
      return;
    }

    handleCreateProjectSuccess();

  } catch (error) {
    console.error("Ошибка при создании проекта:", error);
    setSubmitError(error instanceof Error ? error.message : "Не удалось создать проект. Проверьте данные и попробуйте снова.");
  } finally {
    setSubmitting(false);
    setIsSubmitting(false);
  }
};

  const handleCreateProjectSuccess = () =>{
    navigate("/create-project-success")
  }

  return (
    <section className={style["create-project"]}>
      <div>
        <h2>Публикация проекта</h2>
        {quota && (
          <p className={style["create-project__quota"]}>
            {quota.nextProjectRequiresPayment
              ? `Бесплатный лимит исчерпан (${quota.freeProjectsLimit}/${quota.freeProjectsLimit}). Следующее размещение — платное.`
              : `Бесплатных размещений осталось: ${quota.freeProjectsRemaining} из ${quota.freeProjectsLimit}`}
          </p>
        )}
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          validateOnBlur
          validateOnChange={false}
        >
          {({ errors, touched, setFieldValue, values, submitCount }) => (
            <Form className={style["create-project__form"]}>
              <label>
                Название проекта
                <Field maxlength={100} name="name" placeholder="Кратко опишите задачу" className={style["create-project__form-field"]}
                       onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                         handleCharCount(e, "name", setFieldValue)
                       }/>
                {showError(errors as any, touched as any, submitCount, "name") && (
                  <div className={style["create-project__form--error-no-floating"]}>{errors.name}</div>
                )}
                <span className={style["create-project__form-chars-number"]}>{charCounts["name"]} / 100</span>
              </label>

              <label>
                Описание задания
                <Field maxlength={300} as="textarea" name="description" placeholder="Развернуто опишите задачу"
                       className={style["create-project__form-field"]}
                       onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                         handleCharCount(e, "description", setFieldValue)
                       }/>
                {showError(errors as any, touched as any, submitCount, "description") && (
                  <div className={style["create-project__form--error-no-floating"]}>{errors.description}</div>
                )}
                <span className={style["create-project__form-chars-number"]}>{charCounts["description"]} / 300</span>
              </label>

              <label>
                Теги
                <p className={style["create-project__field-description"]}>Укажите теги, которые характеризуют ваш проект</p>
                <TagsInput
                  availableTags= {stackTags}
                  name="tags"
                  inputTag={inputTag}
                  setInputTag={setInputTag}
                  suggestions={suggestions}
                  setSuggestions={setSuggestions}
                  error={
                    (touched.tags || submitCount > 0) && errors.tags
                      ? (errors.tags as string)
                      : ""
                  }
                />
              </label>

              <label>
                Исполнители
                <p className={style["create-project__field-description"]}>Укажите, кого вы ищите</p>
                <TagsInput
                  availableTags={executorSuggestions}
                  groupSuggestions={groupRoleNames}
                  name="executors"
                  inputTag={inputExecutor}
                  setInputTag={setInputExecutor}
                  suggestions={suggestionsExecutors}
                  setSuggestions={setSuggestionsExecutors}
                  error={
                    (touched.executors || submitCount > 0) && errors.executors
                      ? (errors.executors as string)
                      : ""
                  }
                />
              </label>

              <label>
                Описание команды
                <Field maxlength={300} as="textarea" name="teamDescription" placeholder="Опишите состав и формат работы команды"
                       className={style["create-project__form-field"]}
                       onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                         handleCharCount(e, "teamDescription", setFieldValue)
                       } />
                {showError(errors as any, touched as any, submitCount, "teamDescription") && (
                  <div className={style["create-project__form--error-no-floating"]}>{errors.teamDescription}</div>
                )}
                <span className={style["create-project__form-chars-number"]}>{charCounts["teamDescription"]} / 300</span>
              </label>

              <label>
                Ожидание от исполнителя
                <Field maxlength={300} as="textarea" name="requirements"
                       placeholder="Опишите, какими компетенциями должен обладать исполнитель"
                       className={style["create-project__form-field"]}
                       onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                         handleCharCount(e, "requirements", setFieldValue)
                       }/>
                {showError(errors as any, touched as any, submitCount, "requirements") && (
                  <div className={style["create-project__form--error-no-floating"]}>{errors.requirements}</div>
                )}
                <span className={style["create-project__form-chars-number"]}>{charCounts["requirements"]} / 300</span>
              </label>

              <label>
                Формат результата
                <Field maxlength={300} as="textarea" name="result"
                       placeholder="Опишите, в каком виде вы хотите получить результат"
                       className={style["create-project__form-field"]}
                       onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                         handleCharCount(e, "result", setFieldValue)
                       }/>
                {showError(errors as any, touched as any, submitCount, "result") && (
                  <div className={style["create-project__form--error-no-floating"]}>{errors.result}</div>
                )}
                <span className={style["create-project__form-chars-number"]}>{charCounts["result"]} / 300</span>
              </label>

              <label>
                Крайний срок приёма заявок
                <Field type="date" name="applyingDeadline" className={style["create-project__form-field create-project__date-input"]}/>
                {showError(errors as any, touched as any, submitCount, "applyingDeadline") && (
                  <div className={style["create-project__form--error-no-floating"]}>{errors.applyingDeadline}</div>
                )}
              </label>

              <label>
                Сроки выполнения
                <Field type="date" name="deadline" className={style["create-project__form-field create-project__date-input"]}/>
                {showError(errors as any, touched as any, submitCount, "deadline") && (
                  <div className={style["create-project__form--error-no-floating"]}>{errors.deadline}</div>
                )}
              </label>

              <label>
                Бюджет проекта
                <Field
                  type="number"
                  name="budget"
                  placeholder="100₽"
                  min={0}
                  className={style["create-project__form-field"]}
                  disabled={values.isBusinessProject}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    let value = e.target.value;
                    if (/^0\d+/.test(value)) {
                      value = value.replace(/^0+/, '');
                    }
                    setFieldValue("budget", value);
                  }}
                />
                {showError(errors as any, touched as any, submitCount, "budget") && (
                  <div className={style["create-project__form--error-no-floating"]}>{errors.budget}</div>
                )}
                <div className={style["create-project__form-checkbox"]}>
                  <Field
                    type="checkbox"
                    name="isBusinessProject"
                    checked={values.isBusinessProject}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("isBusinessProject", e.target.checked);
                      if (e.target.checked) setFieldValue("budget", "");
                    }}
                  />
                  <label>По договорённости</label>
                </div>
              </label>

              {submitError && (
                <div className={style["create-project__form--error-no-floating"]} role="alert">
                  {submitError}
                </div>
              )}

              <div className={style["create-project__form-button"]}>
                <Button
                  type="submit"
                  style="blue-button-header"
                  text={isSubmitting ? "Публикуем..." : "Опубликовать"}
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

import style from "./create-project.module.sass"
import { Field, Form, Formik} from "formik";
import {StateOfProject, Project} from "../../../types/project-type"
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Button } from "../../button/button.tsx";
import { TagsInput } from "../../tags-input/tags-input.tsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API_BASE_URL, API_BASE_PATH } from "../../../config/api";
import {
  getRoleGroupLabel,
  getRoleLabel,
  groupRoleNames,
} from "../../../data/role-categories.ts";
import {
  getMaxApplyingDeadline,
  getMaxApplyingDeadlineMessage,
  toDateInputValue,
} from "../../../utils/applying-deadline.ts";

type CatalogueRole = { id: string; name: string };

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const formatDateInput = toDateInputValue;

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
  const { t } = useTranslation();
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
    createdDate: null,
    budget: 0,
    tags: [],
    executors: [],
    requiredRoles: []
  };

  // объявление публикуется сегодня, значит потолок — сегодня + 2 месяца
  const maxApplyingDeadline = getMaxApplyingDeadline();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(8, t("projects.validation.nameMin"))
      .required(t("projects.validation.nameRequired")),

    description: Yup.string()
      .min(20, t("projects.validation.descriptionMin"))
      .required(t("projects.validation.descriptionRequired")),

    teamDescription: Yup.string().nullable().notRequired(),
    requirements: Yup.string().nullable().notRequired(),
    result: Yup.string().nullable().notRequired(),

    budget: Yup.number()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? undefined : value
      )
      .notRequired()
      .min(0, t("projects.validation.budgetNegative"))
      .test(
        "no-leading-zero",
        t("projects.validation.budgetLeadingZero"),
        function (value) {
          if (value === undefined || value === null) return true;
          const original = this.originalValue?.toString();
          return !/^0\d+/.test(original);
        }
      ),

    tags: Yup.array().of(Yup.string()),
    executors: Yup.array().of(Yup.string()).min(1, t("projects.validation.executorsMin")),

    applyingDeadline: Yup.date()
      .typeError(t("projects.validation.applyingDeadlineRequired"))
      .min(startOfToday(), t("projects.validation.dateInPast"))
      .max(maxApplyingDeadline, getMaxApplyingDeadlineMessage)
      .required(t("projects.validation.applyingDeadlineRequired")),

    deadline: Yup.date()
      .typeError(t("projects.validation.deadlineRequired"))
      .min(Yup.ref("applyingDeadline"), t("projects.validation.deadlineAfterApplying"))
      .required(t("projects.validation.deadlineRequired")),
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
      let message = t("projects.create.failedWithStatus", { status: response.status });
      // бэкенд сообщает о превышении лимита текстом на русском
      if (bodyText.includes("лимит")) {
        message = t("projects.create.limitExceeded");
      } else if (response.status === 401) {
        message = t("projects.create.authRequired");
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
    setSubmitError(error instanceof Error ? error.message : t("projects.create.failed"));
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
        <h2>{t("projects.create.heading")}</h2>
        {quota && (
          <p className={style["create-project__quota"]}>
            {quota.nextProjectRequiresPayment
              ? t("projects.create.quotaExhausted", { limit: quota.freeProjectsLimit })
              : t("projects.create.quotaRemaining", {
                  remaining: quota.freeProjectsRemaining,
                  limit: quota.freeProjectsLimit,
                })}
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
                {t("projects.form.name")}
                <Field maxlength={100} name="name" placeholder={t("projects.form.namePlaceholder")} className={style["create-project__form-field"]}
                       onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                         handleCharCount(e, "name", setFieldValue)
                       }/>
                {showError(errors as any, touched as any, submitCount, "name") && (
                  <div className={style["create-project__form--error-no-floating"]}>{errors.name}</div>
                )}
                <span className={style["create-project__form-chars-number"]}>{charCounts["name"]} / 100</span>
              </label>

              <label>
                {t("projects.form.description")}
                <Field maxlength={300} as="textarea" name="description" placeholder={t("projects.form.descriptionPlaceholder")}
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
                {t("projects.form.tags")}
                <p className={style["create-project__field-description"]}>{t("projects.form.tagsHint")}</p>
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
                {t("projects.form.executors")}
                <p className={style["create-project__field-description"]}>{t("projects.form.executorsHint")}</p>
                <TagsInput
                  availableTags={executorSuggestions}
                  groupSuggestions={groupRoleNames}
                  getLabel={getRoleLabel}
                  getGroupLabel={getRoleGroupLabel}
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
                {t("projects.form.teamDescription")}
                <Field maxlength={300} as="textarea" name="teamDescription" placeholder={t("projects.form.teamDescriptionPlaceholder")}
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
                {t("projects.form.requirements")}
                <Field maxlength={300} as="textarea" name="requirements"
                       placeholder={t("projects.form.requirementsPlaceholder")}
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
                {t("projects.form.result")}
                <Field maxlength={300} as="textarea" name="result"
                       placeholder={t("projects.form.resultPlaceholder")}
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
                {t("projects.form.applyingDeadline")}
                <Field
                  type="date"
                  name="applyingDeadline"
                  max={formatDateInput(maxApplyingDeadline)}
                  className={style["create-project__form-field create-project__date-input"]}
                />
                {showError(errors as any, touched as any, submitCount, "applyingDeadline") && (
                  <div className={style["create-project__form--error-no-floating"]}>{errors.applyingDeadline}</div>
                )}
              </label>

              <label>
                {t("projects.form.deadline")}
                <Field type="date" name="deadline" className={style["create-project__form-field create-project__date-input"]}/>
                {showError(errors as any, touched as any, submitCount, "deadline") && (
                  <div className={style["create-project__form--error-no-floating"]}>{errors.deadline}</div>
                )}
              </label>

              <label>
                {t("projects.form.budget")}
                <Field
                  type="number"
                  name="budget"
                  placeholder={t("projects.form.budgetPlaceholder")}
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
                  <label>{t("projects.form.negotiable")}</label>
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
                  text={isSubmitting ? t("projects.create.publishing") : t("projects.create.publish")}
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

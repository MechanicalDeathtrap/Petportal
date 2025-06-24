import style from "./create-project.module.sass"
import { Field, Form, Formik} from "formik";
import {StateOfProject, Project} from "../../../types/project-type"
import * as Yup from "yup";
import { useState } from "react";
import { Button } from "../../button/button.tsx";
import { TagsInput } from "../../tags-input/tags-input.tsx";

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
  const executorsTags = ["BackEnd-разработчик", "FrontEnd-разработчик"]

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
    deadline: "",
    applyingDeadline: "",
    stateOfProject: StateOfProject.Open,
    isBusinessProject: false,
    avatarImageBase64: "",
    budget: undefined,
    tags: [],
    executors: []
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(8, "Название должно содержать минимум 8 символов")
      .required("Введите название проекта"),

    description: Yup.string()
      .min(20, "Опишите проект более подробно!")
      .required("Введите описание проекта"),

    requirements: Yup.string()
      .min(20, "Опишите требования более подробно!")
      .required("Введите ваши ожидания от исполнителя"),

    teamDescription: Yup.string()
      .min(20, "Опишите состав исполнителей более подробно!")
      .required("Опишите кого вы ищите"),

    result: Yup.string()
      .min(10, "Опишите формат результата подробнее")
      .required("Опишите формат результата"),

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
          return !/^0\d+/.test(original); // отклоняем значения вроде 0123
        }
      ),

    tags: Yup.array().of(Yup.string()).min(1, "Добавьте хотя бы один тег"),
    executors: Yup.array().of(Yup.string()).min(1, "Добавьте хотя бы одного исполнителя"),

    applyingDeadline: Yup.date()
      .min(new Date(), "Дата не может быть в прошлом")
      .required("Укажите крайний срок приёма заявок"),

    deadline: Yup.date()
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

  const handleSubmit = () =>{

  }

  return (
    <section className={style["create-project"]}>
      <div>
        <h2>Публикация проекта</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched,  setFieldValue, values }) => (
            <Form className={style["create-project__form"]}>
              <label>
                Название проекта
                <Field maxlength={100} name="name" placeholder="Кратко опишите задачу" className={style["create-project__form-field"]}
                       onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                         handleCharCount(e, "name", setFieldValue)
                       }/>
                {errors.name && touched.name && (
                  <div style={{position:"relative"}}>
                  <div className={style["create-project__form--error"]}>{errors.name}</div>
                  </div>
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
                {errors.description && touched.description && (
                  <div style={{position:"relative"}}>
                  <div className={style["create-project__form--error"]}>{errors.description}</div>
                  </div>
                )}
                <span className={style["create-project__form-chars-number"]}>{charCounts["description"]} / 300</span>
              </label>

              <label>
                Теги
                <p className={style["create-project__field-description"]}>Укажите теги, которые характеризуют ваш проект</p>
                {/*<Field name="tags" placeholder="Например: NodeJS, React" />*/}
                <TagsInput
                  availableTags= {stackTags}
                  name="tags"
                  inputTag={inputTag}
                  setInputTag={setInputTag}
                  suggestions={suggestions}
                  setSuggestions={setSuggestions}
                  error={errors.tags && touched.tags ? errors.tags : ""}
                />

              </label>

              <label>
                Состав исполнителей
                <Field maxlength={300} as="textarea" name="teamDescription" placeholder="Напишите, кого вы ищите"
                       className={style["create-project__form-field"]}
                       onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                         handleCharCount(e, "teamDescription", setFieldValue)
                       } />
                {errors.teamDescription && touched.teamDescription && (
                  <div style={{ position: "relative" }}>
                    <div className={style["create-project__form--error"]}>{errors.teamDescription}</div>
                  </div>
                )}
                <span className={style["create-project__form-chars-number"]}>{charCounts["teamDescription"]} / 300</span>
              </label>

              <label>
                Исполнители
                <p className={style["create-project__field-description"]}>Укажите, кого вы ищите</p>
                <TagsInput
                  availableTags= {executorsTags}
                        name="executors"
                        inputTag={inputExecutor}
                        setInputTag={setInputExecutor}
                        suggestions={suggestionsExecutors}
                        setSuggestions={setSuggestionsExecutors}
                        error={
                         touched.executors && errors.executors
                             ? (errors.executors as string)
                               : ""
                           }
                        />
              </label>

              <label>
                Ожидание от исполнителя
                <Field maxlength={300} as="textarea" name="requirements"
                       placeholder="Опишите, какими компетенциями должен обладать исполнитель"
                       className={style["create-project__form-field"]}
                       onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                         handleCharCount(e, "requirements", setFieldValue)
                       }/>
                {errors.requirements && touched.requirements && (
                  <div style={{position:"relative"}}>
                  <div className={style["create-project__form--error"]}>{errors.requirements}</div>
                  </div>
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
                {errors.result && touched.result && (
                  <div style={{position:"relative"}}>
                  <div className={style["create-project__form--error"]}>{errors.result}</div>
                  </div>
                )}
                <span className={style["create-project__form-chars-number"]}>{charCounts["result"]} / 300</span>
              </label>

              <label>
                Крайний срок приёма заявок
                <Field type="date" name="applyingDeadline" className={style["create-project__form-field"]}/>
                {errors.applyingDeadline && touched.applyingDeadline && (
                  <div style={{position:"relative"}}>
                    <div className={style["create-project__form--error"]}>{errors.applyingDeadline}</div>
                  </div>

                )}
              </label>

              <label>
                Сроки выполнения
                <Field type="date" name="deadline" className={style["create-project__form-field"]}/>
                {errors.deadline && touched.deadline && (
                  <div style={{position:"relative"}}>
                  <div className={style["create-project__form--error"]}>{errors.deadline}</div>
                  </div>
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
                    // Если начинается с 0 и длина больше 1, убираем ведущий ноль
                    if (/^0\d+/.test(value)) {
                      value = value.replace(/^0+/, '');
                    }
                    setFieldValue("budget", value);
                  }}
                />
                {errors.budget && touched.budget && (
                  <div style={{position:"relative"}}>
                  <div className={style["create-project__form--error-no-floating"]}>{errors.budget}</div>
                  </div>
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

              <div className={style["create-project__form-button"]}>
                <Button              type="submit"
                                     style="blue-button-header"
                                     text="Опубликовать"/>
              </div>

            </Form>
          )}
        </Formik>

      </div>
    </section>
  );
};

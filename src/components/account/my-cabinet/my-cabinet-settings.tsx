import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { userStore } from "../../../stores/user-store";
import { Button } from "../../button/button";
import style from "./my-cabinet.module.sass";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { CabinetSettings } from "../../../types/user-data";
import { Link, useNavigate } from "react-router-dom";

// Валидация формы
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Имя обязательно"),
  lastName: Yup.string().required("Фамилия обязательна"),
  country: Yup.string().required("Страна обязательна"),
  town: Yup.string().required("Город обязателен"),
  phoneNumber: Yup.string().optional(),
  telegram: Yup.string().optional(),
  education: Yup.array().of(
    Yup.object().shape({
      university: Yup.string().required("Укажите университет"),
      specialization: Yup.string().required("Укажите специальность"),
      releaseYear: Yup.number()
        .positive("Год должен быть положительным")
        .required("Укажите год выпуска"),
    }),
  ),
  experience: Yup.array().of(
    Yup.object().shape({
      workPlace: Yup.string().required("Укажите место работы"),
      workPosition: Yup.string().required("Укажите должность"),
      workYears: Yup.number()
        .positive("Количество лет должно быть положительным")
        .required("Укажите продолжительность"),
    }),
  ),
  stack: Yup.array().of(
    Yup.object().shape({
      programmingLanguage: Yup.string().required(
        "Укажите язык программирования",
      ),
      programmingLevel: Yup.string().required("Выберите уровень"),
      programmingYears: Yup.number()
        .positive("Количество лет должно быть положительным")
        .required("Укажите продолжительность"),
    }),
  ),
});

interface Props {
  onSave?: () => void;
}

export const MyCabinetSettings = observer(({ onSave }: Props) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<CabinetSettings | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  // Загрузка данных пользователя
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "/api/Authorization/me",
          {
            withCredentials: true,
          },
        );
        const data = response.data;

        const mapped: CabinetSettings = {
          id: data.id,
          avatarUrl: data.avatarUrl || "/img/blank-avatar.png",
          firstName: data.name.split(" ")[0] || "",
          lastName: data.name.split(" ")[1] || "",
          country: data.country || "",
          town: data.city || "",
          phoneNumber: data.phone || "",
          telegram: data.telegram || "",
          education: data.educations.map((edu: any) => ({
            id: edu.id || undefined,
            university: edu.university || "",
            specialization: edu.speciality || "",
            releaseYear: edu.releaseYear?.toString() || "",
            isActive: Boolean(edu.isActive),
          })),
          experience: data.experiences.map((exp: any) => ({
            id: exp.id || undefined,
            workPlace: exp.workPlace || "",
            workPosition: exp.workPosition || "",
            workYears: exp.workYears?.toString() || "",
            isActive: Boolean(exp.isActive),
          })),
          stack: data.stacks.map((stack: any) => ({
            id: stack.id || undefined,
            programmingLanguage: stack.programmingLanguage || "",
            programmingLevel: stack.programmingLevel?.toString() || "1",
            programmingYears: stack.programmingYears || 0,
            isActive: Boolean(stack.isActive),
          })),
        };

        setInitialData(mapped);
        setImagePreview(mapped.avatarUrl);
      } catch (err) {
        console.error("Ошибка загрузки профиля:", err);
      }
    };
    fetchUserData();
  }, []);

  if (!initialData) {
    return <div>Загрузка...</div>;
  }

  // Обработчик изменения аватара
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const res = await axios.post(
        `/api/Avatar/upload-avatar/${initialData.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      setInitialData({
        ...initialData,
        avatarUrl: res.data.url,
      });
    } catch (err) {
      console.error("Ошибка загрузки аватара:", err);
    }
  };

  // Подготовка данных для отправки
  const preparePayload = (values: CabinetSettings) => ({
    id: values.id,
    name: `${values.firstName} ${values.lastName}`.trim(),
    country: values.country,
    city: values.town,
    phone: values.phoneNumber,
    telegram: values.telegram,
    email: userStore.user.email,
    avatarUrl: values.avatarUrl,
    educations: values.education.map((edu) => ({
      id: edu.id,
      university: edu.university,
      speciality: edu.specialization,
      releaseYear: edu.releaseYear || 0,
      userId: values.id,
      isActive: Boolean(edu.isActive),
    })),
    experiences: values.experience.map((exp) => ({
      id: exp.id,
      workPlace: exp.workPlace,
      workPosition: exp.workPosition,
      workYears: exp.workYears || 0,
      userId: values.id,
      isActive: Boolean(exp.isActive),
    })),
    stacks: values.stack.map((stack) => ({
      id: stack.id,
      programmingLanguage: stack.programmingLanguage,
      programmingLevel: parseInt(stack.programmingLevel) || 0,
      programmingYears: parseInt(String(stack.programmingYears)) || 0,
      userId: values.id,
      isActive: Boolean(stack.isActive),
    })),
  });

  // Отправка данных
  const updateUserData = async (values: CabinetSettings) => {
    try {
      const payload = preparePayload(values);
      await axios.put(
        "/api/Authorization/ChangeProfileData",
        payload,
        {
          withCredentials: true,
        },
      );
      navigate("/account");
      if (onSave) onSave();
    } catch (err) {
      console.error("Ошибка при обновлении пользователя", err);
    }
  };

  return (
    <section>
      <Formik
        initialValues={initialData}
        onSubmit={updateUserData}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form className={style["my-cabinet"]}>
            {/* Личная информация */}
            <section
              className={`${style["my-cabinet__info-section"]} ${style["my-cabinet__flex"]}`}
            >
              <div className={style["my-cabinet__main-info-fields"]}>
                <h3>Личная информация</h3>
                <Field
                  name="firstName"
                  placeholder="Имя"
                  className={style["my-cabinet__form-field"]}
                />
                {errors.firstName && touched.firstName ? (
                  <div className={style["my-cabinet__form--error"]}>
                    {errors.firstName}
                  </div>
                ) : null}
                <Field
                  name="lastName"
                  placeholder="Фамилия"
                  className={style["my-cabinet__form-field"]}
                />
                {errors.lastName && touched.lastName ? (
                  <div className={style["my-cabinet__form--error"]}>
                    {errors.lastName}
                  </div>
                ) : null}
                <Field
                  name="country"
                  placeholder="Страна проживания"
                  className={style["my-cabinet__form-field"]}
                />
                {errors.country && touched.country ? (
                  <div className={style["my-cabinet__form--error"]}>
                    {errors.country}
                  </div>
                ) : null}
                <Field
                  name="town"
                  placeholder="Город проживания"
                  className={style["my-cabinet__form-field"]}
                />
                {errors.town && touched.town ? (
                  <div className={style["my-cabinet__form--error"]}>
                    {errors.town}
                  </div>
                ) : null}
              </div>
              <div className={style["my-cabinet__avatar-container"]}>
                <div
                  className={style["my-cabinet__avatar"]}
                  style={{ backgroundImage: `url(${imagePreview})` }}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleAvatarChange}
                />
                <button
                  className={style["my-cabinet__change-avatar-button"]}
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Загрузить фото
                </button>
              </div>
            </section>

            {/* Контактная информация */}
            <section className={style["my-cabinet__info-section"]}>
              <h3>Контактная информация</h3>
              <Field
                name="phoneNumber"
                type="tel"
                placeholder="Номер телефона"
                className={`${style["my-cabinet__form-field"]} ${style["my-cabinet__contact-field"]}`}
              />
              <Field
                name="telegram"
                placeholder="Telegram: @username"
                type="text"
                className={`${style["my-cabinet__form-field"]} ${style["my-cabinet__contact-field"]}`}
              />
            </section>

            {/* Образование */}
            <section className={style["my-cabinet__info-section"]}>
              <h3>Образование</h3>
              <FieldArray name="education">
                {({ push }) => {
                  const visibleEducations = values.education.filter(
                    (e) => e.isActive,
                  );
                  return (
                    <>
                      {visibleEducations.map((_) => {
                        const realIndex = values.education.findIndex(
                          (edu) => edu === _,
                        );
                        return (
                          <div
                            key={realIndex}
                            className={style["my-cabinet__added-fields"]}
                          >
                            <Field
                              name={`education[${realIndex}].university`}
                              placeholder="Вуз"
                              className={style["my-cabinet__form-field"]}
                            />
                            <Field
                              name={`education[${realIndex}].specialization`}
                              placeholder="Специальность"
                              className={style["my-cabinet__form-field"]}
                            />
                            <Field
                              name={`education[${realIndex}].releaseYear`}
                              placeholder="Год выпуска"
                              className={style["my-cabinet__form-field"]}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setFieldValue(
                                  `education[${realIndex}].isActive`,
                                  false,
                                )
                              }
                              className={style["my-cabinet__remove-button"]}
                            >
                              Удалить
                            </button>
                          </div>
                        );
                      })}
                      <button
                        className={style["my-cabinet__add-fields-button"]}
                        type="button"
                        onClick={() =>
                          push({
                            university: "",
                            specialization: "",
                            releaseYear: "",
                            isActive: true,
                          })
                        }
                      >
                        Добавить вуз
                      </button>
                    </>
                  );
                }}
              </FieldArray>
            </section>

            {/* Опыт работы */}
            <section className={style["my-cabinet__info-section"]}>
              <h3>Опыт работы</h3>
              <FieldArray name="experience">
                {({ push }) => {
                  const visibleExperiences = values.experience.filter(
                    (e) => e.isActive,
                  );
                  return (
                    <>
                      {visibleExperiences.map((_) => {
                        const realIndex = values.experience.findIndex(
                          (exp) => exp === _,
                        );
                        return (
                          <div
                            key={realIndex}
                            className={style["my-cabinet__added-fields"]}
                          >
                            <Field
                              name={`experience[${realIndex}].workPlace`}
                              placeholder="Место работы"
                              className={style["my-cabinet__form-field"]}
                            />
                            <Field
                              name={`experience[${realIndex}].workPosition`}
                              placeholder="Должность"
                              className={style["my-cabinet__form-field"]}
                            />
                            <Field
                              name={`experience[${realIndex}].workYears`}
                              placeholder="Продолжительность (в годах)"
                              type="number"
                              className={style["my-cabinet__form-field"]}
                              min="0"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setFieldValue(
                                  `experience[${realIndex}].isActive`,
                                  false,
                                )
                              }
                              className={style["my-cabinet__remove-button"]}
                            >
                              Удалить
                            </button>
                          </div>
                        );
                      })}
                      <button
                        className={style["my-cabinet__add-fields-button"]}
                        type="button"
                        onClick={() =>
                          push({
                            workPlace: "",
                            workPosition: "",
                            workYears: "",
                            isActive: true,
                          })
                        }
                      >
                        Добавить опыт работы
                      </button>
                    </>
                  );
                }}
              </FieldArray>
            </section>

            {/* Стек */}
            <section className={style["my-cabinet__info-section"]}>
              <h3>Мой стек</h3>
              <FieldArray name="stack">
                {({ push }) => {
                  const visibleStacks = values.stack.filter((s) => s.isActive);
                  return (
                    <>
                      {visibleStacks.map((_) => {
                        const realIndex = values.stack.findIndex(
                          (s) => s === _,
                        );
                        return (
                          <div
                            key={realIndex}
                            className={style["my-cabinet__added-fields"]}
                          >
                            <Field
                              name={`stack[${realIndex}].programmingLanguage`}
                              placeholder="Язык"
                              className={style["my-cabinet__form-field"]}
                            />
                            <Field
                              name={`stack[${realIndex}].programmingLevel`}
                              as="select"
                              className={style["my-cabinet__form-select"]}
                            >
                              <option value="1">Junior</option>
                              <option value="2">Junior+</option>
                              <option value="3">Middle</option>
                              <option value="4">Middle+</option>
                              <option value="5">Senior</option>
                            </Field>
                            <Field
                              name={`stack[${realIndex}].programmingYears`}
                              type="number"
                              placeholder="Продолжительность"
                              className={style["my-cabinet__form-field"]}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setFieldValue(
                                  `stack[${realIndex}].isActive`,
                                  false,
                                )
                              }
                              className={style["my-cabinet__remove-button"]}
                            >
                              Удалить
                            </button>
                          </div>
                        );
                      })}
                      <button
                        className={style["my-cabinet__add-fields-button"]}
                        type="button"
                        onClick={() =>
                          push({
                            programmingLanguage: "",
                            programmingLevel: "1",
                            programmingYears: 0,
                            isActive: true,
                          })
                        }
                      >
                        Добавить стек
                      </button>
                    </>
                  );
                }}
              </FieldArray>
            </section>

            {/* Кнопки управления */}
            <div className={style["my-cabinet__settings-buttons"]}>
              <Link to="/account">
                <Button
                  type="reset"
                  style="white-small-button"
                  text="Отменить"
                />
              </Link>
              <Button
                type="submit"
                style="blue-button-header"
                text="Сохранить"
              />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
});

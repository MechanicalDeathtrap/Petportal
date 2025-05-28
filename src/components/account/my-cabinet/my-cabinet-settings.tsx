import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { userStore } from "../../../stores/user-store.ts";
import { Button } from "../../button/button.tsx";
import style from "./my-cabinet.module.sass";
import { useRef, useState } from "react";
import axios from "axios";
import { CabinetSettings } from "../../../types/user-data.ts";
import { Link, useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  country: Yup.string().required("Country is required"),
  town: Yup.string().required("Town is required"),
});

export const MyCabinetSettings = observer(() => {
  const [imagePreview, setImagePreview] = useState(
    userStore.user.avatarUrl || "/img/blank-avatar.png",
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const user = userStore.user;
  const navigate = useNavigate();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      // TODO: отправить файл на сервер
    };
    reader.readAsDataURL(file);
  };

  const getChangedFields = <T extends Record<string, any>>(
    original: T,
    current: T,
  ): Partial<T> => {
    const changed: Partial<T> = {};

    (Object.keys(current) as (keyof T)[]).forEach((key) => {
      if (!(current[key] === original[key])) {
        changed[key] = current[key];
      }
    });
    return changed;
  };

  const initialValues: CabinetSettings = {
    id: user.id,
    avatarUrl: user.avatarUrl || "/img/blank-avatar.png",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    country: user.country || "",
    town: user.town || "",
    phoneNumber: user.phoneNumber || "",
    //email: user.email || "",
    telegram: user.telegram || "",
    education: user.education || [
      {
        university: "",
        specialization: "",
        releaseYear: "",
      },
    ],
    experience: user.experience || [
      {
        workPlace: "",
        workPosition: "",
        workYears: "",
      },
    ],
    stack: user.stack || [
      {
        programmingLanguage: "",
        programmingLevel: "1",
        programmingYears: 0,
      },
    ],
  };

  const updateUserData = async (values: CabinetSettings) => {
    const original = userStore.user;

    const payload = getChangedFields(original, values);
    if (Object.keys(payload).length === 0) {
      return;
    }
    try {
      const response = await axios.put(
        "http://localhost:5140/api/Authorization/me",
        payload,
        {
          withCredentials: true,
        },
      );
      userStore.setUser(response.data);
      console.log("Пользователь обновлён:", response.data);
      navigate("/account");
    } catch (err) {
      console.error("Ошибка при обновлении пользователя", err);
    }
  };

  return (
    <section>
      <Formik
        initialValues={initialValues}
        onSubmit={updateUserData}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched }) => (
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <rect
                      y="0.5"
                      width="23.25"
                      height="23.25"
                      fill="url(#pattern0_489_110)"
                    />
                    <defs>
                      <pattern
                        id="pattern0_489_110"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use href="#image0_489_110" transform="scale(0.01)" />
                      </pattern>
                      <image
                        id="image0_489_110"
                        width="100"
                        height="100"
                        preserveAspectRatio="none"
                        href="data:image/png;base64,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"
                      />
                    </defs>
                  </svg>
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
                {({ push, remove }) => (
                  <>
                    {values.education.map((_, index) => (
                      <div
                        key={index}
                        className={style["my-cabinet__added-fields"]}
                      >
                        <Field
                          name={`education[${index}].university`}
                          placeholder="Вуз"
                          className={style["my-cabinet__form-field"]}
                        />

                        <Field
                          name={`education[${index}].specialization`}
                          placeholder="Специальность"
                          className={style["my-cabinet__form-field"]}
                        />
                        <Field
                          name={`education[${index}].releaseYear`}
                          placeholder="Год выпуска"
                          className={style["my-cabinet__form-field"]}
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className={
                              style["my-cabinet__delete-added-fields-button"]
                            }
                          >
                            Удалить
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      className={style["my-cabinet__add-fields-button"]}
                      type="button"
                      onClick={() =>
                        push({
                          university: "",
                          specialization: "",
                          releaseYear: "",
                        })
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                      >
                        <rect
                          y="0.5"
                          width="20.25"
                          height="20.25"
                          fill="url(#pattern0_489_153)"
                        />
                        <defs>
                          <pattern
                            id="pattern0_489_153"
                            patternContentUnits="objectBoundingBox"
                            width="1"
                            height="1"
                          >
                            <use
                              href="#image0_489_153"
                              transform="scale(0.01)"
                            />
                          </pattern>
                          <image
                            id="image0_489_153"
                            width="100"
                            height="100"
                            preserveAspectRatio="none"
                            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHSUlEQVR4nO2da6hVRRSAv2uZr+xhiqKZ4p8sFPJV2kMtLay8YaG5SdQeZjfLzF76w15qdYvIJO1HIT0welkW/SkISrOHEURaViqavRSDW1F6zbITAyu4bNacu/c5e+8zs8/+YECO98ysmTl7z5q11qyBgoKCgoKC+qIr0B84FRgBXCBlhHzWX/6mIGE6A2OBxcAaYCOwFyhFLOZvN8h3F0ldps6CGJwJLJfBPxRj8KOWVql7mbRVoHAacB/wbQoT0F75DlgJDKv3mWkAGuXXWnKkbAQmi2x1Q0fgauCrCgasBdgMrAWagSXAbcBcKbfLZw8DLwCfynfitvMlMFtkzTUXAl9HHJS/gY+BR+RX26uKdntJHaauT6TuKDKYH80EcshA4LUIA/AP8Lb8Oo9LUZ7jpI13pM325FoHDCAnzAMOttPhH4A7gN41kM+0eSfwYzsyHgCa8JjjgZfa6eQOYIEje4OOwCxZP8rJvB7ogWecDewp06l9srC7qM10AK4RGcupyqPxhMtl82VbqFfK0+M63WRv9JelL2bTOh3HuQk4YunAN55uvoaX2bAekTXSSRaVecSfB47FX7rIk23rX7Nrr99lZR7rmeSHWWXsa0txhCaLgH8AF5E/xgO/WfpsNMaaMsWysdrr6XoRlSGyd9LWlGnUULXVHt+fgEHkn0HSV+01PSZrYU4AdivC/A6cQf0wxGK8/D7rzaO2Azf6+kTqj3GWfZexf2XCPMuCNoP6ZaZlTJqysNpqhkLjs653nrEYJE9Js9HXlUa3A93TbNQTull8Pa+k6VwKN3a4zhbx9hgmYxIeJxOilLhpepvS0KNJN5QDHlPGyZj0j06ykWuVRvZ5YrXNGuON/FkZr8RMSA0Wp42x6xRE/wFvS8oA2Wh5BJ2ybjro5NIW+EuSqFyLmzLePpfoI8UlrlPGzYS1Vh1RGK7UBAMcgzusbiPbKtyhk8XWNbiaSpcqFd6FO4xS5BuJ20474xauCLNG7AxVZkztfXGH6UqHXfJz91Vc2sYdXBFnKZ19F7cIFBnNZy7xniKjOccSm+VKRXNwi8CDCZmryHh/EtrVEQcDxAIPJqSn8toyT00sOis2/s9xj8CDCTFsCcnYGjdac7zSURMG4xqBJxOySpHz3GrVtam4R+DJhFypyGkCvCOzRqkgVUdLzidkgCLn03Eq+CD05YNin3GNwJMJ6aB4Wt+PU0E48nsrbhJ4MiEoR/iMWSWyKzLcSeO6dZHAowlZH5Lz36jJDU5WOumS0c7XCdE0rUhmqMGW6O4sDIXTYpYViqwrKqjHtJ02zYqsJg1Iu4xUvnh3hib0Uo1K2m+BJZXatLRN4cIUBe3jwGSUpKR56PRWpT0z1hVNiDmcnxa9HZiIkssTor2y7iH7Ba+UcXnC1VeWtqibDAhpM7KGi3pF/omsFnVN7X0SNwk8UntXV6r2dpNNS9svvombBB5NyBuVbgxRsraZIC8XCTw2nZjonYq9heaY1lG4R+CRcbG1Gq+hZn538dxg4MmEDKzW/L7Ik44G9eKgGueJphV4MiGahnVO3DDIViXA2jUCTyZka0jGgzLGsdigqGm1SDDm+4T0SiIMyJa/xGT7cYnAgwlpSiq+Vwtk3oRbBB5MSPhNU6om7cgO5bVlVDhXmO54sHW/JIOtkRjUcIfvxR1GKfJlYSiMyuKkXlflDuzsd+zmgVUZmtDj0Mly+DOShTfukTbXFvfeDmqAc5RxixWLZWOyUvGupM9d54wOkmMylUOfDcrGxsWnxCWuV8briyRPLs9WGmipMh97nhMH7FXG66qkU2totxk8lWQjOeFxZZy2pPGKn6g0dCSukSznDLfcvHB+Wg2us6SzOymtBj2im2Uhfzntcw4HPArGzpLnlHH5U26Mq0me3vnUL7MtY2JO4GbCi0rjJqnAFdQf4y3pcl/NOk3sLkUI43g5j/phKPCrMg57anGEfIzll9EiguadQRZbVatkwagJl1lSjbfEPfabo1TjU2st3A2WBc1oY5dSX8n4b8ERtDROJdkkZaZpZMAMH66riHKhyzpRBHyli28XurRNQ267F3CnY8nFojK0zK2kpq834jhTytxb6NOlYF3F3Wp7RR2SiEQvGG25zsKHa/MaZK3Q8iX+X3bXUrWtxi+g7ejDeeMXVBLFl5KXr1EuNC4ns7HbnYjHNFkMkuGd7UJJ9pU1PcQOp1kewmq8UfFzQT+5Oq9ch0uySG4SVbl7ylpTo9xcYLs4sm15y7F4tMSYEOMe9cPAh8CDwMVVviaMyj0JeEAmPMok5Pr67rA7eHaFF9z/Anwkvodm2fvMl1zrptwsn5n/e1b+dn8F7dTNBfdhbaZRfrElR8pncsmAi7nBMuV00fm312AS9sjeyPjDC5SnZgzwkKwf2m011Za2a5M3V3C7FDgwUbIRrQU2W+4NtJUW+c5aSW0xwbG45NzQUxxEJtJ9rGhQk+TfI+T/ikiYgoKCggLqif8AwFwGoCROnx8AAAAASUVORK5CYII="
                          />
                        </defs>
                      </svg>
                      Добавить вуз
                    </button>
                  </>
                )}
              </FieldArray>
            </section>

            {/* Опыт работы */}
            <section className={style["my-cabinet__info-section"]}>
              <h3>Опыт работы</h3>
              <FieldArray name="experience">
                {({ push, remove }) => (
                  <>
                    {values.experience.map((_, index) => (
                      <div
                        key={index}
                        className={style["my-cabinet__added-fields"]}
                      >
                        <Field
                          name={`experience[${index}].workPlace`}
                          placeholder="Место работы"
                          className={style["my-cabinet__form-field"]}
                        />
                        <Field
                          name={`experience[${index}].workPosition`}
                          placeholder="Должность"
                          className={style["my-cabinet__form-field"]}
                        />
                        <Field
                          name={`experience[${index}].workYears`}
                          placeholder="Продолжительность"
                          className={style["my-cabinet__form-field"]}
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className={
                              style["my-cabinet__delete-added-fields-button"]
                            }
                          >
                            Удалить
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      className={style["my-cabinet__add-fields-button"]}
                      type="button"
                      onClick={() =>
                        push({ workPlace: "", workPosition: "", workYears: "" })
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                      >
                        <rect
                          y="0.5"
                          width="20.25"
                          height="20.25"
                          fill="url(#pattern0_489_153)"
                        />
                        <defs>
                          <pattern
                            id="pattern0_489_153"
                            patternContentUnits="objectBoundingBox"
                            width="1"
                            height="1"
                          >
                            <use
                              href="#image0_489_153"
                              transform="scale(0.01)"
                            />
                          </pattern>
                          <image
                            id="image0_489_153"
                            width="100"
                            height="100"
                            preserveAspectRatio="none"
                            href="data:image/png;base64,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"
                          />
                        </defs>
                      </svg>
                      Добавить опыт работы
                    </button>
                  </>
                )}
              </FieldArray>
            </section>

            {/* Стек */}
            <section className={style["my-cabinet__info-section"]}>
              <h3>Мой стек</h3>
              <FieldArray name="stack">
                {({ push, remove }) => (
                  <>
                    {values.stack.map((_, index) => (
                      <div
                        key={index}
                        className={style["my-cabinet__added-fields"]}
                      >
                        <Field
                          name={`stack[${index}].programmingLanguage`}
                          placeholder="Язык"
                          className={style["my-cabinet__form-field"]}
                        />
                        <Field
                          name={`stack[${index}].programmingLevel`}
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
                          name={`stack[${index}].programmingYears`}
                          type="number"
                          placeholder="Продолжительность"
                          className={style["my-cabinet__form-field"]}
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className={
                              style["my-cabinet__delete-added-fields-button"]
                            }
                          >
                            Удалить
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      className={style["my-cabinet__add-fields-button"]}
                      type="button"
                      onClick={() =>
                        push({
                          programmingLanguage: "",
                          programmingLevel: "1",
                          programmingYears: 0,
                        })
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                      >
                        <rect
                          y="0.5"
                          width="20.25"
                          height="20.25"
                          fill="url(#pattern0_489_153)"
                        />
                        <defs>
                          <pattern
                            id="pattern0_489_153"
                            patternContentUnits="objectBoundingBox"
                            width="1"
                            height="1"
                          >
                            <use
                              href="#image0_489_153"
                              transform="scale(0.01)"
                            />
                          </pattern>
                          <image
                            id="image0_489_153"
                            width="100"
                            height="100"
                            preserveAspectRatio="none"
                            href="data:image/png;base64,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"
                          />
                        </defs>
                      </svg>
                      Добавить стек
                    </button>
                  </>
                )}
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

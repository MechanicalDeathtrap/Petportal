import style from "./my-cabinet.module.sass";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { UserData } from "../../../types/user-data.ts";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react";
import { MyCabinetSettings } from "./my-cabinet-settings.tsx";
import axios from "axios";
import { API_BASE_URL, API_BASE_PATH } from "../../../config/api";

export const MyCabinet = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [avatarBlobUrl, setAvatarBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!userData?.avatarUrl) return;

    axios
      .get(`${API_BASE_URL}${API_BASE_PATH}/Avatar/download/${userData.avatarUrl}`, {
        responseType: "blob",
        withCredentials: true,
      })
      .then((res) => {
        const imageUrl = URL.createObjectURL(res.data);
        setAvatarBlobUrl(imageUrl);
      })
      .catch((err) => {
        console.error("Ошибка загрузки аватара:", err);
        setAvatarBlobUrl("/img/blank-avatar.png"); // fallback
      });
  }, [userData?.avatarUrl]);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}${API_BASE_PATH}/Authorization/me`,
        {
          withCredentials: true,
        },
      );

      const dto = res.data;

      const mapped: UserData = {
        id: dto.id,
        avatarUrl: dto.avatarUrl,
        firstName: dto.name.split(" ")[0],
        lastName: dto.name.split(" ")[1] ?? "",
        country: dto.country,
        town: dto.city,
        phoneNumber: dto.phone,
        email: dto.email,
        telegram: dto.telegram,
        education: dto.educations.map((e: any) => ({
          university: e.university,
          specialization: e.speciality,
          releaseYear: e.releaseYear,
        })),
        experience: dto.experiences.map((e: any) => ({
          workPlace: e.workPlace,
          workPosition: e.workPosition,
          workYears: e.workYears,
        })),
        stack: dto.stacks.map((s: any) => ({
          programmingLanguage: s.programmingLanguage,
          programmingLevel: s.programmingLevel.toString(),
          programmingYears: s.programmingYears,
        })),
      };

      setUserData(mapped);
    } catch (err) {
      console.error("Ошибка загрузки профиля:", err);
    }
  };

  useEffect(() => {
    console.log(userData?.id);
    fetchUserData();
  }, []);

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
  };

    const handleSettingsClose = () => {
    setSettingsOpen(false);
  };

  if (!userData) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      {!isSettingsOpen ? (
        <section className={style["my-cabinet"]}>
          <div className={style["my-cabinet__my-info"]}>
            <div>
              <div
                className={`${style["my-cabinet__avatar"]} ${style["my-cabinet__avatar-margin-right"]}`}
                style={{
                  backgroundImage: `url(${avatarBlobUrl || "/img/blank-avatar.png"})`,
                }}
              />
              <div className={style["my-cabinet__main-info"]}>
                <h2>
                  {userData.firstName} {userData.lastName}
                </h2>
                  {
                    userData.country && userData.town && (<span> {userData.country}, {userData.town} </span>)
                  }
                  
                {/* <p>Зарегистрирован: нет даты регистрации</p> */}
                {/* <p>Проектов выполнено: 4</p> */}
                {/* <p> */}
                  {/* Рейтинг: 4,4 */}
                {/* </p> */}

              </div>
            </div>
            <div className={style["my-cabinet__contacts"]}>
              <p>
                Номер телефона: <br />
                <span>{userData.phoneNumber || "Не указано"}</span>
              </p>
              <p>
                Адрес почты: <br />
                <span>{userData.email || "Не указано"}</span>
              </p>
              <p>
                Telegram: <br />
                <span>{userData.telegram || "Не указано"}</span>
              </p>
              <button onClick={handleSettingsOpen}>Изменить профиль</button>
            </div>
          </div>
          <div className={style["my-cabinet__about-myself"]}>
            <div>
              <h3>О себе</h3>
              <p>Тут можно будет отобразить описание, если оно появится</p>
            </div>
            <div>
              <h3>Навыки</h3>
              <p>
                {userData.stack.map((s, idx) => (
                  <div key={idx}>
                    {s.programmingLanguage} — {s.programmingYears} лет —
                    Уровень: {s.programmingLevel}
                  </div>
                ))}
              </p>
            </div>
          </div>
          <div className={style["my-cabinet__registration-error"]}>
            <h2>У вас непроверенные данные о компании, поэтому сервис работает с ограничениями.</h2>
            <h3>Для подтверждения регистрации отправьте на почту <span>daukaevk@gmail.com</span>
              &#160;один из следующих документов:</h3>
            <ol className={style["my-cabinet__registration-error-list"]}>
              <li>Свидетельство о государственной регистрации ЮЛ/ИП</li>
              <li>Свидетельство о постановке на налоговый учёт ЮЛ/ИП</li>
              <li>Лист записи ЕГРЮЛ/ЕГРИП, его можно получить в личном кабинете на <a
                href="https://www.nalog.gov.ru/">nalog.gov.ru</a></li>
            </ol>
          </div>
          <Accordion className={style["my-cabinet__accordion"]}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={style["my-cabinet__accordion-summary"]}
            >
              <Typography component="h3">Образование</Typography>
            </AccordionSummary>
            <AccordionDetails
              className={style["my-cabinet__accordion-details"]}
            >
              <Typography component="ol">
                {userData.education.map((edu, idx) => (
                  <li key={idx}>
                    {edu.university}, {edu.specialization}, {edu.releaseYear}
                  </li>
                ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className={style["my-cabinet__accordion"]}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={style["my-cabinet__accordion-summary"]}
            >
              <Typography component="h3">Опыт работы</Typography>
            </AccordionSummary>
            <AccordionDetails
              className={style["my-cabinet__accordion-details"]}
            >
              <Typography component="ol">
                {userData.experience.map((exp, idx) => (
                  <li key={idx}>
                    {exp.workPlace}, {exp.workPosition}, {exp.workYears} лет
                  </li>
                ))}
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* 🔥 Стек технологий */}
          <Accordion className={style["my-cabinet__accordion"]}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={style["my-cabinet__accordion-summary"]}
            >
              <Typography component="h3">Стек технологий</Typography>
            </AccordionSummary>
            <AccordionDetails
              className={style["my-cabinet__accordion-details"]}
            >
              <Typography component="ol">
                {userData.stack.map((stack, idx) => (
                  <li key={idx}>
                    {stack.programmingLanguage}, уровень:{" "}
                    {stack.programmingLevel}, опыт: {stack.programmingYears} лет
                  </li>
                ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </section>
      ) : (
        <MyCabinetSettings
          onSave={() => {
            setSettingsOpen(false);
            fetchUserData();
          }}
          onClose={handleSettingsClose}
        />
      )}
    </>
  );
};

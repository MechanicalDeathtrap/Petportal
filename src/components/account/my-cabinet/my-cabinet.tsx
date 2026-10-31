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
import { Trans, useTranslation } from "react-i18next";
import { MyCabinetSettings } from "./my-cabinet-settings.tsx";
import axios from "axios";
import { API_BASE_URL, API_BASE_PATH } from "../../../config/api";

export const MyCabinet = () => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [avatarBlobUrl, setAvatarBlobUrl] = useState<string | null>(null);
  const [quota, setQuota] = useState<{
    projectsCount: number;
    freeProjectsLimit: number;
    freeProjectsRemaining: number;
  } | null>(null);

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

  const fetchQuota = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}${API_BASE_PATH}/Projects/quota`,
        { withCredentials: true },
      );
      setQuota({
        projectsCount: res.data.projectsCount ?? 0,
        freeProjectsLimit: res.data.freeProjectsLimit ?? 5,
        freeProjectsRemaining: res.data.freeProjectsRemaining ?? 0,
      });
    } catch (err) {
      console.error("Ошибка загрузки квоты проектов:", err);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchQuota();
  }, []);

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
  };

    const handleSettingsClose = () => {
    setSettingsOpen(false);
  };

  if (!userData) {
    return <div>{t("common.loading")}</div>;
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
                {quota && (
                  <>
                    <p>{t("account.cabinet.projectsCreated", { count: quota.projectsCount })}</p>
                    <p>
                      {t("account.cabinet.freePlacements")}{" "}
                      {Math.min(quota.projectsCount, quota.freeProjectsLimit)} /{" "}
                      {quota.freeProjectsLimit}
                      {quota.freeProjectsRemaining > 0
                        ? t("account.cabinet.freeRemaining", { count: quota.freeProjectsRemaining })
                        : t("account.cabinet.limitReached")}
                    </p>
                  </>
                )}

              </div>
            </div>
            <div className={style["my-cabinet__contacts"]}>
              <p>
                {t("account.cabinet.phone")} <br />
                <span>{userData.phoneNumber || t("common.notSpecified")}</span>
              </p>
              <p>
                {t("account.cabinet.email")} <br />
                <span>{userData.email || t("common.notSpecified")}</span>
              </p>
              <p>
                {t("account.cabinet.telegram")} <br />
                <span>{userData.telegram || t("common.notSpecified")}</span>
              </p>
              <button onClick={handleSettingsOpen}>{t("account.cabinet.editProfile")}</button>
            </div>
          </div>
          <div className={style["my-cabinet__about-myself"]}>
            <div>
              <h3>{t("account.cabinet.about")}</h3>
              <p>{t("account.cabinet.aboutPlaceholder")}</p>
            </div>
            <div>
              <h3>{t("account.cabinet.skills")}</h3>
              <p>
                {userData.stack.map((s, idx) => (
                  <div key={idx}>
                    {s.programmingLanguage} —{" "}
                    {t("common.years", { count: Number(s.programmingYears) })} —{" "}
                    {t("account.cabinet.level", { level: s.programmingLevel })}
                  </div>
                ))}
              </p>
            </div>
          </div>
          <div className={style["my-cabinet__registration-error"]}>
            <h2>{t("account.cabinet.companyUnverified")}</h2>
            <h3>
              <Trans
                i18nKey="account.cabinet.companyVerifyIntro"
                values={{ email: "daukaevk@gmail.com" }}
                components={{ email: <span /> }}
              />
            </h3>
            <ol className={style["my-cabinet__registration-error-list"]}>
              <li>{t("account.cabinet.companyDocRegistration")}</li>
              <li>{t("account.cabinet.companyDocTax")}</li>
              <li>
                <Trans
                  i18nKey="account.cabinet.companyDocRegistry"
                  components={{ link: <a href="https://www.nalog.gov.ru/" /> }}
                />
              </li>
            </ol>
          </div>
          <Accordion className={style["my-cabinet__accordion"]}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={style["my-cabinet__accordion-summary"]}
            >
              <Typography component="h3">{t("account.cabinet.education")}</Typography>
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
              <Typography component="h3">{t("account.cabinet.experience")}</Typography>
            </AccordionSummary>
            <AccordionDetails
              className={style["my-cabinet__accordion-details"]}
            >
              <Typography component="ol">
                {userData.experience.map((exp, idx) => (
                  <li key={idx}>
                    {exp.workPlace}, {exp.workPosition},{" "}
                    {t("common.years", { count: Number(exp.workYears) })}
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
              <Typography component="h3">{t("account.cabinet.stack")}</Typography>
            </AccordionSummary>
            <AccordionDetails
              className={style["my-cabinet__accordion-details"]}
            >
              <Typography component="ol">
                {userData.stack.map((stack, idx) => (
                  <li key={idx}>
                    {t("account.cabinet.stackItem", {
                      language: stack.programmingLanguage,
                      level: stack.programmingLevel,
                      years: t("common.years", { count: Number(stack.programmingYears) }),
                    })}
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

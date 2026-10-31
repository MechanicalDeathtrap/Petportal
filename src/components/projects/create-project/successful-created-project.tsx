import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import style from "./successful-created-project.module.sass"
import { SuccessfulCreatedProjectIcon } from "./icons/successful-created-project-icon.tsx";

export const SuccessfulCreatedProject = () =>{
  const { t } = useTranslation();
  return(
    <section className={style["successful-created-project"]}>
      <div>
        <div className={style["successful-created-project__logo"]}>
          <SuccessfulCreatedProjectIcon/>
        </div >
        <h2>{t("projects.success.heading")}</h2>
        <p>
          <Trans
            i18nKey="projects.success.text"
            components={{
              link: <Link to="/account/my-projects" className={style["successful-created-project__link"]} />,
            }}
          />
        </p>
      </div>
    </section>
  )
}
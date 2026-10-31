import style from "./empty-state-message.module.sass";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type EmptyStateVariant =
  | "projects"
  | "favourites"
  | "reviews"
  | "responses"
  | "error";

type emptyStateProps = {
  variant: EmptyStateVariant;
};

export const EmptyStateMessage = (props: emptyStateProps) => {
  const { t } = useTranslation();

  const content = () => {
    switch (props.variant) {
      case "projects":
        return {
          heading: t("account.emptyState.projectsHeading"),
          text: t("account.emptyState.projectsText"),
        };
      case "favourites":
        return {
          heading: t("account.emptyState.favouritesHeading"),
          text: t("account.emptyState.favouritesText"),
        };
      case "reviews":
        return {
          heading: t("account.emptyState.reviewsHeading"),
          text: t("account.emptyState.reviewsText"),
        };
      case "responses":
        return {
          heading: t("account.emptyState.responsesHeading"),
          text: t("account.emptyState.fallbackText"),
        };
      default:
        return {
          heading: t("account.emptyState.errorHeading"),
          text: t("account.emptyState.fallbackText"),
        };
    }
  };

  const { heading, text } = content();

  return (
    <div className={style["empty-state"]}>
      <h2>{heading}</h2>
      <p>{text}</p>
      <div>
        <Link to="/projects">{t("account.emptyState.toProjects")}</Link>
        {props.variant === "projects" && (
          <Link to="/account/create-project">
            {t("account.emptyState.createProject")}
          </Link>
        )}
      </div>
    </div>
  );
};

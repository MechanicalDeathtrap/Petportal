import style from "./empty-state-message.module.sass";
import { Link } from "react-router-dom";

type emptyStateProps = {
  heading: string;
};

export const EmptyStateMessage = (props: emptyStateProps) => {
  const chooseText = (heading: string) => {
    switch (heading) {
      case "Проекты":
        return (
          "На данный момент у вас нет активных проектов." +
          "\n" +
          "Присоединяйтесь к командам или создайте свой проект, чтобы начать работу."
        );
      case "Избранное":
        return (
          "На данный момент вы еще не добавили ни одного проекта в избранное." +
          "\n" +
          "Сохраняйте интересные проекты, чтобы быстро находить их в будущем."
        );
      case "Отзывы":
        return (
          "Пока что у вас нет оставленных отзывов." +
          "\n" +
          "Начните участвовать в проектах, чтобы получить первые оценки."
        );
      default:
        return "Текст сообщения потерялся. Обновите страницу";
    }
  };

  return (
    <div className={style["empty-state"]}>
      <h2>{props.heading}</h2>
      <p>{chooseText(props.heading)}</p>
      <div>
        <Link to="/projects">К проектам</Link>
        {props.heading === "Проекты" && (
          <Link to="/account/create-project">Создать проект</Link>
        )}
      </div>
    </div>
  );
};

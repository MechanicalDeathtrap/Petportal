import style from "./chat-item.module.sass";

export const ChatItem = () => {
  const imageUrlFromBackend = "/img/medium-hot-woman-with-laptop.png";
  const sendedTime = "19:00";

  return (
    <div className={style["chat-item"]}>
      <div
        className={style["chat-item__image"]}
        style={{ backgroundImage: `url(${imageUrlFromBackend})` }}
      />
      <div className={style["chat-item__small-info"]}>
        <h6>Василиса Премудрая</h6>
        <p>
          Добрый вечер, меня зовут Василиса я являюсь кем-то там блаблбалабла
        </p>
      </div>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="10"
          viewBox="0 0 14 10"
          fill="none"
        >
          <path
            d="M1 5.59863L4.64715 9.24578"
            stroke="#666666"
            stroke-linecap="round"
          />
          <path
            d="M13.0696 1L4.73446 9.33512"
            stroke="#666666"
            stroke-linecap="round"
          />
        </svg>
        {sendedTime}
      </span>
    </div>
  );
};

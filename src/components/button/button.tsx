import styles from "./button.module.sass";

type Props = {
  text: string;
  style: string;
};

export const Button = (props: Props) => {
  return (
    <button className={`${styles[props.style]} ${styles["button"]}`}>
      {props.text}
    </button>
  );
};

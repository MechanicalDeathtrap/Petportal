import styles from "./button.module.sass";

type Props = {
  text: string;
  style: string;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};
export const Button = (props: Props) => {
  return (
    <button
      // disabled={props.disabled}
      type={props.type}
      className={`${styles[props.style]} ${styles["button"]}`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

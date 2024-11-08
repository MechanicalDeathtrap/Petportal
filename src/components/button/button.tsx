import styles from "./button.module.sass";
import { Link } from "react-router-dom";

type Props = {
  text: string;
  style: string;
  link: string;
};

export const Button = (props: Props) => {
  return (
    <button type="button" className={`${styles[props.style]} ${styles["button"]}`}>
      <Link to={props.link}>
        {props.text}
      </Link>
    </button>
  );
};

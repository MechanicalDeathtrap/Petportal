import styles from "./button.module.sass";
import { Link } from "react-router-dom";

type Props = {
  text: string;
  style: string;
  link: string;
};
export const Button = (props: Props) => {
  return (

    <Link to={props.link}>
      <button
        type="button"
        className={`${styles[props.style]} ${styles["button"]}`}
      >
        {props.text}
      </button>
    </Link>
)
  ;
};

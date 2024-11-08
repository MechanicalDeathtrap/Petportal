import Marquee from "react-fast-marquee";
import styles from "./marquee.module.sass";

type Props = {
  styleName: string;
  direction: "right" | "left";
};

export const MarqueeText = (props: Props) => {
  return (
    <Marquee
      pauseOnHover={true}
      direction={props.direction}
      autoFill={true}
      speed={20}
    >
      <p className={`${styles[props.styleName]} ${styles["marquee"]}`}>
        &nbsp;объединяй&nbsp; осуществляй&nbsp; создавай&nbsp;
      </p>
    </Marquee>
  );
};

import Marquee from "react-fast-marquee";
import { useTranslation } from "react-i18next";
import styles from "./marquee.module.sass";

type Props = {
  styleName: string;
  direction: "right" | "left";
};

export const MarqueeText = (props: Props) => {
  const { t } = useTranslation();
  return (
    <Marquee
      pauseOnHover={true}
      direction={props.direction}
      autoFill={true}
      speed={20}
    >
      <p className={`${styles[props.styleName]} ${styles["marquee"]}`}>
        {t("home.marquee")}
      </p>
    </Marquee>
  );
};

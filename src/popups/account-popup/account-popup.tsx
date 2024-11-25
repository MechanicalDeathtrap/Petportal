import styles from "./account-popup.module.sass";
import { Link } from "react-router-dom";

export const AccountPopup = () => {
  return (
    <div className={styles["account-popup"]}>
      {/*TODO заменить фотку, имя и тег*/}
      <div className={styles["account-popup__account-info"]}>
        <picture>
          <img
            className={styles["account-popup__account-image"]}
            src="/src/assets/img/blank-avatar.png"
            alt="profile-photo"
          />
        </picture>
        <div className={styles["account-popup__account-names"]}>
          <h6>Василиса Премудрая</h6>
          <span>@bombachka</span>
        </div>
      </div>
      <div className={styles["account-popup__buttons"]}>
        <button
          type="button"
          className={styles["account-popup__go-to-account-button"]}
        >
          <Link to="/">Перейти в личный кабинет</Link>
        </button>
        <div>
          <ul className={styles["account-popup__links-list"]}>
            <li className={styles["account-popup__list-item"]}>
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 512.033 512.033"
                height="25px"
                width="25px"
              >
                <g transform="translate(-1)">
                  <g>
                    <path d="M491.683,181.34H470.35v-64c0-11.782-9.551-21.333-21.333-21.333H265.853l-57.752-57.752 c-4.001-4.001-9.427-6.248-15.085-6.248H22.35c-11.782,0-21.333,9.551-21.333,21.333v404.74c-0.028,0.943,0.001,1.878,0.097,2.8 c0,0.004,0.001,0.008,0.001,0.012c0.045,0.426,0.102,0.849,0.172,1.269c1.206,8.272,6.649,13.9,13.286,16.394 c0.103,0.04,0.208,0.078,0.312,0.117c0.26,0.093,0.517,0.189,0.78,0.273c1.035,0.339,2.109,0.598,3.215,0.777 c0.043,0.007,0.086,0.013,0.13,0.02c0.451,0.07,0.908,0.126,1.37,0.168c0.179,0.017,0.357,0.036,0.536,0.049 c0.129,0.008,0.26,0.011,0.389,0.017c0.586,0.033,1.172,0.044,1.758,0.032H406.35c9.182,0,17.335-5.876,20.239-14.587l85.333-256 C516.526,195.605,506.244,181.34,491.683,181.34z M43.683,74.673H184.18l57.752,57.752c4.001,4.001,9.427,6.248,15.085,6.248 h170.667v42.667h-320c-9.183,0-17.335,5.876-20.239,14.587L43.683,327.211V74.673z M390.974,437.34H51.948l71.111-213.333h325.957 h13.068L390.974,437.34z" />
                  </g>
                </g>
              </svg>
              <Link to="/">Мои проекты</Link>
            </li>
            <li
              className={[
                styles["account-popup__list-item"],
                styles["account-popup__list-item--border-top"],
              ].join(" ")}
            >
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.75"
                  y="0.5"
                  width="30"
                  height="30"
                  fill="url(#pattern0_268_63)"
                />
                <defs>
                  <pattern
                    id="pattern0_268_63"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use href="#image0_268_63" transform="scale(0.01)" />
                  </pattern>
                  <image
                    id="image0_268_63"
                    width="100"
                    height="100"
                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFQ0lEQVR4nO2dS4gdRRSGvxmMMyaaCQoZk40ufGEiYqIiuBHBRSTgMr416sbE58RJBF2I2fgcE0ii7n0RwYCShQwyC0Ekg27iIijRBCaJj0xkco2QIeOVA+fKpZ2uftya7k7V+eDAMPf2OdXnv1XVVV1dDYZhGIZhGIZhGIZhGIYRL/3AzcADwAiwLTAb0XNbq+faWC4HdgDHgXYkdgx4BximQfQBo8BfDUhQuyZrAVs0F7UyCHzcgIS0G2IfaU5qQX4NHzYgCe2G2ad11ZTRBpx8u6EmzVflHXgro1CngQPAeGB2IOe5V9rR73AU5iTwCHAh4TIAPApMO/IwVlVh+h2XtiLGNcTDtQ5RpqrqS25x/CqkZsTGRkc+ZPC44NzvaDdDbqZczVdan3IfFfBCSnDp7GJlss6rrVdSgk8QLxMpOZFcLTgmyP8xQRqGCdIwTJCGYYJ0ITfD3lKTv+vABOkaE53ruqo5V9W1fwITBFgKnJrnUvOUfmaCVJyElx1TFi+ZINUODJcAv2fMOF9SYXmib7JezHGTSFaImCAV1Y7fcggiteTiihSJuoaM5hCjYzIRWgXRCjJYcN3Xr8DiCsoVrSAjBcTo2PMVlCtKQQYdtaPluEl0vIK1UlEK8oyjFrwOvOH4/OkFLlvQglwAXAWsA54FdgFfAjMpcc8Ay9XOpHxnRn3sUp/rNIbE8kEQgsj0xl3AJl2wvB/4EZgt2Ed0L7cZK3jsrMbcr2XYpGVaGpsgTwB/l+ig2wkTHyu6/K7w5Fdq2uOxCHIDMOchaW1g5zz+d3ryLWVcHYMg2zwlbAZYOY//lY7+pqhtjUGQpzwk6mfgDkeMO4FfPMTZHIMgwzrPlKfJOKILnPfoAG+9LlXNs0SzT7+7Xo/do76O5GwyT+qVW/CCCLfnaFYmdCLRN0scCexuDqWMxCIIuu41q6Z87fnun4jxVUbMP4HbCvoNQhDhJuCPjARNApd6KPcQ8E1GLLn9e2sJ38EIIlyfYwb3O+CyHsq8DPg2I4bcgbyxpP+gBBFWAScyEva9/sqLMqTHunyf0DKUJThBOg+/TGUkTq6UivJehs8pjd0LQQqCTvgddSRPxhZFcfk7qjF7JVhBhCsdg7pDFOeQQ1yJ5YOgBRE+SYnxGcXZl+JLNjzwRfCC/JAS49USvran+DrosbxBC7IIOJsSY0PKQ6hv6h1D+TvJhhRfZzWWD4IWZLWjE16VGL/sBf5JfGdcB5xF/fVC0ILc67i7J0/5XgG8n1j1nrQ5FevqEjWuDEELst0xXni34C3eWT0mbXwjsXwQtCD7CiS8Vytz1RadID9VKIgscPBBsIJclNE3+LY5jdkrwQqytkRSZTxxj9rBEsf72I8kWEEeLpDIw8CDiZ1B+/V/hwv4kZi9EqwgW3PuBPpkxqBukX7nWA5/8nhDrwQryN2OxE2rYEUeL1isx7g2GpNlpb0SrCB9wBcJvy0dL5S5OdVhSH0kV8h/7mmTsWAFQRdAPwTs1udB8i7FycNy9blb+xpbbB0oEyHXkPMRE6RhmCANwwRpGLUKYptgNmwTTNc2sbJlamwM1L1NrGsjZdl+OzYeq3sj5X7HHNG0h1WA5xPXNWGrcfSJVdec08bAm68BrRnzbaDWsberLNBwjlc2tLSzGw/MJnO+rsLnlE8utmQUKmZ7jhqwVx4xrxh763w5mGzqYu+h4j8xPqjzpWAd+nRKO6tdDdlO19VMZXX0YzkeugnJpvRqqvIOvGiNWaMjeqk5rwVmI3pua5rwIknDMAzDMAzDMAzDMAzDoCb+Be1sQvhV9eEgAAAAAElFTkSuQmCC"
                  />
                </defs>
              </svg>
              <Link to="/">Отзывы</Link>
            </li>
            <li
              className={[
                styles["account-popup__list-item"],
                styles["account-popup__list-item--bordered"],
              ].join(" ")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="31"
                height="30"
                viewBox="0 0 31 30"
                fill="none"
              >
                <rect
                  x="0.75"
                  width="30"
                  height="30"
                  fill="url(#pattern0_268_67)"
                />
                <defs>
                  <pattern
                    id="pattern0_268_67"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use href="#image0_268_67" transform="scale(0.01)" />
                  </pattern>
                  <image
                    id="image0_268_67"
                    width="100"
                    height="100"
                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAADd0lEQVR4nO2d7YsNYRiHr2PXy3rXWi9ZeQ15SSJCadtVPiiUNkr2P9B+9FX5B5D8AeKDQilKWQnlpYhIktIWLYVsaC1292jqUdu2Z84z55w5c8/M76r72+6c+36uM880987eA0IIIYQQQgghhBBCiNHMBzqBbuB4yqLb5T4vC0p3AreBYaCY8hgGeoDtpJBG4IyBRSzGFKdcjalgAnDVwKIVY47LrlbznDSwWMU6xQmMswz4bWChinWKoNYVGOZcmQLeuQvjrZREj8s5rKazGCXYT/tKJP0ZaCe9tANfStT2AShgkMUh36KjpJ+ukPoWYZCtIQk3k36aQ+oLajdHW0jCWaFYIoLazSEhxpAQY0iIMSTEGBJiDAkxhoQYQ0KMISHGkBBjSIgxJMQYEmIMCTGGhBhDQowhIcaQEGNIiDEkxBgSYgwJMYaEGENCjCEhxpAQY0iIMSTEGBJiDAkxhoQYQ0KMISHGkBBjSIgxJMQYSQppcBE3+qdPD1qBu8AjN9ojTiSkDPvGTFjod8PG4kJCSjAZOA2MlFik80ATtUdCxmEp8NBjUs9TYBW1RULG0Om2Jd/xST9qPGdFQhxNbouqdK5VsIVNp3okBFgHvKzBsLE3wCYJqfw+pAAcAwY9Fvuji3I/N+iOWel8q9yeIbOAS57f/GDq20KgBbjh+TvXKhwZlUsh2zzG6gXx1w2hHD0ZtOAGH/vMfXwP7IqYW66EFNxi/vFYzF5gR8ixtgBvPY4z5KT6tl1yIyQYRX7Tc7u5AszxOOZM4KLnMe94junLhZDdnhfkX+4MqmRW4k+P4weDOvfmWUij2y585sK/AjZUkdsa4LnH54y4+51JeROyBHgQ4aZuag3ymxLh5vIJsDIvQg4C3zwWpR84HEOeB4CvHp//HTiSZSFR2h+PgeUxzxi+H+EMnZY1IWuBFxH28Il1yPf/NWzII6/XwMYsCRnwKLoP6Egg746QEem+NaROSLkIBt8vSDD3ucD1KvLPjJDx2h9JEaXtkkkhvUbf57TZs+2SKSHB64JmY5cZwIU8CBmosP2RFF3uz8CZFBK0P9aTPlYDz7ImpFbtj6Qo99hRaoQE7Y9DZIf9JV59lAoh9Xi0MwmCtsu9NAmpZ/sjKRrGtF3MCvkE7CE/tLm3tJkU0uqe/MgbLa52IYQQQgghhBCCqvkHgLNEfP6nE7IAAAAASUVORK5CYII="
                  />
                </defs>
              </svg>
              <Link to="/">Избранное</Link>
            </li>
            <li
              className={[
                styles["account-popup__list-item"],
                styles["account-popup__list-item--border-bottom"],
              ].join(" ")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
              >
                <rect
                  x="0.75"
                  y="0.5"
                  width="30"
                  height="30"
                  fill="url(#pattern0_268_71)"
                />
                <defs>
                  <pattern
                    id="pattern0_268_71"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use href="#image0_268_71" transform="scale(0.01)" />
                  </pattern>
                  <image
                    id="image0_268_71"
                    width="100"
                    height="100"
                    href="data:image/png;base64,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"
                  />
                </defs>
              </svg>
              <Link to="">Настройки</Link>
            </li>
            <li className={styles["account-popup__list-item"]}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="31"
                height="30"
                viewBox="0 0 31 30"
                fill="none"
              >
                <rect
                  x="0.75"
                  width="30"
                  height="30"
                  fill="url(#pattern0_268_75)"
                />
                <defs>
                  <pattern
                    id="pattern0_268_75"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use href="#image0_268_75" transform="scale(0.0111111)" />
                  </pattern>
                  <image
                    id="image0_268_75"
                    width="90"
                    height="90"
                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEr0lEQVR4nO2c34tWRRjHP+5re3Ztu9AoIouky9JAtFwrgwhJu+onYauhW16Uv/r5HxSmlYtooFdK4FUkbcGuZt6GYqV1Gym6ukHlj0pdDfONwSdYlp055/Cec+bMvM8HHniv3pnzPXNmnnnmmQcURVEURVEURVGUzDSAecArwCbgC+An4BfgHHAV+Fd+/wocBQaBAWAV8AAwNXtz7cVMYL0IdgFotmh/Ap8Dq4HbaXO6gD5gP3CtAHFt9g/wFfCcfC1tQw/wNjBaorg2M9PPWqCbiJkKvAn84UHgiXYSeBnoIDIeBX6sgcAT7TAwmwjoBLYC13MK8DcwDLwvI28BcC8wXf6zQ37fCTwMLAM+AA4AF3O2ZbyYdwkYI8yRHA98BvhQhGvFPUuAJ4DtOacp80KD43HgfMYH/Bp4siSPwIz+F4HvMvTjIIHxLHAlw4MNAw9W2K8lKetEUEKvyuATnwKe8dQ/M7e/Jhuaif1aQUAjOU3kT8WP9s3dwG6Zw41v/ToBzcljDoEvy2hXWvQuXAvfOeARVbj1Vf1Iiss2W0Vuna0pI1lFLmhbfd0xJ+t0UQBm53bMMZpXFtGIciMK53LhlALoccQQTtbET46Cdxyj2deOL8rjp1FH7CJkuoGdEmb9HdgskUAv9DlG80OEzc5JnmnIl9j7HaHOkJkihw3NOog90xE0MvHk0PnL8bVWKvYGxzY7hmP8gZTIY2ViD1o6YI6fYiARMb2K3XBE6MwZXywkvsWeb2nULCA3EReJT7H7I/Wdayf2Zktj7xF3rP3LFLH3ySau9IUwmAPNUMS2HdObDKLYSaqcRk5YGphFuUwDPikoZ7psGypiZNvCordSLjtqIGAeM/GSlrhq+WMzh5WZ7HK5BuLlsUutpgKr0FQjtE4dZBLaTHVBLobdwLYcmak+bbiIxdDm3vUSP0kG964QkZG7ftEkb9d5w7LJ0oi5+hArnT624P2Ohtp5N9hVdMPzLI21c5i0q+rAf0w5dolPkdMWxI+Ig6QOIhvWWRofjeRwdlsdREYuT9rSDZYSNh2yffYu8v/ss3TkG8IXeswhcuXZSi853nrou8RddREZ+XzORJoW1iNij4nbOuAzydHwlmNUP0/4TKEm3CxprZMJPQLc4ruDMWHLwzO2x3fnYqIh1blsYpsKX0pBLEy5/raoqIYU2OIY1SY2MkdFKi5me9ghttmezymorbZnllxHdo3sRW2vUkE8llJGYkyqKioF8HSGwih7auJnjy+Mclwik0GxMoPYI8ALHt3S4Ev9jB/ZrmmkKXZAXMSqWCpVe6MoXjV+znYtkM0JD/hUSYcHiUQcv8/YjyC5BziUUeym1ILeIh5KZ4viLpZ037M52l9OwJgT8o+lsHYzh12UW7obpehVr9RumiEvoSElM++SAi19cv3jYMpJyWR2RQoJREEv8ENOAaqwb4H7iIyGuFG/1UDgEzJ31yb2XNZ1iTeA0x4E/lncO68nJ1WTSDnioQpKzw+K2xldYe683AGsAfbm9BRc8ZXPgFeB23w/XF3pAOaKt7FRxD8qNUTPyjWPa+KnnxYfea94NyaN+P5IEnoURVEURVEURVGohP8AWtcuugZjj5AAAAAASUVORK5CYII="
                  />
                </defs>
              </svg>
              <Link to="">Выйти</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

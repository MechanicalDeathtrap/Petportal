import styles from "./header.module.sass";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ParentPopup } from "../../popups/parent-popup.tsx";
import { Button } from "../button/button.tsx";
import { AccountPopup } from "../../popups/account-popup/account-popup.tsx";

export const Header = () => {
  const [popperAnchorEl, setPopperAnchorEl] = useState<HTMLElement | null>(
    null,
  );
  /*const [isAuthorized, setIsAuthorized] = useState(true); //SHOULD BE FALSE AT THE END*/
  const isAuthorized = true

  const setPopperAnchorElement = (e: React.MouseEvent<HTMLElement>) =>
    setPopperAnchorEl(popperAnchorEl ? null : e.currentTarget);
  /*const toggleAuthorization = () => setIsAuthorized((prevState) => !prevState);*/

  return (
    <>
      <header className={styles.header}>
        <div className={styles.mainLogoContainer}>
          <Link to="/">
            <svg
              className={styles.mainLogoIcon}
              xmlns="http://www.w3.org/2000/svg"
              width="198"
              height="59"
              viewBox="0 0 198 59"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M53.2812 5.80322C53.2812 9.0083 50.6309 11.6064 47.3613 11.6064C46.2656 11.6064 45.2393 11.3147 44.3589 10.8059L37.3359 19.0325C40.4556 21.6924 42.4277 25.6123 42.4277 29.9836C42.4277 31.8623 42.0635 33.6577 41.4004 35.3054L45.4824 37.3301C46.7822 35.2446 49.1265 33.8528 51.8022 33.8528C55.8892 33.8528 59.2021 37.1003 59.2021 41.1067C59.2021 45.113 55.8892 48.3608 51.8022 48.3608C47.7148 48.3608 44.4019 45.113 44.4019 41.1067C44.4019 40.4602 44.4883 39.8333 44.6499 39.2366L40.4868 37.1716C40.3945 37.3293 40.2998 37.4851 40.2021 37.6389C40.0532 37.8735 39.8979 38.1038 39.7358 38.3291C38.3984 35.8977 36.3501 33.8977 33.8638 32.5962C33.2153 32.2566 33.0381 31.3523 33.4399 30.7402C34.1318 29.6853 34.5337 28.4297 34.5337 27.0823C34.5337 23.343 31.4414 20.3118 27.6265 20.3118C23.812 20.3118 20.7197 23.343 20.7197 27.0823C20.7197 28.2986 21.0469 29.4399 21.6196 30.4263C21.9873 31.0596 21.7617 31.9529 21.0957 32.2573C18.5776 33.408 16.458 35.2561 14.9956 37.5481C13.6201 35.3457 12.8271 32.7554 12.8271 29.9836C12.8271 26.3086 14.2207 22.9529 16.5186 20.3965L8.18115 13.3125C7.31348 14.0569 6.17725 14.5081 4.93359 14.5081C2.20898 14.5081 0 12.3428 0 9.67188C0 7.00098 2.20898 4.83594 4.93359 4.83594C7.6582 4.83594 9.86719 7.00098 9.86719 9.67188C9.86719 10.4241 9.69189 11.136 9.37939 11.7708L17.9229 19.0293C20.521 16.8157 23.9146 15.4753 27.6274 15.4753C30.5825 15.4753 33.3354 16.3245 35.646 17.7871L42.7593 9.45459C41.9351 8.45728 41.4409 7.18677 41.4409 5.80322C41.4409 2.59814 44.0918 0 47.3613 0C50.6309 0 53.2812 2.59814 53.2812 5.80322ZM29.1816 32.1594C29.1816 31.4829 29.3516 30.8506 29.646 30.3127C30.791 29.6428 31.5337 28.4246 31.5337 27.0823C31.5337 25.0562 29.8408 23.3118 27.6265 23.3118C25.4121 23.3118 23.7197 25.0562 23.7197 27.0823C23.7197 28.3831 24.4175 29.5676 25.5024 30.249C25.7192 30.7544 25.8408 31.3203 25.8408 31.9177C25.8408 32.7295 25.6167 33.4829 25.2339 34.105C21.5952 34.7031 18.5747 36.99 17.001 40.0823C17.2993 40.3838 17.6108 40.6726 17.9346 40.948L13.9209 46.9531C13.1328 46.6143 12.2622 46.4263 11.3472 46.4263C7.80469 46.4263 4.93359 49.241 4.93359 52.7131C4.93359 56.1853 7.80469 59 11.3472 59C14.8892 59 17.7607 56.1853 17.7607 52.7131C17.7607 50.8445 16.9287 49.1663 15.6084 48.0146L19.5386 42.1353C21.8633 43.6255 24.6421 44.4917 27.6274 44.4917C31.4551 44.4917 34.9429 43.0676 37.5703 40.7305C36.2021 37.5383 33.3364 35.0879 29.7969 34.2571C29.4102 33.6694 29.1816 32.9443 29.1816 32.1594ZM72.77 19.6365V40H77.0752V33.3977H80.6948C82.2588 33.3977 83.5913 33.1094 84.6919 32.5327C85.7988 31.9561 86.644 31.1506 87.2271 30.1165C87.8105 29.0823 88.1021 27.8892 88.1021 26.5369C88.1021 25.1846 87.814 23.9915 87.2373 22.9573C86.667 21.9167 85.8384 21.1047 84.7515 20.5212C83.6641 19.9314 82.3486 19.6365 80.8042 19.6365H72.77ZM77.0752 29.9475H79.9985C80.8271 29.9475 81.5098 29.8049 82.0469 29.5198C82.5903 29.2283 82.9946 28.8271 83.2598 28.3167C83.5317 27.7998 83.6675 27.2065 83.6675 26.5369C83.6675 25.8608 83.5317 25.2708 83.2598 24.7671C83.1646 24.5835 83.0513 24.415 82.9199 24.2615C82.686 23.988 82.395 23.7622 82.0469 23.5837C81.5034 23.2988 80.814 23.1562 79.9785 23.1562H77.0752V29.9475ZM93.4766 39.3438C94.6099 39.9802 95.9624 40.2983 97.5332 40.2983C98.793 40.2983 99.9033 40.106 100.864 39.7217C101.832 39.3306 102.621 38.7869 103.231 38.0908C103.847 37.3882 104.255 36.5664 104.454 35.625L100.536 35.3665C100.391 35.751 100.178 36.0757 99.8999 36.3408C99.6216 36.606 99.2866 36.8049 98.8955 36.9375C98.5044 37.0701 98.0737 37.1365 97.603 37.1365C96.8936 37.1365 96.2808 36.9873 95.7637 36.689C95.5054 36.5398 95.2759 36.3591 95.0752 36.1472C94.8745 35.9351 94.7031 35.6914 94.5605 35.4163C94.2817 34.866 94.1426 34.2131 94.1426 33.4573V33.4475H104.543V32.2842C104.543 31.3521 104.45 30.5054 104.262 29.7441C104.188 29.4441 104.1 29.1572 103.997 28.8835C103.632 27.9092 103.122 27.1003 102.465 26.4573C102.11 26.1062 101.722 25.8037 101.3 25.5496C100.95 25.3381 100.576 25.1602 100.178 25.0156C99.3101 24.6909 98.3721 24.5283 97.3643 24.5283C95.8662 24.5283 94.5605 24.8599 93.4468 25.5227C92.3398 26.1855 91.4814 27.1104 90.8716 28.2969C90.2617 29.4834 89.9565 30.8623 89.9565 32.4333C89.9565 34.0439 90.2617 35.4395 90.8716 36.6194C91.4814 37.7927 92.3496 38.7007 93.4766 39.3438ZM94.1465 30.8225C94.1724 30.2739 94.3135 29.7734 94.5703 29.321C94.7505 28.9995 94.9751 28.7209 95.2441 28.4854C95.3906 28.3567 95.5503 28.2407 95.7236 28.1377C96.2207 27.8396 96.791 27.6904 97.4341 27.6904C98.0503 27.6904 98.5908 27.8262 99.0547 28.0979C99.5254 28.3633 99.8931 28.731 100.158 29.2017C100.423 29.6724 100.556 30.2126 100.556 30.8225H94.1465ZM115.431 27.9092V24.7273H112.558V21.0681H108.322V24.7273H106.234V27.9092H108.322V35.8635C108.318 36.4639 108.392 37.002 108.542 37.4783C108.643 37.7964 108.778 38.0867 108.948 38.3494C109.373 39.0056 109.966 39.4895 110.728 39.801C111.497 40.1128 112.392 40.2485 113.413 40.2087C113.963 40.189 114.43 40.1326 114.814 40.0398C115.199 39.9536 115.498 39.8774 115.709 39.811L115.043 36.6592C114.938 36.679 114.785 36.7087 114.586 36.7485C114.387 36.7817 114.188 36.7983 113.989 36.7983C113.704 36.7983 113.453 36.7551 113.234 36.6689C113.126 36.6252 113.031 36.5657 112.948 36.4897C112.866 36.4158 112.795 36.3264 112.736 36.2217C112.662 36.0847 112.61 35.9141 112.583 35.7095C112.566 35.5874 112.558 35.4531 112.558 35.3069V27.9092H115.431ZM118.598 19.6365V40H122.903V33.3977H126.523C128.087 33.3977 129.419 33.1094 130.52 32.5327C131.627 31.9561 132.472 31.1506 133.055 30.1165C133.639 29.0823 133.93 27.8892 133.93 26.5369C133.93 25.1846 133.642 23.9915 133.065 22.9573C132.495 21.9167 131.667 21.1047 130.58 20.5212C129.492 19.9314 128.177 19.6365 126.632 19.6365H118.598ZM122.903 29.9475H125.827C126.655 29.9475 127.338 29.8049 127.875 29.5198C128.16 29.3669 128.406 29.1841 128.615 28.9712C128.804 28.7778 128.962 28.5596 129.088 28.3167C129.36 27.7998 129.496 27.2065 129.496 26.5369C129.496 26.1602 129.454 25.8101 129.369 25.4868C129.302 25.23 129.208 24.99 129.088 24.7671C128.823 24.2566 128.418 23.8623 127.875 23.5837C127.332 23.2988 126.642 23.1562 125.807 23.1562H122.903V29.9475ZM139.295 39.314C140.422 39.9702 141.757 40.2983 143.302 40.2983C144.846 40.2983 146.179 39.9702 147.299 39.314C148.426 38.6511 149.294 37.7297 149.904 36.5498C150.514 35.3633 150.819 33.9878 150.819 32.4233C150.819 30.8457 150.514 29.4668 149.904 28.2869C149.294 27.1003 148.426 26.179 147.299 25.5227C146.621 25.1216 145.866 24.8418 145.033 24.6833C144.489 24.5801 143.912 24.5283 143.302 24.5283C141.757 24.5283 140.422 24.8599 139.295 25.5227C138.174 26.179 137.31 27.1003 136.7 28.2869C136.09 29.4668 135.785 30.8457 135.785 32.4233C135.785 33.9878 136.09 35.3633 136.7 36.5498C137.31 37.7297 138.174 38.6511 139.295 39.314ZM145.082 36.4204C144.611 36.8181 144.024 37.0171 143.322 37.0171C142.612 37.0171 142.016 36.8181 141.532 36.4204C141.055 36.0161 140.693 35.4658 140.448 34.7698C140.209 34.074 140.09 33.2817 140.09 32.3936C140.09 31.5051 140.209 30.7131 140.448 30.0171C140.693 29.321 141.055 28.7708 141.532 28.3665C142.016 27.9622 142.612 27.76 143.322 27.76C144.024 27.76 144.611 27.9622 145.082 28.3665C145.552 28.7708 145.907 29.321 146.146 30.0171C146.391 30.7131 146.514 31.5051 146.514 32.3936C146.514 33.2817 146.391 34.074 146.146 34.7698C145.907 35.4658 145.552 36.0161 145.082 36.4204ZM153.573 24.7273V40H157.809V31.3594C157.809 30.7363 157.948 30.186 158.227 29.7087C158.512 29.2314 158.896 28.8604 159.38 28.5952C159.871 28.3235 160.427 28.1875 161.05 28.1875C161.342 28.1875 161.664 28.2107 162.015 28.2571C162.366 28.3035 162.641 28.3564 162.84 28.4163V24.6577C162.655 24.6113 162.439 24.5747 162.194 24.5483C161.949 24.5217 161.72 24.5085 161.508 24.5085C160.653 24.5085 159.897 24.7539 159.241 25.2444C158.584 25.7283 158.117 26.4441 157.839 27.3921H157.68V24.7273H153.573ZM173.919 27.9092V24.7273H171.046V21.0681H166.81V24.7273H164.722V27.9092H166.81V35.8635C166.803 36.8645 167.012 37.6931 167.437 38.3494C167.861 39.0056 168.454 39.4895 169.216 39.801C169.985 40.1128 170.88 40.2485 171.901 40.2087C172.451 40.189 172.918 40.1326 173.303 40.0398C173.688 39.9536 173.986 39.8774 174.198 39.811L173.532 36.6592C173.426 36.679 173.273 36.7087 173.074 36.7485C172.875 36.7817 172.676 36.7983 172.478 36.7983C172.192 36.7983 171.941 36.7551 171.722 36.6689C171.51 36.5828 171.344 36.4336 171.225 36.2217C171.105 36.0029 171.046 35.698 171.046 35.3069V27.9092H173.919ZM178.429 39.7812C179.191 40.1194 180.059 40.2883 181.034 40.2883C181.79 40.2883 182.456 40.189 183.032 39.99C183.609 39.7847 184.103 39.5029 184.514 39.1448C184.762 38.9248 184.979 38.6846 185.167 38.4236C185.291 38.252 185.401 38.0715 185.498 37.8821H185.618V40H189.635V29.699C189.635 29.1106 189.561 28.5767 189.414 28.0969C189.333 27.8359 189.231 27.5911 189.107 27.3623C188.756 26.7061 188.276 26.1689 187.666 25.7515C187.062 25.3337 186.37 25.0256 185.588 24.8267C184.812 24.6279 184 24.5283 183.152 24.5283C182.551 24.5283 181.986 24.5735 181.456 24.6633C180.91 24.7561 180.401 24.8967 179.93 25.0852C179.009 25.4497 178.256 25.9734 177.673 26.6562C177.09 27.3323 176.699 28.1345 176.5 29.0625L180.417 29.3806C180.563 28.877 180.861 28.4592 181.312 28.1279C181.763 27.7898 182.37 27.6208 183.132 27.6208C183.854 27.6208 184.411 27.793 184.802 28.1377C185.2 28.4824 185.399 28.9697 185.399 29.5994V29.6592C185.399 29.9839 185.276 30.2292 185.031 30.3948C184.786 30.5605 184.391 30.6865 183.848 30.7727C183.304 30.8523 182.588 30.9385 181.7 31.0312C180.944 31.1042 180.222 31.2302 179.532 31.4092C178.85 31.5881 178.24 31.8533 177.703 32.2046C177.367 32.4243 177.076 32.688 176.828 32.9956C176.68 33.1799 176.547 33.3804 176.43 33.5967C176.119 34.1733 175.963 34.886 175.963 35.7344C175.963 36.7419 176.182 37.5837 176.619 38.26C177.063 38.9294 177.667 39.4365 178.429 39.7812ZM183.897 36.9971C183.42 37.2424 182.87 37.365 182.247 37.365C181.597 37.365 181.06 37.2158 180.636 36.9177C180.218 36.6128 180.01 36.1719 180.01 35.5952C180.01 35.1975 180.112 34.866 180.318 34.6008C180.523 34.3291 180.812 34.1135 181.183 33.9546C181.554 33.7954 181.988 33.6794 182.485 33.6064L183.261 33.4971C183.467 33.4636 183.673 33.4282 183.879 33.3911L184.116 33.3479C184.401 33.2883 184.656 33.2253 184.882 33.1592C185.114 33.0862 185.296 33.0066 185.429 32.9204V34.5413C185.429 35.0781 185.293 35.5586 185.021 35.9829C184.749 36.4072 184.375 36.7454 183.897 36.9971ZM197.157 40V19.6365H192.921V40H197.157Z"
                fill="#1A93CC"
              />
            </svg>
          </Link>
        </div>
        <nav className={styles.headerNavigation}>
          <ul className={styles.headerNavigationList}>
            {/*TODO линки к страницам,  подсвечивание выбранного линка*/}
            <li>
              <Link
                className={styles.headerNavigationList__navigationLink}
                to="/"
              >
                О нас
              </Link>
            </li>
            <li>
              <Link
                className={styles.headerNavigationList__navigationLink}
                to="/projects"
              >
                Проекты
              </Link>
            </li>
            <li>
              <Link
                className={styles.headerNavigationList__navigationLink}
                to="/"
              >
                Создать проект
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.profileButtons}>
          <ul className={styles.headerButtonsList}>
            <li>
              <Link to="/" className={styles.notificationsButton}>
                <svg
                  className={styles.headerButtonsList__notificationIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="29"
                  viewBox="0 0 23 29"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.66902 3.95454V4.71746C3.80242 6.31684 1.10101 11.5701 1.19905 16.1228L1.199 18.6515C-0.780377 21.2183 -0.663911 25.0454 4.27441 25.0454H7.66902C7.66902 26.0942 8.07421 27.1001 8.79549 27.8417C9.51669 28.5834 10.4949 29 11.515 29C12.535 29 13.5132 28.5834 14.2344 27.8417C14.9558 27.1001 15.3608 26.0942 15.3608 25.0454H18.7649C23.6938 25.0454 23.7652 21.2103 21.786 18.6435L21.8411 16.1263C21.9407 11.5683 19.2342 6.31031 15.3608 4.71321V3.95454C15.3608 2.90574 14.9558 1.89988 14.2344 1.15826C13.5132 0.416643 12.535 0 11.515 0C10.4949 0 9.51669 0.416643 8.79549 1.15826C8.07421 1.89988 7.66902 2.90573 7.66902 3.95454ZM12.7969 3.95454C12.7969 3.98131 12.7962 4.008 12.7946 4.03457C12.377 3.98174 11.9517 3.95454 11.5201 3.95454C11.085 3.95454 10.6562 3.98219 10.2354 4.03586C10.2339 4.00887 10.233 3.98174 10.233 3.95454C10.233 3.60495 10.3681 3.26966 10.6085 3.02245C10.8488 2.77524 11.175 2.63636 11.515 2.63636C11.8549 2.63636 12.1811 2.77524 12.4214 3.02245C12.6619 3.26966 12.7969 3.60495 12.7969 3.95454ZM10.233 25.0454C10.233 25.395 10.3681 25.7304 10.6085 25.9776C10.8488 26.2247 11.175 26.3636 11.515 26.3636C11.8549 26.3636 12.1811 26.2247 12.4214 25.9776C12.6619 25.7304 12.7969 25.395 12.7969 25.0454H10.233ZM18.7649 22.409C19.8601 22.409 20.4509 21.0881 19.7382 20.233C19.3919 19.8176 19.2073 19.2891 19.2192 18.7465L19.2778 16.0672C19.3756 11.5915 15.8739 6.5909 11.5201 6.5909C7.16735 6.5909 3.66603 11.5899 3.76238 16.0644L3.82013 18.7469C3.83182 19.2894 3.64731 19.8177 3.30106 20.233C2.58828 21.0881 3.17915 22.409 4.27441 22.409H18.7649Z"
                    fill="black"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <button type="button">
                <svg
                  className={styles.headerButtonsList__messageIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="29"
                  viewBox="0 0 32 29"
                  fill="none"
                >
                  <path
                    d="M8.22222 9.625H23.7778M8.22222 16.125H16M30 27.5L24.8289 24.7989C24.4369 24.5942 24.2409 24.4918 24.0354 24.4197C23.8531 24.3556 23.6653 24.3093 23.4748 24.2814C23.2601 24.25 23.0409 24.25 22.6027 24.25H6.97778C5.23538 24.25 4.3642 24.25 3.6987 23.8957C3.1133 23.5842 2.63736 23.087 2.3391 22.4755C2 21.7803 2 20.8702 2 19.05V6.7C2 4.87982 2 3.96974 2.3391 3.27453C2.63736 2.663 3.1133 2.16581 3.6987 1.85423C4.3642 1.5 5.2354 1.5 6.97778 1.5H25.0222C26.7646 1.5 27.6359 1.5 28.3013 1.85423C28.8867 2.16581 29.3627 2.663 29.6609 3.27453C30 3.96974 30 4.87984 30 6.7V27.5Z"
                    stroke="black"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </li>
          </ul>
          {isAuthorized ? (
            <button type="button" onClick={setPopperAnchorElement}>
              {/*TODO смена картинки на пользовательскую*/}
              <img
                className={styles.userAvatar}
                src="/img/blank-avatar.png"
                alt="blank-avatar-image"
              />
            </button>
          ) : (
            <button type="button">
              {/*TODO link to registration*/}
              <Button link="/" style="blue-button-header" text="Войти" />
            </button>
          )}
        </div>
      </header>
      <ParentPopup
        popup={AccountPopup()}
        id="account-menu-popup"
        anchorEl={popperAnchorEl}
      />
    </>
  );
};

import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./search-bar.module.sass";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchString, setSearchString] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    onSearch(searchString); // Выполняем поиск только здесь
  };

  return (
    <div className={styles["searchbar"]}>
      <button
        form="searchForm"
        className={styles["searchbar__search-button"]}
        type="submit"
      >
        <img src="/img/поиск.svg" alt="magnifier" />
      </button>
      <form
        id="searchForm"
        className={styles["searchbar__form"]}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Искать проекты"
          value={searchString}
          onChange={handleChange}
        />
      </form>
      <button className={styles["searchbar__erase-button"]} type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <g clip-path="url(#clip0_291_287)">
            <path
              d="M0.786524 14.0801C0.404492 14.4621 0.404492 15.0814 0.786524 15.4635C1.16855 15.8455 1.78796 15.8455 2.17 15.4635L0.786524 14.0801ZM8.69171 8.94171C9.07376 8.55967 9.07376 7.94036 8.69171 7.55832C8.30967 7.17627 7.69036 7.17627 7.30832 7.55832L8.69171 8.94171ZM7.30832 7.55832C6.92627 7.94036 6.92627 8.55967 7.30832 8.94171C7.69036 9.32376 8.30967 9.32376 8.69171 8.94171L7.30832 7.55832ZM15.2135 2.42C15.5955 2.03797 15.5955 1.41855 15.2135 1.03652C14.8314 0.654492 14.2121 0.654492 13.8301 1.03652L15.2135 2.42ZM8.69171 7.55832C8.30967 7.17627 7.69036 7.17627 7.30832 7.55832C6.92627 7.94036 6.92627 8.55967 7.30832 8.94171L8.69171 7.55832ZM13.8301 15.4635C14.2121 15.8455 14.8314 15.8455 15.2135 15.4635C15.5955 15.0814 15.5955 14.4621 15.2135 14.0801L13.8301 15.4635ZM7.30832 8.94171C7.69036 9.32376 8.30967 9.32376 8.69171 8.94171C9.07376 8.55967 9.07376 7.94036 8.69171 7.55832L7.30832 8.94171ZM2.17 1.03652C1.78796 0.654492 1.16855 0.654492 0.786524 1.03652C0.404492 1.41855 0.404492 2.03797 0.786524 2.42L2.17 1.03652ZM2.17 15.4635L8.69171 8.94171L7.30832 7.55832L0.786524 14.0801L2.17 15.4635ZM8.69171 8.94171L15.2135 2.42L13.8301 1.03652L7.30832 7.55832L8.69171 8.94171ZM7.30832 8.94171L13.8301 15.4635L15.2135 14.0801L8.69171 7.55832L7.30832 8.94171ZM8.69171 7.55832L2.17 1.03652L0.786524 2.42L7.30832 8.94171L8.69171 7.55832Z"
              fill="#1A93CC"
            />
          </g>
          <defs>
            <clipPath id="clip0_291_287">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
};

import styles from "./sort-dropdown.module.sass";
import { useState } from "react";

interface SortOption {
  label: string;
  value: string;
}

const sortOptions: SortOption[] = [
  { label: "По дате публикации", value: "date" },
  { label: "По бюджету", value: "budget" },
  { label: "По сроку приема заявок", value: "applyingdeadline" },
  { label: "По дедлайну проекта", value: "deadline" },

];

export const SortDropdown = ({ onSortChange }: { onSortChange: (value: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<SortOption>(sortOptions[0]);

  const handleSelect = (option: SortOption) => {
    setSelected(option);
    onSortChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button
        type="button"
        className={styles["filter-button"]}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected.label}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg" 
          width="7"
          height="10"
          viewBox="0 0 7 10"
          fill="none"
        >
          {/* Можно добавить стрелку вверх/вниз в зависимости от isOpen */}
          <path
            d="M0.15537 6.16511C-0.05179 6.38257 -0.05179 6.73517 0.15537 6.95262L2.75047 9.67418C3.16487 10.1087 3.83632 10.1086 4.2505 9.67384L6.8446 6.95061C7.0518 6.73316 7.0518 6.38056 6.8446 6.1631C6.63746 5.94563 6.30157 5.94563 6.09443 6.1631L3.87414 8.49387C3.667 8.71138 3.33111 8.71132 3.12397 8.49387L0.905549 6.16511C0.698395 5.94764 0.362524 5.94764 0.15537 6.16511Z"
            fill="#0F0F0F"
            fillOpacity="0.7"
          />
          <path
            d="M0.15537 3.83489C-0.05179 3.61743 -0.05179 3.26483 0.15537 3.04738L2.75047 0.325821C3.16487 -0.108746 3.83632 -0.108579 4.2505 0.326156L6.8446 3.04939C7.0518 3.26684 7.0518 3.61944 6.8446 3.8369C6.63746 4.05437 6.30157 4.05437 6.09443 3.8369L3.87414 1.50613C3.667 1.28862 3.33111 1.28868 3.12397 1.50613L0.905549 3.83489C0.698395 4.05236 0.362524 4.05236 0.15537 3.83489Z"
            fill="#0F0F0F"
            fillOpacity="0.7"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className={styles["dropdown-menu"]}>
          {sortOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className={
                selected.value === option.value ? styles.selected : ""
              }
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
import style from "./account-settings.module.sass";
import { DeleteAccountModal } from "../../../modals/delete-account-modal/delete-account-modal.tsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ParentModal } from "../../../modals/parent-modal.tsx";

export const AccountSettings = () => {
  const { t } = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <>
      <section className={style["account-settings"]}>
        <div className={style["account-settings__delete-account-container"]}>
          <h2>{t("account.deleteAccount.heading")}</h2>
          <p>{t("account.deleteAccount.text")}</p>
          <button onClick={handleModalOpen}>{t("account.deleteAccount.action")}</button>
        </div>
      </section>
      <ParentModal isOpen={isModalOpen} onClose={handleModalClose}>
        <DeleteAccountModal onClose={handleModalClose} />
      </ParentModal>
    </>
  );
};

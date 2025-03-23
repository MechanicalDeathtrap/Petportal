import style from "./account-settings.module.sass"
import { DeleteAccountModal } from "../../../modals/delete-account-modal/delete-account-modal.tsx";
import { useState } from "react";
import { ParentModal } from "../../../modals/parent-modal.tsx";

export const AccountSettings = () => {

  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <>
      <section className={style["account-settings"]}>
        <div className={style["account-settings__delete-account-container"]}>
          <h2>Удаление аккаунта</h2>
          <p>
            Вы можете удалить свой аккаунт, если больше не пользуетесь сервисом.
            Учтите, что это действие необратимо — все ваши данные и проекты будут
            удалены без возможности восстановления.
          </p>
          <button onClick={handleModalOpen}>Удалить аккаунт</button>
        </div>
      </section>
      <ParentModal isOpen={isModalOpen} onClose={handleModalClose} >
        <DeleteAccountModal onClose={handleModalClose} />
      </ParentModal>
    </>
  );
};

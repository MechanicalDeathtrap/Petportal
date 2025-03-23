import { Modal } from "@mui/base";
import { Fade } from "@mui/material";
import style from "./parent-modal.module.sass"

type modalProps = {
  children: JSX.Element
  isOpen: boolean
  onClose: () => void
}

export const ParentModal = (props: modalProps) =>{

  return(
    <>
      {
        props.isOpen && (
          <div className={style["parent-modal"]}>
            <Modal
              disableEnforceFocus
              keepMounted
              open={props.isOpen}
              onClose={props.onClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Fade in={props.isOpen}>
                <div className={style["parent-modal__info-container"]}>{props.children}</div>
              </Fade>
            </Modal>
          </div>
        )
      }
    </>
  )
}
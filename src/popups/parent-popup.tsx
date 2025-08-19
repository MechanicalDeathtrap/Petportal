import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";

type Props = {
  anchorEl: HTMLElement | null;
  id: string;
  popup: JSX.Element;
  isOpen: boolean;
  onPopupClose?: () => void;
};

export const ParentPopup = (props: Props) => {
  const id = props.anchorEl ? props.id : undefined;
  //const open = Boolean(props.anchorEl);

  const handleClickAway = (event: MouseEvent | TouchEvent) => {
    // Проверяем, что клик не по кнопке, которая открывает этот попап
    if (props.anchorEl && props.anchorEl.contains(event.target as Node)) {
      return; // Игнорируем клики по кнопке открытия
    }

    props.onPopupClose?.();
  };

  const popperContent = (
      <Popper
        sx={{ width: 330, zIndex: 2000 }}
        id={id}
        open={props.isOpen}
        anchorEl={props.anchorEl}
      >
        {props.popup}
      </Popper>
  );

  if (props.onPopupClose) {
      return (
        <ClickAwayListener onClickAway={handleClickAway}>
          {popperContent}
        </ClickAwayListener>
      );
  }
  
  return popperContent;

};

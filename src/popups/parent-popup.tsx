import Popper from "@mui/material/Popper";

type Props = {
  anchorEl: HTMLElement | null;
  id: string;
  popup: JSX.Element;
  isOpen: boolean;
};

export const ParentPopup = (props: Props) => {
  const id = props.anchorEl ? props.id : undefined;
  //const open = Boolean(props.anchorEl);

  return (
    // <ClickAwayListener onClickAway={clickAwayHandler}>
    <Popper
      sx={{ width: 330,  zIndex: 2000 }}
      id={id}
      open={props.isOpen}
      anchorEl={props.anchorEl}
    >
        {props.popup}
    </Popper>
  );
};

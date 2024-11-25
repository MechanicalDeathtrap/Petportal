import Popper from "@mui/material/Popper";

type Props = {
  anchorEl: HTMLElement | null;
  id: string;
  popup: JSX.Element;
};

export const ParentPopup = (props: Props) => {
  const id = props.anchorEl ? props.id : undefined;
  const open = Boolean(props.anchorEl);

  return (
    <Popper sx={{ width: 330 }} id={id} open={open} anchorEl={props.anchorEl}>
      {props.popup}
    </Popper>
  );
};

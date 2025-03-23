import { SideMenu } from "../side-menu/side-menu.tsx";
import style from "./account-layout.module.sass";
import { Outlet } from "react-router-dom";

export const AccountLayout = () => {
  return (
    <div className={style["account"]}>
      <SideMenu />
      <Outlet />
    </div>
  );
};

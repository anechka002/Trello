import {NavLink, type NavLinkRenderProps} from "react-router";
import s from "@/App.module.css";
import {PATH} from "@/common/routing/Routing.tsx";

export const Header = () => {

  const renderClassName = ({ isActive }: NavLinkRenderProps) =>
    isActive ? s.active : ""

  return (
      <header className={s.header}>
        <NavLink className={renderClassName} to={PATH.MAIN}>Main</NavLink>{" "}
        <NavLink className={renderClassName} to={PATH.AUTH}>Auth</NavLink>
      </header>
  );
};
import {NavLink, Outlet} from "react-router";
import {PATH} from "@/common/routing/Routing.tsx";

export const AuthLayout = () => {
  return (
    <div>
      <h3>Добро пожаловать!</h3>
      <nav>
        <NavLink to={PATH.LOGIN}>Login</NavLink> |{" "}
        <NavLink to={PATH.REGISTER}>Register</NavLink>
      </nav>
      <Outlet />
    </div>
  )
};
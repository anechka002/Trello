import s from './NotFound.module.css'
import {PATH} from "@/common/routing/Routing.tsx";
import {NavLink} from "react-router";

export const PageNotFound = () => {
  return (
    <div className={s.content}>
      <h1 className={s.title}>404</h1>
      <h2 className={s.subtitle}>page not found</h2>
      <NavLink to={PATH.MAIN}>Go to main page</NavLink>
    </div>
  )
}
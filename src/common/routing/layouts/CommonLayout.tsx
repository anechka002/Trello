import {Outlet} from "react-router";

export const CommonLayout = () => {
  return (
    <div>
      <header>layout from CommonLayout</header>
      <Outlet/>
      <footer>footer layout</footer>
    </div>
  );
};
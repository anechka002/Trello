import {Outlet} from "react-router";

export const Layout = () => {
  return (
    <div>
      <h3>Global Layout</h3>
        <Outlet/>
      <footer>🚀🔥</footer>
    </div>
  );
};
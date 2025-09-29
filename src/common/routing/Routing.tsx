import {Route, Routes} from "react-router";
import {TaskDetail} from "@/features/tasks/ui/TaskDetail/TaskDetail.tsx";
import {CommonLayout} from "@/common/routing/layouts/CommonLayout.tsx";
import {AuthLayout} from "@/common/routing/layouts/AuthLayout.tsx";
import {Login} from "@/features/auth/ui/Login.tsx";
import {Register} from "@/features/auth/ui/Register.tsx";
import {PageNotFound} from "@/common/components/notFound/NotFound.tsx";
import {Main} from "@/common/components/main/Main.tsx";
import {Layout} from "@/common/routing/layouts/Layout.tsx";

export const PATH = {
  MAIN: "/",
  AUTH: 'auth',
  LOGIN: "login",
  REGISTER: "register",
  TASK_DETAIL: "tasks/:taskId",
  NOTFOUND: '*',
} as const

export const Routing = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<CommonLayout />}>
          <Route path={PATH.MAIN} element={<Main/>}/>
          <Route path={PATH.TASK_DETAIL} element={<TaskDetail/>}/>
        </Route>

        <Route path={PATH.AUTH} element={<AuthLayout/>}>
        {/*<Route path={PATH.AUTH}>*/}
          <Route path={PATH.LOGIN} element={<Login />} />
          {/*<Route index element={<Login />} />*/}
          <Route path={PATH.REGISTER} element={<Register />} />
        </Route>

        <Route path={PATH.NOTFOUND} element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};
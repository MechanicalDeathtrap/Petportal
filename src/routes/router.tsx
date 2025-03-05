import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "../layout/Layout.tsx";
import { HomePage } from "../pages/homepage/homepage.tsx";
import { Projects } from "../pages/projects/projects.tsx";
import { AuthLayout } from "../components/auth/auth-layout.tsx";
import { Registration } from "../components/auth/registration/registration.tsx";
import { Login } from "../components/auth/login/login.tsx";
import { PasswordRecovery } from "../components/auth/password-recovery/password-recovery.tsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<Projects />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<PasswordRecovery />} />
      </Route>
    </>,
  ),
);

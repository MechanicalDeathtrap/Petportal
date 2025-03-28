import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "../layout/Layout.tsx";
import { HomePage } from "../pages/homepage/homepage.tsx";
import { Projects } from "../pages/projects/projects.tsx";
import { Registration } from "../components/auth/registration/registration.tsx";
import { Login } from "../components/auth/login/login.tsx";
import { PasswordRecovery } from "../components/auth/password-recovery/password-recovery.tsx";
import { AccountLayout } from "../components/account/account-layout/account-layout.tsx";
import { Auth } from "../pages/authorization/auth.tsx";
import { Account } from "../pages/account/account.tsx";
import { MyCabinet } from "../components/account/my-cabinet/my-cabinet.tsx";
import { MyProjects } from "../components/account/my-projects/my-projects.tsx";
import { MyReview } from "../components/account/my-review/my-review.tsx";
import { MyFavourites } from "../components/account/my-favourites/my-favourites.tsx";
import { AccountSettings } from "../components/account/account-settings/account-settings.tsx";
import { Chat } from "../pages/chat/chat.tsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/account" element={<AccountLayout />} />
        <Route path="/chat" element={<Chat />} />
        <Route element={<Account />}>
          <Route path={"/account"} element={<MyCabinet />} />
          <Route path={"/account/my-projects"} element={<MyProjects />} />
          <Route path={"/account/my-reviews"} element={<MyReview />} />
          <Route path={"/account/favourites"} element={<MyFavourites />} />
          <Route path={"/account/settings"} element={<AccountSettings />} />
        </Route>
      </Route>
      <Route element={<Auth />}>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<PasswordRecovery />} />
      </Route>
    </>,
  ),
);

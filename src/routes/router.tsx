import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "../layout/Layout.tsx";
import { HomePage } from "../pages/homepage/homepage.tsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </>,
  ),
);

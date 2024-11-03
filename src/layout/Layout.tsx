import { Header } from "../components/header/header.tsx";
import { Footer } from "../components/footer/footer.tsx";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

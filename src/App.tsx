import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.tsx";
import "./App.sass";
import { AuthInitializer } from "./components/authInitializer/AuthInitializer.tsx";
import { RolesProvider } from "./context/roles-context.tsx";

function App() {
  return (
    <AuthInitializer>
      <RouterProvider router={router} />
    </AuthInitializer>
  );
}

export default App;

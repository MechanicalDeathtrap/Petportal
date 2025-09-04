import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.tsx";
import "./App.sass";
import { AuthInitializer } from "./components/authInitializer/AuthInitializer.tsx";

function App() {
  return (
    <AuthInitializer>
      <RouterProvider router={router} />
    </AuthInitializer>
  );
}

export default App;

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.tsx";
import "./App.sass";
import { AuthInitializer } from "./components/authInitializer/AuthInitializer.tsx";
import { ChatRealtimeInitializer } from "./components/chat/chat-realtime-initializer.tsx";
import { RolesProvider } from "./context/roles-context.tsx";

function App() {
  return (
    <AuthInitializer>
      <ChatRealtimeInitializer />
      <RouterProvider router={router} />
    </AuthInitializer>
  );
}

export default App;

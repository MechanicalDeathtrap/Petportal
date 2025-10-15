import { ChatsSideList } from "../../components/chat/chats-side-list/chats-side-list.tsx";
import { ChatWindow } from "../../components/chat/chat-window/chat-window.tsx";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { API_BASE_URL, API_BASE_PATH } from "../../config/api";

export const Chat = () => {
  const connection = new HubConnectionBuilder()
    .withUrl(`${API_BASE_URL}${API_BASE_PATH}/Chat`)
    .withAutomaticReconnect()
    .build();

  // Establish the connection when the component is mounted
  connection.start().catch(() => {/* no-op for linter */});

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        margin: "43px 0",
      }}
    >
      <ChatsSideList />
      <ChatWindow />
    </div>
  );
};

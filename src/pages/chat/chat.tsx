import { ChatsSideList } from "../../components/chat/chats-side-list/chats-side-list.tsx";
import { ChatWindow } from "../../components/chat/chat-window/chat-window.tsx";
import { HubConnectionBuilder } from "@microsoft/signalr";

export const Chat = () => {
  const connection = new HubConnectionBuilder()
    .withUrl("http://localhost:5140/api/Chat")
    .withAutomaticReconnect()
    .build();

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

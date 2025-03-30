import { ChatsSideList } from "../../components/chat/chats-side-list/chats-side-list.tsx";
import { ChatWindow } from "../../components/chat/chat-window/chat-window.tsx";

export const Chat = () => {
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

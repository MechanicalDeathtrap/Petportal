import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { authStore } from "../../stores/auth-store";
import { userStore } from "../../stores/user-store";
import { chatStore } from "../../stores/chat-store";
import { chatRealtimeService } from "../../services/chat-realtime";

/** Держит SignalR-чат и счётчик непрочитанных для всей сессии. */
export const ChatRealtimeInitializer = observer(() => {
  useEffect(() => {
    if (!authStore.isAuthorized || !userStore.user.id) {
      void chatRealtimeService.stop();
      return;
    }

    let cancelled = false;

    const boot = async () => {
      await chatStore.loadChatRooms();
      if (cancelled) return;
      await chatRealtimeService.start();
    };

    void boot();

    const onVisibility = () => {
      if (
        !document.hidden &&
        window.location.pathname.startsWith("/chat") &&
        chatStore.activeChatId
      ) {
        chatStore.markChatRead(chatStore.activeChatId);
        chatStore.stopTitleFlash();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [authStore.isAuthorized, userStore.user.id]);

  return null;
});

// context/ChatbotContext.jsx (FIXED + STABLE VERSION)

import { createContext, useContext, useState, useCallback, useRef } from "react";

const ChatbotContext = createContext();

const API_URL =
  import.meta.env.VITE_API_URL_1 ||
  "http://localhost:5000";

// session stays stable per page load
function createSessionId() {
  return crypto.randomUUID();
}

export const ChatbotProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // stable session (does NOT trigger re-renders)
  const sessionIdRef = useRef(createSessionId());

  // initialize welcome message once
  const initializedRef = useRef(false);

  if (!initializedRef.current) {
    initializedRef.current = true;

    setMessages([
      {
        id: crypto.randomUUID(),
        sender: "bot",
        text:
          "Hi 👋 I'm Skyline Web Co.'s AI assistant. I can help you understand his work, scope projects, or book a consultation.",
      },
    ]);
  }

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);

  const sendMessage = useCallback(async (text) => {
    const cleanText = text?.trim();

    if (!cleanText) return;

    const userMsg = {
      id: crypto.randomUUID(),
      sender: "user",
      text: cleanText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": sessionIdRef.current,
        },
        body: JSON.stringify({
          message: cleanText,
          sessionId: sessionIdRef.current,
        }),
      });

      if (!res.ok) {
        let errMsg = "Request failed";
        try {
          const err = await res.json();
          errMsg = err?.error || errMsg;
        } catch {}
        throw new Error(errMsg);
      }

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid JSON from server");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: "bot",
          text: data?.reply || "No response received.",
        },
      ]);
    } catch (err) {
      console.error("[ChatbotContext] API error:", err.message);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: "bot",
          text:
            "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  return (
    <ChatbotContext.Provider
      value={{
        isOpen,
        messages,
        isTyping,
        sessionId: sessionIdRef.current,
        openChat,
        closeChat,
        sendMessage,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbotContext = () =>
  useContext(ChatbotContext);
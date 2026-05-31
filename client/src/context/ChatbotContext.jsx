// context/ChatbotContext.jsx (UPDATED — real backend calls)
// Replaces the mock sendMessage with a fetch to POST /api/chat.
// Manages sessionId in localStorage for session persistence across page refreshes.

import { createContext, useContext, useState, useCallback } from "react";
const uuidv4 = () => crypto.randomUUID();

const ChatbotContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Persist sessionId in localStorage so conversation survives refresh
function getOrCreateSessionId() {
  const stored = localStorage.getItem("chatbot_session_id");
  if (stored) return stored;
  const id = uuidv4();
  localStorage.setItem("chatbot_session_id", id);
  return id;
}

export const ChatbotProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi 👋 I'm Aayush's AI assistant. I can answer questions about his work, help scope your project, or book a consultation. How can I help?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(getOrCreateSessionId);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);

  const sendMessage = useCallback(
    async (text) => {
      if (!text.trim()) return;

      // Append user message immediately
      const userMsg = { id: Date.now(), sender: "user", text };
      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      try {
        const res = await fetch(`${API_URL}/api/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-session-id": sessionId,
          },
          body: JSON.stringify({ message: text, sessionId }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || `HTTP ${res.status}`);
        }

        const data = await res.json();

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: data.reply,
          },
        ]);
      } catch (err) {
        console.error("[ChatbotContext] API error:", err.message);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [sessionId]
  );

  return (
    <ChatbotContext.Provider
      value={{
        isOpen,
        messages,
        isTyping,
        sessionId,
        openChat,
        closeChat,
        sendMessage,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbotContext = () => useContext(ChatbotContext);
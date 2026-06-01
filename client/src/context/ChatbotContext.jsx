import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";

const ChatbotContext = createContext();

const API_URL = import.meta.env.VITE_API_URL_1 || "http://localhost:5000";

function createSessionId() {
  return crypto.randomUUID();
}

export const ChatbotProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // ✅ IMPORTANT: booking mode state
  const [isBookingMode, setIsBookingMode] = useState(false);

  const sessionIdRef = useRef(createSessionId());
  const initializedRef = useRef(false);

  // Welcome message
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    setMessages([
      {
        id: crypto.randomUUID(),
        sender: "bot",
        type: "info",
        text:
          "Hi 👋 I'm Skyline Web Co.'s AI assistant. I can help you explore services or book a consultation.",
      },
    ]);
  }, []);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);

  // -------------------------
  // NORMAL CHAT
  // -------------------------
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

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: "bot",
          text: data?.reply || "No response received.",
        },
      ]);

      // ✅ exit booking mode after normal response
      setIsBookingMode(false);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: "bot",
          text:
            "Sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  // -------------------------
  // BOOKING FLOW
  // -------------------------
  const startBookingFlow = useCallback(() => {
    setIsBookingMode(true);

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        sender: "bot",
        type: "schedule",
        text: `📅 Schedule a Meeting

Book a 1:1 session with us.

✔ Select date & time  
✔ Enter your email  
✔ Get instant Jitsi meeting link`,
      },
    ]);
  }, []);

  const exitBookingFlow = useCallback(() => {
    setIsBookingMode(false);
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

        // booking
        isBookingMode,
        startBookingFlow,
        exitBookingFlow,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbotContext = () => useContext(ChatbotContext);
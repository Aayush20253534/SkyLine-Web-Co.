import { createContext, useContext, useState } from "react";

const ChatbotContext = createContext();

export const ChatbotProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi 👋 I'm Aayush's AI assistant. How can I help?"
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);

  const sendMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text
      }
    ]);
  };

  return (
    <ChatbotContext.Provider
      value={{
        isOpen,
        messages,
        isTyping,
        setMessages,
        setIsTyping,
        openChat,
        closeChat,
        sendMessage
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbotContext = () => useContext(ChatbotContext);
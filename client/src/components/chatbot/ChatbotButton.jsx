import { Bot } from "lucide-react";
import { useChatbot } from "../../hooks/useChatbot";

const ChatbotButton = () => {
  const { openChat } = useChatbot();

  return (
    <button onClick={openChat} className="chatbot-button" aria-label="Open AI Assistant">
      <span className="chatbot-orbit-ring" />
      <span className="chatbot-orbit-ring chatbot-orbit-ring--2" />
      <Bot size={26} className="chatbot-bot-icon" />
    </button>
  );
};

export default ChatbotButton;
import ChatbotButton from "../chatbot/ChatbotButton";
import ChatbotWindow from "../chatbot/ChatbotWindow";
import { useChatbot } from "../../hooks/useChatbot";

const GlobalChatbot = () => {
  const { isOpen } = useChatbot();

  return (
    <div className="chatbot-root">
      {isOpen ? (
        <ChatbotWindow />
      ) : (
        <ChatbotButton />
      )}
    </div>
  );
};

export default GlobalChatbot;
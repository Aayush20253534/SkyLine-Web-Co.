import ChatbotHeader from "./ChatbotHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

const ChatbotWindow = () => {
  return (
    <div className="chat-window">
      <ChatbotHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

export default ChatbotWindow;
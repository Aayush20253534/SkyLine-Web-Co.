import { X, Sparkles } from "lucide-react";
import { useChatbot } from "../../hooks/useChatbot";

const ChatbotHeader = () => {
  const { closeChat } = useChatbot();

  return (
    <div className="chat-header">
      <div className="chat-header-info">
        <div className="chat-header-avatar">
          <Sparkles size={16} />
        </div>
        <div>
          <h3>AI Assistant</h3>
          <span className="chat-status">
            <span className="chat-status-dot" />
            Online
          </span>
        </div>
      </div>

      <button onClick={closeChat} className="chat-close-btn" aria-label="Close chat">
        <X size={18} />
      </button>
    </div>
  );
};

export default ChatbotHeader;
import { useState } from "react";
import { Send } from "lucide-react";
import { useChatbot } from "../../hooks/useChatbot";

const ChatInput = () => {
  const [text, setText] = useState("");
  const { sendMessage } = useChatbot();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    sendMessage(text);
    setText("");
  };

  return (
    <form
      className="chat-input"
      onSubmit={handleSubmit}
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask something..."
      />

      <button type="submit">
        <Send size={18} />
      </button>
    </form>
  );
};

export default ChatInput;
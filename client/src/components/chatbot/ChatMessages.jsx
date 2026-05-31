import { useEffect, useRef } from "react";
import { useChatbot } from "../../hooks/useChatbot";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import QuickPrompts from "./QuickPrompts";

const ChatMessages = () => {
  const { messages, isTyping } = useChatbot();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const showQuickPrompts = messages.length === 1 && messages[0].sender === "bot";

  return (
    <div className="chat-messages">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {showQuickPrompts && <QuickPrompts />}

      {isTyping && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
// components/chat/MessageBubble.jsx
import React from "react";
import ReactMarkdown from "react-markdown";

const MessageBubble = ({ message }) => {
  // 1. Safety Guard: Return null safely if message is completely missing
  if (!message) return null;

  // 2. Safe Fallback: Fallback to 'bot' if sender field is missing or malformed
  const senderType = message.sender || "bot";
  const isBot = senderType === "bot";
  const messageText = message.text || "";

  return (
    /* 3. Structure Sync: 
      Top wrapper MUST use the '.message' selector for correct flex alignment.
      Inner child uses '.message-bubble' for custom color layouts and border configurations.
    */
    <div className={`message ${isBot ? "bot" : "user"}`}>
      <div className="message-bubble">
        {isBot ? (
          /* BOT MESSAGE → RENDER MARKDOWN WITH DEDICATED CLASS */
          <div className="markdown">
            <ReactMarkdown>{messageText}</ReactMarkdown>
          </div>
        ) : (
          /* USER MESSAGE → PLAIN TEXT WITH CLEAN MARGINS */
          <p style={{ margin: 0 }}>{messageText}</p>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
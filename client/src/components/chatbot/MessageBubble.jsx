import React from "react";
import ReactMarkdown from "react-markdown";

const MessageBubble = ({ message }) => {
  if (!message) return null;

  const isBot = message.sender === "bot";

  // ✅ Special schedule card
  if (message.type === "schedule") {
    return (
      <div className="message bot">
        <div className="message-bubble schedule-card">
          <div style={{ whiteSpace: "pre-wrap" }}>{message.text}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`message ${isBot ? "bot" : "user"}`}>
      <div className="message-bubble">
        {isBot ? (
          <div className="markdown">
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>
        ) : (
          <p style={{ margin: 0 }}>{message.text}</p>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
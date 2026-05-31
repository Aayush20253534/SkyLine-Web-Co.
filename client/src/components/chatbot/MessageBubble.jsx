const MessageBubble = ({ message }) => {
  return (
    <div className={`message ${message.sender}`}>
      <div className="message-bubble">{message.text}</div>
    </div>
  );
};

export default MessageBubble;
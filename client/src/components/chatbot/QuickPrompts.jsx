import { useChatbot } from "../../hooks/useChatbot";

const QUICK_PROMPTS = [
  "What can you do?",
  "Tell me about Skyline Web Co.",
  "View projects",
  "Schedule a Meeting",
];

const QuickPrompts = () => {
  const { sendMessage, startBookingFlow } = useChatbot();

  return (
    <div className="quick-prompts">
      {QUICK_PROMPTS.map((prompt) => (
        <button
          key={prompt}
          className="quick-prompt-btn"
          onClick={() => {
            if (prompt === "Schedule a Meeting") {
              startBookingFlow();
            } else {
              sendMessage(prompt);
            }
          }}
        >
          {prompt}
        </button>
      ))}
    </div>
  );
};

export default QuickPrompts;
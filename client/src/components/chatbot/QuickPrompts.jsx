import { useChatbot } from "../../hooks/useChatbot";

const QUICK_PROMPTS = [
  "What can you do?",
  "Tell me about Skyline Web Co.",
  "View projects",
  "Get in touch",
];

const QuickPrompts = () => {
  const { sendMessage } = useChatbot();

  return (
    <div className="quick-prompts">
      {QUICK_PROMPTS.map((prompt) => (
        <button
          key={prompt}
          className="quick-prompt-btn"
          onClick={() => sendMessage(prompt)}
        >
          {prompt}
        </button>
      ))}
    </div>
  );
};

export default QuickPrompts;
import { useChatbotContext } from "../context/ChatbotContext";

export const useChatbot = () => {
  return useChatbotContext();
};
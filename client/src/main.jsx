import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";

import "./styles/globals.css";
import "./styles/chatbot.css";

import { ThemeProvider } from "./context/ThemeContext";
import { ChatbotProvider } from "./context/ChatbotContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <ChatbotProvider>
        <BrowserRouter>
          <App />

          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 4000,
              style: {
                borderRadius: "12px",
                padding: "12px 16px",
                fontSize: "14px",
              },
              success: {
                duration: 4000,
              },
              error: {
                duration: 5000,
              },
            }}
          />
        </BrowserRouter>
      </ChatbotProvider>
    </ThemeProvider>
  </React.StrictMode>
);
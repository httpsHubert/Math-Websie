import React, { useState } from "react";
import ChatHistory from "./ChatHistory";
import Loading from "./Loading";
import { generateResponse } from "../backend/gemini-api";

const INITIAL_PROMPT =
  `Jesteś asystentem matematycznym, najlepszym z każdej dziedziny matematycznej. Chcesz dokładnie odpowiedzieć użytkownikowi jak najlepiej tylko możesz.
  - **Wszystkie wyrażenia matematyczne generuj w notacji LaTeX, umieszczając je w znacznikach MathJax:**
  - **Inline**: Używaj \`\\(...\\)\` dla krótkich wyrażeń (np. \( x^2 + 2x + 1 \)).
  - **Blokowe**: Używaj \`\\[ ... \\]\` dla dłuższych wzorów (np. 
    \[
    x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
    \]
    ).`;

const AskAssistant = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      const contextPrompt = chatHistory
        .map(
          (entry) =>
            `${entry.type === "user" ? "User" : "Bot"}: ${entry.message}`
        )
        .join("\n");

      const fullPrompt = `${INITIAL_PROMPT}\n${contextPrompt}\nUser: ${userInput}\nBot:`;

      const responseText = await generateResponse(fullPrompt);

      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: responseText },
      ]);
    } catch {
      console.error("Error sending message");
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">Chatbot</h1>

      <div className="chat-container rounded-lg shadow-md p-4">
        <ChatHistory chatHistory={chatHistory} />
        <Loading isLoading={isLoading} />
      </div>

      <div className="flex mt-4">
        <input
          type="text"
          className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={userInput}
          onChange={handleUserInput}
        />
        <button
          className="px-4 py-2 ml-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
          onClick={sendMessage}
          disabled={isLoading}
        >
          Send
        </button>
      </div>

      <button
        className="mt-4 block px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 focus:outline-none"
        onClick={clearChat}
      >
        Clear Chat
      </button>
    </div>
  );
};

export default AskAssistant;

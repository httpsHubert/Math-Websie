import React from "react";
import ReactMarkdown from "react-markdown";

interface ChatMessage {
    type: 'user' | 'bot';
    message: string;
  }

const ChatHistory = ({ chatHistory }: { chatHistory: ChatMessage[] }) => {
  return (
    <>
      {chatHistory.map((message: any, index: any) => (
        <div
          key={index}
          className={`flex items-start py-2 px-4 rounded-lg ${
            message.type === "user"
              ? "bg-gray-100 text-gray-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {message.type === "user" && (
            <span className="mr-2 font-bold text-gray-600">You:</span>
          )}

          <div className="text-left">
            <ReactMarkdown>{message.message}</ReactMarkdown>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatHistory;
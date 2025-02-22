import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeMathjax from "rehype-mathjax";

export interface ChatMessage {
    type: "user" | "bot";
    message: string;
}

interface ChatHistoryProps {
    chatHistory: ChatMessage[];
}

const ChatHistory = ({ chatHistory }: ChatHistoryProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (window.MathJax && chatHistory) {
                (window.MathJax as any).typesetPromise();
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [chatHistory]);

    return (
        <>
            {chatHistory.map((lastChat, index) => (
                <div
                    key={index}
                    className={`flex items-start p-4 rounded-lg mt-5 ${
                        lastChat.type === "user"
                            ? "bg-[#0d1b2a] text-[#e0e1dd]"
                            : "bg-[#415a77] text-[#e0e1dd]"
                    }`}>
                    {lastChat.type === "user" && (
                        <span className="mr-2 font-bold text-[#fffcf2]">
                            Ty:
                        </span>
                    )}

                    {lastChat.type === "bot" && (
                        <span className="mr-2 font-bold text-[#fffcf2]">
                            Asystent:
                        </span>
                    )}

                    <div className="text-left">
                        <ReactMarkdown rehypePlugins={[rehypeMathjax]}>
                            {lastChat.message}
                        </ReactMarkdown>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ChatHistory;

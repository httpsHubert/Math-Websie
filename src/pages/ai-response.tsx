import { useState, useEffect, InputHTMLAttributes } from 'react'
import { generateResponse } from '../backend/gemini-api'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    type: "functionProperties" | "chatMessage",
    prompt: string
}

const AiResponse = ({ type, prompt, ...props }: Props) => {
    const [aiResponse, setAiResponse] = useState<string | null>(null);

    useEffect(() => {
        const fetchAiResponse = async () => {
            try {
                const response = await generateResponse(prompt);
                setAiResponse(response);
            } catch (error) {
                console.error("Błąd pobierania odpowiedzi AI:", error);
            }
        };

        fetchAiResponse();
    }, [prompt]);

    useEffect(() => {
        if (window.MathJax) {
          window.MathJax.typesetPromise();
        }
    }, [aiResponse]);

    const classes = {
        functionProperties: "bg-red-100",
        chatMessage: "bg-blue-100"
    }

    const formattedResponse = aiResponse
    ? aiResponse.replace(/\*\*(.*?)\*\*/g, '<br /><strong>$1</strong><br />')
    : "";

    return (
        <p className={classes[type]} dangerouslySetInnerHTML={{ __html: formattedResponse }} {...props} />
    )
}

export default AiResponse
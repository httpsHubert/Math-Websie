import { useState, useEffect, InputHTMLAttributes } from "react";
import { generateResponse } from "../backend/gemini-api";
import InterpretTest from "./interpret-test";
import FunctioProperties from "./function-properties";
import Loading from "./Loading";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    type: "functionProperties" | "testKnowladge";
    prompt: string;
}

const AiResponse = ({ type, prompt, ...props }: Props) => {
    const [aiResponse, setAiResponse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchAiResponse = async () => {
            try {
                setIsLoading(true);

                const response = await generateResponse(prompt);

                if (response.toLowerCase().includes("nieprawidłowy dział")) {
                    setAiResponse(
                        "<p class='text-red-500'>Error: Nieprawidłowy dział matematyczny</p>"
                    );
                } else {
                    setAiResponse(response);
                }

                setIsLoading(false);
            } catch (error) {
                console.error("Błąd pobierania odpowiedzi AI:", error);
                setAiResponse(
                    "<p class='text-red-500'>Błąd generowania testu</p>"
                );
            }
        };

        fetchAiResponse();
    }, [prompt]);

    useEffect(() => {
        if (window.MathJax) {
            window.MathJax.typesetPromise();
        }
    }, [aiResponse]);

    console.log(aiResponse);

    const formattedResponse = aiResponse
        ? aiResponse.replace(
              /\*\*(.*?)\*\*/g,
              "<br /><strong>$1</strong><br />"
          )
        : "";

    return (
        <>
            {type === "functionProperties" ? (
                <>
                    <Loading isLoading={isLoading} />
                    <div {...props}>
                        <FunctioProperties
                            response={aiResponse != null ? aiResponse : ""}
                        />
                    </div>
                </>
            ) : (
                <div {...props}>
                    {<InterpretTest response={formattedResponse} />}
                </div>
            )}
        </>
    );
};

export default AiResponse;

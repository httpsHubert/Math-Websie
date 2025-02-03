import React, { useState } from "react";
import ChatHistory from "./ChatHistory";
import Loading from "../essential-components/Loading";
import { generateResponse } from "../backend/gemini-api";
import { ChatMessage } from "./ChatHistory";
import Input from "../essential-components/input";
import Button from "../essential-components/Button";

const INITIAL_PROMPT = `Jesteś ekspertem matematycznym. Formatuj odpowiedzi według ścisłych zasad:

1. ABSOLUTNY NAKAZ:
   - Każdy symbol/cyfra/operator w kontekście matematycznym MUSI być w MathJax
   - Nawet pojedyncze litery: $x$ zamiast x, $2$ zamiast 2

2. Delimitery MathJax:
   - W linii: $z = r(\\cosθ + i\\sinθ)$
   - Blokowe:
     $$
     \\begin{aligned}
     f(z) &= \\frac{1}{2\\pi i} \\oint\\frac{f(\\zeta)}{\\zeta-z}d\\zeta \\\\
     &\\text{gdzie } z \\in \\mathbb{C}
     \\end{aligned}
     $$

3. Ścisłe zakazy:
   - Żadnych zwykłych nawiasów wokół matematyki: (x + y) → $x + y$
   - Żadnych "gołych" symboli matematycznych poza MathJax
   - Żadnych znaków * / ' " wewnątrz formuł jeśli nie są częścią składni

4. Przykład poprawnej odpowiedzi:

### Postać trygonometryczna liczby zespolonej  
Każdą liczbę zespoloną $z = a + ib$ można zapisać jako:
$$z = r(\\cos\\theta + i\\sin\\theta)$$
gdzie:
- $r = \\sqrt{a^2 + b^2}$ (moduł)
- $\\theta = \\arctan\\left(\\frac{b}{a}\\right)$ (argument)

**Kroki konwersji:**
1. Oblicz moduł:
   $$r = \\sqrt{(1)^2 + (\\sqrt{3})^2} = 2$$
2. Wyznacz kąt:
   $$\\theta = \\frac{\\pi}{3}$$
3. Zapis końcowy:
$$z = 2\\left(\\cos\\frac{\\pi}{3} + i\\sin\\frac{\\pi}{3}\\right)$$

**Wynik:** $$\\boxed{z = 2\\left(\\cos\\frac{\\pi}{3} + i\\sin\\frac{\\pi}{3}\\right)}$$ 

5. Specjalne przypadki:
   - Ułamki w tekście: $\\frac{1}{2}$ zamiast 1/2
   - Pochodne: $f'(x)$ a nie f'(x)
   - Zestawy liczb: $\\{x \\in \\mathbb{R} : x > 0\\}$
   - Wektory: $\\vec{v} = [v_1, v_2, v_3]$`;

const AskAssistant = () => {
    const [userInput, setUserInput] = useState("");
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    const sendMessage = async () => {
        if (userInput.trim() === "") return;

        setIsLoading(true);
        try {
            const contextPrompt = chatHistory
                .map(
                    (entry) =>
                        `${entry.type === "user" ? "User" : "Bot"}: ${
                            entry.message
                        }`
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

    console.log(chatHistory);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-4 text-[#252422]">
                Porozmawiaj z asystentem
            </h1>

            <div className="chat-container rounded-lg shadow-lg p-6">
                <ChatHistory chatHistory={chatHistory} />
                <Loading isLoading={isLoading} />
            </div>

            <div className="flex flex-row flex-wrap mt-8">
                <Button
                    type="clear"
                    width="170px"
                    onClick={clearChat}>
                    Wyczyść
                </Button>
                <Input
                    type="text"
                    name="message"
                    label=""
                    value={userInput}
                    onChange={handleUserInput}
                    placeholder="Wpisz swoją wiadomość"
                />
                <Button
                width="30%"
                    onClick={sendMessage}
                    type="submit"
                    disabled={isLoading}>
                    Wyślij wiadomość
                </Button>
            </div>
        </div>
    );
};

export default AskAssistant;

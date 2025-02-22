import { useState } from "react";
import Input from "../essential-components/input";
import Button from "../essential-components/Button";
import AiResponse from "../essential-components/ai-response";

const TestKnowledge = () => {
    const [mathSection, setMathSection] = useState("");
    const [difficulty, setDifficulty] = useState("Łatwy");
    const [numberOfQuestions, setNumberOfQuestions] = useState("5");
    const [visibility, setVisibility] = useState(true);

    const handleButtonClick = () => {
        const mathSectionInput = document.getElementById(
            "mathSection"
        ) as HTMLInputElement;
        setMathSection(mathSectionInput.value || "");

        setVisibility(false);
    };

    const prompt = `
    Jesteś ekspertem matematycznym. Wygeneruj test w formacie JSON z następującymi parametrami:
    - Dział: ${mathSection}
    - Poziom trudności: ${difficulty}
    - Liczba pytań: ${numberOfQuestions} | generuj ZAWSZE ALE TO ZAWSZE odpowiednią ilość - TYLE ILE PODANO, albo 5 albo 10 albo 20

    Wymagania:
    1. Tylko pytania matematyczne - jeśli dział nie jest matematyczny, zwróć {"error": "Nieprawidłowy dział matematyczny"}
    2. Format pytań wielokrotnego wyboru (A-D)
    3. Dokładnie jedna poprawna odpowiedź na pytanie
    4. Wyrażenia matematyczne w MathJax
    5. Absolutny zakaz używania \\( \\) ani innych delimiterów
    6. Struktura JSON: Wygeneruj test i ZACZNIJ OD CZYSTEGO JSON (bez \`\`\`json ani innych znaków) w następującym formacie:
    {
      "test": [
        {
          "question": "Treść...",
          "options": {"A": "...", "B": "...", "C": "...", "D": "..."},
          "correct_answer": "A",
          "explanation": "Bardzo szczegółowe wyjaśnienie które pozwala zrozumieć co powinno się zrobić w tym"
        },
      ]
    }
    7. KAŻDY backslash w LaTeXu musi być podwojony (np. \\\sqrt → \\\\sqrt)
    8. KAŻDY element JSONA powinien być opatrzony w "", każdy klucz i każda wartość
    9. Każdą odpowiedź opatul w $ odpowiedź $

    Przykładowa struktura z prawidłowym escapowaniem:
    {
      "test": [
        {
          "question": "Oblicz $\\\\int_0^1 x^2 dx$",
          "options": {
            "A": "$\\\\frac{1}{3}$",
            "B": "$\\\\frac{1}{2}$",
            "C": "$1$",
            "D": "$0$"
          },
          "correct_answer": "A",
          "explanation": "Całka wynosi $\\\\left[\\\\frac{x^3}{3}\\\\right]_0^1$"
        }
      ]
    }
    
    Wygeneruj test i TYLKO JSON bez dodatkowego tekstu.
    `;

    console.log(prompt);

    return (
        <div className="mx-auto px-4 py-8 text-[#252422] flex flex-col gap-5">
            {visibility ? (
                <>
                    <h1 className="text-4xl font-bold">Sprawdź swoją wiedzę</h1>
                    <Input
                        id="mathSection"
                        label="Wpisz z jakiego działu matematycznego chciałbyś przetestować swoją wiedzę"
                        type="text"
                        name="test-knowledge"
                    />
                    <div className="relative w-1/10 mt-2 mx-auto">
                        <p className="text-gray-400 text-sm mb-1">
                            Wybierz poziom trudności:
                        </p>
                        <select
                            className="w-full mt-2 bg-[#1b263b] text-white text-lg font-semibold p-3 rounded-xl shadow-md outline-none transition duration-300 ease-in-out focus:ring-2 focus:ring-[#0d1b2a] focus:bg-[#0d1b2a] hover:bg-[#162a46]"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}>
                            <option
                                value="Łatwy"
                                className="bg-[#0d1b2a] text-white hover:bg-[#162a46]">
                                Łatwy
                            </option>
                            <option
                                value="Średni"
                                className="bg-[#0d1b2a] text-white hover:bg-[#162a46]">
                                Średni
                            </option>
                            <option
                                value="Trudny"
                                className="bg-[#0d1b2a] text-white hover:bg-[#162a46]">
                                Trudny
                            </option>
                        </select>
                    </div>

                    <div className="relative w-1/10 mt-2 mx-auto">
                        <p className="text-gray-400 text-sm mb-1">
                            Wybierz ilość pytań:
                        </p>
                        <select
                            className="w-full bg-[#1b263b] mt-2 text-white text-lg font-semibold p-3 rounded-xl shadow-md outline-none transition duration-300 ease-in-out focus:ring-2 focus:ring-[#0d1b2a] focus:bg-[#0d1b2a] hover:bg-[#162a46]"
                            value={numberOfQuestions}
                            onChange={(e) =>
                                setNumberOfQuestions(e.target.value)
                            }>
                            <option
                                value="5"
                                className="bg-[#0d1b2a] text-white hover:bg-[#162a46]">
                                5
                            </option>
                            <option
                                value="10"
                                className="bg-[#0d1b2a] text-white hover:bg-[#162a46]">
                                10
                            </option>
                            <option
                                value="20"
                                className="bg-[#0d1b2a] text-white hover:bg-[#162a46]">
                                20
                            </option>
                        </select>
                    </div>

                    <Button type="submit" onClick={handleButtonClick}>
                        Wygeneruj test
                    </Button>
                </>
            ) : (
                <div className="text-center text-2xl font-bold">
                    <AiResponse prompt={prompt} type="testKnowladge" />
                </div>
            )}
        </div>
    );
};

export default TestKnowledge;

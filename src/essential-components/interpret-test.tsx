import { useState, useEffect } from "react";
import Loading from "./Loading";
import Button from "../essential-components/Button";

interface Props {
    response: string | null;
}

interface TestData {
    test?: Array<{
        question: string;
        options: Record<string, string>;
        correct_answer: string;
        explanation?: string;
    }>;
    error?: string;
}

const InterpretTest = ({ response }: Props) => {
    const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [parsedData, setParsedData] = useState<TestData | null>(null);

    useEffect(() => {
        if (response) {
            try {
                const data = JSON.parse(response);
                setParsedData(data);
            } catch (error) {
                console.error("Błąd parsowania:", error);
                setParsedData({ error: "Błędny format testu" });
            }
        }
    }, [response]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (window.MathJax && parsedData?.test) {
                (window.MathJax as any).typesetPromise();
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [parsedData, submitted, userAnswers]);

    const calculateScore = () => {
        if (!parsedData?.test) return;

        let correct = 0;
        parsedData.test.forEach((question, index) => {
            if (userAnswers[index] === question.correct_answer) {
                correct++;
            }
        });
        setScore(correct);
        setSubmitted(true);
    };

    if (!response) return <Loading isLoading={true} />;

    try {
        if (parsedData?.error) {
            return <div className="text-red-500">{parsedData.error}</div>;
        }

        if (!parsedData?.test || !Array.isArray(parsedData.test)) {
            throw new Error("Nieprawidłowy format testu");
        }

        return (
            <div className="max-w-5xl mx-auto space-y-10 px-4">
                {parsedData.test.map((question, index) => (
                    <div
                        key={index}
                        className="rounded-lg p-6 shadow-lg bg-white">
                        <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-lg font-semibold text-[#415a77]">
                                Pytanie {index + 1}
                            </span>
                            <span className="text-sm text-gray-500">
                                /{parsedData?.test?.length}
                            </span>
                        </div>

                        <div
                            className="prose prose-lg mb-6 [&_p]:m-0 [&_ul]:mt-2"
                            dangerouslySetInnerHTML={{
                                __html: question.question,
                            }}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {Object.entries(question.options).map(
                                ([key, value]) => {
                                    const isSelected =
                                        userAnswers[index] === key;
                                    const isCorrect =
                                        key === question.correct_answer;
                                    const showResults =
                                        submitted && (isSelected || isCorrect);

                                    return (
                                        <div
                                            key={key}
                                            className={`relative rounded-lg transition-all
                            ${
                                showResults
                                    ? isCorrect
                                        ? "border-2 border-green-500"
                                        : "border-2 border-red-500"
                                    : ""
                            }
                            ${
                                isSelected && !submitted
                                    ? "border-2 border-[#415a77] bg-blue-50"
                                    : "bg-[#e0e1dd]"
                            }
                          `}>
                                            <input
                                                type="radio"
                                                id={`q${index}_${key}`}
                                                name={`question_${index}`}
                                                value={key}
                                                onChange={(e) =>
                                                    setUserAnswers((prev) => ({
                                                        ...prev,
                                                        [index]: e.target.value,
                                                    }))
                                                }
                                                disabled={submitted}
                                                className="absolute opacity-0 w-0 h-0 hidden"
                                            />
                                            <label
                                                htmlFor={`q${index}_${key}`}
                                                className={`flex items-start p-4 cursor-pointer
                              ${
                                  showResults
                                      ? isCorrect
                                          ? "bg-green-50"
                                          : "bg-red-50"
                                      : ""
                              }
                            `}>
                                                <div
                                                    className={`flex items-center h-5 w-5 mt-1 mr-3 border rounded-full
                              ${
                                  isSelected
                                      ? "border-blue-500 bg-blue-500"
                                      : "border-gray-400"
                              }
                            `}>
                                                    {isSelected && (
                                                        <div className="w-2.5 h-2.5 bg-white rounded-full m-auto" />
                                                    )}
                                                </div>
                                                <div className="flex-1 prose [&_p]:m-0">
                                                    <span className="font-medium text-gray-700">
                                                        {key}:
                                                    </span>
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: value,
                                                        }}
                                                        className="ml-2"
                                                    />
                                                </div>
                                                {showResults && (
                                                    <span className="ml-3 text-xl">
                                                        {isCorrect
                                                            ? "✅"
                                                            : isSelected
                                                            ? "❌"
                                                            : ""}
                                                    </span>
                                                )}
                                            </label>
                                        </div>
                                    );
                                }
                            )}
                        </div>

                        {submitted && question.explanation && (
                            <div className="mt-5 p-3 bg-gray-100 rounded border border-gray-200 prose">
                                <p className="font-medium text-sm text-gray-600 p-1">
                                    Wyjaśnienie:
                                </p>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: question.explanation,
                                    }}
                                />
                            </div>
                        )}
                    </div>
                ))}

                {!submitted ? (
                    <Button onClick={calculateScore} type="submit">
                        Sprawdź odpowiedzi
                    </Button>
                ) : (
                    <div className="text-center p-6 bg-white rounded-lg shadow-lg">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            Twój wynik: {score}/{parsedData.test.length}
                        </h3>
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                            <div
                                className="bg-[#1b263b] h-3 rounded-full transition-all duration-500"
                                style={{
                                    width: `${
                                        (score / parsedData.test.length) * 100
                                    }%`,
                                }}
                            />
                        </div>
                        <p className="text-lg text-gray-600">
                            Procent poprawnych odpowiedzi:{" "}
                            <span className="font-semibold text-[#1b263b]">
                                {(
                                    (score / parsedData.test.length) *
                                    100
                                ).toFixed(1)}
                                %
                            </span>
                        </p>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error("Błąd parsowania odpowiedzi:", error);
        return (
            <div className="text-red-500">
                Błąd formatowania testu. Proszę spróbować ponownie.
                <details className="mt-2 text-xs">{response}</details>
            </div>
        );
    }
};

export default InterpretTest;

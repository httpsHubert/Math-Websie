import React, { useState, useEffect } from "react";
import Input from "../InpuComponent/input";
import FunctionPlot from "../backend/function-plot";
import Button from "../Button";
import { calculateDerivative } from "../backend/calculations";
import { generateResponse } from "../backend/gemini-api";
import AiResponse from "./ai-response";


const UnderstandEquation = () => {
    const [isSent, setIsSent] = useState(false)
    const [func, setFunc] = useState("")

    const functionDerivative = calculateDerivative(func, "x")

    const handleButtonClick = () => {
        const inputElement = document.querySelector("#function") as HTMLInputElement;
        
        setFunc(inputElement.value || "")
        setIsSent(true)
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (value.toString().includes("^")) {
            let number = value.replace("^", "<sup>")
            number += "</sup>"
            value = number
        }
    }

    const prompt = `Od tego momentu mów po polsku. Jesteś profesorem matematyki i twoim zadaniem jest analiza funkcji ${func}.
Podaj następujące własności w podanym formacie:

- **Wszystkie wyrażenia matematyczne generuj w notacji LaTeX, umieszczając je w znacznikach MathJax:**
  - **Inline**: Używaj \`\\(...\\)\` dla krótkich wyrażeń (np. \( x^2 + 2x + 1 \)).
  - **Blokowe**: Używaj \`\\[ ... \\]\` dla dłuższych wzorów (np. 
    \[
    x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
    \]
    ).

- **Dziedzina** (Dziedzina funkcji to zbiór wszystkich liczb, które możemy podstawić do wzoru funkcji. Przykłady: 
  - dla \( y = \sqrt{x} \) mamy \( D = \langle 0, \infty) \), ponieważ nie można pierwiastkować liczb ujemnych.
  - dla \( y = \frac{1}{x} \) mamy \( D = \mathbb{R} \\ {0} \), ponieważ nie można dzielić przez 0.)

- **Zbiór wartości** (Zbiór wartości to zbiór wszystkich liczb, które funkcja może przyjmować. Przykłady:
  - dla \( y = x^2 \) mamy \( ZW = \langle 0, \infty) \), ponieważ podnosząc liczbę do kwadratu, otrzymujemy liczby nieujemne.
  - dla \( y = x + 1 \) mamy \( ZW = \mathbb{R} \), ponieważ funkcja przyjmuje wszystkie wartości rzeczywiste.)

- **Miejsca zerowe** (Miejsce zerowe to liczba, dla której funkcja przyjmuje wartość 0. Przykłady:
  - dla \( y = x + 2 \) mamy \( x_0 = -2 \), ponieważ podstawiając -2 za x, otrzymujemy 0.
  - dla \( y = 2x - 6 \) mamy \( x_0 = 3 \), ponieważ podstawiając 3 za x, otrzymujemy 0.)

- **Monotoniczność** (Określ, w jakich przedziałach funkcja jest rosnąca, a w jakich malejąca. Przykłady:
  - dla \( y = x^2 \) funkcja maleje dla \( (-\infty, 0) \) i rośnie dla \( (0, \infty) \).
  - dla \( y = \sin x \) funkcja rośnie w przedziałach \( \langle -\frac{\pi}{2} + 2k\pi, \frac{\pi}{2} + 2k\pi \rangle \) i maleje w \( \langle \frac{\pi}{2} + 2k\pi, \frac{3\pi}{2} + 2k\pi \rangle \).)

- **Różnowartościowość** (Funkcja jest różnowartościowa, jeśli różne argumenty dają różne wartości. Przykłady:
  - \( y = x + 3 \) jest różnowartościowa, ponieważ każda wartość funkcji odpowiada dokładnie jednej wartości \( x \).
  - \( y = x^2 \) nie jest różnowartościowa, ponieważ np. \( (-2)^2 = 2^2 \).)

- **Parzystość** (Funkcja jest parzysta, jeśli \( f(x) = f(-x) \), nieparzysta, jeśli \( f(-x) = -f(x) \). Przykłady:
  - \( y = x^2 \) jest parzysta, bo \( (-x)^2 = x^2 \).
  - \( y = x^3 \) jest nieparzysta, bo \( (-x)^3 = -x^3 \).)

- **Okresowość** (Funkcja jest okresowa, jeśli istnieje liczba \( T \), taka że \( f(x + T) = f(x) \). Przykłady:
  - \( y = \sin x \) jest okresowa z okresem podstawowym \( T = 2\pi \).
  - \( y = \cos x \) jest okresowa z okresem \( T = 2\pi \).)

- **Różniczkowalność** (Funkcja jest różniczkowalna, jeśli posiada pochodną w każdym punkcie swojej dziedziny i jej wartość jest skończona. Przykłady:
  - \( y = x^2 \) jest różniczkowalna w całej dziedzinie, ponieważ jej pochodna \( f'(x) = 2x \) istnieje dla każdego \( x \).
  - \( y = |x| \) nie jest różniczkowalna w punkcie \( x = 0 \), ponieważ lewa i prawa pochodna mają różne wartości.)

- **Minimum i maksimum** (Podaj wartości i punkty, w których funkcja osiąga swoje minimum lub maksimum. Przykłady:
  - dla \( y = x^2 \) funkcja ma minimum globalne w punkcie \( (0,0) \).
  - dla \( y = \sin x \) funkcja osiąga minimum \( -1 \) i maksimum \( 1 \) w odpowiednich punktach.)

Twoja odpowiedź powinna wyglądać następująco (z wypełnionymi wartościami):

**Dziedzina**  
\( D = ... \)  

**Zbiór wartości**  
\( ZW = ... \)  

**Miejsca zerowe**  
\( x_0 = ... \)  

**Monotoniczność**  
Funkcja jest ...  

**Różnowartościowość**  
Funkcja ...  

**Parzystość**  
Funkcja ...  

**Okresowość**  
Funkcja ...  

**Różniczkowalność**  
Funkcja ...  

**Minimum i maksimum**  
Funkcja ...  

Nie podawaj żadnych dodatkowych wyjaśnień ani wstępów, tylko wynik w podanym formacie.`;

    return (
        <div className="w-9/12 mx-auto h-full bg-[#DDDBCB] flex flex-row">
            <div className="w-6/12">
                <h1 className="text-3xl">Zrozum funkcję</h1>
                <Input
                    id="function"
                    type="text"
                    name="function"
                    label="Wpisz nazwę funkcji"
                    onChange={handleOnChange}
                />
                <Button type="submit" onClick={handleButtonClick}>
                    Narysuj funkcję
                </Button>
                {(isSent) && (
                    <AiResponse type="functionProperties" prompt={prompt} />
                )}
            </div>
            <div className="w-6/12">
                <h1 className="text-3xl">Zrozum zależność</h1>
                {isSent && <FunctionPlot equation={func} derivative={functionDerivative} yMin={-5} yMax={5} />}
            </div>
        </div>
    );
};

export default UnderstandEquation;

import { useEffect, useState } from "react";

interface Props {
    response: string;
}

const FunctioProperties = ({ response }: Props) => {
    const [properties, setProperties] = useState<
        { name: string; value: string; explanation: string }[]
    >([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const propertiesNames = {
        Dziedzina:
            "Dziedzina funkcji to zbiór wszystkich liczb, które możemy podstawić do wzoru funkcji.",
        "Zbiór Wartości":
            "Zbiór wartości to zbiór zawierający wszystkie liczby, które możemy otrzymać ze wzoru funkcji",
        "Miejsca Zerowe":
            "Miejsce zerowe to liczba, która podstawiona do wzoru funkcji - daje wynik 0",
        Monotoniczność:
            "Cecha funkcji które są: rosnące, malejące, bądź stałe. Funkcja nie jest monotoniczna gdy w pewnych przedziałach jest rosnąca a w pewnych malejąca, wtedy jest przedziałami monotoniczna",
        Różnowartościowość:
            " Funkcja jest różnowartościowa, jeżeli nie ma dwóch argumentów dla których funkcja przyjmuje taką samą wartość",
        Parzystość:
            "Funkcja jest parzysta, gdy ma dwa przecwine argumenty dla których wartość funkcji jest równa",
        Okresowość:
            "Funkcja jest okresowa, gdy jej wykres da się podzielić na nieskończenie wiele takich samych części",
        Różniczkowalność:
            "Funkcja jest różniczkowalna, jeżeli posiada pochodną w każdym punkcie swojej dziedziny",
        "Maksimum i Minimum":
            "Są to punkty, w których funkcja osiąga swoje najwyższe lub najniższe wartości. Wyróżniamy ekstremum lokalne (punkt, w którym funkcja jest największa lub najmniejsza w pewnym otoczeniu) oraz ekstremum globalne (punkt, w którym funkcja osiąga wartość największą lub najmniejszą na całej dziedzinie).",
    };

    const beautifyResposne = () => {
        const lines = response.split("\n").filter((line) => line.trim() != "");
        const propertyKeys = Object.keys(propertiesNames);
        const propertyValues = Object.values(propertiesNames);

        const mappedProperties = lines.map((line, index) => {
            const propertyName = propertyKeys[index];
            const propertyExplanation = propertyValues[index];

            return {
                name: propertyName,
                value: line.trim(),
                explanation: propertyExplanation,
            };
        });

        setProperties(mappedProperties);
    };

    useEffect(() => {
        beautifyResposne();
    }, [response]);

    useEffect(() => {
        if (window.MathJax) {
            (window.MathJax as any).typesetPromise();
        }
    }, [properties]);

    return (
        <div className="space-y-2">
            {properties.map((property, index) => (
                <div
                    key={index}
                    className="bg-[#1b263b] duration-300 ease-in p-2 rounded relative group text-[#e0e1dd] flex flex-col"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}>
                    <div className="flex items-center justify-between">
                        <strong className="cursor-help hover:underline">
                            {property.name}:
                        </strong>
                        <span
                            className="ml-3"
                            dangerouslySetInnerHTML={{ __html: property.value }}
                        />
                    </div>
                    <div
                        className="overflow-hidden transition-all duration-300 ease-in"
                        style={{
                            maxHeight: hoveredIndex === index ? "100px" : "0px",
                        }}>
                        <div className="text-white px-3 py-2 rounded mt-2 text-sm">
                            {property.explanation}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FunctioProperties;

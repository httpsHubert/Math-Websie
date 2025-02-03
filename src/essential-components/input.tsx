import React, { InputHTMLAttributes, useState, useEffect } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
}

const Input = ({ name, label, value, onChange, ...props }: Props) => {
    const [inputValue, setInputValue] = useState(value || "");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        
        // Usuń niebezpieczne znaki
        value = value.replace(/[<>]/g, "");
        
        // Ogranicz do dozwolonych znaków matematycznych
        value = value.replace(/[^a-z0-9\^+\-*/()\[\]{}.=, ]/gi, "");
        
        setInputValue(value);
        onChange?.({
            ...e,
            target: {
                ...e.target,
                value
            }
        } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <div className="relative w-1/2 mt-2 mx-auto">
            <label
                htmlFor={name}
                className={`transition-all duration-200 text-gray-400 text-sm mb-1`}>
                {label}
            </label>
            <input
                id={name}
                name={name}
                className="w-full border-0 border-b-2 bg-transparent p-2 text-[#252422] text-lg outline-none transition-all duration-200 focus:border-[#1b263b] focus:border-b-3"
                placeholder=" "
                value={inputValue}
                onChange={handleInputChange}
                {...props}
            />
        </div>
    );
};

export default Input;
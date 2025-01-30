import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement>  {
    type: "text" | "submit" | "number" | "email" | "password",
    name: string;
    label: string;
    ref?: string;
}

const Input = ({ type, name, label, ...props }: Props) => {
    return (
        <div className="flex flex-col gap-5">
            <label htmlFor={name}>{label}</label>
            <input type={type} className="bg-white p-2 rounded-xl" name={name} {...props} />
        </div>
    );
};

export default Input;

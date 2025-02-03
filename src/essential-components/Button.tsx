import { ReactNode, InputHTMLAttributes } from "react";

type ButtonTypes = "link" | "submit" | "clear";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    children: ReactNode;
    type: ButtonTypes;
    onClick?: () => void;
    width?: string;
}

const Button = ({ children, type, onClick, width }: Props) => {
    const baseStyles =
        "px-6 py-4 rounded-2xl font-medium transition-all duration-300 w-7/12 mx-auto cursor-pointer";

    const styles = {
        link: "bg-transparent text-black w-full hover:bg-[#415a77] hover:text-white",
        submit: "bg-[#0d1b2a] text-white hover:bg-[#1b263b]",
        clear: "bg-[#778da9] text-black hover:bg-gray-300",
    };

    return (
        <button
            style={{
                width: width,
            }}
            className={`${baseStyles} ${styles[type]}`}
            onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;

import { ReactNode, InputHTMLAttributes } from "react";

type ButtonTypes = "link" | "submit" | "cancel";


interface Props extends InputHTMLAttributes<HTMLInputElement>  {
  children: ReactNode;
  type: ButtonTypes;
  onClick?: () => void;
}

const Button = ({ children, type, onClick }: Props) => {
  const baseStyles = "px-6 py-2 rounded-2xl font-medium transition-all duration-300";
  const styles = {
    link: "bg-transparent text-black ",
    submit: "bg-blue-600 text-white hover:bg-blue-700",
    cancel: "bg-gray-200 text-black hover:bg-gray-300",
  };

  return (
    <button className={`${baseStyles} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

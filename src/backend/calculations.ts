import { derivative } from "mathjs"

export const calculateDerivative = (func: string, variable:string) => {
    return derivative(func, variable).toString();
};


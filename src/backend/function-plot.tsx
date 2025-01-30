import React, { useEffect, useRef } from "react";
import functionPlot from "function-plot";

interface Props {
    width?: number,
    height?: number,
    equation: string,
    derivative: string,
    yMin: number,
    yMax: number
}

const FunctionPlot: React.FC<Props> = React.memo(({width, height, equation, derivative, yMin, yMax}) => {
    const plotRef = useRef(null);

    useEffect(() => {
        if (!plotRef.current) return;

        functionPlot({
            target: plotRef.current,
            yAxis: { domain: [yMin, yMax] },
            width: width,
            height: height,
            grid: true,
            data: [
                {
                    fn: equation,
                    derivative: {
                        fn: derivative,
                        updateOnMouseMove: true,
                    },
                },
            ],
        });
    }, [equation]);

    return <div ref={plotRef} className="w-full h-[500px]" />;
}, () => false) 

export default FunctionPlot;

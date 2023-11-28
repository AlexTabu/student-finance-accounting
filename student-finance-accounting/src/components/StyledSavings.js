import React from "react";
import AnimatedContainer from "./AnimatedContainer";

const StyledSavings = ({ saving }) => {
    return (
        <AnimatedContainer
            element={
                <div
                    className="flex flex-row p-4 bg-black rounded-full"
                >
                    <img
                        className="h-10 w-10"
                        src={saving.src}
                        alt={saving.alt}
                    />
                    <h1 className="ms-3 text-4xl font-bold">{saving.savings}</h1>
                </div>
            }
            animationDelay={saving.animationDelay}
        />
    );
}

export default StyledSavings;

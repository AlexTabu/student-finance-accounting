import React from "react";

const StyledSavings = ({saving}) => {
    return (
        <div
            className="flex flex-row p-4 bg-black rounded-full"
            data-aos="fade-up"
            data-aos-offset="0"
            data-aos-delay={saving.animationDelay}
            data-aos-duration="800"
            data-aos-once="true"
        >
            <img
                className="h-10 w-10"
                src={saving.src}
                alt={saving.alt}
            />
            <h1 className="ms-3 text-4xl font-bold">{saving.savings}</h1>
        </div>
    );
}

export default StyledSavings;

import React from "react";

const StyledParagraph = ({text}) => {
    return (
        <p className="w-3/4 flex-1 flex-col justify-center text-3xl font-bold">
            {text}
        </p>
    );
}

export default StyledParagraph;

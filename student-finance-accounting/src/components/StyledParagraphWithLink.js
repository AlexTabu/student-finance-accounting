import React from "react";
import { purpleHoverStyle } from "../constants";

const StyledParagraphWithLink = ({text, linkText}) => {
    return (
        <p className="ml-auto w-3/4 flex-1 flex-col justify-center text-3xl font-bold">
            {text}
            <a
                className={`underline px-1 ${purpleHoverStyle}`}
                href={linkText}
                target="_blank"
                rel="noopener noreferrer"
            >
                {linkText}
            </a>
        </p>
    );
}

export default StyledParagraphWithLink;
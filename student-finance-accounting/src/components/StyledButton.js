import React from "react";

const StyledButton = ({text, type, width, marginTop, hoverStyle, clickHandler}) => {
    return (
        <button
            className={`${width} ${marginTop} focus:outline-none focus:ring-4 focus:ring-purple-300
                text-white bg-black ${hoverStyle} transition-all duration-300
                font-medium rounded-md text-sm px-5 py-2.5`}
            type={type}
            onClick={clickHandler}
        >
            {text}
        </button>
    );
}

export default StyledButton;

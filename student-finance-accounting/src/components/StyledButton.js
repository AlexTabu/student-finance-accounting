import React from "react";

const StyledButton = ({text, hoverStyle, clickHandler}) => {
    return (
        <button
            className={`focus:outline-none focus:ring-4 focus:ring-purple-300
            text-white bg-black ${hoverStyle} transition-all duration-300
            font-medium rounded-lg text-sm px-5 py-2.5`}
            onClick={clickHandler}
        >
            {text}
        </button>
    );
}

export default StyledButton;

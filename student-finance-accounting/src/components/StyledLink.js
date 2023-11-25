import React from "react";
import { Link } from "react-router-dom";

const StyledLink = ({path, name}) => {
    return (
            <Link className="focus:outline-none focus:ring-4 focus:ring-purple-300
                text-white bg-black hover:bg-teal-500 transition-all duration-300
                font-medium rounded-lg text-sm px-5 py-2.5"
                to={path}
            >
                {name}
            </Link>
    );
}

export default StyledLink;

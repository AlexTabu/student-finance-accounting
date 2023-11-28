import React from "react";
import "aos/dist/aos.css";

const AnimatedContainer = ({element, animationDelay}) => {
    return (
        <div
            data-aos="fade-up"
            data-aos-offset="0"
            data-aos-delay={animationDelay}
            data-aos-duration="800"
            data-aos-once="true"
        >
            {element}
        </div>
    );
}

export default AnimatedContainer;

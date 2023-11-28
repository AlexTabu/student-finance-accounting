import React from "react";
import "aos/dist/aos.css";

const InstructionsPage = () => {
    return (
        <div>
            <div className="flex h-full text-black p-4 bg-purple-700">
                <h1
                    className="flex-1 flex-col justify-center text-5xl font-bold mt-20"
                    data-aos="fade-right"
                    data-aos-delay="100"
                >
                    Despite our app being pretty self-explanatory, we considered adding some instructions on how to use it!
                </h1>
            </div>
            <div
                className="flex flex-col h-full text-black p-4 bg-white"
                data-aos="fade-left"
                data-aos-delay="100"
            >
                <h2
                    className="ml-auto w-3/4 flex-1 flex-col justify-center text-5xl font-bold"
                >
                    General points:
                </h2>
                <p
                    className="ml-auto w-3/4 flex-1 flex-col justify-center text-3xl font-bold"
                >
                    • In Reports section you can observe your reports along with converted savings.
                    Here you can also delete or change your reports by clicking on the appropriate
                    buttons in the reports table.
                </p>
                <p
                    className="ml-auto w-3/4 flex-1 flex-col justify-center text-3xl font-bold"
                >
                    • In Add Report section you can add new report for needed month. Entered
                    values is automatically converted into foreign currencies.
                </p>
            </div>
            <div
                className="flex flex-col h-full text-black p-4 bg-teal-300"
                data-aos="fade-right"
                data-aos-delay="100"
            >
                <h2
                    className="w-3/4 flex-1 flex-col justify-center text-5xl font-bold"
                >
                    Technologies used:
                </h2>
                <p
                    className="w-3/4 flex-1 flex-col justify-center text-3xl font-bold"
                >
                    • React library for user interface.
                </p>
                <p
                    className="w-3/4 flex-1 flex-col justify-center text-3xl font-bold"
                >
                    • MobX-State-Tree for state management.
                </p>
                <p
                    className="w-3/4 flex-1 flex-col justify-center text-3xl font-bold"
                >
                    • tailwindcss for CSS styles management.
                </p>
                <p
                    className="w-3/4 flex-1 flex-col justify-center text-3xl font-bold"
                >
                    • AOS for smooth scroll animation.
                </p>
                <p
                    className="w-3/4 flex-1 flex-col justify-center text-3xl font-bold"
                >
                    • decimal.js for background calculations.
                </p>
                <p
                    className="w-3/4 flex-1 flex-col justify-center text-3xl font-bold"
                >
                    • axios making HTTP requests.
                </p>
                <p
                    className="w-3/4 flex-1 flex-col justify-center text-3xl font-bold"
                >
                    • webpack (default configuration) for module bundling.
                </p>
            </div>
        </div>
    );
};

export default InstructionsPage;
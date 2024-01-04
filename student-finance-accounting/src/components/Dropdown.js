import React, { useEffect, useRef, useState } from "react";
import { purpleHoverStyle } from "../constants";

const Dropdown = ({
    settings,
    styleSettings,
}) => {
    const {
        onSelect,
        itemsCategory,
        items,
        initialSelect,
        checkIfDisabled,
    } = settings;

    const {
        buttonWidth,
        buttonHeight,
        buttonTextSize,
        backgroundColor,
        selectorLabelWidth,
        selectorLabelHeight,
        dropdownWidth,
        dropdownHeight,
    } = styleSettings;

    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(initialSelect);
    const dropdownRef = useRef(null);
    const selectorRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (name, id) => {
        onSelect({name, id});
        setSelectedItem({name, id});
        toggleDropdown();
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)
        && selectorRef.current && !selectorRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <button
                ref={selectorRef}
                type='button'
                className={`inline-flex justify-center items-center focus:outline-none focus:ring focus:ring-purple-300
                    text-white ${buttonWidth} ${buttonHeight} ${buttonTextSize} font-semibold ${backgroundColor} ${purpleHoverStyle} transition-all duration-300
                    rounded-md py-2 px-10`}
                onClick={toggleDropdown}
            >
                {selectedItem ? itemsCategory + ': ' + selectedItem.name : 'Select ' + itemsCategory}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="-6 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    className={`${selectorLabelWidth}, ${selectorLabelHeight}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                </svg>
            </button>

            {isOpen &&
                <div ref={dropdownRef} className={`absolute mt-4 ${dropdownWidth} ${dropdownHeight} scroll-smooth overflow-y-scroll custom-scrollbar rounded-md shadow-lg bg-white ring-4 ring-purple-300`}>
                    {items.map(item => {
                            const disabled = checkIfDisabled(item);
                            return (
                                <button
                                    type='button'
                                    key={item.id}
                                    onClick={() => handleItemClick(item.name, item.id)}
                                    className={`${disabled ? 'pointer-events-none bg-gray-400 text-gray-700' : ''} w-full border-b-4 border-purple-300 px-4 py-2 text-sm font-bold text-black hover:bg-purple-300`}
                                    role="menuitem"
                                >
                                    {item.name}
                                </button>
                            )
                        }
                    )}
                </div>
            }
        </div>
    );
};

export default Dropdown;

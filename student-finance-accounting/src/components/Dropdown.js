import React, { useState } from "react";
import { purpleHoverStyle } from "../constants";
import userStore from "../stores/UserStore";

const Dropdown = ({onSelect}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleItemClick = (monthName, monthNumber) => {
        onSelect({monthName, monthNumber});
        setSelectedMonth({monthName, monthNumber});
        closeDropdown();
    };

    return (
        <div>
            <button
                type="button"
                className={`inline-flex justify-center items-center focus:outline-none focus:ring-4 focus:ring-purple-300
                    text-white w-[20rem] h-[3.5rem] text-3xl font-semibold bg-black ${purpleHoverStyle} transition-all duration-300
                    rounded-md py-2`}
                onClick={toggleDropdown}
            >
                {selectedMonth ? 'Month: ' + selectedMonth.monthName : 'Select month'}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="-6 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                </svg>

            </button>

            {isOpen &&
                <div className="absolute mt-4 w-[20rem] h-[10.5rem] scroll-smooth overflow-y-scroll custom-scrollbar rounded-md shadow-lg bg-white ring-4 ring-purple-300">
                    {[
                        { monthName: 'January', monthNumber: 1 },
                        { monthName: 'February', monthNumber: 2 },
                        { monthName: 'March', monthNumber: 3 },
                        { monthName: 'April', monthNumber: 4 },
                        { monthName: 'May', monthNumber: 5 },
                        { monthName: 'June', monthNumber: 6 },
                        { monthName: 'July', monthNumber: 7 },
                        { monthName: 'August', monthNumber: 8 },
                        { monthName: 'September', monthNumber: 9 },
                        { monthName: 'October', monthNumber: 10 },
                        { monthName: 'November', monthNumber: 11 },
                        { monthName: 'December', monthNumber: 12 },
                    ].map(month => {
                            const disabled = userStore.reports.some(report => report.monthNumber === month.monthNumber);

                            return (
                                <button
                                    key={month.monthNumber}
                                    onClick={() => handleItemClick(month.monthName, month.monthNumber)}
                                    className={`${disabled ? 'pointer-events-none bg-gray-400 text-gray-700' : ''} w-full border-b-4 border-purple-300 px-4 py-2 text-sm font-bold text-black hover:bg-purple-300`}
                                    role="menuitem"
                                >
                                    {month.monthName}
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
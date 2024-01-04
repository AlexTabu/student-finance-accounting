import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import userStore from "../stores/UserStore";
import "aos/dist/aos.css";
import { expenseTypes } from "../constants";
import Dropdown from "./Dropdown";

const ModifyFinancialReportModal = observer(({ report, handleClose }) => {
    const [formData, setFormData] = useState({
        incomeUah: report.incomeUah,
        expensesUah: report.expensesUah,
        expenseData: report.expenseData,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleExpenseDropdownChange = (expenseData) => {
        setFormData({
            ...formData,
            expenseData: expenseData,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        if (form.checkValidity()) {
            userStore.updateReport({
                id: report.id,
                incomeUah: Number(formData.incomeUah),
                expensesUah: Number(formData.expensesUah),
                expenseData: formData.expenseData,
            });
            handleClose();
        }
    }

    const checkIfExpenseTypeDisabled = (el) => {
        let monthReports =  userStore.reports.filter(storeReport =>
            storeReport.monthData.name === report.monthData.name   
        );

        return monthReports.some(report =>
            report.expenseData.name === el.name
        );
    }

    const dropdownStyleSettings = {
        buttonWidth: 'w-[23.5rem]',
        buttonHeight: 'h-[2.6rem]',
        buttonTextSize: 'text-lg',
        backgroundColor: 'bg-gray-600',
        selectorLabelWidth: 'w-6',
        selectorLabelHeight: 'h-6',
        dropdownWidth: 'w-[23.5rem]',
        dropdownHeight: 'h-[8rem]',
    }

    const dropdownSettings = {
        initialSelect: formData.expenseData,
        onSelect: handleExpenseDropdownChange,
        itemsCategory: 'Expense',
        items: expenseTypes,
        checkIfDisabled: checkIfExpenseTypeDisabled
    }

    return (
        <div
            tabIndex="-1"
            aria-hidden="true"
            className="bg-black bg-opacity-30 transition backdrop-filter backdrop-blur-sm static overflow-y-auto overflow-x-hidden fixed top-0
                right-0 left-0 bottom-0 z-50 justify-center flex items-center w-full md:inset-0 h-full"
        >
            <div className="relative p-4 w-full max-w-md max-h-full"
                data-aos="fade-up"
                data-aos-offset="0"
                data-aos-delay={100}
                data-aos-duration="300"
                data-aos-once="true"
            >
                <div className="relative rounded-md shadow bg-gray-700">
                    <div
                        className="flex items-center justify-between p-5 border-b rounded-t border-gray-600"
                    >
                        <h3 className="text-lg font-semibold text-white">
                            {'Edit report for ' + report.monthData.name}
                        </h3>
                        <button
                            className="outline-none text-white bg-gray-700 focus:ring-4 focus:ring-purple-700
                                hover:bg-purple-600 transition-all duration-300 rounded-md text-sm w-8 h-8 
                                inline-flex justify-center items-center"
                            onClick={handleClose}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="p-5">
                        <div className="grid gap-5 grid-cols-2">
                            <div className="col-span-1">
                                <label className="block mb-2 text-sm font-medium text-white">Income (UAH)</label>
                                <input
                                    name="incomeUah"
                                    value={formData.incomeUah}
                                    onChange={handleInputChange}
                                    type="number"
                                    pattern="[0-9]*"
                                    min='1'
                                    max='99999999'
                                    className="outline-none bg-gray-600 border border-gray-500 text-white
                                        text-sm font-medium rounded-md focus:ring focus:ring-purple-300
                                        focus:border-0 block w-full p-2.5"
                                    required=""
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block mb-2 text-sm font-medium text-white">Expenses (UAH)</label>
                                <input
                                    name="expensesUah"
                                    value={formData.expensesUah}
                                    onChange={handleInputChange}
                                    type="number"
                                    pattern="[0-9]*"
                                    min='1'
                                    max='99999999'
                                    className="outline-none bg-gray-600 border border-gray-500 text-white
                                        text-sm font-medium rounded-md focus:ring focus:ring-purple-300
                                        focus:border-0 block w-full p-2.5"
                                    required=""
                                />
                            </div>
                            <div className="col-span-2">
                                <Dropdown
                                    settings={dropdownSettings}
                                    styleSettings={dropdownStyleSettings}
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="outline-none text-white bg-purple-700 hover:bg-purple-600
                                        transition-all duration-300 focus:ring-4 focus:ring-purple-300
                                        rounded-md text-sm font-medium px-5 py-2.5 text-center"
                                    >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
});

export default ModifyFinancialReportModal;

import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import "aos/dist/aos.css";
import Dropdown from "../components/Dropdown";
import StyledButton from "../components/StyledButton";
import { expenseTypes, months, purpleHoverStyle } from "../constants";
import AnimatedContainer from "../components/AnimatedContainer";
import userStore from "../stores/UserStore";
import { useNavigate } from "react-router-dom";

const DataPage = observer(() => {
    const [incomeUah, setIncomeUah] = useState("");
    const [expensesUah, setExpensesUah] = useState("");
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedExpenseType, setSelectedExpenseType] = useState(null);
    const navigate = useNavigate();

    const handleMonthDropdownChange = (month) => {
        setSelectedMonth(month);
    };

    const handleExpenseTypeDropdownChange = (expenseType) => {
        setSelectedExpenseType(expenseType);
    };

    const handleIncomeChange = (event) => {
        const sanitizedValue = event.target.value.replace(/[^0-9]/g, '');
        setIncomeUah(sanitizedValue);
    };

    const handleExpensesChange = (event) => {
        const sanitizedValue = event.target.value.replace(/[^0-9]/g, '');
        setExpensesUah(sanitizedValue);
    };

    const handleSubmit = async () => {
        if (!selectedMonth || !selectedExpenseType || !incomeUah || !expensesUah) {
            window.alert('All fields are required!')
            return;
        }

        const report = {
            monthData: {
                name: selectedMonth.name,
                id: selectedMonth.id,
            },
            expenseData: {
                name: selectedExpenseType.name,
                id: selectedExpenseType.id,
            },
            incomeUah: Number(incomeUah),
            expensesUah: Number(expensesUah),
        };

        await userStore.createReport(report);
        navigate("/results");
    };

    const checkIfMonthDisabled = (el) => {
        let monthReports =  userStore.reports.filter(report =>
            report.monthData.name === el.name   
        )
    
        return selectedExpenseType
        ?
            userStore.reports.some(report =>
                report.expenseData.name === selectedExpenseType.name &&
                report.monthData.name === el.name   
            )
        :
            expenseTypes.every(expenseType => 
                monthReports.some(report =>
                    report.expenseData.name === expenseType.name
                )
            )
    }

    const checkIfExpenseTypeDisabled = (el) => {
        let expenseTypeReports =  userStore.reports.filter(report =>
            report.expenseData.name === el.name   
        )
    
        return selectedMonth
        ?
            userStore.reports.some(report =>
                report.monthData.name === selectedMonth.name &&
                report.expenseData.name === el.name   
            )
        :
            months.every(month => 
                expenseTypeReports.some(report =>
                    report.monthData.name === month.name
                )
            )
    }

    const dropdownStyleSettings = {
        buttonWidth: 'w-[26rem]',
        buttonHeight: 'h-[3.5rem]',
        buttonTextSize: 'text-3xl',
        backgroundColor: 'bg-black',
        selectorLabelWidth: 'w-8',
        selectorLabelHeight: 'h-8',
        dropdownWidth: 'w-[26rem]',
        dropdownHeight: 'h-[10.5rem]',
    }

    const monthDropdownSettings = {
        onSelect: handleMonthDropdownChange,
        itemsCategory: 'Month',
        items: months,
        checkIfDisabled: checkIfMonthDisabled,
    }

    const expenseTypeDropdownSettings = {
        onSelect: handleExpenseTypeDropdownChange,
        itemsCategory: 'Expense',
        items: expenseTypes,
        checkIfDisabled: checkIfExpenseTypeDisabled,
    }

    return (
        <div>
            <div className="flex h-full text-black p-4 bg-purple-700">
                <div className="flex-col">
                    <h1
                        className="text-5xl font-bold mt-20"
                        data-aos="fade-right"
                        data-aos-delay="100"
                    >
                        Don't delay, start saving money for your dream right now!
                    </h1>
                    <h1
                        className="text-5xl font-bold"
                        data-aos="fade-right"
                        data-aos-delay="100"
                    >
                        Just fill in and save the data <span className="text-3xl" >🤗</span>
                    </h1>
                </div>
                <img
                    className="mt-14 mx-auto h-60 w-auto"
                    data-aos="fade-left"
                    data-aos-delay="100"
                    src="/student.gif"
                    alt="Student"
                />
            </div>
            <div className="flex flex-col items-center h-80 space-y-11">
                <div
                    className="flex flex-row justify-center w-full mt-11 text-white space-x-40"
                >
                    <AnimatedContainer
                        element={
                            <input
                                name="incomeUah"
                                value={incomeUah}
                                onChange={handleIncomeChange}
                                type="number"
                                min='1'
                                max='99999999'
                                className="border-transparent bg-black text-white text-3xl font-semibold rounded-md
                                    focus:ring focus:ring-purple-700 focus:border-0 w-[26rem] h-[3.5rem]"
                                required=""
                                placeholder="Income (UAH)"
                            />
                        }
                        animationDelay={300}
                    />
                    <AnimatedContainer
                        element={
                            <input
                                name="expensesUah"
                                value={expensesUah}
                                onChange={handleExpensesChange}
                                type="number"
                                min='1'
                                max='99999999'
                                className="border-transparent bg-black text-white text-3xl font-semibold rounded-md
                                    focus:ring focus:ring-purple-700 focus:border-0 w-[26rem] h-[3.5rem]"
                                required=""
                                placeholder="Expenses (UAH)"
                            />
                        }
                        animationDelay={500}
                    />
                </div>
                <div
                    className="flex flex-row justify-center w-full mt-11 text-white space-x-40"
                >
                    <AnimatedContainer
                        element={
                            <Dropdown
                                settings={monthDropdownSettings}
                                styleSettings={dropdownStyleSettings}
                            />
                        }
                        animationDelay={100}
                    />
                    <AnimatedContainer
                        element={
                            <Dropdown
                                settings={expenseTypeDropdownSettings}
                                styleSettings={dropdownStyleSettings}
                            />
                        }
                        animationDelay={100}
                    />
                </div>
                <div
                    data-aos="fade-up"
                    data-aos-offset="0"
                    data-aos-duration="800"
                    data-aos-once="true"
                >
                    <StyledButton text='Submit' hoverStyle={purpleHoverStyle} clickHandler={handleSubmit} />
                </div>
            </div>

        </div>
    );
});

export default DataPage;

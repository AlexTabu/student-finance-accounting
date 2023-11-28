import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import "aos/dist/aos.css";
import Dropdown from "../components/Dropdown";
import StyledButton from "../components/StyledButton";
import { purpleHoverStyle } from "../constants";
import AnimatedContainer from "../components/AnimatedContainer";
import userStore from "../stores/UserStore";
import { useNavigate } from "react-router-dom";

const DataPage = observer(() => {
    const [incomeUah, setIncomeUah] = useState("");
    const [expensesUah, setExpensesUah] = useState("");
    const [selectedMonth, setSelectedMonth] = useState(null);
    const navigate = useNavigate();

    const handleDropdownChange = (month) => {
        setSelectedMonth(month);
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
        if (!selectedMonth || !selectedMonth || !expensesUah) {
            window.alert('All fields are required!')
        }

        const report = {
            monthNumber: selectedMonth.monthNumber,
            month: selectedMonth.monthName,
            incomeUah: Number(incomeUah),
            expensesUah: Number(expensesUah)
        };

        await userStore.createReport(report);
        navigate("/results");
    };

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
            <div className="flex flex-col items-center h-80">
                <div
                    className="flex flex-row justify-center max-w-full my-10 text-white space-x-8"
                >
                    <AnimatedContainer
                        element={
                            <Dropdown onSelect={handleDropdownChange}/>
                        }
                        animationDelay={100}
                    />

                    <AnimatedContainer
                        element={
                            <input
                                name="incomeUah"
                                value={incomeUah}
                                onChange={handleIncomeChange}
                                type="number"
                                min='1'
                                className="border-transparent bg-black text-white text-3xl font-semibold rounded-md
                                    focus:ring focus:ring-purple-700 focus:border-0 w-full py-2 w-[20rem] h-[3.5rem]"
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
                                className="border-transparent bg-black text-white text-3xl font-semibold rounded-md
                                    focus:ring focus:ring-purple-700 focus:border-0 w-full py-2 w-[20rem] h-[3.5rem]"
                                required=""
                                placeholder="Expenses (UAH)"
                            />
                        }
                        animationDelay={500}
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
import React, { useState } from "react";
import StyledButton from "./StyledButton";
import { observer } from "mobx-react-lite";
import "aos/dist/aos.css";
import userStore from "../stores/UserStore";
import StyledSavings from "./StyledSavings";
import ModifyFinancialReportModal from "./ModifyFinancialReportModal";
import { purpleHoverStyle, tealHoverStyle } from "../constants";
import { useNavigate } from "react-router-dom";

const ReportTable = observer(() => {
    const [monthReportToModify, setMonthReportToModify] = useState(null);
    const navigate = useNavigate();

    return (
        !userStore.reports.length
            ?
            <div className="flex flex-col items-center pb-32 pt-8 lg:px-8">
                <h1
                    className="text-2xl font-bold text-black"
                    data-aos="fade-down"
                    data-aos-easing="ease-in-out-back"
                    data-aos-offset="0"
                    data-aos-delay="100"
                    data-aos-duration="800"
                    data-aos-once="true"
                >
                    Looks like you haven't created an accounting table yet. Get started now!
                </h1>
                <div
                    className="mt-8"
                    data-aos="fade-up"
                    data-aos-offset="0"
                    data-aos-duration="800"
                    data-aos-once="true"
                >
                    <StyledButton text='Get started' hoverStyle={tealHoverStyle} clickHandler={() => navigate("/data")}/>
                </div>
            </div>
            :
            <div>
                <div className="flex flex-col items-center">
                    <h1
                        className="text-2xl font-bold text-black mt-6"
                        data-aos="fade-down"
                        data-aos-easing="ease-in-out-back"
                        data-aos-offset="0"
                        data-aos-delay="100"
                        data-aos-duration="800"
                        data-aos-once="true"
                    >
                        Your total savings:
                    </h1>
                    <div className="flex flex-row items-center max-w-full my-10 text-white space-x-10">
                        {[
                            { savings: userStore.totalSavingsUah, animationDelay: 100, src: '/hryvnia.png', alt: 'UAH' },
                            { savings: userStore.totalSavingsUsd, animationDelay: 300, src: '/dollar.png', alt: 'USD' },
                            { savings: userStore.totalSavingsEur, animationDelay: 500, src: '/euro.png', alt: 'EUR' },
                        ].map((item, index) => <StyledSavings key={index} saving={item} />)}
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-black">
                        <thead className="uppercase bg-teal-300 font-bold">
                            <tr>
                                <th scope="col" className="px-6 py-4" />
                                <th scope="col" className="px-6 py-4">
                                    Month
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Income
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Expenses
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Savings in UAH
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Savings in USD
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Savings in EUR
                                </th>
                                <th scope="col" colSpan={2} className="px-6 py-4">
                                    <StyledButton width={'w-[12.1rem]'} text='Delete all records' hoverStyle={purpleHoverStyle} clickHandler={() => userStore.deleteAllReports()} />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {userStore.reports.slice().sort((a, b) => a.monthData.id - b.monthData.id).map((report, index) =>
                                <tr key={index} className="bg-teal-300 font-bold border-b-2 border-black">
                                    <td className="px-6 py-4">
                                        {report.monthData.id}
                                    </td>
                                    <td className="px-6 py-4">
                                        {report.monthData.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {report.incomeUah}
                                    </td>
                                    <td className="px-6 py-4">
                                        {report.expensesUah}
                                    </td>
                                    <td className="px-6 py-4">
                                        {report.expenseData.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {report.savingsUah}
                                    </td>
                                    <td className="px-6 py-4">
                                        {report.savingsUsd}
                                    </td>
                                    <td className="px-6 py-4">
                                        {report.savingsEur}
                                    </td>
                                    <td className="px-6 py-4">
                                        <StyledButton text='Edit' hoverStyle={purpleHoverStyle} clickHandler={() => setMonthReportToModify(report)} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <StyledButton text='Delete' hoverStyle={purpleHoverStyle} clickHandler={() => userStore.deleteReport(report)} />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {monthReportToModify &&
                    <ModifyFinancialReportModal report={monthReportToModify} handleClose={() => setMonthReportToModify(null)} />
                }
            </div>
    );
});

export default ReportTable;

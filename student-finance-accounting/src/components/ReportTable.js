import React from "react";
import StyledButton from "./StyledButton";
import { observer } from "mobx-react-lite";
import "aos/dist/aos.css";
import userStore from "../stores/UserStore";
import StyledSavings from "./StyledSavings";

let testReports = [
    { month: 'January', incomeUah: 300, expensesUah: 200 },
    { month: 'February', incomeUah: 350, expensesUah: 200 },
    { month: 'March', incomeUah: 380, expensesUah: 200 },
    { month: 'April', incomeUah: 310, expensesUah: 200 },
    { month: 'May', incomeUah: 390, expensesUah: 200 },
];

const addReports = async () => {
    for (const report of testReports) {
        await userStore.setReport(report);
    }
};

addReports();

let tealHoverStyle = 'hover:bg-teal-500';
let purpleHoverStyle = 'hover:bg-purple-700'

const ReportTable = observer(() => {
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
                    <StyledButton text='Get started' hoverStyle={tealHoverStyle} />
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
                            {savings: userStore.totalSavingsUah, animationDelay: 100, src: '/hryvnia.png', alt: 'UAH'},
                            {savings: userStore.totalSavingsUsd, animationDelay: 300, src: '/dollar.png', alt: 'USD'},
                            {savings: userStore.totalSavingsEur, animationDelay: 500, src: '/euro.png', alt: 'EUR'},
                        ].map(item => <StyledSavings saving={item} />)}
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-black">
                    <thead className="uppercase bg-sky-500 font-bold">
                        <tr>
                            <th scope="col" className="px-6 py-3" />
                            <th scope="col" className="px-6 py-3">
                                Month
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Income
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Expenses
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Savings in UAH
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Savings in USD
                            </th>
                            <th scope="col" className="px-6 py-3" />
                            <th scope="col" className="px-6 py-3" />
                        </tr>
                    </thead>
                    <tbody>
                        {userStore.reports.map((report, index) =>
                            <tr className="bg-sky-500 font-bold border-b-2 border-black">
                                <td scope="row" className="px-6 py-4">
                                    {index + 1}
                                </td>
                                <td scope="row" className="px-6 py-4">
                                    {report.month}
                                </td>
                                <td className="px-6 py-4">
                                    {report.incomeUah}
                                </td>
                                <td className="px-6 py-4">
                                    {report.expensesUah}
                                </td>
                                <td className="px-6 py-4">
                                    {report.savingsUah}
                                </td>
                                <td className="px-6 py-4">
                                    {report.savingsUsd}
                                </td>
                                <td className="px-6 py-4">
                                    <StyledButton text='Edit' hoverStyle={purpleHoverStyle} />
                                </td>
                                <td className="px-6 py-4">
                                    <StyledButton text='Delete' hoverStyle={purpleHoverStyle} clickHandler={() => userStore.removeReport(report)}/>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
    );
});

export default ReportTable;

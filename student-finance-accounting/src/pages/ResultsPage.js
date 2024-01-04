import React from "react";
import { observer } from "mobx-react-lite";
import "aos/dist/aos.css";
import ReportTable from "../components/ReportTable";

const ResultsPage = observer(() => {
    return (
        <div>
            <div className="flex h-full text-black p-4 bg-purple-700">
                <h1
                    className="flex-1 flex-col justify-center text-5xl font-bold mt-20"
                    data-aos="fade-right"
                    data-aos-delay="100"
                >
                    Don't worry! Keep track of your income and expenses easily and pleasantly with SFA
                    - Student Finance Accounting platform!
                </h1>
                <img
                    className="flex-2 flex-col justify-center mt-14 mx-auto h-60 w-auto"
                    data-aos="fade-left"
                    data-aos-delay="100"
                    src="/money.gif"
                    alt="Money"
                />
            </div>
            <div className="h-full bg-white">
                <ReportTable />
            </div>
        </div>
    );
});

export default ResultsPage;

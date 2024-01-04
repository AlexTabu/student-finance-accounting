import { flow, types } from "mobx-state-tree";
import { convertUah } from "../helpers/UsdConverter";
import { v4 as uuid } from "uuid";

const MonthData = types.model({
    name: types.string,
    id: types.number,
});

const ExpenseData = types.model({
    name: types.string,
    id: types.number,
});

const UserStore = types.model("UserStore", {
    totalSavingsUah: 0,
    totalSavingsUsd: 0,
    totalSavingsEur: 0,
    reports: types.array(
        types.model({
            id: types.identifier,
            monthData: MonthData,
            expenseData: ExpenseData,
            incomeUah: types.number,
            expensesUah: types.number,
            savingsUah: types.number,
            savingsUsd: types.number,
            savingsEur: types.number,
        })
    ),
})
.views((self) => ({
    get currentSavings() {
        return self.reports.reduce((sum, report) => sum + report.savingsUah);
    }
}))
.actions((self) => ({
    createReport: flow(function* ({monthData, incomeUah, expensesUah, expenseData}) {
        const savingsUah = incomeUah > expensesUah ? incomeUah - expensesUah : 0;

        self.totalSavingsUah = self.totalSavingsUah + savingsUah;
        self.totalSavingsUsd = yield convertUah(self.totalSavingsUah, 'USD');
        self.totalSavingsEur = yield convertUah(self.totalSavingsUah, 'EUR');

        self.reports.push({
            id: uuid(),
            monthData,
            expenseData,
            incomeUah,
            expensesUah,
            savingsUah: savingsUah,
            savingsUsd: yield convertUah(savingsUah, 'USD'),
            savingsEur: yield convertUah(savingsUah, 'EUR')
        });
    }),
    deleteReport(report) {
        let filteredReports = self.reports.filter(el => el.id !== report.id);
        self.reports = filteredReports;
    },
    updateReport: flow(function* ({id, incomeUah, expensesUah, expenseData }) {      
        const savingsUah = incomeUah > expensesUah ? incomeUah - expensesUah : 0;
        const report = self.reports.find(report => report.id === id);

        self.totalSavingsUah = self.totalSavingsUah - report.savingsUah + savingsUah;
        self.totalSavingsUsd = yield convertUah(self.totalSavingsUah, 'USD');
        self.totalSavingsEur = yield convertUah(self.totalSavingsUah, 'EUR');

        report.incomeUah = incomeUah;
        report.expensesUah = expensesUah;
        report.savingsUah = savingsUah;
        report.expenseData = expenseData;
        report.savingsUsd = yield convertUah(savingsUah, 'USD');
        report.savingsEur = yield convertUah(savingsUah, 'EUR');
    }),
}));

const userStore = UserStore.create();

export default userStore;

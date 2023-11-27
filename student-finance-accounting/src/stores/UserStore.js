import { flow, types } from "mobx-state-tree";
import { convertUah } from "../helpers/UsdConverter";

const UserStore = types.model("UserStore", {
    totalSavingsUah: 0,
    totalSavingsUsd: 0,
    totalSavingsEur: 0,
    reports: types.array(
        types.model({
            monthNumber: types.number,
            month: types.string,
            incomeUah: types.number,
            expensesUah: types.number,
            savingsUah: types.number,
            savingsUsd: types.number,
        })
    ),
})
.views((self) => ({
    get currentSavings() {
        return self.reports.reduce((sum, report) => sum + report.savingsUah);
    }
}))
.actions((self) => ({
    createReport: flow(function* ({monthNumber, month, incomeUah, expensesUah }) {
        const savingsUah = incomeUah > expensesUah ? incomeUah - expensesUah : 0;

        self.totalSavingsUah = self.totalSavingsUah + savingsUah;
        self.totalSavingsUsd = yield convertUah(self.totalSavingsUah, 'USD');
        self.totalSavingsEur = yield convertUah(self.totalSavingsUah, 'EUR');

        self.reports.push({
            monthNumber,
            month,
            incomeUah,
            expensesUah,
            savingsUah: savingsUah,
            savingsUsd: yield convertUah(savingsUah, 'USD')
        });
    }),
    deleteReport(report) {
        let filteredReports = self.reports.filter(el => el.month !== report.month);
        self.reports = filteredReports;
    },
    updateReport: flow(function* ({monthNumber, incomeUah, expensesUah }) {      
        const savingsUah = incomeUah > expensesUah ? incomeUah - expensesUah : 0;
        const report = self.reports.find(report => report.monthNumber === monthNumber);

        self.totalSavingsUah = self.totalSavingsUah - report.savingsUah + savingsUah;
        self.totalSavingsUsd = yield convertUah(self.totalSavingsUah, 'USD');
        self.totalSavingsEur = yield convertUah(self.totalSavingsUah, 'EUR');

        report.incomeUah = incomeUah;
        report.expensesUah = expensesUah;
        report.savingsUah = savingsUah;
        report.savingsUsd = yield convertUah(savingsUah, 'USD');
    }),
}));

const userStore = UserStore.create();

export default userStore;
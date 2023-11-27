import { flow, types } from "mobx-state-tree";
import { convertUah } from "../helpers/UsdConverter";

const UserStore = types.model("UserStore", {
    totalSavingsUah: 0,
    totalSavingsUsd: 0,
    totalSavingsEur: 0,
    reports: types.array(
        types.model({
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
    setReport: flow(function* ({ month, incomeUah, expensesUah }) {
        let savingsUah = incomeUah > expensesUah ? incomeUah - expensesUah : 0;

        self.totalSavingsUah = self.totalSavingsUah + savingsUah;
        self.totalSavingsUsd = yield convertUah(self.totalSavingsUah, 'USD');
        self.totalSavingsEur = yield convertUah(self.totalSavingsUah, 'EUR');

        self.reports.push({
            month,
            incomeUah,
            expensesUah,
            savingsUah: savingsUah,
            savingsUsd: yield convertUah(savingsUah, 'USD')
        });
    }),
    removeReport(report) {
        let filteredReports = self.reports.filter(el => el.month !== report.month);
        self.reports = filteredReports;
    },
}));

const userStore = UserStore.create();

export default userStore;
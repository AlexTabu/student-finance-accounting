import { types } from "mobx-state-tree";
import { convertUahToUsd } from "../helpers/UsdConverter";

const UserStore = types.model("UserStore", {
    reports: types.array(
        types.model({
            month: types.string,
            income: types.number,
            expenses: types.number,
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
    setReport({month, income, expenses}) {
        let savingsUah = income > expenses ? income - expenses : 0;

        self.reports.push({
            month,
            income,
            expenses,
            savingsUah: savingsUah,
            savingsUsd: convertUahToUsd(savingsUah)
        });
    },
    removeReport(report) {
        let filteredReports = self.reports.filter(el => el.month !== report.month);
        self.reports = filteredReports;
    },
}));

const userStore = UserStore.create();

export default userStore;
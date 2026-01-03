import { AccountSummaryModel } from "./account-summary-model"

export interface DashboardModel {
    total_amount: number,
    total_budget: number,
    accounts_amounts: [
        AccountSummaryModel
    ]
}
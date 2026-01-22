import { AccountSummaryModel } from "./account-summary-model"
import { TransactionModel } from "./transaction-model"

export interface DashboardModel {
    total_amount: number,
    total_budget: number,
    accounts: [
        AccountSummaryModel
    ]
    last_transactions: [TransactionModel]
}
export interface TransactionModel {
    id?: number,
    user?: number,
    timestamp: string,
    amount: number,
    source_account: number,
    destination_account: number,
    description: string,
    source_account_name?: string,
    destination_account_name?: string,
    keywords?: string
}
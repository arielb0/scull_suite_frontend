export interface TransactionModel {
    id?: number,
    user?: number,
    timestamp: string,
    amount: number,
    source_account: number,
    destination_account: number,
    description: string
}
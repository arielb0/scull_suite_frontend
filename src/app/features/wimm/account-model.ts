export interface AccountModel {
    id?: number,
    user?: number,
    name: string,
    goal_description: string,
    goal_amount: number,
    budget_percentage: number,
    include_on_summary_section: boolean,
    include_on_total_amount: boolean,
    color: number
}
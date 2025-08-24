export const now = new Date().toISOString().split('T')[0]
export const defaultState = {
    title: '',
    dueDate: now,
    dueDays: 0
};
export type Item = {
    title: string
    dueDate: string
    dueDays: number
}
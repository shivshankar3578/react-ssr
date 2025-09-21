export const date = (dueDays = 1) => new Date(Date.now() - 86400000 * dueDays).toISOString().split('T')[0];
export const defaultState = {
    id: null,
    title: '',
    dueDate: date(),
    dueDays: 0
};
export type Item = {
    id: number | null,
    title: string
    dueDate: string | null
    dueDays: number
}
export interface IUser {
    id: number,
    name: string,
    date: string,
    email: string,
    avatar: string,
    friends: number[],
    role: "Администратор" | "Пользователь",
    status: "Активный" | "Заблокированный" | "Неподтвержденный"
};
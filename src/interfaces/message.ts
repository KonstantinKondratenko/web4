import { IUser } from "./user";

export interface IMessage {
    sender: number,
    message: string;
};

export interface IDialog {
    user: IUser;
    friend: IUser;
    messages: IMessage[];
}
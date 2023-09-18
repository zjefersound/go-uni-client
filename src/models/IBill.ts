import { IUser } from "./IUser";

export interface IBill {
  _id: string;
  payer?: IUser;
  receiver: IUser;
  date: string;
  amount: number;
  currency: string;
  description: string;
  paid: boolean;
}

export interface IBillPayload {
  payerId?: string;
  receiverId: string;
  date: string;
  amount: number;
  currency?: string;
  description: string;
  paid: boolean;
}
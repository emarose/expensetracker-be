import { Document } from 'mongoose';

export interface IExpense extends Document {
  property: string;
  date: Date;
  amount: number;
  category: string;
  description?: string;
  paidBy: string;
  paymentMethod: string;
  year?: number;
  month?: number;
}

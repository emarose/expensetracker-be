import { Document } from 'mongoose';

export interface IExpense extends Document {
  property?: string;
  date: Date;
  amount: number;
  type: string;
  category?: string;
  description?: string;
  paidBy: string;
  paymentMethod: string;
  year?: number;
  month?: number;
}

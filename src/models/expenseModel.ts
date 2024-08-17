import mongoose, { Schema } from 'mongoose';
import { IExpense } from '../interfaces/expenseInterfaces';

const expenseSchema: Schema = new Schema({
  property: {
    type: String, required: true
  },
  date: { type: Date, required: true },
  year: { type: Number, },
  month: { type: Number, },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
  paidBy: { type: String, required: true },
  paymentMethod: { type: String, required: true }
});

// Middleware to automatically set the year and month fields based on the date
expenseSchema.pre<IExpense>('save', function (next) {
  if (this.date && this.date instanceof Date && !isNaN(this.date.getTime())) {
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth() + 1;
    console.log(`Saving document with year: ${this.year}, month: ${this.month}`);
  } else {
    return next(new Error("Invalid date provided"));
  }
  next();
});

const Expense = mongoose.model<IExpense>('Expense', expenseSchema);

export default Expense;

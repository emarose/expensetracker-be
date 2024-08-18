import { Request, Response } from 'express';
import Expense from '../models/expenseModel';

// Create a new expense
/* 
Endpoint: POST /api/expenses

Request Body Example:
{
  "property": "depto",
  "date": "2024-08-11",
  "amount": 500,
  "category": "Compras",
  "description": "Compras Carrefour",
  "paidBy": "Ema",
  "paymentMethod": "Efectivo"
}
  Response Example:
  {
  "_id": "64d6344e2f31deafef5b51d4",
  "property": "depto",
  "date": "2024-08-11T00:00:00.000Z",
  "year": 2024, <- Middleware 
  "month": 8, <- Middleware 
  "amount": 500,
  "category": "Compras",
  "description": "Compras Carrefour",
  "paidBy": "Ema",
  "paymentMethod": "Efectivo",
  "__v": 0
}
*/
export const createExpense = async (req: Request, res: Response): Promise<void> => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

// Get all expenses with optional filters
/* 
Endpoint: GET /api/expenses?property=depto&year=2024&month=83
Response Example:
[
  {
    "_id": "64d6344e2f31deafef5b51d4",
    "property": "depto",
    "date": "2024-08-11T00:00:00.000Z",
    "year": 2024,
    "month": 8,
    "amount": 500,
    "category": "Compras",
    "description": "Compras Carrefour",
    "paidBy": "Ema",
    "paymentMethod": "Efectivo",
    "__v": 0
  }
]
*/
export const getAllExpenses = async (req: Request, res: Response): Promise<void> => {
  try {
    const { property, year, month } = req.query;
    const query: any = {};

    if (property) {
      query.property = property;
    }
    if (year) {
      query.year = Number(year);
    }
    if (month) {
      query.month = Number(month);
    }

    const expenses = await Expense.find(query);
    res.status(200).json(expenses);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

// Get total expenses by property
/* 
GET /api/expenses/totals/by-property
Example response:
[
  {
    "property": "depto",
    "total": 5000
  },
  {
    "property": "casa",
    "total": 3000
  },
  {
    "property": "french",
    "total": 2500
  }
]
*/
export const getTotalExpensesByProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const totals = await Expense.aggregate([
      {
        $group: {
          _id: "$property",
          total: { $sum: "$amount" }
        }
      },
      {
        $project: {
          _id: 0,
          property: "$_id",
          total: 1
        }
      }
    ]);

    console.log(totals);

    res.status(200).json(totals);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

// Get a single expense by ID
/*
Endpoint: GET /api/expenses/:id
Example Request:
GET /api/expenses/64d6344e2f31deafef5b51d4
Response Example:
 {
  "_id": "64d6344e2f31deafef5b51d4",
  "property": "depto",
  "date": "2024-08-11T00:00:00.000Z",
  "year": 2024, <- Middleware 
  "month": 8, <- Middleware 
  "amount": 500,
  "category": "Compras",
  "description": "Compras Carrefour",
  "paidBy": "Ema",
  "paymentMethod": "Efectivo",
  "__v": 0
}

*/
export const getExpenseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      res.status(404).json({ message: 'Expense not found' });
      return;
    }
    res.status(200).json(expense);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

// Update an expense by ID
/* 
Endpoint: PUT /api/expenses/:id
Example Request:

PUT /api/expenses/64d6344e2f31deafef5b51d4
Content-Type: application/json

{
  "amount": 550,
  "description": "Toledo"
}

Response Example:
{
  "_id": "64d6344e2f31deafef5b51d4",
  "property": "depto",
  "date": "2024-08-11T00:00:00.000Z",
  "year": 2024,
  "month": 8,
  "amount": 550,
  "category": "Groceries",
  "description": "Toledo",
  "paidBy": "John Doe",
  "paymentMethod": "Credit Card",
  "__v": 0
}
*/
export const updateExpenseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!expense) {
      res.status(404).json({ message: 'Expense not found' });
      return;
    }
    res.status(200).json(expense);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

// Delete an expense by ID
/* 
Endpoint: DELETE /api/expenses/:id
Example Request:
DELETE /api/expenses/64d6344e2f31deafef5b51d4
Response Example:
{
  "message": "Expense deleted successfully"
}

*/
export const deleteExpenseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      res.status(404).json({ message: 'Expense not found' });
      return;
    }
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

// Get total amount paid by each in a given year or range of months
/* 
Endpoint: GET /api/expenses/top-payers/2024?startMonth=1&endMonth=8
Example Request:
GET /api/expenses/top-payers/2024?startMonth=1&endMonth=8
Response Example:
[
  {
    "paidBy": "Ema",
    "totalPaid": 1500
  },
  {
    "paidBy": "Agus",
    "totalPaid": 1300
  }
]
*/
export const getTopPayers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { year, startMonth, endMonth } = req.params;
    const match: any = { year: Number(year) };
    if (startMonth && endMonth) {
      match.month = { $gte: Number(startMonth), $lte: Number(endMonth) };
    }

    const results = await Expense.aggregate([
      { $match: match },
      {
        $group: {
          _id: "$paidBy",
          totalPaid: { $sum: "$amount" }
        }
      },
      { $sort: { totalPaid: -1 } },
      {
        $project: {
          _id: 0,
          paidBy: "$_id",
          totalPaid: 1
        }
      }
    ]);

    res.status(200).json(results);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

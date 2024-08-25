import express from 'express';
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Create a new expense
router.post('/expenses', expenseController.createExpense);

// Get all expenses
router.get('/expenses', expenseController.getAllExpenses);

// Get total expenses by property
router.get('/expenses/totals/byProperty', expenseController.getTotalExpensesByProperty);

// Get a single expense by ID
router.get('/expenses/:id', expenseController.getExpenseById);

// Update an expense by ID
router.put('/expenses/:id', expenseController.updateExpenseById);

// Delete an expense by ID
router.delete('/expenses/:id', expenseController.deleteExpenseById);

export default router;

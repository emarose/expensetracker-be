import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());

app.use(express.json());

app.use('/api', expenseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

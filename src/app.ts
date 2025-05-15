import express from 'express';
import investmentRoutes from './routes/InvestmentRoutes';
import authRoutes from './routes/authRoutes';
import { authenticateToken } from './middlewares/authMiddleware';

const app = express();
app.use(express.json());

app.use('/investments', investmentRoutes);
app.use('/auth', authRoutes);
app.use('/investments', authenticateToken, investmentRoutes);


export default app;
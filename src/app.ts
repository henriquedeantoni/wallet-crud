import express from 'express';
import investmentRoutes from './routes/investmentRoutes';

const app = express();
app.use(express.json());

app.use('/investments', investmentRoutes);

export default app;
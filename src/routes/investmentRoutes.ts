import express from 'express';
import {
    getAllInvestments,
    getInvestmentById,
    createInvestment,
    updateInvestment,
    deleteInvestment
} from '../controllers/InvestmentController';

const router = express.Router();

router.get('/', getAllInvestments);
router.get('/:id', getInvestmentById);
router.post('/', createInvestment);
router.put('/:id', updateInvestment);
router.delete('/:id', deleteInvestment);

export default router;


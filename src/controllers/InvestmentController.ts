import {Request, Response} from 'express';
import { InvestmentService } from '@src/services/InvestmentService';

const service = new InvestmentService();

export const getAllInvestments = async  (_: Request, res: Response) =>{
    const investments = await service.getAll();
    res.json(investments);
};

export const getInvestmentById = async (req: Request, res: Response) =>{
    const investment = await service.getById(Number(req.params.id));
    if(!investment) return res.status(404).json({message:  'Investment not found' });
    res.json(investment); 
}
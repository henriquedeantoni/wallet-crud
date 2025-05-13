import {Request, Response} from 'express';
import { InvestmentService } from '@src/services/InvestmentService';

const service = new InvestmentService();

export const getAllInvestments = async  (_: Request, res: Response) =>{
    const investments = await service.getAll();
    res.json(investments);
};

export const getInvestmentById = async (req: Request, res: Response) =>{
    const investment = await service.getById(Number(req.params.id));
    if(!investment) {
        res.status(404).json({message:  'Investment not found.' });
        return;
    }
    res.json(investment); 
};

export const createInvestment = async (req: Request, res: Response) =>{
    await service.create(req.body);
    res.status(201).json({message: 'Investment Created.'});
}

export const updateInvestment = async (req: Request, res: Response) =>{
    await service.update(Number(req.params.id), req.body);
    res.json({message: 'Investment Updated.'});
};

export const deleteInvestment = async (req: Request, res: Response) =>{
    await service.delete(Number(req.params.id));
    res.json({message: 'Investment Deleted.'});
};
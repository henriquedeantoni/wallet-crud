import {Request, Response} from 'express';
import { InvestmentService } from '@src/services/InvestmentService';
import {mapInvestmentRow} from '@src/utils/mappers'

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

export const getInvestmentsByUser = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  try {
    const investments = await service.findByUserId(userId);
    res.json(investments.map(mapInvestmentRow));
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const createInvestment = async (req: Request, res: Response) => {
  const userId = req.body.userId || req.user?.id; // extraído do token
  const {
    assetId,
    quantity,
    purchasePrice,
    purchaseDate
  } = req.body;

  try {
    const investment = await service.create({
      userId,
      assetId,
      quantity,
      purchasePrice,
      purchaseDate
    });
    res.status(201).json(investment);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const deleteInvestment = async (req: Request, res: Response) => {
  const investmentId = parseInt(req.params.id);
  try {
    await service.delete(investmentId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const updateInvestment = async (req: Request, res: Response) => {
  const investmentId = parseInt(req.params.id);
  const updates = req.body;

  try {
    await service.update(investmentId, updates);
    res.json({ message: 'Investment updated' });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};
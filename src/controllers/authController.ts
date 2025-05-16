import { Request, Response } from "express";
import {AuthService} from '../services/authService';

const service = new AuthService();

    export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
        try {
            await service.register(req.body);
            res.status(201).json({ message: 'User registered' });
            } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    };

    export const updateUser = async (req: Request, res: Response) =>{
        const userId = (req as any).user?.id;
        const updates = req.body;

        if(!userId) {
            res.status(401).json({error: 'Unauthourized access'});
            return 
        };

        try{
            await service.update(userId, updates);
            res.json({message: 'User updated'});
        }catch(err)
        {
            res.status(400).json({error: (err as Error).message});
        }
    }

    export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
        try {
            const token = await service.login(email, password);
            res.json({ token });
            } catch (err) {
            res.status(401).json({ error: (err as Error).message });
        }
    };



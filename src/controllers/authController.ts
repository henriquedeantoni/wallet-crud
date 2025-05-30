import { Request, Response } from "express";
import {AuthService} from '../services/authService';

const service = new AuthService();

    export const register = async (req: Request, res: Response) => {
        try {
            await service.register(req.body);
            res.status(201).json({ message: 'User registered' });
            } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    };

    export const updateUser = async (req: Request, res: Response)=>{
        try {
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({ error: 'Unauthorized: User ID missing' });
            return;
        }

        const { tel, email, firstName, lastName } = req.body;

        if (!tel && !email && !firstName && !lastName) {
            res.status(400).json({ message: 'No valid fields to update' });
            return;
        }

        await service.update(userId, { tel, email, firstName, lastName });

        res.status(200).json({ message: 'User updated' });
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
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



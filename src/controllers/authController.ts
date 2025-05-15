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

    export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
        try {
            const token = await service.login(email, password);
            res.json({ token });
            } catch (err) {
            res.status(401).json({ error: (err as Error).message });
            }
    };



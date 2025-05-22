import { Request, Response } from "express";
import {AuthService} from '../services/authService';
import { User } from "@src/models/User";
import { mapUserRow } from "../utils/mappers";

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
        try{
            const userId = (req as any).user.id;
            const { tel, name, email } = req.body;
            const updates = req.body;

            if (!tel && !name && !email) {
                return res.status(400).json({ message: 'No valid fields to update' });
            }

            await User.update({ tel, name, email }, { where: { id: userId } });
            return res.status(200).json({ message: 'User updated' });

        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
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



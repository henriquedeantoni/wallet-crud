import { Investment } from "@src/models/Investment";
import {db} from '../config/database'
export class InvestmentRepository{
    async findAll():Promise<Investment[]>{
        const [rows] = await db.query('SELECT * FROM investments');
        return rows as Investment[];
    }

    async findById(id: number):Promise<Investment | null>{
        const [rows] = await db.query('SELECT * FROM investments WHERE id = ?', [id]);
        return (rows as Investment[])[0] || null;
    }
}
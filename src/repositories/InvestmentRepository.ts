import { Investment } from "@src/models/Investment";
import {db} from '../config/database'

function mapInvestmentRow(row: any): Investment {
  return {
    id: row.id,
    userId: row.user_id,
    assetId: row.asset_id,
    quantity: row.quantity,
    purchasePrice: row.purchase_price,
    purchaseDate: row.purchase_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export class InvestmentRepository{
    async findAll():Promise<Investment[]>{
        const [rows] = await db.query('SELECT * FROM investments');
        return rows as Investment[];
    }

    async findById(id: number):Promise<Investment | null>{
        const [rows] = await db.query('SELECT * FROM investments WHERE id = ?', [id]);
        return (rows as Investment[])[0] || null;
    }

    async create(investment: Omit<Investment, 'id'>):Promise<void> {
        const{assetName, type, amount} = investment;
        await db.query('INSERT INTO investments (name, type, amount) Values (?,?,?)', [assetName, type, amount]);
    }

    async update(id: number, investment: Partial<Investment>):Promise<void>{
        const fields = Object.entries(investment)
            .map(([key, value])=>`${key} = ?`)
            .join(', ');
        const values = [...Object.values(investment), id];
        await db.query('UPDATE investments SET $[fields] WHERE id = ?', values);
    }

    async delete(id: number):Promise<void> {
        await db.query('DELETE FROM investments WHERE id = ?', [id]);
    }
}
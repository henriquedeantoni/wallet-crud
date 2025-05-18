import { Investment } from "@src/models/Investment";
import {db} from '../config/database'
import { mapInvestmentRow } from "@src/utils/mappers";

export class InvestmentRepository{
    async findAll():Promise<Investment[]>{
        const [rows] = await db.query('SELECT * FROM investments');
        return Array.isArray(rows) ? rows.map(mapInvestmentRow) : [];
    }

    async findById(id: number):Promise<Investment | null>{
        const [rows] = await db.query('SELECT * FROM investments WHERE id = ?', [id]);

        if (Array.isArray(rows) && rows.length > 0) {
        return mapInvestmentRow(rows[0]);
        }
        return null;
    }

    async findByUserId(userId: number): Promise<Investment[]> {
        const [rows] = await db.query('SELECT * FROM investments WHERE user_id = ?', [userId]);
        return Array.isArray(rows) ? rows.map(mapInvestmentRow) : [];
    }

async create(investment: Omit<Investment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Investment> {
  const {
    userId,
    assetId,
    quantity,
    purchasePrice,
    purchaseDate,
  } = investment;

  const [result] = await db.query(
    `INSERT INTO investments (user_id, asset_id, quantity, purchase_price, purchase_date)
     VALUES (?, ?, ?, ?, ?)`,
    [userId, assetId, quantity, purchasePrice, purchaseDate]
  );

  const insertId = (result as any).insertId;

  const [rows] = await db.query('SELECT * FROM investments WHERE id = ?', [insertId]);

  return mapInvestmentRow((rows as any)[0]);
}

     async update(
    id: number,
    updates: Partial<Omit<Investment, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<void> {
    const fields = Object.keys(updates);
    const values = Object.values(updates);

    if (fields.length === 0) return;

    const setClause = fields.map(field => {
      switch (field) {
        case 'userId': return 'user_id = ?';
        case 'assetId': return 'asset_id = ?';
        case 'purchasePrice': return 'purchase_price = ?';
        case 'purchaseDate': return 'purchase_date = ?';
        default: return `${field} = ?`;
      }
    }).join(', ');

    values.push(id);

    const query = `UPDATE investments SET ${setClause}, updated_at = NOW() WHERE id = ?`;
    await db.query(query, values);
  }

    async delete(id: number):Promise<void> {
        await db.query('DELETE FROM investments WHERE id = ?', [id]);
    }
}
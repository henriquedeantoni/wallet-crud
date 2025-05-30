import {db} from '../config/database';
import {User} from '../models/User';
import { mapUserRow } from '../utils/mappers';

export class UserRepository{
    async findByEmail(email: string): Promise<User | null> {
        const [rows] = await db.query('SELECT * FROM users WHERE EMAIL = ?', [email]);
        if (Array.isArray(rows) && rows.length>0){
          return mapUserRow(rows[0]);
        }
        return null;
    }

    async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt' >): Promise<void>{
        const{email, firstName, lastName, tel, password} = user;
        await db.query(
            `INSERT INTO users (email, first_name, last_name, tel, password) VALUES (?,?,?,?,?)`,
            [email, firstName, lastName, tel, password]
        );
    }

    async update(
      id: number,
      updates: Partial<Omit<User, 'id'| 'createdAt' | 'updatedAt' >>    
    ):Promise<void> {
    const mappedUpdates: Record<string, any> = {};

    for (const key in updates) {
      const value = updates[key as keyof typeof updates];
      if (value !== undefined) {
        switch (key) {
          case 'firstName':
            mappedUpdates['first_name'] = value;
            break;
          case 'lastName':
            mappedUpdates['last_name'] = value;
            break;
          default:
            mappedUpdates[key] = value;
        }
      }
    }

    if (Object.keys(mappedUpdates).length === 0) return;

    const fields = Object.keys(mappedUpdates);
    const values = Object.values(mappedUpdates);

    const setClause = fields.map((field) => `${field} = ?`).join(', ');
    const sql = `UPDATE users SET ${setClause}, updated_at = NOW() WHERE id = ?`;

    values.push(id);

    await db.query(sql, values);
  }
}
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
            `INSERT INTO users (email, first_name, Last_name, tel, password) VALUES (?,?,?,?,?)`,
            [email, firstName, lastName, tel, password]
        );
    }

    
  async update(
    id: number,
    updates: Partial<Omit<User, 'id'>>    
  ):Promise<void>{
    const fields = Object.keys(updates);
    const values: (string | number | Date)[] = Object.values(updates);

    if(fields.length === 0) return;

    const setClause = fields.map(field => {
      switch (field) {
        case 'firstName': return 'first_name = ?';
        case 'lastName': return 'last_name = ?';
        case 'createdAt': return 'created_at = ?';
        case 'updatedAt': return 'updated_at = ?';
        default: return `${field} = ?`;
      }
    }).join(', ');
    
    values.push(id);

    const query = `UPDATE users SET ${setClause}, updated_at = NOW() WHERE id = ?`;

    await db.query(query, values);
  }

}
import {db} from '../config/database';
import {User} from '../models/User';

export class UserRepository{
    async findByEmail(email: string): Promise<User | null> {
        const [rows] = await db.query('SELECT * FROM users WHERE EMAIL = ?', [email]);
        return (rows as User[])[0] || null;
    }

    async create(user: Omit<User, 'id' | 'created_at' | 'updated_at' >): Promise<void>{
        const{email, firstName, lastName, tel, password} = user;
        await db.query(
            `INSERT INTO users (email, firstName, LastName, tel, password) VALUES (?,?,?,?,?)`,
            [email, firstName, lastName, tel, password]
        );
    }

}
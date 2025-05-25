import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';
import type { User } from '../models/User';

import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.SECRET_JWT;

if (!secret) {
  throw new Error('SECRET_JWT must be defined.');
}

const SECRET: string = secret;

export class AuthService{
    constructor(private userRepository = new UserRepository()) {}

    private isStrongPassword(password: string): boolean {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return strongPasswordRegex.test(password);
    }

    async register(userData: any) {
        const { email, password } = userData;
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        if(!this.isStrongPassword(password)){
            console.log('password: '+password);
            throw new Error('Weak Password, must be at least 8 or more characters long!');
        }

        userData.password = await bcrypt.hash(password,10);
        await this.userRepository.create(userData);
    }   
    async login(email:string, password: string): Promise<string> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error('User not found');

        const match = await bcrypt.compare(password, user.password);
        if(!match) throw new Error('Invalid credentials');

        return jwt.sign({id: user.id, email: user.email}, SECRET, {expiresIn: '4h'});
    }

    verifyToken(token: string){
        return jwt.verify(token, SECRET);
    }

    async update(
        userId: number,
        updates: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>
    ):Promise<void>{
        if(updates.password){
            updates.password = await bcrypt.hash(updates.password, 10);
        };
        await this.userRepository.update(userId, updates);
    }
}


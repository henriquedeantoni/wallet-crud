import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthService } from '../services/authService';
import { User } from '../models/User';


// User Repository Mock
const mockUserRepository = {
    create: jest.fn(),
    findByEmail: jest.fn(),
    update: jest.fn()
}

// Instance created passing mock
const authService = new AuthService(mockUserRepository as any);

// JWT mock
jest.mock('jsonwebtoken', ()=>({
    sign: jest.fn(() => 'fake-jwt-token'),
    verify: jest.fn(() => ({ id: 1, email: 'exampletesting@email.com'}))
}));
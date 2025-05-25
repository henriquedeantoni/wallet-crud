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

describe('AuthService', () =>{
    beforeEach(()=>{
        jest.clearAllMocks();
    })

    it('registrar um novo usuário', async()=>{
        const userData = {
            email: 'exampleTesting@email.com',
            firstName: 'John',
            lastName: 'Doe',
            tel: '219912031254',
            password: 'fictionalPassword123456'
        };

        await authService.register(userData);

        expect(mockUserRepository.create).toHaveBeenCalledWith(
            expect.objectContaining({
            email: userData.email,
            password: expect.any(String)
            })
        )
    });

    it('faz login com sucesso e retorna um token', async () => {
        const originalPassword = 'fictionalPassword123456';
        const hashedPassword = await bcrypt.hash(originalPassword, 10);

        const mockUser: User = {
            id: 1,
            email: 'exampleTesting@email.com',
            firstName: 'John',
            lastName: 'Doe',
            tel: '219912031254',
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date()

        };

        mockUserRepository.findByEmail.mockResolvedValue(mockUser);

        const token = await authService.login(mockUser.email, originalPassword);
        
        expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(mockUser.email);
        expect(token).toBe('fake-jwt-token');
    });

    it('Lança erro se a senha for inválida', async () => {
    
        const hashedPassword = await bcrypt.hash('rightPass', 10);
        const mockUser = { ...mockUserRepository, password: hashedPassword };

        mockUserRepository.findByEmail.mockResolvedValue(mockUser);

        await expect(authService.login('exampleTesting@email.com', 'wrongPass'))
        .rejects
        .toThrow('Invalid credentials');
    });

    it('Lança erro se o usuário não existir', async () => {
        mockUserRepository.findByEmail.mockResolvedValue(null);

        await expect(authService.login('notfound@example.com', '1234'))
        .rejects
        .toThrow('User not found');
    });

})
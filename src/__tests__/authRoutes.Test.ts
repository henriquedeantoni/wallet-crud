import request from 'supertest';
import app from '../app';
import { db } from '../config/database';
import bcrypt from 'bcrypt';


const user = {
  email: 'usertest@example.com',
  password: '123456',
  firstName: 'Test',
  lastName: 'User',
  tel: '123456789'
};

let token: string;

beforeAll(async ()=>{
    await db.query('DELETE FROM users WHERE email = ?', [user.email]);

    const hashedPassword = await bcrypt.hash(user.password, 10);

    await db.query(
        `INSERT INTO users (email, password, first_name, last_name, tel ) VALUES (?, ?, ?, ?, ?)`,
        [user.email, hashedPassword, user.firstName, user.lastName, user.tel]
    )
});

afterAll(async () => {
  // Limpa e fecha o pool de conexão
  await db.query('DELETE FROM users WHERE email = ?', [user.email]);
  await db.end();
});

describe('Auth Routes', ()=>{
    it('deve logar com usuário e senha corretos', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: user.email, password: user.password });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it('deve atualizar dados do usuário autenticado', async () => {
    const res = await request(app)
      .put('/auth/update')
      .set('Authorization', `Bearer ${token}`)
      .send({ tel: '01195452518' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('User updated');
  });

  it('não deve permitir atualização sem token', async () => {
    const res = await request(app)
      .put('/auth/update')
      .send({ tel: '000000000' });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toMatch(/Unauthorized/);
  });
});
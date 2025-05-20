import { Router } from 'express';
import { register, login, updateUser} from '../controllers/authController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.put('/update', authenticateToken, updateUser);

export default router;
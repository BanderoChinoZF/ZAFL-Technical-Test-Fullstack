import { Router } from 'express';
import { getUsers, saveUser, updateUser, deleteUser } from '../controllers/Users.controller';


const router = Router();

router.get('/users', getUsers);
router.post('/users', saveUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
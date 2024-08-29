import { Router } from 'express';
import { getAllArea2, getArea2, createArea2, updateArea2, deleteArea2 } from '../controllers/area2Controller';
import { checkJwt } from '../middlewares/authenticate';

const router = Router();

router.get('/area2/all/:userAccessLevel', checkJwt, getAllArea2);
router.get('/area2/:id', checkJwt, getArea2);
router.post('/area2', checkJwt, createArea2);
router.put('/area2/:id', checkJwt, updateArea2);
router.delete('/area2/:id', checkJwt, deleteArea2);

export default router;

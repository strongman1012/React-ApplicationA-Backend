import { Router } from 'express';
import { getAllArea1, getArea1, createArea1, updateArea1, deleteArea1 } from '../controllers/area1Controller';
import { checkJwt } from '../middlewares/authenticate';

const router = Router();

router.get('/area1/all/:userAccessLevel', checkJwt, getAllArea1);
router.get('/area1/:id', checkJwt, getArea1);
router.post('/area1', checkJwt, createArea1);
router.put('/area1/:id', checkJwt, updateArea1);
router.delete('/area1/:id', checkJwt, deleteArea1);

export default router;

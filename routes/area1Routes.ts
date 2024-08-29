import { Router } from 'express';
import { getAllAreas, getArea, createArea, updateArea, deleteArea } from '../controllers/area1Controller';
import { checkJwt } from '../middlewares/authenticate';

const router = Router();

router.get('/area1/all/:userAccessLevel', checkJwt, getAllAreas);
router.get('/area1/:id', checkJwt, getArea);
router.post('/area1', checkJwt, createArea);
router.put('/area1/:id', checkJwt, updateArea);
router.delete('/area1/:id', checkJwt, deleteArea);

export default router;

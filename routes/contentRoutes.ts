import { Router } from 'express';
import { getAllAreas, getArea, createArea, updateArea, deleteArea } from '../controllers/contentController';
import { checkJwt } from '../middlewares/authenticate';

const router = Router();

router.get('/area2/all/:userAccessLevel', checkJwt, getAllAreas);
router.get('/area2/:id', checkJwt, getArea);
router.post('/area2', checkJwt, createArea);
router.put('/area2/:id', checkJwt, updateArea);
router.delete('/area2/:id', checkJwt, deleteArea);

export default router;

import { Router } from 'express';
import { getSectors } from '../controllers/sectors.controller';

const router = Router();

// GET /api/v1/sectors
router.get('/', getSectors);

export default router; 
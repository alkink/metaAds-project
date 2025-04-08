import { Router } from 'express';
import { getMoreSuggestions } from '../controllers/suggestions.controller';

const router = Router();

// POST /api/v1/suggestions/more
router.post('/more', getMoreSuggestions);

export default router; 
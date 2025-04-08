import { Router } from 'express';
import sectorsRoutes from './sectors.routes';
import chatRoutes from './chat.routes';
import suggestionsRoutes from './suggestions.routes';

const router = Router();

// Attach routes
router.use('/sectors', sectorsRoutes);
router.use('/chat', chatRoutes);
router.use('/suggestions', suggestionsRoutes);

export default router; 
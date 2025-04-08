import { Router } from 'express';
import { startChat, sendMessage } from '../controllers/chat.controller';

const router = Router();

// POST /api/v1/chat/start
router.post('/start', startChat);

// POST /api/v1/chat/message
router.post('/message', sendMessage);

export default router; 
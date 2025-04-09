import express, { Router, Request, Response } from 'express';
import chatRoutes from './chat.routes';
import sectorsRoutes from './sectors.routes';
import suggestionsRoutes from './suggestions.routes';

const router: Router = express.Router();

// Debug endpoint - API'nin çalıştığını test etmek için
router.get('/test', (req: Request, res: Response) => {
  res.json({ 
    status: 'success', 
    message: 'API is working properly!',
    timestamp: new Date().toISOString(),
    route: req.originalUrl
  });
});

// Sektör endpoint'leri
router.use('/sectors', sectorsRoutes);

// Sohbet endpoint'leri
router.use('/chat', chatRoutes);

// Öneri endpoint'leri
router.use('/suggestions', suggestionsRoutes);

export default router; 
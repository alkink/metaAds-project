import express, { Request, Response } from 'express';
import app from '../src/app';

// Debug routes for serverless function
const router = express.Router();

router.get('/debug', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'Debug endpoint is working!',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'not set',
    path: req.path,
    originalUrl: req.originalUrl,
    baseUrl: req.baseUrl
  });
});

// Attach the debug route
app.use(router);

// Add direct access for serverless
app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Export the Express app as a serverless function
export default app; 
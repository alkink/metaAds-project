import express, { Request, Response } from 'express';
import app from '../src/app';

// If app doesn't exist or doesn't work properly, this will still work
const expressInstance = express.Router();
expressInstance.get('/debug', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'Debug endpoint is working!',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'not set'
  });
});

// Attach the debug route to the app
app.use(expressInstance);

// Serverless fonksiyon olarak Express uygulamasını export ediyoruz
export default app; 
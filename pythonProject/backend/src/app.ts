import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes';

// Load environment variables
dotenv.config();

// Initialize Express app
const app: Application = express();

// CORS ayarları - daha ayrıntılı yapılandırma
app.use(cors({
  origin: '*', // Vercel'de çalışması için tüm originlere izin veriyoruz
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false // Vercel deployment için false yapıyoruz
}));

app.use(express.json());

// API Ana route
app.use('/api/v1', apiRoutes);

// Ek olarak, doğrudan kök URL'de de API'yi erişilebilir yapıyoruz
app.use('/', apiRoutes);

// Simple test route
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Meta Ads Targeting Assistant API is running' });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    message: 'Route not found',
    path: req.path,
    method: req.method 
  });
});

// Basic error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

export default app; 
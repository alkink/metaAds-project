import app from './app';

const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV !== 'production') {
  // Development ortamında server çalıştır
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} else {
  // Production ortamında (Vercel), serverless olarak çalışacak
  console.log('Server is running in serverless mode');
}

// Vercel için export ediyoruz
export default app; 
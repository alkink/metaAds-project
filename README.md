# Meta Reklam Hedefleme Asistanı

Meta Reklam Hedefleme Asistanı, Facebook ve Instagram reklamları için hedef kitle önerileri sunan bir AI aracıdır. Kullanıcıların sektörlerine, hedef yaş aralıklarına ve tercihlerine göre özelleştirilmiş hedefleme önerileri almanızı sağlar.

## Özellikler

- Sektöre göre özelleştirilmiş hedefleme önerileri ✅
- Tekli ve grup hedefleme seçenekleri ✅
- Yaş aralığına göre filtrele ✅
- Alternatif öneriler isteme seçeneği ✅
- Direkt olarak Meta (Facebook & Instagram) reklamlarında kullanılabilecek öneri formatı ✅
- Sohbet arayüzü ile kolay kullanım ✅

## Teknoloji Yığını

### Frontend
- **Framework:** Next.js 15
- **CSS:** Tailwind CSS
- **State Yönetimi:** Zustand
- **Component Yapısı:** React 18 (Server + Client Components)

### Backend
- **Framework:** Express.js & TypeScript
- **API:** RESTful
- **AI Entegrasyonu:** Mistral AI API

## Kurulum

### Gereksinimler
- Node.js 18.0.0 veya üzeri
- npm veya yarn

### Backend

```bash
cd pythonProject/backend
npm install
# .env dosyasını düzenleyin ve Mistral AI API anahtarınızı ekleyin
npm run build
npm run start
```

### Frontend

```bash
cd pythonProject/frontend
npm install
npm run dev
```

## Kullanım

1. Uygulamayı başlatın ve "Başlamak istiyorum" yazın
2. Sektörünüzü belirtin
3. Hedef yaş aralığınızı belirtin
4. Tekli veya grup hedefleme tercihinizi yapın
5. İstediğiniz öneri sayısını girin
6. Meta reklamları için optimize edilmiş hedefleme önerilerini alın
7. Alternatif öneriler için "Biraz Daha Öner" yazın

## Vercel Deployment

Bu proje Vercel üzerinde deploy edilebilir. Kurulum için:

1. GitHub reposunu Vercel'e bağlayın
2. Frontend ve Backend için ayrı projeler oluşturun
3. Backend için Environment Variables bölümünden MISTRAL_API_KEY ekleyin
4. Frontend için Environment Variables bölümünden NEXT_PUBLIC_API_URL ekleyin (Backend URL)

## Lisans

MIT 
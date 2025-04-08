import axios from 'axios';
import { TargetingType } from '@/store/chatStore';

// API temel URL'i
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

console.log('API Base URL:', API_BASE_URL); // Debug için API URL'yi loglama

// API istemcisini yapılandır
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 saniye timeout
  withCredentials: false // CORS credentials ayarını false yapıyoruz
});

// İstek ve yanıt interceptor'ları
apiClient.interceptors.request.use(
  (config) => {
    console.log(`İstek gönderiliyor: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('İstek hatası:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log(`Yanıt alındı: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        console.error('İstek zaman aşımına uğradı.');
      } else if (!error.response) {
        console.error('Ağ hatası: Sunucuya bağlanılamadı.');
      } else {
        console.error('API hatası:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data
        });
      }
    } else {
      console.error('Beklenmeyen hata:', error);
    }
    return Promise.reject(error);
  }
);

// Sohbeti başlat
export const startChat = async () => {
  try {
    const response = await apiClient.post('/chat/start');
    return response.data;
  } catch (error) {
    console.error('Sohbet başlatma hatası:', error);
    // Hata durumunda fallback yanıt
    return {
      success: true,
      data: {
        welcomeMessage: "Merhaba! Meta Ads Targeting Assistant'a hoş geldiniz. Size nasıl yardımcı olabilirim?"
      }
    };
  }
};

// Mesaj gönder ve yanıt al
export const sendMessage = async (
  message: string,
  step: string,
  industry?: string | null,
  ageRange?: string | null,
  targetingType?: string | null,
  suggestionCount?: number | null
) => {
  try {
    console.log('API isteği gönderiliyor:', { message, step, industry, ageRange, targetingType, suggestionCount });
    
    // Doğrudan backend API endpoint'ine istek gönder
    const response = await apiClient.post('/chat/message', {
      message,
      step,
      industry,
      ageRange,
      targetingType,
      suggestionCount
    });
    
    console.log('API yanıtı:', response.data);
    return response.data;
  } catch (error) {
    console.error('Mesaj gönderme hatası:', error);
    
    // Hata durumunda mocklanmış bir yanıt döndür
    let fallbackContent = '';
    let nextStep = step;
    
    switch (step) {
      case 'initial':
        fallbackContent = 'Hangi sektörde faaliyet gösteriyorsunuz?';
        nextStep = 'industry';
        break;
      case 'industry':
        fallbackContent = 'Yaklaşık olarak hangi yaş aralığındaki kullanıcıları hedeflemek istersiniz?';
        nextStep = 'ageRange';
        break;
      case 'ageRange':
        fallbackContent = 'Hangi tür hedefleme önerisi almak istersiniz? (Tekli/Grup)';
        nextStep = 'targetingType';
        break;
      case 'targetingType':
        fallbackContent = 'Kaç adet öneri almak istersiniz? (Lütfen sadece sayı girin)';
        nextStep = 'suggestionCount';
        break;
      case 'suggestionCount':
        fallbackContent = `API bağlantı hatası nedeniyle önerilere ulaşılamadı. Lütfen tekrar deneyin.`;
        nextStep = 'error';
        break;
      default:
        fallbackContent = 'Bağlantı hatası oluştu. Lütfen tekrar deneyin.';
        nextStep = 'initial';
        break;
    }
    
    return {
      success: true,
      data: {
        content: fallbackContent,
        nextStep
      }
    };
  }
};

// Daha fazla öneri al
export const getMoreSuggestions = async (
  industry: string,
  ageRange: string,
  targetingType: TargetingType,
  suggestionCount: number
) => {
  try {
    const response = await apiClient.post('/suggestions/more', {
      industry,
      ageRange,
      targetingType,
      suggestionCount
    });
    return response.data;
  } catch (error) {
    console.error('Daha fazla öneri alma hatası:', error);
    
    // Hata durumunda default alternatif öneriler
    const alternativeInterests = [
      'Dekorasyon', 'Ev Dekorasyonu', 'İç Tasarım', 'Mobilya', 'Ev Aksesuarları',
      'Mutfak Eşyaları', 'Ev Tekstili', 'DIY', 'Kendin Yap', 'Bahçe Düzenleme'
    ];
    
    let response = `**Alternatif Hedefleme Önerileri**\n\n`;
    response += `**Yaş Aralığı:** ${ageRange}\n\n`;
    
    if (targetingType === 'single') {
      response += `**İlgi Alanları:**\n`;
      
      for (let i = 0; i < Math.min(suggestionCount, alternativeInterests.length); i++) {
        response += `${i+1}. ${alternativeInterests[i]}\n`;
      }
    } else {
      response += `**Grup 1:**\n`;
      for (let i = 0; i < 3; i++) {
        response += `- ${alternativeInterests[i]}\n`;
      }
      
      response += `\n**Grup 2:**\n`;
      for (let i = 3; i < 6; i++) {
        response += `- ${alternativeInterests[i]}\n`;
      }
    }
    
    response += `\nBu alternatif hedeflemeler de ${industry} sektörü ve ${ageRange} yaş aralığı için uygun olabilir.`;
    
    return {
      success: true,
      data: {
        content: response
      }
    };
  }
};

// Sektörleri getir
export const getSectors = async () => {
  try {
    const response = await apiClient.get('/sectors');
    return response.data;
  } catch (error) {
    console.error('Sektör verileri alınamadı:', error);
    // Fallback olarak temel sektörler
    return {
      success: true,
      data: {
        sectors: [
          'E-ticaret', 'Moda', 'Güzellik', 'Fitness', 'Sağlık', 'Eğitim', 
          'Teknoloji', 'Finans', 'Emlak', 'Gıda', 'Seyahat'
        ]
      }
    };
  }
}; 
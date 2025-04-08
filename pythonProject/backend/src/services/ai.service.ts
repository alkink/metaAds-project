import { Mistral } from '@mistralai/mistralai';
import * as dotenv from 'dotenv';

dotenv.config();

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY || '';
const MODEL = 'mistral-medium'; // veya mistral-small, mistral-large, mixtral-8x7b gibi diğer modeller kullanılabilir

// API anahtarı kontrolü
if (!MISTRAL_API_KEY || MISTRAL_API_KEY === 'your_mistral_api_key_here') {
  console.error('\x1b[31m%s\x1b[0m', '⚠️ HATA: Geçerli bir MISTRAL_API_KEY değeri sağlanmadı!');
  console.error('\x1b[33m%s\x1b[0m', '📝 Lütfen backend/.env dosyasını düzenleyerek gerçek API anahtarınızı ekleyin.');
  console.error('\x1b[36m%s\x1b[0m', '🔗 Mistral AI API anahtarı edinmek için: https://console.mistral.ai/');
}

// Bağlantı denemesi için basit bir fonksiyon
async function testMistralConnection() {
  if (!MISTRAL_API_KEY || MISTRAL_API_KEY === 'your_mistral_api_key_here') {
    return false;
  }
  
  try {
    console.log('Mistral AI bağlantısı test ediliyor...');
    
    const mistral = new Mistral({
      apiKey: MISTRAL_API_KEY
    });
    
    // Modelleri listeleyerek bağlantıyı test et
    await mistral.models.list();
    console.log('\x1b[32m%s\x1b[0m', '✅ Mistral AI bağlantısı başarılı!');
    return true;
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Mistral AI bağlantı hatası:');
    console.error(error);
    return false;
  }
}

// Uygulama başladığında bağlantıyı test et
testMistralConnection().catch(console.error);

// Mistral AI istemcisini başlat
const mistral = new Mistral({
  apiKey: MISTRAL_API_KEY
});

// Fallback model (bağlantı hatası durumunda)
function generateFallbackResponse(industry: string, ageRange: string, targetingType: 'single' | 'group', count: number): string {
  console.log('⚠️ Fallback yanıt üretiliyor - API yanıt vermedi.');
  
  if (targetingType === 'single') {
    const interests = [
      'Moda', 'Güzellik', 'Alışveriş', 'Lifestyle', 'Kozmetik', 'Saç Bakımı', 'Makyaj', 'Wellness',
      'Giyim', 'Ayakkabı', 'Çanta', 'Takı', 'Spor', 'Fitness', 'Yoga', 'Pilates'
    ];
    
    let response = `**Meta Reklamlarınız için Hedefleme Önerileri**\n\n`;
    response += `**Yaş Aralığı:** ${ageRange}\n\n`;
    response += `**İlgi Alanları:**\n`;
    
    for (let i = 0; i < Math.min(count, interests.length); i++) {
      response += `${i+1}. ${interests[i]}\n`;
    }
    
    response += `\nBu hedeflemeler, ${industry} sektörü ve ${ageRange} yaş aralığı için optimize edilmiştir. Meta reklam kampanyalarınızda kullanabilirsiniz.`;
    
    return response;
  } else {
    const group1 = ['Etek', 'Bluz', 'Pantolon', 'Butikler', 'Giyim Mağazaları'];
    const group2 = ['Güzellik', 'Hair', 'Fashion and makeup', 'Saç boyama', 'Güzellik salonları'];
    
    let response = `**Meta Reklamlarınız için Hedefleme Önerileri**\n\n`;
    response += `**Yaş Aralığı:** ${ageRange}\n\n`;
    
    response += `**Grup 1:**\n`;
    for (let i = 0; i < Math.min(5, group1.length); i++) {
      response += `- ${group1[i]}\n`;
    }
    
    response += `\n**Grup 2:**\n`;
    for (let i = 0; i < Math.min(5, group2.length); i++) {
      response += `- ${group2[i]}\n`;
    }
    
    response += `\nBu hedeflemeler, ${industry} sektörü ve ${ageRange} yaş aralığı için optimize edilmiştir. Meta reklam kampanyalarınızda kullanabilirsiniz.`;
    
    return response;
  }
}

// Sektör ve yaş aralığına göre Meta reklamları için hedef kitle önerileri oluşturur
export async function generateTargetingRecommendations(
  industry: string,
  ageRange: string,
  targetingType: 'single' | 'group',
  count: number
): Promise<string> {
  // Geçerli API anahtarı kontrolü
  if (!MISTRAL_API_KEY || MISTRAL_API_KEY === 'your_mistral_api_key_here') {
    console.warn('Geçerli Mistral API anahtarı olmadığı için fallback yanıt üretiliyor.');
    return generateFallbackResponse(industry, ageRange, targetingType, count);
  }
  
  try {
    console.log(`Hedef kitle önerileri üretiliyor: ${industry}, ${ageRange}, ${targetingType}, ${count}`);
    
    const systemMessage = `Sen Meta (Facebook ve Instagram) reklamları için hedef kitle önerileri geliştiren bir AI asistanısın.
    Kullanıcının belirttiği sektör, yaş aralığı ve diğer parametrelere göre en alakalı hedef kitle ilgi alanlarını önermen gerekiyor.`;
    
    const userMessage = `Aşağıdaki bilgilere göre Meta reklamları için hedef kitle önerileri oluştur:
    
    Sektör: ${industry}
    Yaş Aralığı: ${ageRange}
    Önerilen Hedefleme Türü: ${targetingType === 'single' ? 'Tekli Hedefleme' : 'Grup Hedefleme'}
    İstenilen Öneri Sayısı: ${count}
    
    ${targetingType === 'single' 
      ? `Bana tam olarak ${count} adet tekli ilgi alanı (interest) öner. Her bir ilgi alanını ayrı satırda numara vererek listele.` 
      : `Bana ilişkili ilgi alanlarından oluşan ${count} adet grup öner. Her grubu ayrı başlık altında ve maddeler halinde listele.`}
    
    Sonuçlar şu formatı takip etmelidir:
    
    **Meta Reklamlarınız için Hedefleme Önerileri**
    
    **Yaş Aralığı:** [belirtilen yaş aralığı]
    
    ${targetingType === 'single' 
      ? '**İlgi Alanları:**\n1. [ilgi alanı 1]\n2. [ilgi alanı 2]\n...' 
      : '**Grup 1:**\n- [ilgi alanı 1]\n- [ilgi alanı 2]\n...\n\n**Grup 2:**\n- [ilgi alanı 1]\n- [ilgi alanı 2]\n...'}
    
    Önerilerin sonunda bir açıklama ekle: "Bu hedeflemeler, [sektör] sektörü ve [yaş aralığı] yaş aralığı için optimize edilmiştir. Meta reklam kampanyalarınızda kullanabilirsiniz."`;

    // Mistral ile sohbet isteği gönder
    console.log('Mistral AI API\'ye istek gönderiliyor...');
    const response = await mistral.chat.complete({
      model: MODEL,
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.7, // Yaratıcılık seviyesi (0.0 - 1.0)
      maxTokens: 1024 // Maksimum token sayısı
    });
    console.log('Mistral AI yanıt verdi!');

    // AI'dan gelen cevabı döndür
    if (!response.choices || response.choices.length === 0) {
      console.error('Mistral AI\'dan boş yanıt alındı.');
      return generateFallbackResponse(industry, ageRange, targetingType, count);
    }
    
    const content = response.choices[0].message.content;
    if (content === null || content === undefined) {
      console.error('Mistral AI\'dan geçersiz içerik alındı.');
      return generateFallbackResponse(industry, ageRange, targetingType, count);
    }
    
    return typeof content === 'string' ? content : JSON.stringify(content);
  } catch (error) {
    console.error('Hedef kitle önerileri oluşturulurken hata oluştu:', error);
    // Hata durumunda fallback yanıt döndür
    return generateFallbackResponse(industry, ageRange, targetingType, count);
  }
}

// Mevcut öneriler üzerine alternatif öneriler oluşturur
export async function generateAlternativeRecommendations(
  industry: string,
  ageRange: string,
  targetingType: 'single' | 'group',
  count: number
): Promise<string> {
  // Geçerli API anahtarı kontrolü
  if (!MISTRAL_API_KEY || MISTRAL_API_KEY === 'your_mistral_api_key_here') {
    console.warn('Geçerli Mistral API anahtarı olmadığı için alternatif fallback yanıt üretiliyor.');
    
    // Alternatif fallback yanıt için farklı ilgi alanları listesi kullan
    const alternativeInterests = [
      'Dekorasyon', 'Ev Dekorasyonu', 'İç Tasarım', 'Mobilya', 'Ev Aksesuarları',
      'Mutfak Eşyaları', 'Ev Tekstili', 'DIY', 'Kendin Yap', 'Bahçe Düzenleme'
    ];
    
    let response = `**Alternatif Hedefleme Önerileri**\n\n`;
    response += `**Yaş Aralığı:** ${ageRange}\n\n`;
    
    if (targetingType === 'single') {
      response += `**İlgi Alanları:**\n`;
      
      for (let i = 0; i < Math.min(count, alternativeInterests.length); i++) {
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
    return response;
  }
  
  try {
    console.log(`Alternatif hedef kitle önerileri üretiliyor: ${industry}, ${ageRange}, ${targetingType}, ${count}`);
    
    const systemMessage = `Sen Meta (Facebook ve Instagram) reklamları için alternatif hedef kitle önerileri geliştiren bir AI asistanısın.
    Kullanıcı zaten bazı öneriler almış, ve şimdi farklı alternatifler istiyor.`;
    
    const userMessage = `Aşağıdaki bilgilere göre Meta reklamları için ALTERNATİF hedef kitle önerileri oluştur.
    Önceki önerilerden FARKLI ilgi alanları seçmeye çalış.
    
    Sektör: ${industry}
    Yaş Aralığı: ${ageRange}
    Önerilen Hedefleme Türü: ${targetingType === 'single' ? 'Tekli Hedefleme' : 'Grup Hedefleme'}
    İstenilen Öneri Sayısı: ${count}
    
    ${targetingType === 'single' 
      ? `Bana tam olarak ${count} adet tekli ilgi alanı (interest) öner. Her bir ilgi alanını ayrı satırda numara vererek listele.` 
      : `Bana ilişkili ilgi alanlarından oluşan ${count} adet grup öner. Her grubu ayrı başlık altında ve maddeler halinde listele.`}
    
    Sonuçlar şu formatı takip etmelidir:
    
    **Alternatif Hedefleme Önerileri**
    
    **Yaş Aralığı:** [belirtilen yaş aralığı]
    
    ${targetingType === 'single' 
      ? '**İlgi Alanları:**\n1. [ilgi alanı 1]\n2. [ilgi alanı 2]\n...' 
      : '**Grup 1:**\n- [ilgi alanı 1]\n- [ilgi alanı 2]\n...\n\n**Grup 2:**\n- [ilgi alanı 1]\n- [ilgi alanı 2]\n...'}
    
    Önerilerin sonunda bir açıklama ekle: "Bu alternatif hedeflemeler de [sektör] sektörü ve [yaş aralığı] yaş aralığı için uygun olabilir."`;

    // Mistral ile sohbet isteği gönder
    console.log('Alternatif öneriler için Mistral AI API\'ye istek gönderiliyor...');
    const response = await mistral.chat.complete({
      model: MODEL,
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.8, // Alternatifler için daha yüksek yaratıcılık
      maxTokens: 1024
    });
    console.log('Mistral AI alternatif öneriler için yanıt verdi!');

    // AI'dan gelen cevabı döndür
    if (!response.choices || response.choices.length === 0) {
      throw new Error('No response from Mistral AI');
    }
    
    const content = response.choices[0].message.content;
    if (content === null || content === undefined) {
      throw new Error('Invalid response content from Mistral AI');
    }
    
    return typeof content === 'string' ? content : JSON.stringify(content);
  } catch (error) {
    console.error('Alternatif öneriler oluşturulurken hata:', error);
    
    // Hata durumunda default alternatif öneriler
    const alternativeInterests = [
      'Dekorasyon', 'Ev Dekorasyonu', 'İç Tasarım', 'Mobilya', 'Ev Aksesuarları',
      'Mutfak Eşyaları', 'Ev Tekstili', 'DIY', 'Kendin Yap', 'Bahçe Düzenleme'
    ];
    
    let response = `**Alternatif Hedefleme Önerileri**\n\n`;
    response += `**Yaş Aralığı:** ${ageRange}\n\n`;
    
    if (targetingType === 'single') {
      response += `**İlgi Alanları:**\n`;
      
      for (let i = 0; i < Math.min(count, alternativeInterests.length); i++) {
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
    return response;
  }
} 
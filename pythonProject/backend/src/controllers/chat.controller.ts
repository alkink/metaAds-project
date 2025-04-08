import { Request, Response } from 'express';
import { generateTargetingRecommendations } from '../services/ai.service';

/**
 * Start a new chat session
 * @route POST /api/v1/chat/start
 */
export const startChat = async (req: Request, res: Response) => {
  try {
    // In a real app, we would create a chat session and return the session ID
    // For now, we'll just return a success message
    res.json({
      success: true,
      message: 'Chat session started',
      data: {
        welcomeMessage: "Merhaba! Meta Ads Targeting Assistant'a hoş geldiniz. Size nasıl yardımcı olabilirim?"
      }
    });
  } catch (error) {
    console.error('Error starting chat:', error);
    res.status(500).json({ message: 'Error starting chat session' });
  }
};

/**
 * Send a message in an existing chat
 * @route POST /api/v1/chat/message
 */
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message, step, industry, ageRange, targetingType, suggestionCount } = req.body;
    
    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }
    
    let response = {
      content: `You said: ${message}`,
      nextStep: step || 'initial'
    };
    
    // Process based on the step
    switch (step) {
      case 'initial':
        if (message.toLowerCase().includes('başla')) {
          response = {
            content: 'Hangi sektörde faaliyet gösteriyorsunuz?',
            nextStep: 'industry'
          };
        }
        break;
        
      case 'industry':
        response = {
          content: 'Yaklaşık olarak hangi yaş aralığındaki kullanıcıları hedeflemek istersiniz?',
          nextStep: 'ageRange'
        };
        break;
        
      case 'ageRange':
        response = {
          content: 'Hangi tür hedefleme önerisi almak istersiniz? (Tekli/Grup)',
          nextStep: 'targetingType'
        };
        break;
        
      case 'targetingType':
        response = {
          content: 'Kaç adet öneri almak istersiniz? (Lütfen sadece sayı girin)',
          nextStep: 'suggestionCount'
        };
        break;
        
      case 'suggestionCount':
        try {
          // Mistral AI ile hedef kitle önerileri oluştur
          const aiType = targetingType === 'tekli' || targetingType === '1' ? 'single' : 'group';
          const countNum = parseInt(suggestionCount);
          
          if (isNaN(countNum) || countNum <= 0) {
            response = {
              content: 'Lütfen geçerli bir sayı girin.',
              nextStep: 'suggestionCount'
            };
          } else {
            // AI'den öneriler al
            const aiResponse = await generateTargetingRecommendations(
              industry,
              ageRange,
              aiType,
              countNum
            );
            
            response = {
              content: aiResponse,
              nextStep: 'result'
            };
          }
        } catch (aiError) {
          console.error('AI Service error:', aiError);
          // AI hata verirse yedek (mock) yanıt kullan
          response = {
            content: generateMockSuggestions(industry, ageRange, targetingType, parseInt(suggestionCount)),
            nextStep: 'result'
          };
        }
        break;
        
      default:
        response = {
          content: 'Nasıl yardımcı olabilirim?',
          nextStep: 'initial'
        };
    }
    
    res.json({
      success: true,
      data: response
    });
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ message: 'Error processing message' });
  }
};

// Helper function to generate mock suggestions as fallback
function generateMockSuggestions(industry: string, ageRange: string, targetingType: string, count: number): string {
  let response = `**Meta Reklamlarınız için Hedefleme Önerileri**\n\n`;
  response += `**Yaş Aralığı:** ${ageRange || '25-45'}\n\n`;
  
  if (targetingType === 'single' || targetingType === 'tekli' || targetingType === '1') {
    response += `**İlgi Alanları:**\n`;
    const mockInterests = ['Moda', 'Güzellik', 'Alışveriş', 'Lifestyle', 'Kozmetik', 'Saç Bakımı', 'Makyaj', 'Wellness'];
    
    for (let i = 0; i < Math.min(count || 3, mockInterests.length); i++) {
      response += `${i+1}. ${mockInterests[i]}\n`;
    }
  } else {
    response += `**Grup 1:**\n`;
    const mockGroup1 = ['Etek', 'Bluz', 'Pantolon', 'Butikler', 'Giyim Mağazaları'];
    
    for (let i = 0; i < Math.min(mockGroup1.length, 5); i++) {
      response += `- ${mockGroup1[i]}\n`;
    }
    
    response += `\n**Grup 2:**\n`;
    const mockGroup2 = ['Güzellik', 'Hair', 'Fashion and makeup', 'Saç boyama', 'Güzellik salonları'];
    
    for (let i = 0; i < Math.min(mockGroup2.length, 5); i++) {
      response += `- ${mockGroup2[i]}\n`;
    }
  }
  
  response += `\nBu hedeflemeler, ${industry || 'seçilen sektör'} sektörü ve ${ageRange || '25-45'} yaş aralığı için optimize edilmiştir. Meta reklam kampanyalarınızda kullanabilirsiniz.`;
  
  return response;
} 
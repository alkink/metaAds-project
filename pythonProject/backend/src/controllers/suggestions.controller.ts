import { Request, Response } from 'express';
import { generateAlternativeRecommendations } from '../services/ai.service';

/**
 * Get more suggestions
 * @route POST /api/v1/suggestions/more
 */
export const getMoreSuggestions = async (req: Request, res: Response) => {
  try {
    const { industry, ageRange, targetingType, suggestionCount } = req.body;
    
    if (!industry || !ageRange || !targetingType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    try {
      // Mistral AI ile alternatif hedef kitle önerileri oluştur
      const aiType = targetingType === 'tekli' || targetingType === '1' || targetingType === 'single' ? 'single' : 'group';
      const countNum = parseInt(suggestionCount) || 3;
      
      // AI'den alternatif öneriler al
      const aiResponse = await generateAlternativeRecommendations(
        industry,
        ageRange,
        aiType,
        countNum
      );
      
      res.json({
        success: true,
        data: {
          content: aiResponse
        }
      });
    } catch (aiError) {
      console.error('AI Service error:', aiError);
      // AI hata verirse yedek (mock) yanıt kullan
      const alternativeInterests = [
        'Dekorasyon', 'Ev Dekorasyonu', 'İç Tasarım', 'Mobilya', 'Ev Aksesuarları',
        'Mutfak Eşyaları', 'Ev Tekstili', 'DIY', 'Kendin Yap', 'Bahçe Düzenleme'
      ];
      
      // Generate mock suggestions
      let response = `**Alternatif Hedefleme Önerileri**\n\n`;
      response += `**Yaş Aralığı:** ${ageRange}\n\n`;
      
      if (targetingType === 'single' || targetingType === 'tekli' || targetingType === '1') {
        response += `**İlgi Alanları:**\n`;
        
        for (let i = 0; i < Math.min(suggestionCount || 3, 5); i++) {
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
      
      res.json({
        success: true,
        data: {
          content: response
        }
      });
    }
  } catch (error) {
    console.error('Error generating more suggestions:', error);
    res.status(500).json({ message: 'Error generating more suggestions' });
  }
}; 
"use client";

import React, { useState, FormEvent } from 'react';
import { useChatStore, ChatStep } from '@/store/chatStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { sendMessage, getMoreSuggestions } from '@/services/apiService';

const ChatInput: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [errorState, setErrorState] = useState<string | null>(null);
  
  const { 
    currentStep, 
    addMessage, 
    setCurrentStep, 
    setIndustry, 
    setAgeRange, 
    setTargetingType, 
    setSuggestionCount,
    isLoading,
    setIsLoading,
    industry,
    ageRange,
    targetingType,
    suggestionCount
  } = useChatStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorState(null);
    
    if (!inputValue.trim() || isLoading) return;
    
    // Add user message to chat
    addMessage(inputValue, 'user');
    setInputValue('');
    
    // Handle different steps of the conversation
    handleStepLogic(inputValue);
  };

  const handleStepLogic = async (input: string) => {
    setIsLoading(true);
    
    try {
      // Handle input based on current step
      switch (currentStep) {
        case 'initial':
          if (input.toLowerCase().includes('başla') || input.toLowerCase().includes('başlamak')) {
            // API çağrısı yap
            const response = await sendMessage(input, 'initial');
            addMessage(response.data.content, 'assistant');
            setCurrentStep('industry');
            addMessage('Örnek: Kadın Kuaför, E-ticaret, Fitness, Eğitim...', 'system');
          } else {
            addMessage('Başlamak için "Başlamak istiyorum" yazabilirsiniz.', 'assistant');
          }
          break;
          
        case 'industry':
          setIndustry(input);
          // API çağrısı yap
          const industryResponse = await sendMessage(input, 'industry');
          addMessage(industryResponse.data.content, 'assistant');
          setCurrentStep('ageRange');
          addMessage('Örnek: 25-45', 'system');
          break;
          
        case 'ageRange':
          setAgeRange(input);
          // API çağrısı yap
          const ageResponse = await sendMessage(input, 'ageRange');
          addMessage(ageResponse.data.content, 'assistant');
          setCurrentStep('targetingType');
          setTimeout(() => {
            addMessage('1. Tekli Hedefleme\n2. Grup Hedefleme', 'system');
          }, 300);
          break;
          
        case 'targetingType':
          if (input.toLowerCase().includes('tekli') || input === '1') {
            setTargetingType('single');
          } else {
            setTargetingType('group');
          }
          // API çağrısı yap
          const typeResponse = await sendMessage(input, 'targetingType');
          addMessage(typeResponse.data.content, 'assistant');
          setCurrentStep('suggestionCount');
          break;
          
        case 'suggestionCount':
          const count = parseInt(input);
          if (isNaN(count) || count <= 0) {
            addMessage('Lütfen geçerli bir sayı girin.', 'assistant');
          } else {
            setSuggestionCount(count);
            
            // API çağrısı yap - tüm bilgileri gönder
            addMessage('Önerileriniz hazırlanıyor...', 'system');
            
            try {
              const resultResponse = await sendMessage(
                input, 
                'suggestionCount',
                industry,
                ageRange,
                targetingType,
                count
              );
              
              setCurrentStep('result');
              addMessage(resultResponse.data.content, 'assistant');
              
              // "Biraz Daha Öner" ve "Yeniden Başla" butonlarını ekle
              setTimeout(() => {
                addMessage('Biraz Daha Öner | Yeniden Başla', 'system');
              }, 500);
            } catch (apiError) {
              console.error('API hatası:', apiError);
              addMessage('API yanıt vermedi. Fallback öneriler kullanılıyor...', 'system');
              
              // Fallback response
              const fallbackContent = generateMockSuggestions(industry!, ageRange!, targetingType!, count);
              addMessage(fallbackContent, 'assistant');
              setCurrentStep('result');
              
              setTimeout(() => {
                addMessage('Biraz Daha Öner | Yeniden Başla', 'system');
              }, 500);
            }
          }
          break;
          
        case 'result':
          // Sonuç sayfasındayız, burada özel komutları işle
          if (input.toLowerCase().includes('daha') || input.toLowerCase().includes('öner')) {
            if (industry && ageRange && targetingType && suggestionCount) {
              addMessage('Alternatif öneriler hazırlanıyor...', 'system');
              
              try {
                // Daha fazla öneri API çağrısı
                const moreResponse = await getMoreSuggestions(
                  industry,
                  ageRange,
                  targetingType,
                  suggestionCount
                );
                
                addMessage(moreResponse.data.content, 'assistant');
              } catch (moreError) {
                console.error('Alternatif öneriler hatası:', moreError);
                // Fallback yanıt
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
                
                addMessage(response, 'assistant');
              }
              
              // "Biraz Daha Öner" ve "Yeniden Başla" butonlarını tekrar ekle
              setTimeout(() => {
                addMessage('Biraz Daha Öner | Yeniden Başla', 'system');
              }, 500);
            }
          } else if (input.toLowerCase().includes('yeniden') || input.toLowerCase().includes('başla')) {
            // Sohbeti sıfırla
            useChatStore.getState().reset();
            
            // Hoşgeldiniz mesajını ekle
            setTimeout(() => {
              addMessage("Merhaba! Meta Ads Targeting Assistant'a hoş geldiniz. Size nasıl yardımcı olabilirim?", 'assistant');
            }, 300);
          } else {
            // Standart cevap
            addMessage('Yeni bir öneri için "Biraz Daha Öner" yazabilir veya "Yeniden Başla" diyerek yeni bir danışmaya başlayabilirsiniz.', 'assistant');
          }
          break;
          
        default:
          addMessage('Nasıl yardımcı olabilirim?', 'assistant');
          break;
      }
    } catch (error) {
      console.error('Adım işleme hatası:', error);
      setErrorState('Bir hata oluştu. Lütfen tekrar deneyin.');
      addMessage('Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.', 'assistant');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock yanıt oluşturucu (API hata durumları için)
  const generateMockSuggestions = (industry: string, ageRange: string, targetingType: string, count: number): string => {
    let response = `**Meta Reklamlarınız için Hedefleme Önerileri**\n\n`;
    response += `**Yaş Aralığı:** ${ageRange || '25-45'}\n\n`;
    
    if (targetingType === 'single') {
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
  };

  return (
    <div>
      {errorState && (
        <div className="text-red-500 mb-2 text-center text-sm">{errorState}</div>
      )}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Mesajınızı buraya yazın..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" isLoading={isLoading}>
          Gönder
        </Button>
      </form>
    </div>
  );
};

export default ChatInput; 
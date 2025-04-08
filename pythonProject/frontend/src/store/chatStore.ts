"use client";

import { create } from 'zustand';
import { MessageType } from '@/components/ui/ChatBubble';

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
}

export type ChatStep = 
  | 'initial'
  | 'industry'
  | 'ageRange'
  | 'targetingType'
  | 'suggestionCount'
  | 'result';

export type TargetingType = 'single' | 'group';

interface ChatState {
  messages: Message[];
  currentStep: ChatStep;
  industry: string | null;
  ageRange: string | null;
  targetingType: TargetingType | null;
  suggestionCount: number | null;
  isLoading: boolean;
  
  // Actions
  addMessage: (content: string, type: MessageType) => void;
  setCurrentStep: (step: ChatStep) => void;
  setIndustry: (industry: string) => void;
  setAgeRange: (ageRange: string) => void;
  setTargetingType: (type: TargetingType) => void;
  setSuggestionCount: (count: number) => void;
  setIsLoading: (loading: boolean) => void;
  reset: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  currentStep: 'initial',
  industry: null,
  ageRange: null,
  targetingType: null,
  suggestionCount: null,
  isLoading: false,
  
  addMessage: (content, type) => set((state) => ({
    messages: [
      ...state.messages,
      {
        id: generateId(),
        content,
        type,
        timestamp: new Date(),
      },
    ],
  })),
  
  setCurrentStep: (step) => set({ currentStep: step }),
  
  setIndustry: (industry) => set({ industry }),
  
  setAgeRange: (ageRange) => set({ ageRange }),
  
  setTargetingType: (targetingType) => set({ targetingType }),
  
  setSuggestionCount: (suggestionCount) => set({ suggestionCount }),
  
  setIsLoading: (isLoading) => set({ isLoading }),
  
  reset: () => set({
    messages: [],
    currentStep: 'initial',
    industry: null,
    ageRange: null,
    targetingType: null,
    suggestionCount: null,
    isLoading: false,
  }),
})); 
"use client";

import React, { useEffect, useRef } from 'react';
import ChatBubble from '@/components/ui/ChatBubble';
import ChatInput from './ChatInput';
import { useChatStore } from '@/store/chatStore';

const ChatContainer: React.FC = () => {
  const { messages, currentStep, addMessage, setCurrentStep } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0 && currentStep === 'initial') {
      addMessage(
        "Merhaba! Meta Ads Targeting Assistant'a hoş geldiniz. Size nasıl yardımcı olabilirim?",
        'assistant'
      );
    }
  }, [messages.length, currentStep, addMessage]);

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message.content}
            type={message.type}
            timestamp={message.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-4">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatContainer; 
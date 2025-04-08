"use client";

import React from 'react';

export type MessageType = 'user' | 'assistant' | 'system';

export interface ChatBubbleProps {
  message: string;
  type: MessageType;
  timestamp?: Date;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  type,
  timestamp = new Date(),
}) => {
  return (
    <div
      className={`flex flex-col mb-3 ${
        type === 'user' ? 'items-end' : 'items-start'
      }`}
    >
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          type === 'user'
            ? 'bg-blue-600 text-white'
            : type === 'assistant'
            ? 'bg-gray-200 text-gray-800'
            : 'bg-gray-100 text-gray-500 italic text-sm'
        }`}
      >
        {type === 'system' ? (
          <p className="text-sm italic">{message}</p>
        ) : (
          <div className="whitespace-pre-wrap">{message}</div>
        )}
      </div>
      <div
        className={`text-xs mt-1 text-gray-500 ${
          type === 'user' ? 'text-right' : 'text-left'
        }`}
      >
        {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default ChatBubble; 
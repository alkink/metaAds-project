"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ChatContainer to prevent hydration issues
const ChatContainer = dynamic(
  () => import('@/components/Chat/ChatContainer'),
  { loading: () => <p className="text-center p-4">Yükleniyor...</p> }
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="bg-blue-600 text-white p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Meta Reklam Hedefleme Asistanı</h1>
          <p className="text-sm opacity-80">Dijital Pazarlama Komiseri AI</p>
        </div>
      </header>
      
      <div className="flex-1 flex flex-col p-4">
        <ChatContainer />
      </div>
      
      <footer className="border-t py-4 text-center text-gray-500 text-sm">
        <div className="max-w-4xl mx-auto">
          &copy; {new Date().getFullYear()} Meta Reklam Hedefleme Asistanı
        </div>
      </footer>
    </main>
  );
}

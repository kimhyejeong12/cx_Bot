import React, { useRef, useEffect } from 'react';
import { Message, Language } from '../types';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { WELCOME_MESSAGES } from '../constants';

interface ChatWidgetProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ messages, onSendMessage, isLoading, language, onLanguageChange }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  
  const welcomeText = WELCOME_MESSAGES[language];

  return (
    <div className="w-full max-w-lg h-[70vh] flex flex-col bg-brand-surface rounded-2xl shadow-2xl shadow-brand-primary/50 border border-brand-primary overflow-hidden">
      <header className="flex items-center justify-between p-4 bg-brand-primary/20 backdrop-blur-sm border-b border-brand-primary">
        <h1 className="text-xl font-bold text-brand-text">{welcomeText.title}</h1>
        <div className="flex items-center space-x-2">
            <button 
                onClick={() => onLanguageChange('ko')}
                className={`px-2 py-1 text-sm rounded-md transition-colors ${language === 'ko' ? 'bg-brand-secondary text-brand-text' : 'bg-transparent text-brand-subtle hover:bg-black/5'}`}
            >
                KO
            </button>
            <button 
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 text-sm rounded-md transition-colors ${language === 'en' ? 'bg-brand-secondary text-brand-text' : 'bg-transparent text-brand-subtle hover:bg-black/5'}`}
            >
                EN
            </button>
        </div>
      </header>
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && (
            <div className="flex justify-start">
                <div className="bg-white text-brand-subtle text-sm rounded-lg px-4 py-2 max-w-xs animate-pulse border border-gray-200">
                    Typing...
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={onSendMessage} placeholder={welcomeText.placeholder} />
    </div>
  );
};
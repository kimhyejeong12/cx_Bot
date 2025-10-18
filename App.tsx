
import React, { useState, useCallback, useEffect } from 'react';
import { ChatWidget } from './components/ChatWidget';
import { Message, Language, Emotion } from './types';
import { analyzeUserMessage } from './services/geminiService';
import { WELCOME_MESSAGES } from './constants';

const App: React.FC = () => {
    const [language, setLanguage] = useState<Language>('ko');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
      setMessages([
        {
          id: 'welcome-message',
          text: WELCOME_MESSAGES[language].body,
          sender: 'bot',
          emotion: Emotion.Calmness,
        },
      ]);
    }, [language]);


    const handleSendMessage = useCallback(async (text: string) => {
        if (!text.trim()) return;

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            text,
            sender: 'user',
            emotion: Emotion.Neutral, // Start as neutral
        };
        
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const { emotion: detectedEmotion, response: botResponse } = await analyzeUserMessage(text, language, messages);

            setMessages(prev => prev.map(msg => 
                msg.id === userMessage.id ? { ...msg, emotion: detectedEmotion } : msg
            ));

            const botMessage: Message = {
                id: `bot-${Date.now()}`,
                text: botResponse,
                sender: 'bot',
                emotion: Emotion.Calmness, // Bot is always calm
            };
            setMessages(prev => [...prev, botMessage]);

        } catch (error) {
            console.error("Error communicating with Gemini API:", error);
            const errorMessage: Message = {
                id: `error-${Date.now()}`,
                text: language === 'ko' ? '죄송합니다. 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' : 'Sorry, an error occurred. Please try again later.',
                sender: 'bot',
                emotion: Emotion.Sadness,
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [language, messages]);
    
    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
    };

    return (
        <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4 font-sans">
            <ChatWidget
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                language={language}
                onLanguageChange={handleLanguageChange}
            />
        </div>
    );
};

export default App;

import { Emotion } from './types';

export const EMOTION_STYLES: Record<Emotion, { bubble: string; text: string; animation: string }> = {
  [Emotion.Joy]: {
    bubble: 'bg-yellow-100 border-yellow-300',
    text: 'text-yellow-800',
    animation: 'animate-bounceGentle',
  },
  [Emotion.Anger]: {
    bubble: 'bg-red-100 border-red-300',
    text: 'text-red-800',
    animation: 'animate-pulseStrong',
  },
  [Emotion.Sadness]: {
    bubble: 'bg-blue-100 border-blue-300',
    text: 'text-blue-800',
    animation: 'animate-fadeIn',
  },
  [Emotion.Fear]: {
    bubble: 'bg-purple-100 border-purple-300',
    text: 'text-purple-800',
    animation: 'animate-shiver',
  },
  [Emotion.Calmness]: {
    bubble: 'bg-green-100 border-green-300',
    text: 'text-green-800',
    animation: 'animate-glow',
  },
  [Emotion.Surprise]: {
    bubble: 'bg-orange-100 border-orange-300',
    text: 'text-orange-800',
    animation: 'animate-pop',
  },
  [Emotion.Neutral]: {
    bubble: 'bg-gray-200 border-gray-300',
    text: 'text-gray-800',
    animation: '',
  },
};

export const WELCOME_MESSAGES: Record<'ko' | 'en', { title: string; body: string; placeholder: string; }> = {
    ko: {
        title: 'AniBalloons CX 봇',
        body: '안녕하세요! 게임/엔터테인먼트 고객지원 챗봇입니다. 무엇을 도와드릴까요?',
        placeholder: '메시지를 입력하세요...'
    },
    en: {
        title: 'AniBalloons CX Bot',
        body: 'Hello! I\'m the customer support chatbot for gaming/entertainment. How can I help you?',
        placeholder: 'Type your message...'
    }
}
import React from 'react';
import { Message } from '../types';
import { EMOTION_STYLES } from '../constants';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { text, sender, emotion } = message;
  const isUser = sender === 'user';
  
  const styles = EMOTION_STYLES[emotion] || EMOTION_STYLES.Neutral;

  const bubbleClasses = `
    max-w-md lg:max-w-lg px-4 py-3 rounded-2xl border transition-all duration-500
    ${isUser ? 'rounded-br-lg' : 'rounded-bl-lg'}
    ${styles.bubble}
    ${styles.animation}
  `;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={bubbleClasses}>
        <p className={`text-base whitespace-pre-wrap ${styles.text}`}>
          {text}
        </p>
      </div>
    </div>
  );
};

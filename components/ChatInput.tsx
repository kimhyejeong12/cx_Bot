import React, { useState } from 'react';

interface ChatInputProps {
  onSend: (text: string) => void;
  placeholder: string;
}

const SendIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
);


export const ChatInput: React.FC<ChatInputProps> = ({ onSend, placeholder }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
    }
  };

  return (
    <div className="p-4 bg-white/50 border-t border-brand-primary">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          className="flex-1 p-3 bg-white border border-brand-primary rounded-lg text-brand-text focus:ring-2 focus:ring-brand-secondary focus:outline-none resize-none"
          style={{maxHeight: '100px'}}
        />
        <button
          type="submit"
          className="p-3 bg-brand-secondary text-brand-text rounded-lg hover:bg-pink-300 disabled:bg-gray-200 disabled:text-gray-400 transition-colors"
          disabled={!text.trim()}
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
};
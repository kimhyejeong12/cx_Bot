
export enum Emotion {
  Joy = 'Joy',
  Anger = 'Anger',
  Sadness = 'Sadness',
  Fear = 'Fear',
  Calmness = 'Calmness',
  Surprise = 'Surprise',
  Neutral = 'Neutral',
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  emotion: Emotion;
}

export type Language = 'ko' | 'en';


import { GoogleGenAI, Type } from "@google/genai";
import { Emotion, Language, Message } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        emotion: {
            type: Type.STRING,
            description: "The user's dominant emotion. Must be one of: Joy, Anger, Sadness, Fear, Calmness, Surprise, Neutral.",
            enum: Object.values(Emotion),
        },
        response: {
            type: Type.STRING,
            description: "An empathetic, warm, and helpful response tailored to the user's emotion and query, in the requested language. Use gamer-friendly slang appropriately. Avoid humor for Anger/Fear emotions.",
        },
    },
    required: ["emotion", "response"],
};

const getSystemInstruction = (language: Language, history: Message[]) => `
You are 'AniBalloons CX Bot', a friendly and empathetic customer support AI for gamers.
Your persona is a mix of Empathy, Warmth, and appropriate Humor.
You must adhere to these rules:
1.  Analyze the user's message to detect their primary emotion from this list: ${Object.values(Emotion).join(', ')}.
2.  Generate a response in ${language === 'ko' ? 'Korean' : 'English'}.
3.  Your response must be empathetic to the user's detected emotion.
4.  For 'Anger' or 'Fear', prioritize empathy and warmth. DO NOT use humor.
5.  For 'Joy', 'Surprise', or 'Calmness', you can use light, gamer-friendly humor and slang.
6.  Keep responses concise and helpful, focusing on solving the user's problem based on common gaming FAQs (bugs, account issues, server status, rewards).
7.  You must always output a JSON object matching the required schema.

Conversation History (for context):
${history.map(msg => `${msg.sender}: ${msg.text}`).join('\n')}
`;

export const analyzeUserMessage = async (
    userMessage: string,
    language: Language,
    history: Message[]
): Promise<{ emotion: Emotion; response:string; }> => {
    try {
        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: {
                parts: [{ text: `User message: "${userMessage}"` }]
            },
            config: {
                systemInstruction: getSystemInstruction(language, history.slice(-5)),
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        const jsonString = result.text.trim();
        const parsed = JSON.parse(jsonString);

        // Validate the emotion from the response
        const emotion = Object.values(Emotion).includes(parsed.emotion)
            ? parsed.emotion
            : Emotion.Neutral;

        return {
            emotion,
            response: parsed.response,
        };
    } catch (error) {
        console.error("Gemini API Error:", error);
        // Fallback response
        return {
            emotion: Emotion.Neutral, // The user's emotion is unknown on error
            response: language === 'ko' 
                ? "죄송합니다, 시스템에 문제가 발생하여 응답을 생성할 수 없습니다." 
                : "I'm sorry, I'm having trouble generating a response right now.",
        };
    }
};

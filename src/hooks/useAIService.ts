
import { useState, useCallback } from 'react';
import { AIService } from '@/utils/aiService';

// Read the OpenRouter API key from environment variable (set on Netlify)
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined;

export const useAIService = () => {
  const [isLoading, setIsLoading] = useState(false);

  const saveApiKey = useCallback((_key: string) => {}, []);
  const clearApiKey = useCallback(() => {}, []);

  const generateResponse = useCallback(async (prompt: string, context?: any): Promise<string> => {
    setIsLoading(true);
    try {
      if (!OPENROUTER_API_KEY) {
        throw new Error('API key not set. Please configure VITE_OPENROUTER_API_KEY in your environment variables.');
      }
      const aiService = new AIService(OPENROUTER_API_KEY);
      const response = await aiService.generateResponse(prompt, context);
      return response;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    apiKey: OPENROUTER_API_KEY,
    saveApiKey,
    clearApiKey,
    generateResponse,
    isLoading,
    hasApiKey: !!OPENROUTER_API_KEY // True only if present
  };
};

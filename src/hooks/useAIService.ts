
import { useState, useCallback } from 'react';
import { AIService } from '@/utils/aiService';

// Use the provided OpenRouter API key directly
const OPENROUTER_API_KEY = "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";

export const useAIService = () => {
  // No key from storage — always use the fixed key
  const [isLoading, setIsLoading] = useState(false);

  // Not needed anymore, but kept so the hook API doesn't break
  const saveApiKey = useCallback((_key: string) => {}, []);
  const clearApiKey = useCallback(() => {}, []);

  const generateResponse = useCallback(async (prompt: string, context?: any): Promise<string> => {
    setIsLoading(true);
    try {
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
    hasApiKey: true // Always present now
  };
};

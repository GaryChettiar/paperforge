
import { useState, useCallback } from 'react';
import { AIService } from '@/utils/aiService';

export const useAIService = () => {
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('openrouter-api-key') || '';
  });
  const [isLoading, setIsLoading] = useState(false);

  const saveApiKey = useCallback((key: string) => {
    setApiKey(key);
    localStorage.setItem('openrouter-api-key', key);
  }, []);

  const generateResponse = useCallback(async (prompt: string, context?: any): Promise<string> => {
    if (!apiKey) {
      throw new Error('Please provide your OpenRouter API key first');
    }

    setIsLoading(true);
    try {
      const aiService = new AIService(apiKey);
      const response = await aiService.generateResponse(prompt, context);
      return response;
    } finally {
      setIsLoading(false);
    }
  }, [apiKey]);

  const clearApiKey = useCallback(() => {
    setApiKey('');
    localStorage.removeItem('openrouter-api-key');
  }, []);

  return {
    apiKey,
    saveApiKey,
    clearApiKey,
    generateResponse,
    isLoading,
    hasApiKey: !!apiKey
  };
};

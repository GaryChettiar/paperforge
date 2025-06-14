
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles } from 'lucide-react';
import { useAIService } from '@/hooks/useAIService';
import { ResumeData } from '@/pages/Index';
import { useToast } from '@/hooks/use-toast';

interface SummaryEditorProps {
  data: string;
  onChange: (data: string) => void;
  resumeData?: ResumeData;
}

export const SummaryEditor: React.FC<SummaryEditorProps> = ({
  data,
  onChange,
  resumeData
}) => {
  const { generateResponse, isLoading, hasApiKey } = useAIService();
  const { toast } = useToast();

  const handleAIOptimize = async () => {
    if (!hasApiKey) {
      toast({
        title: "API Key Required",
        description: "Please set your OpenRouter API key in the AI Assistant to use this feature.",
        variant: "destructive",
      });
      return;
    }

    try {
      const prompt = `Based on my resume experience and skills, please write a compelling professional summary that would catch a recruiter's attention. Make it concise, impactful, and highlight key achievements.`;
      
      const optimizedSummary = await generateResponse(prompt, resumeData);
      onChange(optimizedSummary);
      
      toast({
        title: "Summary Optimized!",
        description: "Your professional summary has been enhanced with AI suggestions.",
      });
    } catch (error) {
      console.error('AI optimization error:', error);
      toast({
        title: "Optimization Failed",
        description: "Failed to optimize summary. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Professional Summary</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleAIOptimize}
          disabled={isLoading}
          className="flex items-center space-x-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isLoading ? 'Optimizing...' : 'AI Optimize'}</span>
        </Button>
      </div>
      
      <div>
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          value={data}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write a compelling professional summary that highlights your key achievements and career objectives..."
          className="min-h-[120px] mt-2"
        />
        <p className="text-sm text-gray-500 mt-2">
          Tip: Keep it concise and highlight your most relevant experience and skills.
        </p>
      </div>
    </div>
  );
};

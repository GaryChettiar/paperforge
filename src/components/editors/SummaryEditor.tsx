
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

  // Util: remove any generic intro/outro lines from AI output
  function cleanSummary(summary: string): string {
    // Remove asterisks, markdown bold, and special characters
    let cleaned = summary
      .replace(/(\*{1,3}|_{1,3}|`{1,3}|~{1,3})/g, "")
      .replace(/[\r\n]+/g, " ")
      .trim();

    // Common generic intro phrases to strip (case insensitive)
    const introPatterns = [
      /^here (is|is a|is your|are|are some) (a |an )?(professional )?(resume )?(summary|overview|introduction)?( based on (your|the) (details|resume|information|data))?:?/i,
      /^below (is|is a|is your|are|are some) (a |an )?(professional )?(resume )?(summary|overview|introduction)?( based on (your|the) (details|resume|information|data))?:?/i,
      /^professional summary:?/i,
      /^resume summary:?/i,
      /^summary:?/i,
      /^based on your (resume|data|profile).{0,40}:/i
    ];
    for (const pat of introPatterns) {
      cleaned = cleaned.replace(pat, "");
    }
    // Remove common trailing patterns if any
    cleaned = cleaned.replace(/thank(s| you)[^.]*\.?$/i, "");
    cleaned = cleaned.replace(/this summary was generated.*$/i, "");
    cleaned = cleaned.trim();

    // Remove trailing/leading leftover punctuation
    cleaned = cleaned.replace(/^[\s-:]+/, '').replace(/[\s-:]+$/, '');

    // Collapse multiple spaces
    cleaned = cleaned.replace(/\s{2,}/g, " ");

    return cleaned;
  }

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
      const prompt = `Using only plain English sentences, write a succinct, professional, and highly impactful summary for a resume, based strictly on the following user's resume data. Do NOT use any markdown, bold, asterisks, or special formatting—just clean, formal text. Focus on unique strengths, expertise, and key achievements relevant to recruiters, suitable as a profile summary at the top of a modern resume.`;

      const optimizedSummary = await generateResponse(prompt, resumeData);
      const cleanedSummary = cleanSummary(optimizedSummary);
      onChange(cleanedSummary);

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

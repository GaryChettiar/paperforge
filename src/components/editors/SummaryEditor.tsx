
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles } from 'lucide-react';

interface SummaryEditorProps {
  data: string;
  onChange: (data: string) => void;
}

export const SummaryEditor: React.FC<SummaryEditorProps> = ({
  data,
  onChange
}) => {
  const handleAIOptimize = () => {
    // AI optimization would be implemented here
    console.log('Optimizing summary with AI...');
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
          className="flex items-center space-x-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Optimize</span>
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

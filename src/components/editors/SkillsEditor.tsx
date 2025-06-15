
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Settings, Plus, X, Sparkles } from 'lucide-react';
import { useAIService } from '@/hooks/useAIService';
import { useToast } from '@/hooks/use-toast';

interface SkillsEditorProps {
  data: string[];
  onChange: (data: string[]) => void;
}

export const SkillsEditor: React.FC<SkillsEditorProps> = ({
  data,
  onChange
}) => {
  const [newSkill, setNewSkill] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const { generateResponse } = useAIService();
  const { toast } = useToast();

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(data.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const suggestedSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'AWS', 'Docker',
    'Kubernetes', 'MongoDB', 'PostgreSQL', 'Git', 'Agile', 'Scrum', 'REST APIs'
  ];

  const addSuggestedSkill = (skill: string) => {
    if (!data.includes(skill)) {
      onChange([...data, skill]);
    }
  };

  const handleAISuggest = async () => {
    setAiLoading(true);
    setAiSuggestions([]);
    toast({ title: "AI analyzing your resume...", description: "Generating best-fit skill suggestions." });
    try {
      // Sharpen prompt to ask for strict CSV, no intro.
      const response = await generateResponse(
        "Suggest the top 10 most relevant technical and soft skills for my resume. Respond ONLY with a comma-separated list of skills, no explanations, no headings, no extra text—just the list."
      );
      // Clean up any rogue lines, pick the first non-empty line.
      let mainLine = response.split('\n').find(l => l.trim() && !l.toLowerCase().includes('skills'));
      if (!mainLine) mainLine = response.trim();
      // Process skills as before.
      const parsed = mainLine.split(",").map(s => s.trim()).filter(Boolean);
      setAiSuggestions(parsed.filter(s => s && !data.includes(s)));
      if(parsed.length){
        toast({ title: "AI Suggestion Ready!", description: "Review and add suggested skills below." });
      } else {
        toast({ title: "No suggestions generated", description: "The AI did not return skills. Try again.", variant: "destructive" });
      }
    } catch (e: any) {
      toast({
        title: "AI Suggestion Failed",
        description: e?.message || "Could not fetch AI skill suggestions. Try again.",
        variant: "destructive",
      });
    }
    setAiLoading(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Settings className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center space-x-2"
          onClick={handleAISuggest}
          disabled={aiLoading}
        >
          <Sparkles className="w-4 h-4" />
          {aiLoading ? <span>Analyzing...</span> : <span>AI Suggest</span>}
        </Button>
      </div>

      {aiSuggestions.length > 0 && (
        <div className="mb-4">
          <Label>AI Suggested Skills</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {aiSuggestions.map(skill => (
              <Badge
                key={skill}
                variant="outline"
                className="cursor-pointer hover:bg-blue-50 border-blue-300"
                onClick={() => {
                  addSuggestedSkill(skill);
                  setAiSuggestions(aiSuggestions.filter(s => s !== skill));
                }}
              >
                + {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <Label htmlFor="newSkill">Add Skill</Label>
          <div className="flex space-x-2 mt-2">
            <Input
              id="newSkill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter a skill..."
            />
            <Button onClick={addSkill} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div>
          <Label>Your Skills</Label>
          <div className="flex flex-wrap gap-2 mt-2 min-h-[60px] p-3 border border-gray-200 rounded-md">
            {data.length === 0 ? (
              <p className="text-gray-500 text-sm">No skills added yet. Add your first skill above.</p>
            ) : (
              data.map((skill) => (
                <Badge key={skill} variant="secondary" className="flex items-center space-x-1">
                  <span>{skill}</span>
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))
            )}
          </div>
        </div>

        <div>
          <Label>Suggested Skills</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {suggestedSkills
              .filter(skill => !data.includes(skill))
              .slice(0, 10)
              .map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-50 hover:border-blue-300"
                  onClick={() => addSuggestedSkill(skill)}
                >
                  + {skill}
                </Badge>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

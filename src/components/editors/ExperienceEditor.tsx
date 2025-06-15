
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Briefcase, Plus, Trash2, Sparkles } from 'lucide-react';
import { useAIService } from '@/hooks/useAIService';
import { useToast } from '@/hooks/use-toast';

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

interface ExperienceEditorProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export const ExperienceEditor: React.FC<ExperienceEditorProps> = ({
  data,
  onChange
}) => {
  const [aiLoading, setAiLoading] = useState<string | null>(null);
  const { generateResponse } = useAIService();
  const { toast } = useToast();

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ['']
    };
    onChange([...data, newExperience]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(data.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  const updateDescription = (id: string, index: number, value: string) => {
    const experience = data.find(exp => exp.id === id);
    if (experience) {
      const newDescription = [...experience.description];
      newDescription[index] = value;
      updateExperience(id, 'description', newDescription);
    }
  };

  const addDescriptionPoint = (id: string) => {
    const experience = data.find(exp => exp.id === id);
    if (experience) {
      updateExperience(id, 'description', [...experience.description, '']);
    }
  };

  const removeDescriptionPoint = (id: string, index: number) => {
    const experience = data.find(exp => exp.id === id);
    if (experience && experience.description.length > 1) {
      const newDescription = experience.description.filter((_, i) => i !== index);
      updateExperience(id, 'description', newDescription);
    }
  };

  const handleAIEnhance = async (exp: Experience) => {
    setAiLoading(exp.id);
    toast({ title: "AI enhancing your work...", description: `Improving ${exp.company || "experience"} description.` });
    try {
      const context = {
        ...exp,
        // If more context is needed (like summary, skills, etc.), pass it here
      };
      const prompt = `
Please rewrite the job description bullet points for this position to be stronger, action-oriented, and achievement-focused, including quantitative results where possible. Return a numbered bullet list, each as a concise sentence.

Job Title: ${exp.title}
Company: ${exp.company}
Location: ${exp.location}
Period: ${exp.startDate} - ${exp.current ? "Present" : exp.endDate || ""}
Current Bullet Points:
${exp.description.filter(Boolean).map(d => "- " + d).join("\n")}
`
      ;

      const aiResult = await generateResponse(prompt, context);

      // Try to split out returned items by lines/numbers/dashes (handle possible formatting):
      const lines = aiResult
        .split(/\n/)
        .map(l => l.replace(/^\d+[.)-]? ?/, '').replace(/^- /, '').trim())
        .filter(Boolean);
      if (lines.length) {
        updateExperience(exp.id, "description", lines);
        toast({ title: "Success!", description: "AI-enhanced bullet points added." });
      } else {
        toast({
          title: "AI did not generate valid bullet points.",
          description: aiResult,
          variant: "destructive"
        });
      }
    } catch (e: any) {
      toast({
        title: "AI Enhancement Failed",
        description: e?.message || "AI couldn't enhance the work experience.",
        variant: "destructive",
      });
    }
    setAiLoading(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Briefcase className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
        </div>
        <Button onClick={addExperience} size="sm" className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </Button>
      </div>

      <div className="space-y-4">
        {data.map((experience, index) => (
          <Card key={experience.id} className="p-4 border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">Experience #{index + 1}</h4>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                  onClick={() => handleAIEnhance(experience)}
                  disabled={aiLoading === experience.id}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{aiLoading === experience.id ? "Enhancing..." : "AI Enhance"}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(experience.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label>Job Title</Label>
                <Input
                  value={experience.title}
                  onChange={(e) => updateExperience(experience.id, 'title', e.target.value)}
                  placeholder="Senior Software Engineer"
                />
              </div>

              <div>
                <Label>Company</Label>
                <Input
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                  placeholder="Tech Corp"
                />
              </div>

              <div>
                <Label>Location</Label>
                <Input
                  value={experience.location}
                  onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                  placeholder="San Francisco, CA"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${experience.id}`}
                  checked={experience.current}
                  onCheckedChange={(checked) => updateExperience(experience.id, 'current', checked)}
                />
                <Label htmlFor={`current-${experience.id}`}>Currently working here</Label>
              </div>

              <div>
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                />
              </div>

              {!experience.current && (
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                  />
                </div>
              )}
            </div>

            <div>
              <Label>Job Description</Label>
              <div className="space-y-2 mt-2">
                {experience.description.map((desc, descIndex) => (
                  <div key={descIndex} className="flex items-start space-x-2">
                    <span className="text-gray-400 mt-3">•</span>
                    <Textarea
                      value={desc}
                      onChange={(e) => updateDescription(experience.id, descIndex, e.target.value)}
                      placeholder="Describe your achievements and responsibilities..."
                      className="flex-1"
                      rows={2}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDescriptionPoint(experience.id, descIndex)}
                      className="text-red-600 hover:text-red-700 mt-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addDescriptionPoint(experience.id)}
                  className="flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Point</span>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

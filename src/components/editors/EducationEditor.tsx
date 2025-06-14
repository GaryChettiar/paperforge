
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  graduationDate: string;
  gpa?: string;
}

interface EducationEditorProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export const EducationEditor: React.FC<EducationEditorProps> = ({
  data,
  onChange
}) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      location: '',
      graduationDate: '',
      gpa: ''
    };
    onChange([...data, newEducation]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id: string) => {
    onChange(data.filter(edu => edu.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Education</h3>
        </div>
        <Button onClick={addEducation} size="sm" className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </Button>
      </div>

      <div className="space-y-4">
        {data.map((education, index) => (
          <Card key={education.id} className="p-4 border-l-4 border-l-green-500">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">Education #{index + 1}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(education.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Degree</Label>
                <Input
                  value={education.degree}
                  onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>
              
              <div>
                <Label>School</Label>
                <Input
                  value={education.school}
                  onChange={(e) => updateEducation(education.id, 'school', e.target.value)}
                  placeholder="University of California, Berkeley"
                />
              </div>
              
              <div>
                <Label>Location</Label>
                <Input
                  value={education.location}
                  onChange={(e) => updateEducation(education.id, 'location', e.target.value)}
                  placeholder="Berkeley, CA"
                />
              </div>
              
              <div>
                <Label>Graduation Date</Label>
                <Input
                  type="month"
                  value={education.graduationDate}
                  onChange={(e) => updateEducation(education.id, 'graduationDate', e.target.value)}
                />
              </div>
              
              <div>
                <Label>GPA (Optional)</Label>
                <Input
                  value={education.gpa || ''}
                  onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                  placeholder="3.8"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};


import React from 'react';
import { PersonalInfoEditor } from './editors/PersonalInfoEditor';
import { SummaryEditor } from './editors/SummaryEditor';
import { ExperienceEditor } from './editors/ExperienceEditor';
import { EducationEditor } from './editors/EducationEditor';
import { SkillsEditor } from './editors/SkillsEditor';
import { ProjectsEditor } from './editors/ProjectsEditor';
import { ResumeData } from '@/pages/Index';
import { Card } from '@/components/ui/card';

interface ResumeEditorProps {
  resumeData: ResumeData;
  onResumeDataChange: (data: ResumeData) => void;
}

export const ResumeEditor: React.FC<ResumeEditorProps> = ({
  resumeData,
  onResumeDataChange
}) => {
  const updateResumeData = (section: keyof ResumeData, data: any) => {
    onResumeDataChange({
      ...resumeData,
      [section]: data
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="p-6">
        <PersonalInfoEditor
          data={resumeData.personalInfo}
          onChange={(data) => updateResumeData('personalInfo', data)}
        />
      </Card>

      <Card className="p-6">
        <SummaryEditor
          data={resumeData.summary}
          onChange={(data) => updateResumeData('summary', data)}
          resumeData={resumeData}
        />
      </Card>

      <Card className="p-6">
        <ExperienceEditor
          data={resumeData.experience}
          onChange={(data) => updateResumeData('experience', data)}
        />
      </Card>

      <Card className="p-6">
        <EducationEditor
          data={resumeData.education}
          onChange={(data) => updateResumeData('education', data)}
        />
      </Card>

      <Card className="p-6">
        <SkillsEditor
          data={resumeData.skills}
          onChange={(data) => updateResumeData('skills', data)}
        />
      </Card>

      <Card className="p-6">
        <ProjectsEditor
          data={resumeData.projects}
          onChange={(data) => updateResumeData('projects', data)}
        />
      </Card>
    </div>
  );
};

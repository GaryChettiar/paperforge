import React from 'react';
import { ResumeData } from "@/types/resume";
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';

interface ResumePreviewProps {
  resumeData: ResumeData;
  template: string;
  creativeSidebarColor?: string;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  resumeData,
  template,
  creativeSidebarColor
}) => {
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      case 'classic':
        return <ClassicTemplate data={resumeData} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} sidebarColor={creativeSidebarColor} />;
      case 'minimal':
        return <MinimalTemplate data={resumeData} />;
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-2xl mx-auto">
      <div id="resume-preview" className="bg-white" style={{ width: '210mm', minHeight: '297mm' }}>
        {renderTemplate()}
      </div>
    </div>
  );
};

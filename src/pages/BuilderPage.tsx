
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ResumeEditor } from '@/components/ResumeEditor';
import { ResumePreview } from '@/components/ResumePreview';
import { TemplateSidebar } from '@/components/TemplateSidebar';
import { AIAssistant } from '@/components/AIAssistant';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Download, Sparkles, Eye, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { exportToPDF } from '@/utils/pdfExport';
import { useToast } from '@/hooks/use-toast';
import { useResumeStorage } from '@/hooks/useResumeStorage';
import {
  SidebarProvider,
} from "@/components/ui/sidebar";
import { SidebarLayout } from "./SidebarLayout";
import { ResumeData } from "@/types/resume";
import { Input } from "@/components/ui/input";

// default resume template
const DEFAULT_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
    website: 'johndoe.dev'
  },
  summary: 'Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Passionate about creating scalable solutions and leading high-performing teams.',
  experience: [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      startDate: '2022-01',
      endDate: '',
      current: true,
      description: [
        'Led development of microservices architecture serving 1M+ users',
        'Improved application performance by 40% through optimization',
        'Mentored 3 junior developers and established coding standards'
      ]
    }
  ],
  education: [
    {
      id: '1',
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      graduationDate: '2019-05',
      gpa: '3.8'
    }
  ],
  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL'],
  projects: [
    {
      id: '1',
      name: 'E-commerce Platform',
      description: 'Built a full-stack e-commerce platform with React, Node.js, and Stripe integration',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      url: 'github.com/johndoe/ecommerce'
    }
  ]
};

const BuilderPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const {
    resumes,
    saveOrUpdateResume,
    generateResumeId,
    loading: saving,
  } = useResumeStorage();

  // Get resumeId from URL search params
  const urlResumeId = searchParams.get('resumeId');
  // State for resumeId being edited or created
  const [resumeId, setResumeId] = useState<string | null>(null);
  // State for resumeData
  const [resumeData, setResumeData] = useState<ResumeData>(DEFAULT_RESUME_DATA);
  // State for title
  const [resumeTitle, setResumeTitle] = useState('Untitled Resume');

  // On mount or when urlResumeId or resumes changes:
  useEffect(() => {
    if (urlResumeId && resumes[urlResumeId]) {
      // Editing existing resume
      setResumeId(urlResumeId);
      setResumeTitle(resumes[urlResumeId].title || 'Untitled Resume');
      setResumeData(resumes[urlResumeId].resumeData);
    } else if (urlResumeId && !resumes[urlResumeId]) {
      // Unknown resumeId in URL, treat as new
      setResumeId(urlResumeId);
      setResumeTitle('Untitled Resume');
      setResumeData(DEFAULT_RESUME_DATA);
    } else if (!urlResumeId) {
      // New resume (no ID in URL)
      const newId = generateResumeId();
      setResumeId(newId);
      setResumeTitle('Untitled Resume');
      setResumeData(DEFAULT_RESUME_DATA);
    }
    // Only update when resumes or urlResumeId changes
  }, [urlResumeId, resumes, generateResumeId]);

  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [creativeSidebarColor, setCreativeSidebarColor] = useState('#243e36');
  const [showPreview, setShowPreview] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [showMobileTemplates, setShowMobileTemplates] = useState(false);

  useEffect(() => {
    const templateParam = searchParams.get('template');
    if (
      templateParam &&
      ['modern', 'classic', 'creative', 'minimal'].includes(templateParam)
    ) {
      setSelectedTemplate(templateParam);
    }
  }, [searchParams]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeTitle(e.target.value);
  };

  // Save handler: use the current resumeId
  const handleSaveResume = async () => {
    if (!resumeId) {
      toast({ title: "Error", description: "Resume ID missing.", variant: "destructive" });
      return;
    }
    await saveOrUpdateResume({
      id: resumeId,
      title: resumeTitle,
      lastModified: Date.now(),
      resumeData,
    });
  };

  const handleExport = async () => {
    try {
      toast({
        title: "Exporting resume...",
        description: "Please wait while we generate your PDF.",
      });

      // Ensure preview is visible for export
      const wasPreviewHidden = !showPreview;
      if (wasPreviewHidden) {
        setShowPreview(true);
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      const fileName = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
      await exportToPDF('resume-preview', fileName);

      if (wasPreviewHidden) setShowPreview(false);

      toast({
        title: "Success!",
        description: "Your resume has been exported as PDF.",
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Export failed",
        description: "There was an error exporting your resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="w-full flex flex-col">
        {/* Resume title editable input */}
        <div className="flex justify-center items-center py-4 bg-[#f1f7ed] border-b border-gray-200 mt-16">
          <Input
            value={resumeTitle}
            onChange={handleTitleChange}
            placeholder="Enter resume name"
            className="text-xl md:text-2xl text-center font-bold border-none bg-transparent focus:ring-0 focus-visible:ring-0 w-full max-w-lg"
            style={{ color: "#243e36" }}
          />
        </div>
        <SidebarLayout
          resumeData={resumeData}
          setResumeData={setResumeData}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          creativeSidebarColor={creativeSidebarColor}
          setCreativeSidebarColor={setCreativeSidebarColor}
          showPreview={showPreview}
          setShowPreview={setShowPreview}
          aiAssistantOpen={aiAssistantOpen}
          setAiAssistantOpen={setAiAssistantOpen}
          showMobileTemplates={showMobileTemplates}
          setShowMobileTemplates={setShowMobileTemplates}
          handleExport={handleExport}
          handleSaveResume={handleSaveResume}
          resumeTitle={resumeTitle}
          saving={saving}
        />
      </div>
    </SidebarProvider>
  );
};

export default BuilderPage;


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

// Sidebar imports
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string[];
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    location: string;
    graduationDate: string;
    gpa?: string;
  }>;
  skills: string[];
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    url?: string;
  }>;
}

const Index = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [resumeData, setResumeData] = useState<ResumeData>({
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
  });

  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [creativeSidebarColor, setCreativeSidebarColor] = useState('#243e36');
  const [showPreview, setShowPreview] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [showMobileTemplates, setShowMobileTemplates] = useState(false);

  // Check for template parameter in URL and set it as selected template
  useEffect(() => {
    const templateParam = searchParams.get('template');
    if (templateParam && ['modern', 'classic', 'creative', 'minimal'].includes(templateParam)) {
      setSelectedTemplate(templateParam);
    }
  }, [searchParams]);

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
        // Wait for the component to render
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      const fileName = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
      await exportToPDF('resume-preview', fileName);
      
      // Hide preview again if it was hidden before
      if (wasPreviewHidden) {
        setShowPreview(false);
      }
      
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
      <div className="min-h-screen flex w-full" style={{ backgroundColor: '#f1f7ed' }}>
        <div className="fixed top-0 left-0 right-0 z-30">
          <Header />
          {/* Always visible SidebarTrigger in the header */}
          <SidebarTrigger className="absolute left-4 top-4 md:left-6 md:top-[22px] z-40 bg-white border border-gray-200 rounded-lg shadow-sm p-1" />
        </div>
        {/* Mobile Template Sidebar */}
        <div className="block md:hidden">
          <Sheet open={showMobileTemplates} onOpenChange={setShowMobileTemplates}>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                className="m-4 flex items-center space-x-2"
                style={{ borderColor: '#243e36', color: '#243e36' }}
              >
                <Menu className="w-4 h-4" />
                <span>Templates</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80">
              <TemplateSidebar 
                selectedTemplate={selectedTemplate}
                onTemplateSelect={(template) => {
                  setSelectedTemplate(template);
                  setShowMobileTemplates(false);
                }}
                creativeSidebarColor={creativeSidebarColor}
                onCreativeSidebarColorChange={setCreativeSidebarColor}
              />
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Template Sidebar (collapsible) */}
        <Sidebar
          className="hidden md:block bg-white border-r border-gray-200 transition-all duration-300 min-h-screen mt-16"
          collapsible="offcanvas"
        >
          <SidebarContent className="p-0">
            <TemplateSidebar
              selectedTemplate={selectedTemplate}
              onTemplateSelect={setSelectedTemplate}
              creativeSidebarColor={creativeSidebarColor}
              onCreativeSidebarColorChange={setCreativeSidebarColor}
            />
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row pt-16 md:pt-0">
          {/* Editor Section */}
          <div className={`transition-all duration-300 ${showPreview ? 'lg:w-1/2' : 'flex-1'} bg-white border-b lg:border-b-0 lg:border-r border-gray-200`}>
            <div className="p-4 lg:p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
                <h2 className="text-xl font-semibold" style={{ color: '#243e36' }}>Resume Editor</h2>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAiAssistantOpen(true)}
                    className="flex items-center space-x-2"
                    style={{ borderColor: '#243e36', color: '#243e36' }}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span className="hidden sm:inline">AI Assistant</span>
                    <span className="sm:hidden">AI</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center space-x-2"
                    style={{ borderColor: '#243e36', color: '#243e36' }}
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
                    <span className="sm:hidden">Preview</span>
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleExport}
                    className="flex items-center space-x-2 text-white"
                    style={{ backgroundColor: '#243e36' }}
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Export PDF</span>
                    <span className="sm:hidden">Export</span>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto">
              <ResumeEditor 
                resumeData={resumeData}
                onResumeDataChange={setResumeData}
              />
            </div>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="lg:w-1/2 bg-gray-100 min-h-[50vh] lg:min-h-full">
              <div className="p-4 lg:p-6 border-b border-gray-200 bg-white">
                <h2 className="text-xl font-semibold" style={{ color: '#243e36' }}>Preview</h2>
              </div>
              <div className="p-4 lg:p-6 flex justify-center overflow-auto">
                <div className="transform scale-50 sm:scale-75 lg:scale-100 origin-top">
                  <ResumePreview 
                    resumeData={resumeData}
                    template={selectedTemplate}
                    creativeSidebarColor={creativeSidebarColor}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AI Assistant Modal */}
        <AIAssistant 
          isOpen={aiAssistantOpen}
          onClose={() => setAiAssistantOpen(false)}
          resumeData={resumeData}
          onResumeDataChange={setResumeData}
        />
      </div>
    </SidebarProvider>
  );
};

export default Index;

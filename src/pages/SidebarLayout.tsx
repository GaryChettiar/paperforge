
import React from "react";
import { ResumeEditor } from '@/components/ResumeEditor';
import { ResumePreview } from '@/components/ResumePreview';
import { TemplateSidebar } from '@/components/TemplateSidebar';
import { AIAssistant } from '@/components/AIAssistant';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Download, Sparkles, Eye, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

export const SidebarLayout = ({
  resumeData,
  setResumeData,
  selectedTemplate,
  setSelectedTemplate,
  creativeSidebarColor,
  setCreativeSidebarColor,
  showPreview,
  setShowPreview,
  aiAssistantOpen,
  setAiAssistantOpen,
  showMobileTemplates,
  setShowMobileTemplates,
  handleExport,
  handleSaveResume,
  resumeTitle,
  saving,
}: any) => {
  const { state } = useSidebar();
  const isSidebarCollapsed = state === "collapsed";

  const FABSidebarTrigger = () => (
    <div className="fixed top-24 left-4 z-50 md:block hidden">
      <SidebarTrigger
        className="bg-white border border-gray-300 rounded-full shadow-lg w-14 h-14 flex items-center justify-center transition hover:bg-gray-100"
        style={{ boxShadow: '0 2px 8px rgba(36,62,54,0.10)' }}
      />
    </div>
  );

  return (
    <div className="min-h-screen flex w-full" style={{ backgroundColor: '#f1f7ed' }}>
      <div className="fixed top-0 left-0 right-0 z-30">
        <Header
          onSave={handleSaveResume}
          saving={saving}
          resumeTitle={resumeTitle}
        />
      </div>
      {/* Mobile Template Sidebar */}
      <div className="block md:hidden">
        <Sheet open={showMobileTemplates} onOpenChange={setShowMobileTemplates}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="m-4 flex items-center gap-2"
              style={{ borderColor: '#243e36', color: '#243e36' }}
            >
              <Menu className="w-4 h-4 mr-2" />
              <span>Templates</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-80">
            <TemplateSidebar
              selectedTemplate={selectedTemplate}
              onTemplateSelect={(template: string) => {
                setSelectedTemplate(template);
                setShowMobileTemplates(false);
              }}
              creativeSidebarColor={creativeSidebarColor}
              onCreativeSidebarColorChange={setCreativeSidebarColor}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Template Sidebar / Collapser */}
      <Sidebar
        className="hidden md:block bg-white border-r border-gray-200 transition-all duration-300 min-h-screen mt-16"
        collapsible="offcanvas"
      >
        <div className="px-3 py-3 flex justify-end">
          <SidebarTrigger
            className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg shadow w-10 h-10 flex items-center justify-center"
            aria-label="Collapse Sidebar"
            style={{ color: "#243e36" }}
          />
        </div>
        <SidebarContent className="p-0">
          <TemplateSidebar
            selectedTemplate={selectedTemplate}
            onTemplateSelect={setSelectedTemplate}
            creativeSidebarColor={creativeSidebarColor}
            onCreativeSidebarColorChange={setCreativeSidebarColor}
          />
        </SidebarContent>
      </Sidebar>
      {isSidebarCollapsed && <FABSidebarTrigger />}

      <div className="flex-1 flex flex-col lg:flex-row pt-16">
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

      <AIAssistant
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        resumeData={resumeData}
        onResumeDataChange={setResumeData}
      />
    </div>
  );
};

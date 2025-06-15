import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ResumePreview } from '@/components/ResumePreview';
import { ResumeData } from "@/types/resume";

const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const navigate = useNavigate();

  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and contemporary design with elegant styling',
      preview: 'bg-gradient-to-br from-blue-50 to-blue-100',
      color: '#243e36'
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional professional layout that never goes out of style',
      preview: 'bg-gradient-to-br from-gray-50 to-gray-100',
      color: '#374151'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold design perfect for creative professionals and designers',
      preview: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
      color: '#f59e0b'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and elegant layout focusing on content clarity',
      preview: 'bg-gradient-to-br from-emerald-50 to-teal-100',
      color: '#059669'
    }
  ];

  const handleUseTemplate = (templateId: string) => {
    navigate(`/builder?template=${templateId}`);
  };

  // Sample resume data for preview
  const sampleResumeData: ResumeData = {
    personalInfo: {
      fullName: 'Alex Johnson',
      email: 'alex.johnson@email.com',
      phone: '(555) 123-4567',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/alexjohnson',
      website: 'alexjohnson.dev'
    },
    summary: 'Creative professional with 5+ years of experience in digital marketing and brand development. Passionate about creating compelling visual stories and driving engagement through innovative campaigns.',
    experience: [
      {
        id: '1',
        title: 'Senior Marketing Specialist',
        company: 'Creative Agency',
        location: 'New York, NY',
        startDate: '2022-01',
        endDate: '',
        current: true,
        description: [
          'Led brand development for 15+ clients, increasing brand awareness by 40%',
          'Developed and executed multi-channel marketing campaigns',
          'Collaborated with cross-functional teams to deliver projects on time'
        ]
      },
      {
        id: '2',
        title: 'Marketing Coordinator',
        company: 'Tech Startup',
        location: 'New York, NY',
        startDate: '2020-03',
        endDate: '2021-12',
        current: false,
        description: [
          'Managed social media presence across 5 platforms',
          'Created content that generated 50K+ monthly impressions'
        ]
      }
    ],
    education: [
      {
        id: '1',
        degree: 'Bachelor of Arts in Marketing',
        school: 'New York University',
        location: 'New York, NY',
        graduationDate: '2020-05',
        gpa: '3.7'
      }
    ],
    skills: ['Digital Marketing', 'Brand Development', 'Adobe Creative Suite', 'Social Media', 'Content Strategy', 'Analytics'],
    projects: [
      {
        id: '1',
        name: 'Brand Redesign Campaign',
        description: 'Complete brand overhaul for a tech startup, including logo, website, and marketing materials',
        technologies: ['Adobe Creative Suite', 'Figma', 'Webflow'],
        url: 'behance.net/alexjohnson/brand-redesign'
      }
    ]
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f1f7ed' }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5" style={{ color: '#243e36' }} />
              <span className="font-medium" style={{ color: '#243e36' }}>Back to Home</span>
            </Link>
            <Link to="/builder">
              <Button className="text-white hover:opacity-90" style={{ backgroundColor: '#243e36' }}>
                Start Building
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#243e36' }}>
            Resume Templates
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our collection of professionally designed templates. Each template is crafted to help you stand out and make a great impression.
          </p>
        </div>

        {selectedTemplate ? (
          // Preview Mode
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                onClick={() => setSelectedTemplate(null)}
                className="flex items-center space-x-2"
                style={{ borderColor: '#243e36', color: '#243e36' }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Templates</span>
              </Button>
              <Button 
                className="text-white" 
                style={{ backgroundColor: '#243e36' }}
                onClick={() => handleUseTemplate(selectedTemplate)}
              >
                Use This Template
              </Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex justify-center">
                <div className="transform scale-75 sm:scale-90 lg:scale-100">
                  <ResumePreview 
                    resumeData={sampleResumeData}
                    template={selectedTemplate}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Template Grid
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {templates.map((template) => (
              <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`h-48 ${template.preview} flex items-center justify-center`}>
                  <div className="text-center">
                    <div 
                      className="w-16 h-20 mx-auto mb-4 bg-white rounded shadow-md flex items-center justify-center"
                      style={{ fontSize: '8px', color: template.color }}
                    >
                      <div className="space-y-1">
                        <div className="h-1 bg-current w-8 mx-auto"></div>
                        <div className="h-1 bg-current w-6 mx-auto opacity-70"></div>
                        <div className="h-1 bg-current w-7 mx-auto opacity-50"></div>
                        <div className="h-1 bg-current w-5 mx-auto opacity-30"></div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold" style={{ color: template.color }}>
                      {template.name}
                    </h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{template.description}</p>
                  
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedTemplate(template.id)}
                      className="flex items-center space-x-2 flex-1"
                      style={{ borderColor: template.color, color: template.color }}
                    >
                      <Eye className="w-4 h-4" />
                      <span>Preview</span>
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 text-white"
                      style={{ backgroundColor: template.color }}
                      onClick={() => handleUseTemplate(template.id)}
                    >
                      Use Template
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;

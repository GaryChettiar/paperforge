
import React from 'react';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface TemplateSidebarProps {
  selectedTemplate: string;
  onTemplateSelect: (template: string) => void;
}

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design',
    preview: 'bg-gradient-to-br from-blue-50 to-blue-100'
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional professional layout',
    preview: 'bg-gradient-to-br from-gray-50 to-gray-100'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold design for creative roles',
    preview: 'bg-gradient-to-br from-yellow-50 to-yellow-100'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant layout',
    preview: 'bg-gradient-to-br from-emerald-50 to-teal-100'
  }
];

export const TemplateSidebar: React.FC<TemplateSidebarProps> = ({
  selectedTemplate,
  onTemplateSelect
}) => {
  return (
    <div className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200 p-4">
      <h3 className="text-lg font-semibold mb-4" style={{ color: '#243e36' }}>Templates</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`p-3 cursor-pointer transition-all hover:shadow-md ${
              selectedTemplate === template.id
                ? 'ring-2 border-2'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            style={{
              borderColor: selectedTemplate === template.id ? '#243e36' : undefined,
            }}
            onClick={() => onTemplateSelect(template.id)}
          >
            <div className="relative">
              <div className={`w-full h-16 md:h-24 rounded-md ${template.preview} mb-2`}>
                {selectedTemplate === template.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#243e36' }}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <h4 className="font-medium text-sm md:text-base" style={{ color: '#243e36' }}>{template.name}</h4>
              <p className="text-xs text-gray-500 mt-1 hidden md:block">{template.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

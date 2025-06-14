
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FolderOpen, Plus, Trash2, X } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
}

interface ProjectsEditorProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export const ProjectsEditor: React.FC<ProjectsEditorProps> = ({
  data,
  onChange
}) => {
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      url: ''
    };
    onChange([...data, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onChange(data.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  const removeProject = (id: string) => {
    onChange(data.filter(project => project.id !== id));
  };

  const addTechnology = (projectId: string, tech: string) => {
    const project = data.find(p => p.id === projectId);
    if (project && tech.trim() && !project.technologies.includes(tech.trim())) {
      updateProject(projectId, 'technologies', [...project.technologies, tech.trim()]);
    }
  };

  const removeTechnology = (projectId: string, techToRemove: string) => {
    const project = data.find(p => p.id === projectId);
    if (project) {
      updateProject(projectId, 'technologies', project.technologies.filter(tech => tech !== techToRemove));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FolderOpen className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
        </div>
        <Button onClick={addProject} size="sm" className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </Button>
      </div>

      <div className="space-y-4">
        {data.map((project, index) => (
          <Card key={project.id} className="p-4 border-l-4 border-l-purple-500">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">Project #{index + 1}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeProject(project.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Project Name</Label>
                  <Input
                    value={project.name}
                    onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                    placeholder="E-commerce Platform"
                  />
                </div>
                
                <div>
                  <Label>URL (Optional)</Label>
                  <Input
                    value={project.url || ''}
                    onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                    placeholder="github.com/username/project"
                  />
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  placeholder="Describe your project, its purpose, and key achievements..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Technologies</Label>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border border-gray-200 rounded-md">
                    {project.technologies.length === 0 ? (
                      <p className="text-gray-500 text-sm">No technologies added yet.</p>
                    ) : (
                      project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="flex items-center space-x-1">
                          <span>{tech}</span>
                          <button
                            onClick={() => removeTechnology(project.id, tech)}
                            className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add technology..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const input = e.target as HTMLInputElement;
                          addTechnology(project.id, input.value);
                          input.value = '';
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      onClick={(e) => {
                        const input = (e.target as HTMLElement).parentElement?.querySelector('input') as HTMLInputElement;
                        if (input) {
                          addTechnology(project.id, input.value);
                          input.value = '';
                        }
                      }}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};


import React from 'react';
import { ResumeData } from '@/pages/Index';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface CreativeTemplateProps {
  data: ResumeData;
  sidebarColor?: string;
}

export const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ data, sidebarColor = '#243e36' }) => {
  // Generate a lighter shade for the gradient
  const lighterColor = sidebarColor === '#243e36' ? '#7ca982' : 
    sidebarColor.replace('#', '') + '80'; // Add transparency for a lighter effect

  return (
    <div className="w-full mx-auto bg-white text-xs leading-snug" style={{ width: '210mm', minHeight: '297mm' }}>
      <div className="flex h-full">
        {/* Left Sidebar */}
        <div className="w-1/3 text-white p-4" style={{ background: `linear-gradient(180deg, ${sidebarColor} 0%, ${lighterColor} 100%)` }}>
          <div className="mb-4">
            <h1 className="text-lg font-bold mb-2">{data.personalInfo.fullName}</h1>
            <div className="space-y-1.5">
              <div className="flex items-baseline space-x-2">
                <Mail className="w-3 h-3 flex-shrink-0 mt-0.5" />
                <span className="text-xs leading-tight break-all">{data.personalInfo.email}</span>
              </div>
              <div className="flex items-baseline space-x-2">
                <Phone className="w-3 h-3 flex-shrink-0 mt-0.5" />
                <span className="text-xs leading-tight">{data.personalInfo.phone}</span>
              </div>
              <div className="flex items-baseline space-x-2">
                <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5" />
                <span className="text-xs leading-tight">{data.personalInfo.location}</span>
              </div>
              {data.personalInfo.linkedin && (
                <div className="flex items-baseline space-x-2">
                  <Linkedin className="w-3 h-3 flex-shrink-0 mt-0.5" />
                  <span className="text-xs leading-tight break-all">{data.personalInfo.linkedin}</span>
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex items-baseline space-x-2">
                  <Globe className="w-3 h-3 flex-shrink-0 mt-0.5" />
                  <span className="text-xs leading-tight break-all">{data.personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-4">
              <h2 className="text-sm font-bold mb-2 border-b border-white/30 pb-1">Skills</h2>
              <div className="space-y-1">
                {data.skills.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></div>
                    <span className="text-xs">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-4">
              <h2 className="text-sm font-bold mb-2 border-b border-white/30 pb-1">Education</h2>
              <div className="space-y-2">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold text-xs">{edu.degree}</h3>
                    <p className="text-xs opacity-90">{edu.school}</p>
                    <p className="text-xs opacity-75">{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="w-2/3 p-4">
          {/* Summary */}
          {data.summary && (
            <div className="mb-4">
              <h2 className="text-base font-bold mb-2 pb-1" style={{ color: sidebarColor, borderBottom: `2px solid #f1f7ed` }}>
                About Me
              </h2>
              <p className="text-gray-700 text-xs leading-snug">{data.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="mb-4">
              <h2 className="text-base font-bold mb-2 pb-1" style={{ color: sidebarColor, borderBottom: `2px solid #f1f7ed` }}>
                Experience
              </h2>
              <div className="space-y-3">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-4">
                    <div className="absolute left-0 top-1 w-2 h-2 rounded-full" style={{ backgroundColor: sidebarColor }}></div>
                    <div className="absolute left-1 top-3 w-0.5 h-full" style={{ backgroundColor: '#f1f7ed' }}></div>
                    <h3 className="font-bold text-gray-900 text-sm">{exp.title}</h3>
                    <p className="font-medium text-xs" style={{ color: sidebarColor }}>{exp.company} • {exp.location}</p>
                    <p className="text-gray-500 text-xs mb-1">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                    <ul className="list-disc list-inside space-y-0.5 text-gray-700 text-xs">
                      {exp.description.map((desc, index) => (
                        <li key={index} className="leading-snug">{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div className="mb-4">
              <h2 className="text-base font-bold mb-2 pb-1" style={{ color: sidebarColor, borderBottom: `2px solid #f1f7ed` }}>
                Projects
              </h2>
              <div className="space-y-2">
                {data.projects.map((project) => (
                  <div key={project.id} className="p-2 rounded-lg" style={{ backgroundColor: '#f1f7ed' }}>
                    <h3 className="font-bold text-gray-900 text-sm">{project.name}</h3>
                    {project.url && <p className="text-xs" style={{ color: sidebarColor }}>{project.url}</p>}
                    <p className="text-gray-700 text-xs mb-1 leading-snug">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium leading-tight" 
                          style={{ backgroundColor: lighterColor, color: sidebarColor }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

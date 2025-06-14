
import React from 'react';
import { ResumeData } from '@/pages/Index';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface ModernTemplateProps {
  data: ResumeData;
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  return (
    <div className="w-full mx-auto bg-white text-xs leading-snug" style={{ width: '210mm', minHeight: '297mm', padding: '15mm' }}>
      {/* Header */}
      <div className="pb-4 mb-4" style={{ borderBottom: `3px solid #243e36` }}>
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#243e36' }}>{data.personalInfo.fullName}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-gray-600">
          <div className="flex items-baseline space-x-2">
            <Mail className="w-3 h-3 flex-shrink-0 mt-0.5" />
            <span className="truncate leading-tight text-xs">{data.personalInfo.email}</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <Phone className="w-3 h-3 flex-shrink-0 mt-0.5" />
            <span className="truncate leading-tight text-xs">{data.personalInfo.phone}</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5" />
            <span className="truncate leading-tight text-xs">{data.personalInfo.location}</span>
          </div>
          {data.personalInfo.linkedin && (
            <div className="flex items-baseline space-x-2">
              <Linkedin className="w-3 h-3 flex-shrink-0 mt-0.5" />
              <span className="truncate leading-tight text-xs">{data.personalInfo.linkedin}</span>
            </div>
          )}
          {data.personalInfo.website && (
            <div className="flex items-baseline space-x-2">
              <Globe className="w-3 h-3 flex-shrink-0 mt-0.5" />
              <span className="truncate leading-tight text-xs">{data.personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2" style={{ color: '#243e36' }}>Professional Summary</h2>
          <p className="text-gray-700 text-xs leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2" style={{ color: '#243e36' }}>Work Experience</h2>
          <div className="space-y-3">
            {data.experience.map((exp) => (
              <div key={exp.id} className="pl-3" style={{ borderLeft: `2px solid #f1f7ed` }}>
                <h3 className="font-semibold text-gray-900 text-sm">{exp.title}</h3>
                <p className="font-medium text-xs" style={{ color: '#243e36' }}>{exp.company} • {exp.location}</p>
                <p className="text-gray-500 mb-1 text-xs">
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

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2" style={{ color: '#243e36' }}>Education</h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-semibold text-gray-900 text-sm">{edu.degree}</h3>
                <p className="text-xs" style={{ color: '#243e36' }}>{edu.school} • {edu.location}</p>
                <p className="text-gray-500 text-xs">
                  {edu.graduationDate} {edu.gpa && `• GPA: ${edu.gpa}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2" style={{ color: '#243e36' }}>Skills</h2>
          <div className="flex flex-wrap gap-1">
            {data.skills.map((skill) => (
              <span 
                key={skill} 
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium leading-tight" 
                style={{ backgroundColor: '#f1f7ed', color: '#243e36' }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2" style={{ color: '#243e36' }}>Projects</h2>
          <div className="space-y-2">
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-semibold text-gray-900 text-sm">{project.name}</h3>
                {project.url && <p className="text-xs" style={{ color: '#243e36' }}>{project.url}</p>}
                <p className="text-gray-700 mb-1 text-xs leading-snug">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="inline-flex items-center bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs font-medium leading-tight"
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
  );
};

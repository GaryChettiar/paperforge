
import React from 'react';
import { ResumeData } from '@/pages/Index';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface ModernTemplateProps {
  data: ResumeData;
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8 text-sm leading-relaxed">
      {/* Header */}
      <div className="pb-6 mb-6" style={{ borderBottom: `4px solid #243e36` }}>
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#243e36' }}>{data.personalInfo.fullName}</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-gray-600">
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>{data.personalInfo.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span>{data.personalInfo.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>{data.personalInfo.location}</span>
          </div>
          {data.personalInfo.linkedin && (
            <div className="flex items-center space-x-2">
              <Linkedin className="w-4 h-4" />
              <span>{data.personalInfo.linkedin}</span>
            </div>
          )}
          {data.personalInfo.website && (
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>{data.personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#243e36' }}>Professional Summary</h2>
          <p className="text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#243e36' }}>Work Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className="pl-4" style={{ borderLeft: `2px solid #f1f7ed` }}>
                <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                <p className="font-medium" style={{ color: '#243e36' }}>{exp.company} • {exp.location}</p>
                <p className="text-gray-500 mb-2">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {exp.description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#243e36' }}>Education</h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <p style={{ color: '#243e36' }}>{edu.school} • {edu.location}</p>
                <p className="text-gray-500">
                  {edu.graduationDate} {edu.gpa && `• GPA: ${edu.gpa}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#243e36' }}>Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span key={skill} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#f1f7ed', color: '#243e36' }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#243e36' }}>Projects</h2>
          <div className="space-y-3">
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                {project.url && <p className="text-sm" style={{ color: '#243e36' }}>{project.url}</p>}
                <p className="text-gray-700 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
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

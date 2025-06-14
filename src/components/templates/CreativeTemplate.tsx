
import React from 'react';
import { ResumeData } from '@/pages/Index';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface CreativeTemplateProps {
  data: ResumeData;
}

export const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ data }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white text-sm leading-relaxed">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/3 text-white p-6" style={{ background: `linear-gradient(180deg, #243e36 0%, #7ca982 100%)` }}>
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">{data.personalInfo.fullName}</h1>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="text-xs">{data.personalInfo.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="text-xs">{data.personalInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="text-xs">{data.personalInfo.location}</span>
              </div>
              {data.personalInfo.linkedin && (
                <div className="flex items-center space-x-2">
                  <Linkedin className="w-4 h-4" />
                  <span className="text-xs">{data.personalInfo.linkedin}</span>
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span className="text-xs">{data.personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 border-b border-white/30 pb-2">Skills</h2>
              <div className="space-y-2">
                {data.skills.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-xs">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 border-b border-white/30 pb-2">Education</h2>
              <div className="space-y-3">
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
        <div className="w-2/3 p-6">
          {/* Summary */}
          {data.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3 pb-2" style={{ color: '#243e36', borderBottom: `2px solid #f1f7ed` }}>
                About Me
              </h2>
              <p className="text-gray-700">{data.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3 pb-2" style={{ color: '#243e36', borderBottom: `2px solid #f1f7ed` }}>
                Experience
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6">
                    <div className="absolute left-0 top-2 w-3 h-3 rounded-full" style={{ backgroundColor: '#243e36' }}></div>
                    <div className="absolute left-1.5 top-5 w-0.5 h-full" style={{ backgroundColor: '#f1f7ed' }}></div>
                    <h3 className="font-bold text-gray-900">{exp.title}</h3>
                    <p className="font-medium" style={{ color: '#243e36' }}>{exp.company} • {exp.location}</p>
                    <p className="text-gray-500 text-xs mb-2">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-xs">
                      {exp.description.map((desc, index) => (
                        <li key={index}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3 pb-2" style={{ color: '#243e36', borderBottom: `2px solid #f1f7ed` }}>
                Projects
              </h2>
              <div className="space-y-3">
                {data.projects.map((project) => (
                  <div key={project.id} className="p-3 rounded-lg" style={{ backgroundColor: '#f1f7ed' }}>
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    {project.url && <p className="text-xs" style={{ color: '#243e36' }}>{project.url}</p>}
                    <p className="text-gray-700 text-xs mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: '#7ca982', color: '#243e36' }}>
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

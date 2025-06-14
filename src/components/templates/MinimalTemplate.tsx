
import React from 'react';
import { ResumeData } from '@/pages/Index';

interface MinimalTemplateProps {
  data: ResumeData;
}

export const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ data }) => {
  return (
    <div className="w-full mx-auto bg-white text-xs leading-snug" style={{ width: '210mm', minHeight: '297mm', padding: '15mm' }}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-light text-gray-900 mb-2">{data.personalInfo.fullName}</h1>
        <div className="text-gray-600 text-xs flex flex-wrap items-baseline gap-1">
          <span className="leading-tight">{data.personalInfo.email}</span>
          <span>•</span>
          <span className="leading-tight">{data.personalInfo.phone}</span>
          <span>•</span>
          <span className="leading-tight">{data.personalInfo.location}</span>
          {data.personalInfo.linkedin && (
            <>
              <span>•</span>
              <span className="leading-tight">{data.personalInfo.linkedin}</span>
            </>
          )}
          {data.personalInfo.website && (
            <>
              <span>•</span>
              <span className="leading-tight">{data.personalInfo.website}</span>
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-5">
          <p className="text-gray-700 leading-relaxed text-xs">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-light text-gray-900 mb-3 pb-1 border-b border-gray-300">
            Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-gray-900 text-sm">{exp.title}</h3>
                  <span className="text-gray-500 text-xs">
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-600 mb-1 text-xs">{exp.company}, {exp.location}</p>
                <ul className="space-y-0.5 text-gray-700 text-xs">
                  {exp.description.map((desc, index) => (
                    <li key={index} className="leading-relaxed">— {desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-light text-gray-900 mb-3 pb-1 border-b border-gray-300">
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">{edu.degree}</h3>
                  <p className="text-gray-600 text-xs">{edu.school}, {edu.location}</p>
                  {edu.gpa && <p className="text-gray-500 text-xs">GPA: {edu.gpa}</p>}
                </div>
                <span className="text-gray-500 text-xs">{edu.graduationDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-light text-gray-900 mb-3 pb-1 border-b border-gray-300">
            Skills
          </h2>
          <div className="text-gray-700 leading-tight text-xs">
            {data.skills.map((skill, index) => (
              <span key={skill}>
                {skill}{index < data.skills.length - 1 && ' • '}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-light text-gray-900 mb-3 pb-1 border-b border-gray-300">
            Projects
          </h2>
          <div className="space-y-3">
            {data.projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-gray-900 text-sm">{project.name}</h3>
                  {project.url && <span className="text-gray-500 text-xs">{project.url}</span>}
                </div>
                <p className="text-gray-700 mb-1 text-xs leading-snug">{project.description}</p>
                <div className="text-gray-600 text-xs leading-tight">
                  {project.technologies.map((tech, index) => (
                    <span key={tech}>
                      {tech}{index < project.technologies.length - 1 && ' • '}
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

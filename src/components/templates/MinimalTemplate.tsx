
import React from 'react';
import { ResumeData } from '@/pages/Index';

interface MinimalTemplateProps {
  data: ResumeData;
}

export const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ data }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8 text-sm leading-relaxed">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-light text-gray-900 mb-2">{data.personalInfo.fullName}</h1>
        <div className="text-gray-600 text-sm flex flex-wrap items-center gap-1">
          <span>{data.personalInfo.email}</span>
          <span>•</span>
          <span>{data.personalInfo.phone}</span>
          <span>•</span>
          <span>{data.personalInfo.location}</span>
          {data.personalInfo.linkedin && (
            <>
              <span>•</span>
              <span>{data.personalInfo.linkedin}</span>
            </>
          )}
          {data.personalInfo.website && (
            <>
              <span>•</span>
              <span>{data.personalInfo.website}</span>
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-light text-gray-900 mb-4 pb-1 border-b border-gray-300">
            Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-gray-900">{exp.title}</h3>
                  <span className="text-gray-500 text-sm">
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{exp.company}, {exp.location}</p>
                <ul className="space-y-1 text-gray-700">
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
        <div className="mb-8">
          <h2 className="text-lg font-light text-gray-900 mb-4 pb-1 border-b border-gray-300">
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.school}, {edu.location}</p>
                  {edu.gpa && <p className="text-gray-500 text-sm">GPA: {edu.gpa}</p>}
                </div>
                <span className="text-gray-500 text-sm">{edu.graduationDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-light text-gray-900 mb-4 pb-1 border-b border-gray-300">
            Skills
          </h2>
          <div className="flex flex-wrap items-center gap-1">
            {data.skills.map((skill, index) => (
              <span key={skill} className="text-gray-700">
                {skill}{index < data.skills.length - 1 && ' • '}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-light text-gray-900 mb-4 pb-1 border-b border-gray-300">
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-gray-900">{project.name}</h3>
                  {project.url && <span className="text-gray-500 text-sm">{project.url}</span>}
                </div>
                <p className="text-gray-700 mb-2">{project.description}</p>
                <div className="flex flex-wrap items-center gap-1">
                  {project.technologies.map((tech, index) => (
                    <span key={tech} className="text-gray-600 text-sm">
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

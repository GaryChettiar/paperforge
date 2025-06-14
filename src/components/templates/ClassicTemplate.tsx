import React from 'react';
import { ResumeData } from '@/pages/Index';

interface ClassicTemplateProps {
  data: ResumeData;
}

export const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8 text-sm leading-relaxed font-serif">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{data.personalInfo.fullName}</h1>
        <div className="text-gray-600 space-y-1">
          <p className="leading-tight">{data.personalInfo.email} • {data.personalInfo.phone}</p>
          <p className="leading-tight">{data.personalInfo.location}</p>
          {data.personalInfo.linkedin && <p className="leading-tight">{data.personalInfo.linkedin}</p>}
          {data.personalInfo.website && <p className="leading-tight">{data.personalInfo.website}</p>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">Summary</h2>
          <p className="text-gray-700 text-justify">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900">{exp.title}</h3>
                  <span className="text-gray-600">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="font-semibold text-gray-700 mb-2">{exp.company}, {exp.location}</p>
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
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">Education</h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-700">{edu.school}, {edu.location}</p>
                  {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                </div>
                <span className="text-gray-600">{edu.graduationDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">Skills</h2>
          <div className="text-gray-700 leading-tight">
            {data.skills.map((skill, index) => (
              <span key={skill}>
                {skill}{index < data.skills.length - 1 && ', '}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">Projects</h2>
          <div className="space-y-3">
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold text-gray-900">{project.name}</h3>
                {project.url && <p className="text-gray-600 text-sm italic">{project.url}</p>}
                <p className="text-gray-700 mb-1">{project.description}</p>
                <div className="text-gray-600 text-sm leading-tight">
                  <span className="font-semibold">Technologies: </span>
                  {project.technologies.map((tech, index) => (
                    <span key={tech}>
                      {tech}{index < project.technologies.length - 1 && ', '}
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

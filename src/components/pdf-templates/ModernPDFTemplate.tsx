
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/pages/Index';

// Register fonts for better typography
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2', fontWeight: 700 }
  ]
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Inter',
    fontSize: 10,
    paddingTop: 35,
    paddingBottom: 35,
    paddingHorizontal: 35,
    lineHeight: 1.4,
    backgroundColor: '#ffffff'
  },
  header: {
    borderBottomWidth: 3,
    borderBottomColor: '#243e36',
    paddingBottom: 15,
    marginBottom: 20
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    color: '#243e36',
    marginBottom: 10
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  contactText: {
    fontSize: 9,
    color: '#666666',
    marginLeft: 5
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#243e36',
    marginBottom: 10
  },
  summaryText: {
    fontSize: 9,
    color: '#333333',
    lineHeight: 1.5
  },
  experienceItem: {
    marginBottom: 15,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#f1f7ed'
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: '#333333',
    marginBottom: 2
  },
  companyInfo: {
    fontSize: 9,
    fontWeight: 500,
    color: '#243e36',
    marginBottom: 2
  },
  dateRange: {
    fontSize: 8,
    color: '#666666',
    marginBottom: 8
  },
  bulletPoint: {
    fontSize: 9,
    color: '#333333',
    marginBottom: 3,
    paddingLeft: 10
  },
  educationItem: {
    marginBottom: 10
  },
  degree: {
    fontSize: 11,
    fontWeight: 600,
    color: '#333333',
    marginBottom: 2
  },
  school: {
    fontSize: 9,
    color: '#243e36',
    marginBottom: 2
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  skillChip: {
    backgroundColor: '#f1f7ed',
    color: '#243e36',
    fontSize: 8,
    fontWeight: 500,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  projectItem: {
    marginBottom: 12
  },
  projectName: {
    fontSize: 11,
    fontWeight: 600,
    color: '#333333',
    marginBottom: 2
  },
  projectUrl: {
    fontSize: 8,
    color: '#243e36',
    marginBottom: 4
  },
  projectDescription: {
    fontSize: 9,
    color: '#333333',
    marginBottom: 6,
    lineHeight: 1.4
  },
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4
  },
  techChip: {
    backgroundColor: '#f5f5f5',
    color: '#333333',
    fontSize: 7,
    fontWeight: 500,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8
  }
});

interface ModernPDFTemplateProps {
  data: ResumeData;
}

export const ModernPDFTemplate: React.FC<ModernPDFTemplateProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.fullName}</Text>
        <View style={styles.contactGrid}>
          <View style={styles.contactItem}>
            <Text style={styles.contactText}>✉ {data.personalInfo.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactText}>📞 {data.personalInfo.phone}</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactText}>📍 {data.personalInfo.location}</Text>
          </View>
          {data.personalInfo.linkedin && (
            <View style={styles.contactItem}>
              <Text style={styles.contactText}>💼 {data.personalInfo.linkedin}</Text>
            </View>
          )}
          {data.personalInfo.website && (
            <View style={styles.contactItem}>
              <Text style={styles.contactText}>🌐 {data.personalInfo.website}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summaryText}>{data.summary}</Text>
        </View>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {data.experience.map((exp) => (
            <View key={exp.id} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{exp.title}</Text>
              <Text style={styles.companyInfo}>{exp.company} • {exp.location}</Text>
              <Text style={styles.dateRange}>
                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </Text>
              {exp.description.map((desc, index) => (
                <Text key={index} style={styles.bulletPoint}>• {desc}</Text>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu) => (
            <View key={edu.id} style={styles.educationItem}>
              <Text style={styles.degree}>{edu.degree}</Text>
              <Text style={styles.school}>{edu.school} • {edu.location}</Text>
              <Text style={styles.dateRange}>
                {edu.graduationDate} {edu.gpa && `• GPA: ${edu.gpa}`}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {data.skills.map((skill) => (
              <Text key={skill} style={styles.skillChip}>{skill}</Text>
            ))}
          </View>
        </View>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {data.projects.map((project) => (
            <View key={project.id} style={styles.projectItem}>
              <Text style={styles.projectName}>{project.name}</Text>
              {project.url && <Text style={styles.projectUrl}>{project.url}</Text>}
              <Text style={styles.projectDescription}>{project.description}</Text>
              <View style={styles.techContainer}>
                {project.technologies.map((tech) => (
                  <Text key={tech} style={styles.techChip}>{tech}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);


import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { ResumeData } from '@/pages/Index';

Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', fontWeight: 300 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2', fontWeight: 500 }
  ]
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Inter',
    fontSize: 10,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 40,
    lineHeight: 1.4,
    backgroundColor: '#ffffff'
  },
  header: {
    marginBottom: 25
  },
  name: {
    fontSize: 24,
    fontWeight: 300,
    color: '#333333',
    marginBottom: 10
  },
  contactInfo: {
    fontSize: 9,
    color: '#666666',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  contactSeparator: {
    marginHorizontal: 8
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 300,
    color: '#333333',
    marginBottom: 12,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
  summaryText: {
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.5
  },
  experienceItem: {
    marginBottom: 16
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 500,
    color: '#333333'
  },
  dateRange: {
    fontSize: 9,
    color: '#666666'
  },
  companyInfo: {
    fontSize: 9,
    color: '#666666',
    marginBottom: 8
  },
  bulletPoint: {
    fontSize: 9,
    color: '#333333',
    marginBottom: 3,
    lineHeight: 1.4
  },
  educationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10
  },
  educationLeft: {
    flex: 1
  },
  degree: {
    fontSize: 11,
    fontWeight: 500,
    color: '#333333',
    marginBottom: 2
  },
  school: {
    fontSize: 9,
    color: '#666666',
    marginBottom: 2
  },
  gpa: {
    fontSize: 8,
    color: '#888888'
  },
  skillsText: {
    fontSize: 9,
    color: '#333333',
    lineHeight: 1.3
  },
  projectItem: {
    marginBottom: 12
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4
  },
  projectName: {
    fontSize: 11,
    fontWeight: 500,
    color: '#333333'
  },
  projectUrl: {
    fontSize: 8,
    color: '#666666'
  },
  projectDescription: {
    fontSize: 9,
    color: '#333333',
    marginBottom: 4,
    lineHeight: 1.3
  },
  techList: {
    fontSize: 8,
    color: '#666666'
  }
});

interface MinimalPDFTemplateProps {
  data: ResumeData;
}

export const MinimalPDFTemplate: React.FC<MinimalPDFTemplateProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.fullName}</Text>
        <View style={styles.contactInfo}>
          <Text>{data.personalInfo.email}</Text>
          <Text style={styles.contactSeparator}>•</Text>
          <Text>{data.personalInfo.phone}</Text>
          <Text style={styles.contactSeparator}>•</Text>
          <Text>{data.personalInfo.location}</Text>
          {data.personalInfo.linkedin && (
            <>
              <Text style={styles.contactSeparator}>•</Text>
              <Text>{data.personalInfo.linkedin}</Text>
            </>
          )}
          {data.personalInfo.website && (
            <>
              <Text style={styles.contactSeparator}>•</Text>
              <Text>{data.personalInfo.website}</Text>
            </>
          )}
        </View>
      </View>

      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.summaryText}>{data.summary}</Text>
        </View>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((exp) => (
            <View key={exp.id} style={styles.experienceItem}>
              <View style={styles.experienceHeader}>
                <Text style={styles.jobTitle}>{exp.title}</Text>
                <Text style={styles.dateRange}>
                  {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                </Text>
              </View>
              <Text style={styles.companyInfo}>{exp.company}, {exp.location}</Text>
              {exp.description.map((desc, index) => (
                <Text key={index} style={styles.bulletPoint}>— {desc}</Text>
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
              <View style={styles.educationLeft}>
                <Text style={styles.degree}>{edu.degree}</Text>
                <Text style={styles.school}>{edu.school}, {edu.location}</Text>
                {edu.gpa && <Text style={styles.gpa}>GPA: {edu.gpa}</Text>}
              </View>
              <Text style={styles.dateRange}>{edu.graduationDate}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <Text style={styles.skillsText}>
            {data.skills.join(' • ')}
          </Text>
        </View>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {data.projects.map((project) => (
            <View key={project.id} style={styles.projectItem}>
              <View style={styles.projectHeader}>
                <Text style={styles.projectName}>{project.name}</Text>
                {project.url && <Text style={styles.projectUrl}>{project.url}</Text>}
              </View>
              <Text style={styles.projectDescription}>{project.description}</Text>
              <Text style={styles.techList}>
                {project.technologies.join(' • ')}
              </Text>
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

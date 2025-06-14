
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { ResumeData } from '@/pages/Index';

// Register serif fonts for classic look
Font.register({
  family: 'Times',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/crimsontext/v19/wlp2gwHKFkZgtmSR3NB0oRJvaAJSA_JN3Q.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/crimsontext/v19/wlpogwHKFkZgtmSR3NB0oRJX8A5KBuVzKifJ.woff2', fontWeight: 700 }
  ]
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Times',
    fontSize: 10,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 40,
    lineHeight: 1.3,
    backgroundColor: '#ffffff'
  },
  header: {
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#333333',
    paddingBottom: 15,
    marginBottom: 20
  },
  name: {
    fontSize: 20,
    fontWeight: 700,
    color: '#333333',
    marginBottom: 8
  },
  contactInfo: {
    fontSize: 9,
    color: '#666666',
    lineHeight: 1.2
  },
  section: {
    marginBottom: 18
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#333333',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8
  },
  summaryText: {
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.4,
    textAlign: 'justify'
  },
  experienceItem: {
    marginBottom: 12
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 3
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: '#333333'
  },
  dateRange: {
    fontSize: 9,
    color: '#666666'
  },
  companyInfo: {
    fontSize: 10,
    fontWeight: 600,
    color: '#555555',
    marginBottom: 6
  },
  bulletPoint: {
    fontSize: 9,
    color: '#333333',
    marginBottom: 2,
    paddingLeft: 12
  },
  educationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8
  },
  educationLeft: {
    flex: 1
  },
  degree: {
    fontSize: 11,
    fontWeight: 700,
    color: '#333333',
    marginBottom: 2
  },
  school: {
    fontSize: 9,
    color: '#555555'
  },
  gpa: {
    fontSize: 8,
    color: '#666666'
  },
  skillsText: {
    fontSize: 9,
    color: '#333333',
    lineHeight: 1.3
  },
  projectItem: {
    marginBottom: 10
  },
  projectName: {
    fontSize: 11,
    fontWeight: 700,
    color: '#333333',
    marginBottom: 2
  },
  projectUrl: {
    fontSize: 8,
    color: '#666666',
    fontStyle: 'italic',
    marginBottom: 4
  },
  projectDescription: {
    fontSize: 9,
    color: '#333333',
    marginBottom: 4,
    lineHeight: 1.3
  },
  techLabel: {
    fontSize: 8,
    fontWeight: 600,
    color: '#333333'
  },
  techList: {
    fontSize: 8,
    color: '#555555'
  }
});

interface ClassicPDFTemplateProps {
  data: ResumeData;
}

export const ClassicPDFTemplate: React.FC<ClassicPDFTemplateProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.fullName}</Text>
        <View style={styles.contactInfo}>
          <Text>{data.personalInfo.email} • {data.personalInfo.phone}</Text>
          <Text>{data.personalInfo.location}</Text>
          {data.personalInfo.linkedin && <Text>{data.personalInfo.linkedin}</Text>}
          {data.personalInfo.website && <Text>{data.personalInfo.website}</Text>}
        </View>
      </View>

      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
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
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </Text>
              </View>
              <Text style={styles.companyInfo}>{exp.company}, {exp.location}</Text>
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
            {data.skills.join(', ')}
          </Text>
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
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.techLabel}>Technologies: </Text>
                <Text style={styles.techList}>{project.technologies.join(', ')}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

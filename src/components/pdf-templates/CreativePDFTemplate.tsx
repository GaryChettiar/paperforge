
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { ResumeData } from '@/pages/Index';

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
    flexDirection: 'row',
    backgroundColor: '#ffffff'
  },
  sidebar: {
    width: '35%',
    backgroundColor: '#243e36',
    color: '#ffffff',
    padding: 20
  },
  mainContent: {
    width: '65%',
    padding: 20
  },
  sidebarName: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 15
  },
  sidebarContact: {
    fontSize: 8,
    marginBottom: 12,
    lineHeight: 1.4
  },
  sidebarSection: {
    marginBottom: 20
  },
  sidebarTitle: {
    fontSize: 11,
    fontWeight: 700,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.3)',
    paddingBottom: 4
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  skillBullet: {
    width: 6,
    height: 6,
    backgroundColor: '#ffffff',
    borderRadius: 3,
    marginRight: 8
  },
  skillText: {
    fontSize: 8
  },
  mainSection: {
    marginBottom: 18
  },
  mainSectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: '#243e36',
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#f1f7ed',
    paddingBottom: 4
  },
  summaryText: {
    fontSize: 9,
    color: '#333333',
    lineHeight: 1.4
  },
  experienceItem: {
    marginBottom: 15,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: '#243e36',
    position: 'relative'
  },
  experienceBullet: {
    position: 'absolute',
    left: -6,
    top: 4,
    width: 8,
    height: 8,
    backgroundColor: '#243e36',
    borderRadius: 4
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 700,
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
    marginBottom: 6
  },
  bulletPoint: {
    fontSize: 9,
    color: '#333333',
    marginBottom: 2,
    paddingLeft: 8
  }
});

interface CreativePDFTemplateProps {
  data: ResumeData;
  sidebarColor?: string;
}

export const CreativePDFTemplate: React.FC<CreativePDFTemplateProps> = ({ 
  data, 
  sidebarColor = '#243e36' 
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Sidebar */}
      <View style={[styles.sidebar, { backgroundColor: sidebarColor }]}>
        <Text style={styles.sidebarName}>{data.personalInfo.fullName}</Text>
        
        <View style={styles.sidebarContact}>
          <Text>✉ {data.personalInfo.email}</Text>
          <Text>📞 {data.personalInfo.phone}</Text>
          <Text>📍 {data.personalInfo.location}</Text>
          {data.personalInfo.linkedin && <Text>💼 {data.personalInfo.linkedin}</Text>}
          {data.personalInfo.website && <Text>🌐 {data.personalInfo.website}</Text>}
        </View>

        {/* Skills */}
        {data.skills.length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Skills</Text>
            {data.skills.map((skill) => (
              <View key={skill} style={styles.skillItem}>
                <View style={styles.skillBullet} />
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: 8 }}>
                <Text style={{ fontSize: 9, fontWeight: 600, marginBottom: 2 }}>{edu.degree}</Text>
                <Text style={{ fontSize: 8, opacity: 0.9, marginBottom: 1 }}>{edu.school}</Text>
                <Text style={{ fontSize: 8, opacity: 0.8 }}>{edu.graduationDate}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Summary */}
        {data.summary && (
          <View style={styles.mainSection}>
            <Text style={styles.mainSectionTitle}>About Me</Text>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <View style={styles.mainSection}>
            <Text style={styles.mainSectionTitle}>Experience</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.experienceBullet} />
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

        {/* Projects */}
        {data.projects.length > 0 && (
          <View style={styles.mainSection}>
            <Text style={styles.mainSectionTitle}>Projects</Text>
            {data.projects.map((project) => (
              <View key={project.id} style={{ marginBottom: 10, padding: 8, backgroundColor: '#f1f7ed', borderRadius: 4 }}>
                <Text style={{ fontSize: 11, fontWeight: 700, color: '#333333', marginBottom: 2 }}>{project.name}</Text>
                {project.url && <Text style={{ fontSize: 8, color: sidebarColor, marginBottom: 4 }}>{project.url}</Text>}
                <Text style={{ fontSize: 9, color: '#333333', marginBottom: 4, lineHeight: 1.3 }}>{project.description}</Text>
                <Text style={{ fontSize: 8, color: '#666666' }}>
                  Technologies: {project.technologies.join(', ')}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  </Document>
);

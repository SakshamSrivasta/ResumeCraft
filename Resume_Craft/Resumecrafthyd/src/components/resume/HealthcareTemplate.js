import React from 'react';
import styled from 'styled-components';

// Healthcare Professional template - clean, professional design for medical professionals
const ResumeContainer = styled.div`
  width: 100%;
  min-height: 1100px;
  background-color: ${props => props.colors.background};
  color: ${props => props.colors.text};
  font-family: ${props => props.fontFamily};
  padding: 35px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
  border-bottom: ${props => props.borderStyle === 'none' ? 'none' : `2px ${props.borderStyle} ${props.colors.accent}`};
  padding-bottom: 20px;
`;

const Name = styled.h1`
  font-size: 28px;
  margin: 0 0 5px;
  color: ${props => props.colors.primary};
  text-transform: ${props => props.headingStyle === 'uppercase' ? 'uppercase' : 'none'};
  font-style: ${props => props.headingStyle === 'italic' ? 'italic' : 'normal'};
  
  &::first-letter {
    text-transform: ${props => props.headingStyle === 'capitalize' ? 'uppercase' : 'none'};
  }
`;

const JobTitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
  margin: 0 0 15px;
  color: ${props => props.colors.accent};
`;

const Credentials = styled.div`
  font-size: 14px;
  color: ${props => props.colors.text};
  margin-bottom: 15px;
  font-style: italic;
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 14px;
`;

const ContactItem = styled.span`
  a {
    color: ${props => props.colors.text};
    text-decoration: none;
    
    &:hover {
      color: ${props => props.colors.primary};
    }
  }
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  margin-top: 25px;
`;

const LeftColumn = styled.div``;

const RightColumn = styled.div``;

const Section = styled.section`
  margin-bottom: ${props => props.spacing || '25px'};
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  margin: 0 0 15px;
  text-transform: ${props => props.headingStyle === 'uppercase' ? 'uppercase' : 'none'};
  color: ${props => props.colors.primary};
  font-style: ${props => props.headingStyle === 'italic' ? 'italic' : 'normal'};
  border-bottom: ${props => props.borderStyle === 'none' ? 'none' : `1px ${props.borderStyle} ${props.colors.primary}`};
  padding-bottom: 5px;
  
  &::first-letter {
    text-transform: ${props => props.headingStyle === 'capitalize' ? 'uppercase' : 'none'};
  }
`;

const Summary = styled.div`
  margin-bottom: 25px;
  line-height: 1.6;
  font-size: 14px;
`;

const ExperienceItem = styled.div`
  margin-bottom: 20px;
`;

const JobHeader = styled.div`
  margin-bottom: 8px;
`;

const JobPosition = styled.h4`
  font-size: 16px;
  margin: 0;
  color: ${props => props.colors.accent};
`;

const JobDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

const JobCompany = styled.div`
  font-weight: 500;
`;

const JobDuration = styled.div`
  color: ${props => props.colors.text};
  opacity: 0.8;
`;

const JobDescription = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SkillCategory = styled.div`
  margin-bottom: 15px;
`;

const SkillCategoryTitle = styled.h4`
  font-size: 15px;
  margin: 0 0 8px;
  color: ${props => props.colors.accent};
  font-weight: 500;
`;

const SkillList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin: 0;
`;

const SkillItem = styled.li`
  margin-bottom: 6px;
  font-size: 14px;
  position: relative;
  padding-left: 20px;
  
  &:before {
    content: "✓";
    position: absolute;
    left: 0;
    color: ${props => props.colors.primary};
  }
`;

const CertificationList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin: 0;
`;

const CertificationItem = styled.li`
  margin-bottom: 12px;
  font-size: 14px;
`;

const CertificationTitle = styled.div`
  font-weight: 500;
  margin-bottom: 2px;
`;

const CertificationDate = styled.div`
  font-size: 13px;
  color: ${props => props.colors.text};
  opacity: 0.8;
`;

// Healthcare-specific skills categorization
const categorizeHealthcareSkills = (skills) => {
  if (!skills || !skills.length) return [];
  
  // Example categories for healthcare skills
  const categories = {
    'Clinical Skills': ['Patient', 'Care', 'Diagnosis', 'Treatment', 'Assessment', 'Nursing', 'Medical', 'Clinical', 'Health', 'Therapy', 'Therapeutic'],
    'Technical Skills': ['EHR', 'EMR', 'Electronic', 'System', 'Software', 'Technology', 'Digital', 'Computer', 'Technical'],
    'Interpersonal Skills': ['Communication', 'Teamwork', 'Collaboration', 'Leadership', 'Empathy', 'Compassion', 'Patient-centered', 'Relationship', 'Interpersonal'],
    'Certifications & Specialties': ['Certified', 'Licensed', 'Specialty', 'Specialization', 'Board', 'ACLS', 'BLS', 'CPR', 'PALS'],
    'Other Skills': []
  };
  
  const categorizedSkills = {};
  
  skills.forEach(skill => {
    let assigned = false;
    
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => skill.toLowerCase().includes(keyword.toLowerCase()))) {
        if (!categorizedSkills[category]) categorizedSkills[category] = [];
        categorizedSkills[category].push(skill);
        assigned = true;
        break;
      }
    }
    
    if (!assigned) {
      if (!categorizedSkills['Other Skills']) categorizedSkills['Other Skills'] = [];
      categorizedSkills['Other Skills'].push(skill);
    }
  });
  
  return Object.entries(categorizedSkills).filter(([_, skills]) => skills.length > 0);
};

// Sample certifications for healthcare professionals (for demo purposes)
const generateSampleCertifications = () => {
  const certifications = [
    { title: "Basic Life Support (BLS)", issuer: "American Heart Association", date: "2022" },
    { title: "Advanced Cardiac Life Support (ACLS)", issuer: "American Heart Association", date: "2021" },
    { title: "Registered Nurse (RN) License", issuer: "State Board of Nursing", date: "2020" }
  ];
  
  return certifications;
};

const HealthcareTemplate = ({ resume, template }) => {
  const { colors, fontFamily, headingStyle, borderStyle, sectionSpacing } = template;
  const categorizedSkills = categorizeHealthcareSkills(resume.skills);
  const sampleCertifications = generateSampleCertifications();
  
  return (
    <ResumeContainer colors={colors} fontFamily={fontFamily}>
      <Header borderStyle={borderStyle} colors={colors}>
        <Name colors={colors} headingStyle={headingStyle}>
          {resume.firstName} {resume.lastName}
        </Name>
        <JobTitle colors={colors}>{resume.job}</JobTitle>
        <Credentials colors={colors}>
          {/* Sample credentials for healthcare professionals */}
          RN, BSN, ACLS, BLS
        </Credentials>
        
        <ContactInfo>
          {resume.email && (
            <ContactItem colors={colors}>
              <a href={`mailto:${resume.email}`}>{resume.email}</a>
            </ContactItem>
          )}
          {resume.phone && (
            <ContactItem colors={colors}>
              <a href={`tel:${resume.phone}`}>{resume.phone}</a>
            </ContactItem>
          )}
          {resume.website && (
            <ContactItem colors={colors}>
              <a href={resume.website} target="_blank" rel="noopener noreferrer">{resume.website}</a>
            </ContactItem>
          )}
          {resume.location && (
            <ContactItem colors={colors}>{resume.location}</ContactItem>
          )}
        </ContactInfo>
      </Header>
      
      {resume.summary && (
        <Section spacing={sectionSpacing}>
          <SectionTitle 
            colors={colors} 
            headingStyle={headingStyle}
            borderStyle={borderStyle}
          >
            Professional Summary
          </SectionTitle>
          <Summary>{resume.summary}</Summary>
        </Section>
      )}
      
      <TwoColumnLayout>
        <LeftColumn>
          <Section spacing={sectionSpacing}>
            <SectionTitle 
              colors={colors} 
              headingStyle={headingStyle}
              borderStyle={borderStyle}
            >
              Clinical Experience
            </SectionTitle>
            
            {resume.experiences && resume.experiences.map((experience, index) => (
              <ExperienceItem key={index}>
                <JobHeader>
                  <JobPosition colors={colors}>{experience.title}</JobPosition>
                  <JobDetails>
                    <JobCompany>{experience.employer}</JobCompany>
                    <JobDuration colors={colors}>
                      {experience.startDate} - {experience.endDate}
                    </JobDuration>
                  </JobDetails>
                </JobHeader>
                <JobDescription>
                  {experience.description}
                </JobDescription>
              </ExperienceItem>
            ))}
          </Section>
        </LeftColumn>
        
        <RightColumn>
          <Section spacing={sectionSpacing}>
            <SectionTitle 
              colors={colors} 
              headingStyle={headingStyle}
              borderStyle={borderStyle}
            >
              Skills & Competencies
            </SectionTitle>
            <SkillsContainer>
              {categorizedSkills.map(([category, skills], categoryIndex) => (
                <SkillCategory key={categoryIndex}>
                  <SkillCategoryTitle colors={colors}>
                    {category}
                  </SkillCategoryTitle>
                  <SkillList>
                    {skills.map((skill, skillIndex) => (
                      <SkillItem key={skillIndex} colors={colors}>
                        {skill}
                      </SkillItem>
                    ))}
                  </SkillList>
                </SkillCategory>
              ))}
            </SkillsContainer>
          </Section>
          
          <Section spacing={sectionSpacing}>
            <SectionTitle 
              colors={colors} 
              headingStyle={headingStyle}
              borderStyle={borderStyle}
            >
              Certifications & Licenses
            </SectionTitle>
            <CertificationList>
              {sampleCertifications.map((cert, index) => (
                <CertificationItem key={index}>
                  <CertificationTitle>{cert.title}</CertificationTitle>
                  <div>{cert.issuer}</div>
                  <CertificationDate colors={colors}>{cert.date}</CertificationDate>
                </CertificationItem>
              ))}
            </CertificationList>
          </Section>
        </RightColumn>
      </TwoColumnLayout>
    </ResumeContainer>
  );
};

export default HealthcareTemplate; 

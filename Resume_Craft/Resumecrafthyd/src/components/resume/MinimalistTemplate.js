import React from 'react';
import styled from 'styled-components';

// Minimalist template - clean, elegant design with minimal elements
const ResumeContainer = styled.div`
  width: 100%;
  min-height: 1100px;
  background-color: ${props => props.colors.background};
  color: ${props => props.colors.text};
  font-family: ${props => props.fontFamily};
  padding: 40px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
  border-bottom: ${props => props.borderStyle === 'none' ? 'none' : `1px ${props.borderStyle} ${props.colors.accent}`};
  padding-bottom: 20px;
`;

const Name = styled.h1`
  font-size: 32px;
  margin: 0 0 5px;
  color: ${props => props.colors.primary};
  text-transform: ${props => props.headingStyle === 'uppercase' ? 'uppercase' : 'none'};
  font-style: ${props => props.headingStyle === 'italic' ? 'italic' : 'normal'};
  letter-spacing: 2px;
  font-weight: 300;
  
  &::first-letter {
    text-transform: ${props => props.headingStyle === 'capitalize' ? 'uppercase' : 'none'};
  }
`;

const JobTitle = styled.h2`
  font-size: 18px;
  font-weight: 300;
  margin: 0 0 15px;
  color: ${props => props.colors.accent};
  letter-spacing: 1px;
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
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

const Section = styled.section`
  margin-bottom: ${props => props.spacing || '30px'};
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  margin: 0 0 15px;
  text-transform: ${props => props.headingStyle === 'uppercase' ? 'uppercase' : 'none'};
  color: ${props => props.colors.primary};
  font-style: ${props => props.headingStyle === 'italic' ? 'italic' : 'normal'};
  letter-spacing: 1px;
  font-weight: 400;
  
  &::first-letter {
    text-transform: ${props => props.headingStyle === 'capitalize' ? 'uppercase' : 'none'};
  }
`;

const Summary = styled.div`
  margin-bottom: 30px;
  line-height: 1.6;
  font-size: 14px;
  text-align: justify;
`;

const ExperienceItem = styled.div`
  margin-bottom: 25px;
`;

const ExperienceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const ExperienceLeft = styled.div`
  flex: 1;
  min-width: 200px;
`;

const ExperienceRight = styled.div`
  text-align: right;
  min-width: 120px;
`;

const JobPosition = styled.h4`
  font-size: 15px;
  margin: 0;
  color: ${props => props.colors.accent};
  font-weight: 500;
`;

const JobCompany = styled.div`
  font-size: 14px;
  font-weight: 400;
`;

const JobDuration = styled.div`
  font-size: 14px;
  color: ${props => props.colors.text};
  opacity: 0.8;
`;

const JobDescription = styled.div`
  font-size: 14px;
  line-height: 1.5;
  text-align: justify;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-start;
`;

const SkillTag = styled.span`
  display: inline-block;
  color: ${props => props.colors.text};
  font-size: 13px;
  font-weight: 300;
  letter-spacing: 0.5px;
  
  &:not(:last-child)::after {
    content: "•";
    margin-left: 12px;
    color: ${props => props.colors.accent};
  }
`;

const MinimalistTemplate = ({ resume, template }) => {
  const { colors, fontFamily, headingStyle, borderStyle, sectionSpacing } = template;
  
  return (
    <ResumeContainer colors={colors} fontFamily={fontFamily}>
      <Header borderStyle={borderStyle} colors={colors}>
        <Name colors={colors} headingStyle={headingStyle}>
          {resume.firstName} {resume.lastName}
        </Name>
        <JobTitle colors={colors}>{resume.job}</JobTitle>
        
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
          >
            Professional Summary
          </SectionTitle>
          <Summary>{resume.summary}</Summary>
        </Section>
      )}
      
      <Section spacing={sectionSpacing}>
        <SectionTitle 
          colors={colors} 
          headingStyle={headingStyle}
        >
          Work Experience
        </SectionTitle>
        
        {resume.experiences && resume.experiences.map((experience, index) => (
          <ExperienceItem key={index}>
            <ExperienceHeader>
              <ExperienceLeft>
                <JobPosition colors={colors}>{experience.title}</JobPosition>
                <JobCompany>{experience.employer}</JobCompany>
              </ExperienceLeft>
              <ExperienceRight>
                <JobDuration colors={colors}>
                  {experience.startDate} - {experience.endDate}
                </JobDuration>
              </ExperienceRight>
            </ExperienceHeader>
            <JobDescription>
              {experience.description}
            </JobDescription>
          </ExperienceItem>
        ))}
      </Section>
      
      <Section spacing={sectionSpacing}>
        <SectionTitle 
          colors={colors} 
          headingStyle={headingStyle}
        >
          Skills
        </SectionTitle>
        <SkillsContainer>
          {resume.skills && resume.skills.map((skill, index) => (
            <SkillTag key={index} colors={colors}>
              {skill}
            </SkillTag>
          ))}
        </SkillsContainer>
      </Section>
    </ResumeContainer>
  );
};

export default MinimalistTemplate; 


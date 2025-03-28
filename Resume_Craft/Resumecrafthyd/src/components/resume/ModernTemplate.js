import React from 'react';
import styled from 'styled-components';

// ATS-optimized structure with semantic section headings and clean formatting
const ResumeContainer = styled.div`
  padding: 40px;
  font-family: ${props => props.theme.fontFamily || 'Arial, sans-serif'};
  color: #333;
  line-height: 1.5;
  max-width: 100%;
`;

const Header = styled.header`
  margin-bottom: 30px;
  text-align: center;
`;

const Name = styled.h1`
  font-size: 28px;
  margin: 0 0 5px;
  color: ${props => props.theme.colors?.primary || '#7652e0'};
  font-weight: bold;
`;

const JobTitle = styled.h2`
  font-size: 20px;
  margin: 0 0 15px;
  font-weight: 500;
  color: #555;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-bottom: 5px;
  
  @media print {
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }
`;

const ContactItem = styled.div`
  font-size: 14px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 25px 0 15px;
  padding-bottom: 8px;
  border-bottom: 2px solid ${props => props.theme.colors?.primary || '#7652e0'};
  color: ${props => props.theme.colors?.primary || '#7652e0'};
  
  /* Use standard section titles for better ATS parsing */
  &::before {
    content: "${props => props.atsTitle}";
  }
`;

const ProfileSection = styled.section`
  margin-bottom: 25px;
`;

const SummaryText = styled.p`
  margin: 0;
  text-align: justify;
`;

const ExperienceItem = styled.div`
  margin-bottom: 20px;
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 5px;
  
  @media print {
    flex-direction: column;
    gap: 3px;
  }
`;

const JobInfo = styled.div`
  
`;

const CompanyName = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
`;

const JobPosition = styled.h5`
  font-size: 15px;
  font-weight: 500;
  margin: 0;
  font-style: italic;
`;

const DateLocation = styled.div`
  text-align: right;
  
  @media print {
    text-align: left;
  }
`;

const DateRange = styled.div`
  font-size: 14px;
`;

const Location = styled.div`
  font-size: 14px;
`;

const AchievementsList = styled.ul`
  margin: 10px 0 0 0;
  padding-left: 20px;
`;

const AchievementItem = styled.li`
  margin-bottom: 5px;
`;

const SkillsContainer = styled.section`
  margin-bottom: 25px;
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Skill = styled.span`
  background-color: #f0f0ff;
  color: #333;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
`;

const ModernTemplate = ({ resume, template }) => {
  // Set defaults or use template values
  const colors = template?.colors || {
    primary: '#7652e0',
    secondary: '#f0f0ff'
  };
  
  const fontFamily = template?.fontFamily || 'Arial, sans-serif';
  
  return (
    <ResumeContainer style={{ fontFamily }}>
      <Header>
        <Name style={{ color: colors.primary }}>
          {resume.firstName || ''} {resume.lastName || ''}
        </Name>
        <JobTitle>{resume.job || ''}</JobTitle>
        <ContactInfo>
          {resume.email && <ContactItem>Email: {resume.email}</ContactItem>}
          {resume.phone && <ContactItem>Phone: {resume.phone}</ContactItem>}
          {(resume.city || resume.state) && (
            <ContactItem>
              Location: {resume.city || ''}{resume.city && resume.state ? ', ' : ''}{resume.state || ''}
            </ContactItem>
          )}
          {resume.website && <ContactItem>Website: {resume.website}</ContactItem>}
        </ContactInfo>
      </Header>

      {resume.professionalSummary && (
        <ProfileSection>
          <SectionTitle atsTitle="Professional Summary" style={{ color: colors.primary, borderColor: colors.primary }}>
            
          </SectionTitle>
          <SummaryText>{resume.professionalSummary}</SummaryText>
        </ProfileSection>
      )}

      {resume.experiences && resume.experiences.length > 0 && (
        <section>
          <SectionTitle atsTitle="Work Experience" style={{ color: colors.primary, borderColor: colors.primary }}>
            
          </SectionTitle>
          {resume.experiences.map((experience, index) => (
            <ExperienceItem key={index}>
              <JobHeader>
                <JobInfo>
                  <CompanyName>{experience.company || ''}</CompanyName>
                  <JobPosition>{experience.jobTitle || ''}</JobPosition>
                </JobInfo>
                <DateLocation>
                  <DateRange>
                    {experience.startDate || ''} {experience.startDate && experience.endDate ? '- ' : ''}
                    {experience.endDate || ''}
                  </DateRange>
                  <Location>{experience.location || ''}</Location>
                </DateLocation>
              </JobHeader>
              {experience.achievements && experience.achievements.length > 0 && (
                <AchievementsList>
                  {experience.achievements.map((achievement, i) => (
                    <AchievementItem key={i}>{achievement}</AchievementItem>
                  ))}
                </AchievementsList>
              )}
            </ExperienceItem>
          ))}
        </section>
      )}

      {resume.education && (
        <section>
          <SectionTitle atsTitle="Education" style={{ color: colors.primary, borderColor: colors.primary }}>
            
          </SectionTitle>
          <ExperienceItem>
            <JobHeader>
              <JobInfo>
                <CompanyName>{resume.education.school || ''}</CompanyName>
                <JobPosition>{resume.education.degree || ''}</JobPosition>
              </JobInfo>
              <DateLocation>
                <DateRange>
                  {resume.education.startDate || ''} 
                  {resume.education.startDate && resume.education.endDate ? '- ' : ''}
                  {resume.education.endDate || ''}
                </DateRange>
                <Location>{resume.education.location || ''}</Location>
              </DateLocation>
            </JobHeader>
          </ExperienceItem>
        </section>
      )}

      {resume.skills && resume.skills.length > 0 && (
        <SkillsContainer>
          <SectionTitle atsTitle="Skills" style={{ color: colors.primary, borderColor: colors.primary }}>
            
          </SectionTitle>
          <SkillsList>
            {resume.skills.map((skill, index) => (
              <Skill key={index} style={{ backgroundColor: colors.secondary, color: '#333' }}>
                {skill}
              </Skill>
            ))}
          </SkillsList>
        </SkillsContainer>
      )}
    </ResumeContainer>
  );
};

export default ModernTemplate; 

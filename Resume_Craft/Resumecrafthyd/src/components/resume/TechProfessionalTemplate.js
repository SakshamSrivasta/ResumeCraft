import React from 'react';
import styled from 'styled-components';

// Tech Professional template - highlighting technical skills with a modern layout
const ResumeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 100%;
  min-height: 1100px;
  background-color: ${props => props.colors.background};
  color: ${props => props.colors.text};
  font-family: ${props => props.fontFamily};
`;

const LeftColumn = styled.div`
  background-color: ${props => props.colors.secondary};
  padding: 40px 25px;
`;

const RightColumn = styled.div`
  padding: 40px 30px;
`;

const Header = styled.header`
  margin-bottom: 35px;
`;

const Name = styled.h1`
  font-size: 28px;
  margin: 0 0 5px;
  color: ${props => props.colors.primary};
  text-transform: ${props => props.headingStyle === 'uppercase' ? 'uppercase' : 'none'};
  font-style: ${props => props.headingStyle === 'italic' ? 'italic' : 'normal'};
  letter-spacing: 1px;
  font-weight: 600;
  
  &::first-letter {
    text-transform: ${props => props.headingStyle === 'capitalize' ? 'uppercase' : 'none'};
  }
`;

const JobTitle = styled.h2`
  font-size: 16px;
  font-weight: 400;
  margin: 0 0 20px;
  color: ${props => props.colors.accent};
  letter-spacing: 0.5px;
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
  border-bottom: ${props => props.borderStyle === 'none' ? 'none' : `2px ${props.borderStyle} ${props.colors.accent}`};
  padding-bottom: 5px;
  font-weight: 600;
  
  &::first-letter {
    text-transform: ${props => props.headingStyle === 'capitalize' ? 'uppercase' : 'none'};
  }
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 25px;
`;

const ContactItem = styled.li`
  margin-bottom: 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  
  a {
    color: ${props => props.colors.text};
    text-decoration: none;
    
    &:hover {
      color: ${props => props.colors.primary};
    }
  }
`;

const Icon = styled.span`
  margin-right: 10px;
  color: ${props => props.colors.accent};
  font-size: 16px;
`;

const Summary = styled.div`
  margin-bottom: 30px;
  line-height: 1.6;
  font-size: 14px;
`;

const ExperienceItem = styled.div`
  margin-bottom: 25px;
  position: relative;
  padding-left: 20px;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    width: 8px;
    height: 8px;
    background-color: ${props => props.colors.accent};
    border-radius: 50%;
  }
  
  &:after {
    content: '';
    position: absolute;
    left: 3px;
    top: 8px;
    width: 2px;
    height: calc(100% + 15px);
    background-color: ${props => props.colors.accent};
    opacity: 0.5;
  }
  
  &:last-child:after {
    display: none;
  }
`;

const JobHeader = styled.div`
  margin-bottom: 10px;
`;

const JobPosition = styled.h4`
  font-size: 16px;
  margin: 0 0 3px 0;
  color: ${props => props.colors.accent};
  font-weight: 500;
`;

const JobCompany = styled.div`
  font-size: 14px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
`;

const JobDuration = styled.div`
  font-size: 13px;
  color: ${props => props.colors.text};
  opacity: 0.8;
  font-style: italic;
`;

const JobDescription = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SkillCategory = styled.div`
  margin-bottom: 10px;
`;

const SkillCategoryTitle = styled.h4`
  font-size: 14px;
  margin: 0 0 8px;
  color: ${props => props.colors.accent};
  font-weight: 500;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

const SkillBar = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
`;

const SkillName = styled.span`
  font-size: 13px;
  margin-bottom: 3px;
`;

const SkillLevel = styled.div`
  height: 6px;
  background-color: ${props => props.colors.secondary};
  border-radius: 3px;
  overflow: hidden;
  
  &:after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.level}%;
    background-color: ${props => props.colors.primary};
  }
`;

// Helper function to get a random skill level (for demo purposes)
const getSkillLevel = () => {
  return Math.floor(Math.random() * 41) + 60; // Random number between 60-100
};

// Group skills into categories (for demonstration)
const categorizeTechSkills = (skills) => {
  if (!skills || !skills.length) return [];
  
  // Example categories for tech skills
  const categories = {
    'Programming Languages': ['JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'Swift'],
    'Frameworks & Libraries': ['React', 'Angular', 'Vue', 'Node.js', 'Express', 'Django'],
    'Tools & Technologies': ['Git', 'Docker', 'AWS', 'Azure', 'Kubernetes', 'Jenkins'],
    'Database': ['MongoDB', 'MySQL', 'PostgreSQL', 'SQLite', 'Redis', 'Cassandra'],
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

const TechProfessionalTemplate = ({ resume, template }) => {
  const { colors, fontFamily, headingStyle, borderStyle, sectionSpacing } = template;
  const categorizedSkills = categorizeTechSkills(resume.skills);
  
  return (
    <ResumeContainer colors={colors} fontFamily={fontFamily}>
      <LeftColumn colors={colors}>
        <Header>
          <Name colors={colors} headingStyle={headingStyle}>
            {resume.firstName} {resume.lastName}
          </Name>
          <JobTitle colors={colors}>{resume.job}</JobTitle>
        </Header>
        
        <Section spacing={sectionSpacing}>
          <SectionTitle 
            colors={colors} 
            headingStyle={headingStyle}
            borderStyle={borderStyle}
          >
            Contact
          </SectionTitle>
          <ContactList>
            {resume.email && (
              <ContactItem colors={colors}>
                <Icon colors={colors}>✉️</Icon>
                <a href={`mailto:${resume.email}`}>{resume.email}</a>
              </ContactItem>
            )}
            {resume.phone && (
              <ContactItem colors={colors}>
                <Icon colors={colors}>📱</Icon>
                <a href={`tel:${resume.phone}`}>{resume.phone}</a>
              </ContactItem>
            )}
            {resume.website && (
              <ContactItem colors={colors}>
                <Icon colors={colors}>🌐</Icon>
                <a href={resume.website} target="_blank" rel="noopener noreferrer">
                  {resume.website}
                </a>
              </ContactItem>
            )}
            {resume.location && (
              <ContactItem colors={colors}>
                <Icon colors={colors}>📍</Icon>
                {resume.location}
              </ContactItem>
            )}
          </ContactList>
        </Section>
        
        <Section spacing={sectionSpacing}>
          <SectionTitle 
            colors={colors} 
            headingStyle={headingStyle}
            borderStyle={borderStyle}
          >
            Technical Skills
          </SectionTitle>
          <SkillsContainer>
            {categorizedSkills.map(([category, skills], categoryIndex) => (
              <SkillCategory key={categoryIndex}>
                <SkillCategoryTitle colors={colors}>
                  {category}
                </SkillCategoryTitle>
                <SkillsGrid>
                  {skills.map((skill, skillIndex) => (
                    <SkillBar key={skillIndex}>
                      <SkillName>{skill}</SkillName>
                      <SkillLevel colors={colors} level={getSkillLevel()} />
                    </SkillBar>
                  ))}
                </SkillsGrid>
              </SkillCategory>
            ))}
          </SkillsContainer>
        </Section>
      </LeftColumn>
      
      <RightColumn>
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
        
        <Section spacing={sectionSpacing}>
          <SectionTitle 
            colors={colors} 
            headingStyle={headingStyle}
            borderStyle={borderStyle}
          >
            Professional Experience
          </SectionTitle>
          
          {resume.experiences && resume.experiences.map((experience, index) => (
            <ExperienceItem key={index} colors={colors}>
              <JobHeader>
                <JobPosition colors={colors}>{experience.title}</JobPosition>
                <JobCompany>
                  {experience.employer}
                  <JobDuration colors={colors}>
                    {experience.startDate} - {experience.endDate}
                  </JobDuration>
                </JobCompany>
              </JobHeader>
              <JobDescription>
                {experience.description}
              </JobDescription>
            </ExperienceItem>
          ))}
        </Section>
      </RightColumn>
    </ResumeContainer>
  );
};

export default TechProfessionalTemplate; 

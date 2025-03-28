import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { analyzeJobDescription } from '../../services/aiSuggestions';

const AnalyzerContainer = styled.div`
  margin: 20px 0;
  padding: 15px;
  border: 1px solid ${props => props.theme.gray.lighter};
  border-radius: 5px;
  background-color: ${props => props.theme.gray.lightest};
`;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 15px;
  color: ${props => props.theme.primary.normal};
`;

const TextareaContainer = styled.div`
  margin-bottom: 20px;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 10px;
  border: 1px solid ${props => props.theme.gray.light};
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary.normal};
    box-shadow: 0 0 0 2px ${props => props.theme.primary.lightest};
  }
`;

const AnalyzeButton = styled.button`
  background-color: ${props => props.theme.primary.normal};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.primary.dark};
  }
  
  &:disabled {
    background-color: ${props => props.theme.gray.light};
    cursor: not-allowed;
  }
`;

const SkillsList = styled.div`
  margin-top: 20px;
`;

const SkillsHeading = styled.h4`
  font-size: 16px;
  margin-bottom: 10px;
`;

const SkillChip = styled.span`
  display: inline-block;
  padding: 6px 12px;
  margin: 0 6px 6px 0;
  background-color: ${props => props.selected ? props.theme.primary.normal : props.theme.primary.lightest};
  color: ${props => props.selected ? 'white' : props.theme.primary.dark};
  border-radius: 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.selected ? props.theme.primary.dark : props.theme.primary.light};
    color: white;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const JobDescriptionAnalyzer = ({ onSkillSelect }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate a brief delay for the analysis
    setTimeout(() => {
      const skills = analyzeJobDescription(jobDescription);
      setSuggestedSkills(skills);
      setIsAnalyzing(false);
    }, 800);
  };
  
  const toggleSkill = (skill) => {
    // Create a new array to avoid mutation
    let updatedSkills = [...selectedSkills];
    
    if (selectedSkills.includes(skill)) {
      updatedSkills = updatedSkills.filter(s => s !== skill);
    } else {
      updatedSkills.push(skill);
    }
    
    setSelectedSkills(updatedSkills);
    
    if (onSkillSelect && typeof onSkillSelect === 'function') {
      onSkillSelect(updatedSkills);
    }
  };
  
  // Add a useEffect to clear suggestions when job description changes
  useEffect(() => {
    if (!jobDescription.trim()) {
      setSuggestedSkills([]);
    }
  }, [jobDescription]);
  
  return (
    <AnalyzerContainer>
      <Title>AI-Powered Job Description Analyzer</Title>
      
      <TextareaContainer>
        <Label htmlFor="job-description">Paste a job description to analyze</Label>
        <div onClick={(e) => e.stopPropagation()}>
          <StyledTextarea
            id="job-description"
            value={jobDescription}
            onChange={(e) => {
              e.stopPropagation();
              setJobDescription(e.target.value);
            }}
            onClick={(e) => e.stopPropagation()}
            onFocus={(e) => e.stopPropagation()}
            placeholder="Paste a job description here to get suggestions for relevant skills to include in your resume..."
          />
        </div>
      </TextareaContainer>
      
      <AnalyzeButton 
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleAnalyze(e);
        }} 
        disabled={isAnalyzing || !jobDescription.trim()}
      >
        {isAnalyzing ? 'Analyzing...' : 'Analyze Description'}
      </AnalyzeButton>
      
      {suggestedSkills.length > 0 && (
        <SkillsList>
          <SkillsHeading>Suggested Skills (click to select)</SkillsHeading>
          <div>
            {suggestedSkills.map((skill, index) => (
              <SkillChip
                key={index}
                selected={selectedSkills.includes(skill)}
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </SkillChip>
            ))}
          </div>
        </SkillsList>
      )}
    </AnalyzerContainer>
  );
};

export default JobDescriptionAnalyzer; 
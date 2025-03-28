import React, { useState } from 'react';
import styled from 'styled-components';
import JobDescriptionAnalyzer from './JobDescriptionAnalyzer';
import ContentSuggestions from './ContentSuggestions';

const AIAssistContainer = styled.div`
  margin: 20px 0;
`;

const Heading = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: ${props => props.theme.primary.normal};
  display: flex;
  align-items: center;
`;

const AIIcon = styled.span`
  margin-right: 10px;
  font-size: 20px;
`;

const Divider = styled.div`
  margin: 30px 0;
  border-top: 1px solid ${props => props.theme.gray.lighter};
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.primary.normal};
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  font-size: 16px;
  
  &:hover {
    text-decoration: underline;
  }
  
  &:focus {
    outline: none;
  }
`;

const ChevronIcon = styled.span`
  margin-left: 5px;
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const AIAssistant = ({ onSkillSelect, onContentSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSkillSelect = (skills) => {
    if (onSkillSelect) {
      onSkillSelect(skills);
    }
  };
  
  const handleContentSelect = (content, type) => {
    if (onContentSelect) {
      onContentSelect(content, type);
    }
  };
  
  return (
    <AIAssistContainer>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        <AIIcon>🧠</AIIcon>
        AI Resume Assistant
        <ChevronIcon isOpen={isOpen}>▼</ChevronIcon>
      </ToggleButton>
      
      {isOpen && (
        <>
          <Divider />
          
          <JobDescriptionAnalyzer onSkillSelect={handleSkillSelect} />
          
          <ContentSuggestions onSelectSuggestion={handleContentSelect} />
        </>
      )}
    </AIAssistContainer>
  );
};

export default AIAssistant; 
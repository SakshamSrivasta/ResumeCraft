import React, { useState } from 'react';
import styled from 'styled-components';
import { suggestProfessionalSummary, suggestAchievements, improveWording } from '../../services/aiSuggestions';

const SuggestionsContainer = styled.div`
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

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
  border-bottom: 1px solid ${props => props.theme.gray.light};
`;

const Tab = styled.button`
  padding: 8px 16px;
  background: none;
  border: none;
  border-bottom: 3px solid ${props => 
    props.active ? props.theme.primary.normal : 'transparent'};
  color: ${props => 
    props.active ? props.theme.primary.normal : props.theme.gray.dark};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    color: ${props => props.theme.primary.normal};
  }
  
  &:focus {
    outline: none;
  }
`;

const Card = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.gray.lighter};
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: ${props => props.theme.primary.light};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
`;

const SuggestionText = styled.p`
  margin: 0;
  line-height: 1.5;
  font-size: 14px;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  font-size: 14px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid ${props => props.theme.gray.light};
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary.normal};
    box-shadow: 0 0 0 2px ${props => props.theme.primary.lightest};
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
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

const GenerateButton = styled.button`
  background-color: ${props => props.theme.primary.normal};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-right: 10px;
  
  &:hover {
    background-color: ${props => props.theme.primary.dark};
  }
  
  &:disabled {
    background-color: ${props => props.theme.gray.light};
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 20px 0;
  color: ${props => props.theme.gray.normal};
`;

const ContentSuggestions = ({ onSelectSuggestion }) => {
  const [activeTab, setActiveTab] = useState('summary');
  const [jobTitle, setJobTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [textToImprove, setTextToImprove] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate a brief delay for AI processing
    setTimeout(() => {
      let newSuggestions = [];
      
      switch (activeTab) {
        case 'summary':
          if (jobTitle) {
            const summary = suggestProfessionalSummary(jobTitle, experience);
            newSuggestions = [summary];
          }
          break;
          
        case 'achievements':
          if (jobTitle) {
            newSuggestions = suggestAchievements(jobTitle);
          }
          break;
          
        case 'improve':
          if (textToImprove) {
            // Handle text improvement asynchronously
            improveWording(textToImprove, 'summary')
              .then(improved => {
                setSuggestions([improved]);
                setIsGenerating(false);
              });
            return; // Return early as we're handling async
          }
          break;
          
        default:
          break;
      }
      
      setSuggestions(newSuggestions);
      setIsGenerating(false);
    }, 1000);
  };
  
  const selectSuggestion = (suggestion) => {
    if (onSelectSuggestion) {
      onSelectSuggestion(suggestion, activeTab);
    }
  };
  
  return (
    <SuggestionsContainer>
      <Title>AI Content Suggestions</Title>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'summary'} 
          onClick={() => setActiveTab('summary')}
        >
          Professional Summary
        </Tab>
        <Tab 
          active={activeTab === 'achievements'} 
          onClick={() => setActiveTab('achievements')}
        >
          Work Achievements
        </Tab>
        <Tab 
          active={activeTab === 'improve'} 
          onClick={() => setActiveTab('improve')}
        >
          Improve Wording
        </Tab>
      </TabsContainer>
      
      {activeTab === 'summary' && (
        <>
          <InputGroup>
            <InputLabel htmlFor="job-title">Your Job Title</InputLabel>
            <StyledInput
              id="job-title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Software Developer, UX Designer, Marketing Manager"
            />
          </InputGroup>
          
          <InputGroup>
            <InputLabel htmlFor="years-experience">Years of Experience</InputLabel>
            <StyledInput
              id="years-experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="e.g. 3, 5+"
            />
          </InputGroup>
        </>
      )}
      
      {activeTab === 'achievements' && (
        <InputGroup>
          <InputLabel htmlFor="job-title-achievements">Your Job Title</InputLabel>
          <StyledInput
            id="job-title-achievements"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="e.g. Software Developer, UX Designer, Marketing Manager"
          />
        </InputGroup>
      )}
      
      {activeTab === 'improve' && (
        <InputGroup>
          <InputLabel htmlFor="text-to-improve">Text to Improve</InputLabel>
          <StyledTextarea
            id="text-to-improve"
            value={textToImprove}
            onChange={(e) => setTextToImprove(e.target.value)}
            placeholder="Paste your text here to get suggestions for improvement..."
          />
        </InputGroup>
      )}
      
      <div style={{ marginBottom: '20px' }}>
        <GenerateButton 
          onClick={handleGenerate} 
          disabled={isGenerating || 
            (activeTab === 'summary' && !jobTitle) || 
            (activeTab === 'achievements' && !jobTitle) ||
            (activeTab === 'improve' && !textToImprove)}
        >
          {isGenerating ? 'Generating...' : 'Generate Suggestions'}
        </GenerateButton>
      </div>
      
      {suggestions.length > 0 ? (
        suggestions.map((suggestion, index) => (
          <Card key={index} onClick={() => selectSuggestion(suggestion)}>
            <SuggestionText>{suggestion}</SuggestionText>
          </Card>
        ))
      ) : (
        <EmptyState>
          {isGenerating ? 
            'Generating suggestions...' : 
            'Enter your information and click Generate to get AI suggestions'}
        </EmptyState>
      )}
    </SuggestionsContainer>
  );
};

export default ContentSuggestions; 
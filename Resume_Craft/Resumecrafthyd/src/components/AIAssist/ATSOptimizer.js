import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { analyzeATSFriendliness, suggestATSImprovements, atsBestPractices } from '../../services/atsOptimization';

const OptimizerContainer = styled.div`
  margin: 20px 0;
  padding: 20px;
  background-color: #f9f9ff;
  border-radius: 8px;
  border: 1px solid #e0e0ff;
`;

const ScoreContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ScoreCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${props => {
    if (props.score >= 80) return '#5DD57E';
    if (props.score >= 60) return '#FFA500';
    return '#FF6B6B';
  }};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  margin-right: 20px;
`;

const ScoreText = styled.div`
  flex: 1;
  
  h4 {
    margin: 0 0 5px 0;
    color: #333;
  }
  
  p {
    margin: 0;
    color: #666;
  }
`;

const IssuesList = styled.div`
  margin-top: 15px;
`;

const Issue = styled.div`
  padding: 12px;
  margin-bottom: 10px;
  background: white;
  border-left: 4px solid ${props => {
    switch(props.severity) {
      case 'high': return '#FF6B6B';
      case 'medium': return '#FFA500';
      default: return '#5DD57E';
    }
  }};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  h5 {
    margin: 0 0 5px 0;
    color: #333;
  }
  
  p {
    margin: 0;
    color: #666;
  }
`;

const SuggestionList = styled.div`
  margin-top: 15px;
`;

const Suggestion = styled.div`
  padding: 12px;
  margin-bottom: 10px;
  background: white;
  border-left: 4px solid #3a7bd5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  h5 {
    margin: 0 0 5px 0;
    color: #333;
  }
  
  p {
    margin: 0 0 8px 0;
    color: #666;
  }
`;

const KeywordsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const Keyword = styled.span`
  background: #e8f4ff;
  color: #0066cc;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #cce4ff;
  }
`;

const BestPracticesList = styled.div`
  margin-top: 20px;
`;

const BestPractice = styled.div`
  padding: 12px;
  margin-bottom: 10px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  
  h5 {
    margin: 0 0 5px 0;
    color: #333;
  }
  
  p {
    margin: 0;
    color: #666;
  }
`;

const TabContainer = styled.div`
  margin-bottom: 20px;
`;

const TabButtons = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 15px;
`;

const TabButton = styled.button`
  padding: 8px 16px;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  color: ${props => props.active ? props.theme.primary.normal : '#666'};
  border-bottom: ${props => props.active ? `2px solid ${props.theme.primary.normal}` : 'none'};
  margin-bottom: -1px;
  
  &:hover {
    color: ${props => props.theme.primary.normal};
  }
`;

const JobDescriptionInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 15px;
  font-family: inherit;
`;

const AnalyzeButton = styled.button`
  background-color: ${props => props.theme.primary.normal};
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background-color: ${props => props.theme.primary.dark};
  }
`;

const ATSOptimizer = ({ resume, onAddKeyword }) => {
  const [activeTab, setActiveTab] = useState('score');
  const [analysis, setAnalysis] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [suggestions, setSuggestions] = useState(null);
  
  useEffect(() => {
    if (resume) {
      const result = analyzeATSFriendliness(resume);
      setAnalysis(result);
    }
  }, [resume]);
  
  const handleAnalyzeJobDescription = (e) => {
    if (e) e.preventDefault();
    if (jobDescription && resume) {
      const result = suggestATSImprovements(resume, jobDescription);
      setSuggestions(result);
    }
  };
  
  const handleAddKeyword = (keyword) => {
    if (onAddKeyword && typeof onAddKeyword === 'function') {
      onAddKeyword(keyword);
    }
  };
  
  return (
    <OptimizerContainer>
      <h3>
        <span role="img" aria-label="ATS">📊</span> ATS Optimization
      </h3>
      <p>Ensure your resume passes through Applicant Tracking Systems (ATS) to reach human recruiters.</p>
      
      <TabContainer>
        <TabButtons>
          <TabButton 
            active={activeTab === 'score'} 
            onClick={() => setActiveTab('score')}
          >
            ATS Score
          </TabButton>
          <TabButton 
            active={activeTab === 'jobMatch'} 
            onClick={() => setActiveTab('jobMatch')}
          >
            Job Match
          </TabButton>
          <TabButton 
            active={activeTab === 'bestPractices'} 
            onClick={() => setActiveTab('bestPractices')}
          >
            Best Practices
          </TabButton>
        </TabButtons>
        
        {activeTab === 'score' && analysis && (
          <>
            <ScoreContainer>
              <ScoreCircle score={analysis.overallScore}>
                {analysis.overallScore}%
              </ScoreCircle>
              <ScoreText>
                <h4>Your ATS Compatibility Score</h4>
                <p>This score represents how well your resume is likely to perform with ATS systems.</p>
              </ScoreText>
            </ScoreContainer>
            
            {analysis.issues.length > 0 ? (
              <>
                <h4>Issues to Address</h4>
                <IssuesList>
                  {analysis.issues.map((issue, index) => (
                    <Issue key={index} severity={issue.severity}>
                      <h5>{issue.message}</h5>
                      <p>{issue.solution}</p>
                    </Issue>
                  ))}
                </IssuesList>
              </>
            ) : (
              <p>Great job! Your resume appears to be well-optimized for ATS systems.</p>
            )}
          </>
        )}
        
        {activeTab === 'jobMatch' && (
          <>
            <h4>Match Your Resume to a Specific Job</h4>
            <p>Paste a job description to get tailored suggestions for better ATS compatibility.</p>
            
            <div onClick={(e) => e.stopPropagation()}>
              <JobDescriptionInput
                value={jobDescription}
                onChange={(e) => {
                  e.stopPropagation();
                  setJobDescription(e.target.value);
                }}
                onClick={(e) => e.stopPropagation()}
                onFocus={(e) => e.stopPropagation()}
                placeholder="Paste a job description here..."
              />
            </div>
            
            <AnalyzeButton 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAnalyzeJobDescription(e);
              }}
            >
              Analyze Job Match
            </AnalyzeButton>
            
            {suggestions && (
              <SuggestionList>
                <h4>{suggestions.message}</h4>
                {suggestions.suggestions.map((suggestion, index) => (
                  <Suggestion key={index}>
                    <h5>{suggestion.title}</h5>
                    <p>{suggestion.description}</p>
                    {suggestion.items && suggestion.items.length > 0 && (
                      <KeywordsList>
                        {suggestion.items.map((item, i) => (
                          <Keyword 
                            key={i}
                            onClick={() => handleAddKeyword(item)}
                            title="Click to add this keyword to your skills"
                          >
                            {item}
                          </Keyword>
                        ))}
                      </KeywordsList>
                    )}
                  </Suggestion>
                ))}
              </SuggestionList>
            )}
          </>
        )}
        
        {activeTab === 'bestPractices' && (
          <BestPracticesList>
            {atsBestPractices.map((practice) => (
              <BestPractice key={practice.id}>
                <h5>{practice.title}</h5>
                <p>{practice.description}</p>
              </BestPractice>
            ))}
          </BestPracticesList>
        )}
      </TabContainer>
    </OptimizerContainer>
  );
};

export default ATSOptimizer; 
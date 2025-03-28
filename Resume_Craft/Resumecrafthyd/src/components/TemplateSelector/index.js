import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAllTemplates, getAllIndustries } from '../../services/templateService';

const SelectorContainer = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h3`
  margin-bottom: 15px;
  font-size: 18px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  background-color: ${props => props.active ? '#3498db' : '#f1f1f1'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#2980b9' : '#e4e4e4'};
  }
`;

const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
`;

const TemplateCard = styled.div`
  border: 2px solid ${props => props.selected ? '#3498db' : '#eaeaea'};
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: white;
  box-shadow: ${props => props.selected ? '0 4px 12px rgba(52, 152, 219, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.05)'};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
`;

const TemplatePreview = styled.div`
  height: 180px;
  position: relative;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const TemplatePlaceholder = styled.div`
  width: 80%;
  height: 80%;
  background-color: ${props => props.color || '#eaeaea'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #666;
  border-radius: 4px;
  text-align: center;
  padding: 10px;
`;

const TemplateInfo = styled.div`
  padding: 12px;
`;

const TemplateName = styled.h4`
  margin: 0 0 5px;
  font-size: 16px;
`;

const TemplateDescription = styled.p`
  margin: 0 0 8px;
  font-size: 13px;
  color: #666;
  line-height: 1.4;
`;

const IndustryTag = styled.span`
  display: inline-block;
  background-color: #f1f1f1;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #555;
`;

const SelectedIndicator = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #3498db;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  z-index: 1;
`;

const TemplateSelector = ({ selectedTemplate, onTemplateSelect }) => {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [industries, setIndustries] = useState([]);
  
  useEffect(() => {
    // Load templates and industries on component mount
    setTemplates(getAllTemplates());
    setIndustries(getAllIndustries());
  }, []);
  
  useEffect(() => {
    if (templates.length) {
      if (activeFilter === 'all') {
        setFilteredTemplates(templates);
      } else {
        setFilteredTemplates(templates.filter(template => 
          template.industry === activeFilter
        ));
      }
    }
  }, [templates, activeFilter]);
  
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };
  
  return (
    <SelectorContainer>
      <FilterContainer>
        <FilterButton 
          active={activeFilter === 'all'} 
          onClick={() => handleFilterClick('all')}
        >
          All Templates
        </FilterButton>
        
        {industries.map((industry) => (
          <FilterButton 
            key={industry}
            active={activeFilter === industry} 
            onClick={() => handleFilterClick(industry)}
          >
            {industry.charAt(0).toUpperCase() + industry.slice(1)}
          </FilterButton>
        ))}
      </FilterContainer>
      
      <TemplatesGrid>
        {filteredTemplates.map((template) => (
          <TemplateCard 
            key={template.id}
            selected={selectedTemplate === template.id}
            onClick={() => onTemplateSelect(template.id)}
          >
            {selectedTemplate === template.id && (
              <SelectedIndicator>Selected</SelectedIndicator>
            )}
            
            <TemplatePreview>
              {template.previewImage ? (
                <PreviewImage src={template.previewImage} alt={template.name} />
              ) : (
                <TemplatePlaceholder color={template.colors.secondary}>
                  {template.name}
                </TemplatePlaceholder>
              )}
            </TemplatePreview>
            
            <TemplateInfo>
              <TemplateName>{template.name}</TemplateName>
              <TemplateDescription>
                {template.description.length > 60 
                  ? `${template.description.substring(0, 60)}...`
                  : template.description
                }
              </TemplateDescription>
              <IndustryTag>
                {template.industry.charAt(0).toUpperCase() + template.industry.slice(1)}
              </IndustryTag>
            </TemplateInfo>
          </TemplateCard>
        ))}
      </TemplatesGrid>
    </SelectorContainer>
  );
};

export default TemplateSelector; 
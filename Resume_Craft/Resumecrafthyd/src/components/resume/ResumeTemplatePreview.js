import React from 'react';
import styled from 'styled-components';
import { getTemplateById } from '../../services/templateService';

// Import all template components
import ModernTemplate from './ModernTemplate';
import MinimalistTemplate from './MinimalistTemplate';
import TechProfessionalTemplate from './TechProfessionalTemplate';
import HealthcareTemplate from './HealthcareTemplate';

const PreviewContainer = styled.div`
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background-color: white;
  transform-origin: top center;
  transform: scale(${props => props.scale || 1});
`;

const NoTemplateMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
`;

const ResumeTemplatePreview = ({ 
  resume, 
  templateId, 
  scale = 1,
  previewOnly = false 
}) => {
  // Get the template data
  const template = getTemplateById(templateId);
  
  if (!template) {
    return (
      <PreviewContainer scale={scale}>
        <NoTemplateMessage>
          Please select a template to preview your resume.
        </NoTemplateMessage>
      </PreviewContainer>
    );
  }
  
  // Render the appropriate template based on the template id
  const renderTemplate = () => {
    switch (template.id) {
      case 'modern':
        return <ModernTemplate resume={resume} template={template} />;
      case 'minimalist':
        return <MinimalistTemplate resume={resume} template={template} />;
      case 'tech-professional':
        return <TechProfessionalTemplate resume={resume} template={template} />;
      case 'healthcare':
        return <HealthcareTemplate resume={resume} template={template} />;
      default:
        // Fallback to modern template
        return <ModernTemplate resume={resume} template={template} />;
    }
  };
  
  return (
    <PreviewContainer scale={scale}>
      {renderTemplate()}
    </PreviewContainer>
  );
};

export default ResumeTemplatePreview; 
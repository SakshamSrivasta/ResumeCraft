import React, { useEffect } from 'react';
import { useTextToSpeech } from '../../contexts/TextToSpeechContext';

// This component will wrap each step in the resume creation process
// to provide text-to-speech functionality
const AccessibleStep = ({ children, stepTitle, stepDescription }) => {
  const { updatePageText } = useTextToSpeech();
  
  useEffect(() => {
    // Combine the title and description for the screen reader
    const fullText = `${stepTitle}. ${stepDescription}`;
    updatePageText(fullText);
    
    // Cleanup function to prevent text-to-speech from continuing when component unmounts
    return () => {
      updatePageText('');
    };
  }, [stepTitle, stepDescription, updatePageText]);

  return (
    <div className="accessible-step">
      {children}
    </div>
  );
};

export default AccessibleStep; 
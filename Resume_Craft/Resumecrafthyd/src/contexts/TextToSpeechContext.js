import React, { createContext, useState, useContext } from 'react';
import TextToSpeech from '../texttospeech';

// Create the context
const TextToSpeechContext = createContext();

// Create a provider component
export const TextToSpeechProvider = ({ children }) => {
  const [pageText, setPageText] = useState('');

  // Function to update the text to be read
  const updatePageText = (text) => {
    setPageText(text);
  };

  return (
    <TextToSpeechContext.Provider value={{ pageText, updatePageText }}>
      {children}
      {pageText && <TextToSpeech text={pageText} />}
    </TextToSpeechContext.Provider>
  );
};

// Custom hook to use the context
export const useTextToSpeech = () => {
  const context = useContext(TextToSpeechContext);
  if (!context) {
    throw new Error('useTextToSpeech must be used within a TextToSpeechProvider');
  }
  return context;
}; 
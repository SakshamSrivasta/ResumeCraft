import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const HighContrastContext = createContext();

// Create a provider component
export const HighContrastProvider = ({ children }) => {
  const [isHighContrast, setIsHighContrast] = useState(
    localStorage.getItem('high-contrast') === 'true'
  );

  useEffect(() => {
    // Apply high contrast on initial load if it was previously enabled
    if (isHighContrast) {
      document.body.classList.add('has-high-contrast-theme');
    } else {
      document.body.classList.remove('has-high-contrast-theme');
    }
  }, [isHighContrast]);

  // Function to toggle high contrast mode
  const toggleHighContrast = () => {
    const newState = !isHighContrast;
    setIsHighContrast(newState);
    localStorage.setItem('high-contrast', newState.toString());
  };

  return (
    <HighContrastContext.Provider value={{ isHighContrast, toggleHighContrast }}>
      {children}
    </HighContrastContext.Provider>
  );
};

// Custom hook to use the context
export const useHighContrast = () => {
  const context = useContext(HighContrastContext);
  if (!context) {
    throw new Error('useHighContrast must be used within a HighContrastProvider');
  }
  return context;
}; 
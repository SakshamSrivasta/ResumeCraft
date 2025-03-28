/**
 * Helper functions for high contrast styling compatibility
 */

// Check if high contrast mode is currently active
export const isHighContrastActive = () => {
  if (typeof document === 'undefined') return false;
  return document.body.classList.contains('has-high-contrast-theme');
};

// Helper function to apply conditional styles based on high contrast mode
export const highContrastStyle = (property, normalValue, highContrastValue) => {
  return props => {
    const isInHighContrast = document.body.classList.contains('has-high-contrast-theme');
    return isInHighContrast ? highContrastValue : normalValue;
  };
};

// Common high contrast colors
export const highContrastColors = {
  background: '#FFFFFF',
  text: '#000000',
  link: '#0000EE',
  accent: '#000000',
  border: '#000000',
  focus: '#FF0000'
}; 
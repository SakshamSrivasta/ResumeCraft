// Define the available industries
export const industries = [
  'general', 
  'tech', 
  'creative', 
  'business', 
  'healthcare', 
  'education'
];

// Define the templates with all necessary properties
export const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'A clean, professional design suitable for most industries.',
    previewImage: null,
    colors: {
      primary: '#2c3e50',
      secondary: '#ecf0f1',
      accent: '#3498db',
      text: '#333333',
      background: '#ffffff'
    },
    fontFamily: "'Roboto', sans-serif",
    headingStyle: 'capitalize',
    borderStyle: 'solid',
    sectionSpacing: '30px',
    sidebarWidth: '30%',
    layout: 'sidebar',
    industry: 'general'
  },
  {
    id: 'tech-professional',
    name: 'Tech Professional',
    description: 'A bold design showcasing technical skills, perfect for developers and IT professionals.',
    previewImage: null,
    colors: {
      primary: '#333333',
      secondary: '#f2f2f2',
      accent: '#61dafb',
      text: '#444444',
      background: '#ffffff'
    },
    fontFamily: "'Source Sans Pro', sans-serif",
    headingStyle: 'uppercase',
    borderStyle: 'solid',
    sectionSpacing: '35px',
    sidebarWidth: '35%',
    layout: 'sidebar',
    industry: 'tech'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'An elegant, simple design focusing on content with minimal styling.',
    previewImage: null,
    colors: {
      primary: '#2c3e50',
      secondary: '#f8f9fa',
      accent: '#7f8c8d',
      text: '#2c3e50',
      background: '#ffffff'
    },
    fontFamily: "'Open Sans', sans-serif",
    headingStyle: 'capitalize',
    borderStyle: 'solid',
    sectionSpacing: '25px',
    sidebarWidth: '0%',
    layout: 'full',
    industry: 'general'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'A vibrant design for creative professionals like designers and artists.',
    previewImage: null,
    colors: {
      primary: '#e74c3c',
      secondary: '#f9f9f9',
      accent: '#f39c12',
      text: '#34495e',
      background: '#ffffff'
    },
    fontFamily: "'Montserrat', sans-serif",
    headingStyle: 'uppercase',
    borderStyle: 'solid',
    sectionSpacing: '30px',
    sidebarWidth: '35%',
    layout: 'sidebar',
    industry: 'creative'
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'A sophisticated design for senior management and executive positions.',
    previewImage: null,
    colors: {
      primary: '#1a1a1a',
      secondary: '#f2f2f2',
      accent: '#9b8164',
      text: '#333333',
      background: '#ffffff'
    },
    fontFamily: "'Merriweather', serif",
    headingStyle: 'capitalize',
    borderStyle: 'solid',
    sectionSpacing: '35px',
    sidebarWidth: '0%',
    layout: 'full',
    industry: 'business'
  },
  {
    id: 'healthcare',
    name: 'Healthcare Professional',
    description: 'A clean template designed for medical and healthcare professionals.',
    previewImage: null,
    colors: {
      primary: '#2471a3',
      secondary: '#ebf5fb',
      accent: '#28b463',
      text: '#333333',
      background: '#ffffff'
    },
    fontFamily: "'Nunito', sans-serif",
    headingStyle: 'capitalize',
    borderStyle: 'solid',
    sectionSpacing: '25px',
    sidebarWidth: '0%',
    layout: 'full',
    industry: 'healthcare'
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'A traditional design for researchers, professors, and educators.',
    previewImage: null,
    colors: {
      primary: '#34495e',
      secondary: '#f5f5f5',
      accent: '#8e44ad',
      text: '#333333',
      background: '#ffffff'
    },
    fontFamily: "'Lora', serif",
    headingStyle: 'capitalize',
    borderStyle: 'solid',
    sectionSpacing: '30px',
    sidebarWidth: '0%',
    layout: 'full',
    industry: 'education'
  }
];

// Return the template by ID
export const getTemplateById = (id) => {
  return templates.find(template => template.id === id) || templates[0];
};

// Return all available templates
export const getAllTemplates = () => {
  return templates;
};

// Return all available industries
export const getAllIndustries = () => {
  return industries;
};

// Return templates filtered by industry
export const getTemplatesByIndustry = (industry) => {
  if (industry === 'all') {
    return templates;
  }
  return templates.filter(template => template.industry === industry);
}; 
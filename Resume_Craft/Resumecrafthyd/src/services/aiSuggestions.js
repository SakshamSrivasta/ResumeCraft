// import { OpenAI } from 'openai';

// This is a mock service that simulates AI suggestions
// In a production app, you would connect to a real OpenAI API or similar service

// Mock OpenAI API key (would normally be stored in environment variables)
// const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

// Predefined set of skills for different job types
const skillsByJobType = {
  'software developer': [
    'JavaScript', 'React', 'Node.js', 'TypeScript', 'Git', 'RESTful APIs', 
    'Problem Solving', 'Agile Methodologies', 'Database Design', 'GraphQL'
  ],
  'web developer': [
    'HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Frontend Frameworks',
    'Bootstrap', 'SASS/SCSS', 'React', 'Angular', 'Vue.js'
  ],
  'data scientist': [
    'Python', 'R', 'SQL', 'Machine Learning', 'Data Visualization', 
    'Statistical Analysis', 'Pandas', 'NumPy', 'TensorFlow', 'Scikit-learn'
  ],
  'product manager': [
    'Product Strategy', 'Roadmap Planning', 'User Research', 'Market Analysis',
    'Agile', 'SCRUM', 'Stakeholder Management', 'Data Analysis', 'Wireframing'
  ],
  'ux designer': [
    'User Research', 'Wireframing', 'Prototyping', 'Figma', 'Adobe XD',
    'User Testing', 'Information Architecture', 'UI Design', 'Accessibility'
  ],
  'project manager': [
    'Project Planning', 'Risk Management', 'Stakeholder Communication', 'Budgeting',
    'Agile', 'Scrum', 'MS Project', 'Resource Allocation', 'Timeline Management'
  ],
  'marketing specialist': [
    'Digital Marketing', 'Social Media Marketing', 'SEO', 'Content Creation',
    'Analytics', 'Campaign Management', 'Email Marketing', 'Branding', 'Market Research'
  ],
  'sales representative': [
    'Cold Calling', 'Negotiation', 'CRM Software', 'Lead Generation', 'Relationship Building',
    'Product Knowledge', 'Client Retention', 'Sales Funnel Management', 'Closing Techniques'
  ],
};

// Professional summary templates
const summaryTemplates = {
  'software developer': [
    "Innovative Software Developer with {years} years of experience building robust applications with {skills}. Passionate about clean code and elegant solutions to complex problems.",
    "Results-driven Software Developer skilled in {skills} with {years} years of experience. Committed to delivering high-quality code and improving application performance.",
    "Detail-oriented Software Developer with expertise in {skills}. {years} years of experience translating business requirements into efficient, scalable solutions."
  ],
  'web developer': [
    "Creative Web Developer with {years} years of experience crafting responsive websites using {skills}. Focused on delivering exceptional user experiences across all devices.",
    "Front-end focused Web Developer with {years} years of experience in {skills}. Dedicated to building accessible, performant web applications with modern best practices.",
    "Web Developer with {years} years of experience specializing in {skills}. Passionate about creating intuitive and visually appealing web interfaces."
  ],
  'data scientist': [
    "Analytical Data Scientist with {years} years of experience using {skills} to derive actionable insights from complex datasets. Strong focus on predictive modeling and machine learning applications.",
    "Data Scientist with {years} years of experience leveraging {skills} to solve business problems. Proven track record of translating data into strategic recommendations.",
    "Results-oriented Data Scientist skilled in {skills} with {years} years of experience. Expertise in developing and deploying machine learning models for business impact."
  ],
};

// Achievement templates
const achievementTemplates = {
  'software developer': [
    "Reduced application load time by {percent}% through code optimization and implementing efficient algorithms",
    "Developed a new feature that increased user engagement by {percent}%",
    "Refactored legacy codebase, reducing technical debt and improving maintainability",
    "Led the migration from {oldTech} to {newTech}, resulting in {benefit}",
    "Created automated testing suite that improved code quality and reduced bugs by {percent}%"
  ],
  'web developer': [
    "Improved website performance score from {oldScore} to {newScore} using Google Lighthouse metrics",
    "Redesigned responsive UI that increased mobile user engagement by {percent}%",
    "Implemented accessibility improvements that brought the site to WCAG 2.1 AA compliance",
    "Reduced page load time by {percent}% through optimization techniques",
    "Built a component library that increased development speed by {percent}%"
  ],
  'data scientist': [
    "Developed a predictive model that improved forecasting accuracy by {percent}%",
    "Created a recommendation engine that increased customer conversion by {percent}%",
    "Implemented data pipeline that reduced processing time from {oldTime} to {newTime}",
    "Designed A/B testing framework that optimized business processes by {percent}%",
    "Built a dashboard that provided key insights, leading to {benefit}"
  ],
};

// Function to analyze job title and suggest skills
export const suggestSkillsForJobTitle = (jobTitle) => {
  // Convert job title to lowercase for matching
  const lowerCaseJobTitle = jobTitle.toLowerCase();
  
  // Find the best matching job type
  const jobType = Object.keys(skillsByJobType).find(type => 
    lowerCaseJobTitle.includes(type)
  ) || 'software developer'; // Default to software developer if no match
  
  // Return the skills for the identified job type
  return {
    suggestedSkills: skillsByJobType[jobType],
    jobType: jobType
  };
};

// Function to suggest professional summary
export const suggestProfessionalSummary = (jobTitle, years, skills = []) => {
  // Convert job title to lowercase for matching
  const lowerCaseJobTitle = jobTitle.toLowerCase();
  
  // Find the best matching job type
  const jobType = Object.keys(summaryTemplates).find(type => 
    lowerCaseJobTitle.includes(type)
  ) || 'software developer'; // Default to software developer if no match
  
  // Get random template
  const templates = summaryTemplates[jobType];
  const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
  
  // Fill in the template
  const yearsText = years ? years : '3+';
  const skillsText = skills.length > 0 
    ? skills.slice(0, 3).join(', ') 
    : skillsByJobType[jobType].slice(0, 3).join(', ');
  
  return randomTemplate
    .replace('{years}', yearsText)
    .replace('{skills}', skillsText);
};

// Function to suggest work achievements
export const suggestAchievements = (jobTitle) => {
  // Convert job title to lowercase for matching
  const lowerCaseJobTitle = jobTitle.toLowerCase();
  
  // Find the best matching job type
  const jobType = Object.keys(achievementTemplates).find(type => 
    lowerCaseJobTitle.includes(type)
  ) || 'software developer'; // Default to software developer if no match
  
  // Get random achievement templates
  const templates = achievementTemplates[jobType];
  const selectedTemplates = [];
  
  // If we have fewer than 3 templates, return all of them
  if (templates.length <= 3) {
    return templates.map(template => {
      return fillTemplateValues(template);
    });
  }
  
  // Otherwise, select 3 unique templates
  const templatesCopy = [...templates]; // Create a copy to avoid modifying the original
  
  while (selectedTemplates.length < 3 && templatesCopy.length > 0) {
    const randomIndex = Math.floor(Math.random() * templatesCopy.length);
    const template = templatesCopy[randomIndex];
    selectedTemplates.push(template);
    // Remove the selected template to avoid duplicates
    templatesCopy.splice(randomIndex, 1);
  }
  
  // Fill in the templates with random but reasonable values
  return selectedTemplates.map(template => fillTemplateValues(template));
};

// Helper function to fill template values
const fillTemplateValues = (template) => {
  return template
    .replace('{percent}', Math.floor(Math.random() * 40) + 20) // 20-60%
    .replace('{oldScore}', Math.floor(Math.random() * 50) + 30) // 30-80
    .replace('{newScore}', Math.floor(Math.random() * 20) + 80) // 80-100
    .replace('{oldTime}', `${Math.floor(Math.random() * 24) + 1} hours`)
    .replace('{newTime}', `${Math.floor(Math.random() * 50) + 10} minutes`)
    .replace('{oldTech}', 'legacy system')
    .replace('{newTech}', 'modern tech stack')
    .replace('{benefit}', 'improved performance and maintainability');
};

// Function to analyze job description and extract relevant skills
export const analyzeJobDescription = (jobDescription) => {
  // In a real implementation, this would send the job description to an AI service
  // For now, we'll implement a simple keyword matching algorithm
  
  // Common skills across different job categories
  const allSkills = Object.values(skillsByJobType).flat();
  const uniqueSkills = [...new Set(allSkills)];
  
  // Convert job description to lowercase for matching
  const lowerCaseDescription = jobDescription.toLowerCase();
  
  // Find matching skills in the job description
  const matchedSkills = uniqueSkills.filter(skill => 
    lowerCaseDescription.includes(skill.toLowerCase())
  );
  
  // If too few skills matched, add some generic ones
  if (matchedSkills.length < 5) {
    // Extract potential job type from description
    const jobType = Object.keys(skillsByJobType).find(type => 
      lowerCaseDescription.includes(type)
    );
    
    if (jobType) {
      // Add some skills from the matched job type
      const additionalSkills = skillsByJobType[jobType]
        .filter(skill => !matchedSkills.includes(skill))
        .slice(0, 5 - matchedSkills.length);
      
      return [...matchedSkills, ...additionalSkills];
    }
  }
  
  return matchedSkills;
};

// Function to improve wording for resume content
export const improveWording = async (text, type) => {
  // In a real implementation, this would send the text to an AI service like OpenAI
  // For now, we'll use predefined improvements based on content type
  
  if (!text || text.trim() === '') {
    return '';
  }
  
  // Simple improvements based on content type
  switch (type) {
    case 'summary':
      return enhanceSummary(text);
    case 'achievement':
      return enhanceAchievement(text);
    case 'jobDescription':
      return enhanceJobDescription(text);
    default:
      return text;
  }
};

// Helper function to enhance summary wording
const enhanceSummary = (text) => {
  // Simple enhancements
  return text
    .replace(/worked/gi, 'collaborated')
    .replace(/good/gi, 'exceptional')
    .replace(/made/gi, 'developed')
    .replace(/did/gi, 'executed')
    .replace(/use/gi, 'leverage')
    .replace(/used/gi, 'utilized')
    .replace(/helped/gi, 'facilitated')
    .replace(/i am/gi, 'I am a professional')
    .replace(/skills in/gi, 'expertise in');
};

// Helper function to enhance achievement wording
const enhanceAchievement = (text) => {
  // Add action verbs at the beginning if not present
  const actionVerbs = ['Implemented', 'Developed', 'Spearheaded', 'Orchestrated', 'Led', 'Designed'];
  
  if (!actionVerbs.some(verb => text.startsWith(verb))) {
    const randomVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
    text = `${randomVerb} ${text.charAt(0).toLowerCase()}${text.slice(1)}`;
  }
  
  // Simple enhancements
  return text
    .replace(/improved/gi, 'significantly enhanced')
    .replace(/increased/gi, 'boosted')
    .replace(/decreased/gi, 'reduced')
    .replace(/made/gi, 'created')
    .replace(/worked on/gi, 'executed')
    .replace(/finished/gi, 'successfully delivered');
};

// Helper function to enhance job description wording
const enhanceJobDescription = (text) => {
  // Simple enhancements
  return text
    .replace(/responsible for/gi, 'accountable for')
    .replace(/was tasked with/gi, 'led initiatives to')
    .replace(/worked with/gi, 'collaborated with')
    .replace(/helped/gi, 'supported')
    .replace(/did/gi, 'executed')
    .replace(/made/gi, 'developed');
}; 
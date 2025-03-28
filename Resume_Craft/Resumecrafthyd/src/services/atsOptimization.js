// ATS Optimization Service
// This service provides utilities to make resumes more ATS-friendly

// Keywords frequently used by ATS systems
export const commonATSKeywords = {
  general: [
    'experience', 'skills', 'professional', 'management', 'team', 'development',
    'leadership', 'project', 'business', 'analysis', 'communication', 'results'
  ],
  tech: [
    'software', 'development', 'programming', 'engineering', 'data', 'analysis',
    'frontend', 'backend', 'full-stack', 'cloud', 'infrastructure', 'devops'
  ],
  healthcare: [
    'patient', 'care', 'clinical', 'medical', 'treatment', 'health',
    'diagnosis', 'therapy', 'nursing', 'physician', 'records', 'compliance'
  ],
  finance: [
    'accounting', 'financial', 'analysis', 'budget', 'reporting', 'compliance',
    'forecasting', 'investment', 'risk', 'management', 'audit', 'planning'
  ]
};

// ATS best practices
export const atsBestPractices = [
  {
    id: 'simple-formatting',
    title: 'Use Simple Formatting',
    description: 'Avoid complex tables, headers/footers, images, and fancy design elements that ATS may not parse correctly.'
  },
  {
    id: 'standard-sections',
    title: 'Include Standard Section Headings',
    description: 'Use conventional headings like "Experience," "Education," "Skills" to ensure ATS properly categorizes your information.'
  },
  {
    id: 'appropriate-keywords',
    title: 'Include Job-Specific Keywords',
    description: 'Incorporate relevant keywords from the job description to match what the ATS is scanning for.'
  },
  {
    id: 'proper-file-format',
    title: 'Use Proper File Format',
    description: 'Submit in .docx or PDF format, as these are most widely accepted by ATS systems.'
  },
  {
    id: 'contact-info',
    title: 'Clear Contact Information',
    description: 'Place your contact information at the top of the resume in plain text format.'
  },
  {
    id: 'chronological-order',
    title: 'Use Chronological Format',
    description: 'List your work experience in reverse chronological order, which is easier for ATS to parse.'
  },
  {
    id: 'avoid-abbreviations',
    title: 'Minimize Abbreviations',
    description: 'Spell out terms and minimize uncommon abbreviations that ATS might not recognize.'
  }
];

// Function to analyze text content for ATS optimization
export const analyzeATSFriendliness = (resume) => {
  const issues = [];
  const scores = {
    keywords: 0,
    format: 0,
    content: 0
  };
  
  // Check if resume has standard sections
  const hasStandardSections = (resume) => {
    const standardSections = ['experience', 'education', 'skills'];
    let foundSections = 0;
    
    if (resume.experiences && resume.experiences.length > 0) {
      foundSections++;
    }
    
    if (resume.education) {
      foundSections++;
    }
    
    if (resume.skills && resume.skills.length > 0) {
      foundSections++;
    }
    
    return foundSections / standardSections.length;
  };
  
  // Calculate keyword density
  const calculateKeywordDensity = (resume, industry = 'general') => {
    // Default to general if no specific industry
    const keywordsToCheck = commonATSKeywords[industry] || commonATSKeywords.general;
    let keywordCount = 0;
    
    // Check professional summary
    if (resume.professionalSummary) {
      const summary = resume.professionalSummary.toLowerCase();
      keywordsToCheck.forEach(keyword => {
        if (summary.includes(keyword.toLowerCase())) {
          keywordCount++;
        }
      });
    }
    
    // Check experiences
    if (resume.experiences && resume.experiences.length > 0) {
      resume.experiences.forEach(exp => {
        const achievements = exp.achievements || [];
        achievements.forEach(achievement => {
          if (typeof achievement === 'string') {
            const text = achievement.toLowerCase();
            keywordsToCheck.forEach(keyword => {
              if (text.includes(keyword.toLowerCase())) {
                keywordCount++;
              }
            });
          }
        });
      });
    }
    
    // Calculate score based on keyword density
    return Math.min(keywordCount / (keywordsToCheck.length * 0.5), 1);
  };
  
  // Check for contact information
  const hasCompleteContactInfo = (resume) => {
    let score = 0;
    if (resume.firstName && resume.lastName) score += 0.3;
    if (resume.email) score += 0.3;
    if (resume.city && resume.state) score += 0.2;
    if (resume.phone) score += 0.2;
    return score;
  };
  
  // Calculate scores
  scores.format = hasStandardSections(resume);
  scores.keywords = calculateKeywordDensity(resume);
  scores.content = hasCompleteContactInfo(resume);
  
  // Generate improvement suggestions
  if (scores.keywords < 0.6) {
    issues.push({
      type: 'keywords',
      severity: 'high',
      message: 'Your resume needs more industry-relevant keywords for better ATS ranking.',
      solution: 'Add more job-specific keywords, especially in your professional summary and experience sections.'
    });
  }
  
  if (scores.format < 0.7) {
    issues.push({
      type: 'format',
      severity: 'medium',
      message: 'Your resume structure may not be optimal for ATS parsing.',
      solution: 'Ensure you have clearly labeled sections for Experience, Education, and Skills.'
    });
  }
  
  if (scores.content < 0.8) {
    issues.push({
      type: 'content',
      severity: 'medium',
      message: 'Contact information may be incomplete or hard to parse.',
      solution: 'Place complete contact details at the top of your resume in plain text format.'
    });
  }
  
  // Calculate overall score
  const overallScore = (scores.keywords * 0.4) + (scores.format * 0.3) + (scores.content * 0.3);
  
  return {
    scores,
    overallScore: Math.round(overallScore * 100),
    issues
  };
};

// Function to suggest improvements based on job description
export const suggestATSImprovements = (resume, jobDescription = '') => {
  if (!jobDescription) {
    return {
      message: 'Add a job description to get personalized ATS optimization suggestions.',
      suggestions: []
    };
  }
  
  const jobDescLower = jobDescription.toLowerCase();
  const suggestions = [];
  
  // Extract potential keywords from job description
  const extractKeywords = (text) => {
    // This is a simplified approach - in a real app, you'd use NLP
    const words = text.split(/\s+/);
    const commonWords = new Set(['the', 'and', 'is', 'in', 'a', 'to', 'for', 'of', 'with', 'an', 'on', 'at']);
    
    const potentialKeywords = words
      .filter(word => word.length > 4 && !commonWords.has(word))
      .map(word => word.replace(/[^\w]/, ''));
      
    return [...new Set(potentialKeywords)]; // Remove duplicates
  };
  
  const potentialKeywords = extractKeywords(jobDescLower);
  const missingKeywords = [];
  
  // Check if resume content contains keywords
  const resumeText = [
    resume.professionalSummary || '',
    ...(resume.skills || []),
    ...((resume.experiences || []).flatMap(exp => 
      (exp.achievements || []).map(achievement => typeof achievement === 'string' ? achievement : '')
    ))
  ].join(' ').toLowerCase();
  
  potentialKeywords.forEach(keyword => {
    if (!resumeText.includes(keyword) && keyword.length > 0) {
      missingKeywords.push(keyword);
    }
  });
  
  if (missingKeywords.length > 0) {
    suggestions.push({
      type: 'keywords',
      title: 'Add Missing Keywords',
      description: 'Consider adding these keywords from the job description:',
      items: missingKeywords.slice(0, 10) // Limit to top 10
    });
  }
  
  // Check for professional summary optimization
  if (!resume.professionalSummary || resume.professionalSummary.length < 100) {
    suggestions.push({
      type: 'content',
      title: 'Improve Professional Summary',
      description: 'Your professional summary should be 3-5 sentences and include key skills and experience relevant to the position.',
      items: []
    });
  }
  
  return {
    message: suggestions.length > 0 
      ? 'Here are personalized suggestions to improve your resume\'s ATS compatibility:' 
      : 'Your resume appears to be well-optimized for this job description.',
    suggestions
  };
}; 
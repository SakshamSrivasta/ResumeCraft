import React from 'react';
import styled from 'styled-components';
import { getYear } from '../../utils/date';

// Enhanced for better ATS parsing
const ExperienceContainer = styled.article`
	margin-bottom: 35px;
	&:last-child {
		margin-bottom: 0px;
	}
`;

// Better semantic structure for job titles
const ExperienceTitle = styled.h4`
	letter-spacing: -0.03em;
	color: #222; /* Improved contrast */
	font-size: 16px;
	margin-bottom: 7px;
	font-weight: 600; /* Bold job titles for better parsing */
`;

const Employer = styled.span`
	font-weight: 600;
	color: #000; /* High contrast for company names */
`;

const ExperienceDuration = styled.div`
	font-size: 13px;
	letter-spacing: -0.03em;
	color: #444; /* Better contrast */
	font-weight: 500;
	margin-bottom: 18px;
`;

const ExperienceDesc = styled.p`
	font-weight: 400;
	color: #222; /* Higher contrast for description */
	letter-spacing: -0.03em;
	line-height: 24px;
	font-size: 14px;
`;

// Use proper bulleted lists for achievements
const AchievementsList = styled.ul`
	padding-left: 20px;
	margin-top: 10px;
	list-style-type: disc; /* Explicit bullets for ATS */
`;

const AchievementItem = styled.li`
	margin-bottom: 8px;
	font-size: 14px;
	color: #222;
	line-height: 1.4;
`;

const JobLocation = styled.div`
	font-size: 13px;
	color: #444;
	margin-bottom: 5px;
`;

const Experience = (props) => {
	const { experience } = props;

	// function to render experience endDate
	const renderEndDate = () => {
		if (experience.endDate) {
			return Date.parse(experience.endDate) ? getYear(experience.endDate) : experience.endDate;
		} else {
			return 'Present';
		}
	};

	// Handle array of achievements or single description
	const renderAchievements = () => {
		if (experience.achievements && experience.achievements.length > 0) {
			return (
				<AchievementsList>
					{experience.achievements.map((achievement, index) => (
						<AchievementItem key={index}>{achievement}</AchievementItem>
					))}
				</AchievementsList>
			);
		} else if (experience.description) {
			return <ExperienceDesc>{experience.description}</ExperienceDesc>;
		} else {
			return <ExperienceDesc>Job responsibilities and achievements go here</ExperienceDesc>;
		}
	};

	return (
		<ExperienceContainer>
			<ExperienceTitle>
				<Employer>{experience.company || experience.employer || 'Company'}</Employer>
				{' - '}
				{experience.jobTitle || experience.title || 'Job Title'}
			</ExperienceTitle>
			
			<ExperienceDuration>
				{experience.startDate ? getYear(experience.startDate) : 'Start Date'} - {renderEndDate()}
			</ExperienceDuration>
			
			{experience.location && (
				<JobLocation>{experience.location}</JobLocation>
			)}
			
			{renderAchievements()}
		</ExperienceContainer>
	);
};

export default Experience;

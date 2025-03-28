import styled from 'styled-components';
import { P } from '../Text';

import './bootstrap-grid.min.css';

import Experience from './Experience';
import Skill from './Skill';
import Contact from './Contact';

// Enhanced for better ATS parsing with semantic HTML
const ResumeContainer = styled.article`
	margin-left: auto;
	margin-right: auto;
	width: 595px;
	padding: 60px 0px;
	border: 2px solid #f2eeff;
	background: white;
	
	/* Ensure text is easily selectable/parseable */
	-webkit-user-select: text;
	user-select: text;
`;

const InnerContainer = styled.div`
	width: 485px;
	margin-left: auto;
	margin-right: auto;
`;

const Name = styled.h1`
	font-weight: bold;
	font-size: 20px;
	letter-spacing: -0.04em;
	color: #000; /* Ensure high contrast for ATS */
`;

const Role = styled.h2`
	margin-top: 2px;
	font-size: 14px;
	letter-spacing: -0.03em;
	color: #333; /* Better contrast */
`;

const Summary = styled.p`
	letter-spacing: -0.02em;
	font-size: 16px;
	color: #222; /* Darker for better contrast */
	margin-top: 30px;
	line-height: 1.38;
	font-weight: 400;
`;

const Wrapper = styled.div`margin-top: 45px;`;

// Use more standard section names for better ATS parsing
const SectionTitle = styled.h3`
	font-weight: bold;
	letter-spacing: -0.03em;
	color: #000; /* High contrast for section headings */
	font-size: 14px;
	text-transform: uppercase;
	margin-bottom: 30px;
`;

// Use semantic HTML lists for better ATS parsing
const Skills = styled.ul`
	list-style-type: disc; /* Explicit bullet points for better parsing */
	padding-left: 20px;
`;

const NoContent = styled.div`color: ${(props) => props.theme.gray.normal};`;

// Experience section with proper list formatting
const ExperiencesList = styled.div`
	/* Structured for better parsing */
`;

const Resume = (props) => {
	const resume = props.resume;
	
	return (
		<ResumeContainer>
			{/* Hidden structured data for ATS */}
			<div itemScope itemType="http://schema.org/Person" style={{ display: 'none' }}>
				<span itemProp="givenName">{resume.firstName}</span>
				<span itemProp="familyName">{resume.lastName}</span>
				<span itemProp="jobTitle">{resume.job}</span>
				{resume.email && <span itemProp="email">{resume.email}</span>}
				{resume.website && <span itemProp="url">{resume.website}</span>}
				{resume.city && resume.state && (
					<div itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
						<span itemProp="addressLocality">{resume.city}</span>,
						<span itemProp="addressRegion">{resume.state}</span>
					</div>
				)}
				
				{resume.skills && resume.skills.length > 0 && (
					<div itemProp="knowsAbout">
						{resume.skills.join(', ')}
					</div>
				)}
			</div>
		
			<InnerContainer>
				<header className="header row">
					<div className="col-7 basic-info">
						<Name>
							{resume.firstName || 'FirstName'} {resume.lastName || 'LastName'}
						</Name>
						<Role>{resume.job || 'Enter your job title'}</Role>
						<Summary>
							{resume.professionalSummary || resume.summary ||
								'Enter a powerful summary to describe your overall experience and skills.'}
						</Summary>
					</div>

					<div className="col-4 offset-1 contact-info" style={{ marginTop: '5px' }}>
						<Contact 
							text={`${resume.city || 'City'}, ${resume.state || 'State'}`}
							aria-label="Location"
						/>
						<Contact 
							text={resume.email || 'Your email'} 
							aria-label="Email"
						/>
						{resume.website ? <Contact text={resume.website} aria-label="Website" /> : null}
					</div>
				</header>

				<Wrapper>
					<div className="row">
						<section className="col-7 experiences">
							<SectionTitle>Work Experience</SectionTitle>
							<ExperiencesList>
								{resume.experiences && resume.experiences.length > 0 ? (
									resume.experiences.map((experience, index) => {
										return <Experience key={index} experience={experience} />;
									})
								) : (
									<NoContent>You haven't added any experience yet</NoContent>
								)}
							</ExperiencesList>
						</section>

						<section className="col-4 offset-1 skills">
							<SectionTitle>Skills</SectionTitle>
							<div>
								<Skills>
									{resume.skills && resume.skills.length > 0 ? (
										resume.skills.map((skill, index) => <Skill key={index} skill={skill} />)
									) : (
										<NoContent>You haven't added any skill yet</NoContent>
									)}
								</Skills>
							</div>
						</section>
					</div>
				</Wrapper>
			</InnerContainer>
		</ResumeContainer>
	);
};

export default Resume;

import { Wrapper, InnerWrapper } from '../Containers';
import { H1, StepIndicator } from '../Text';
import { FormGroup } from '../Form';
import { Button } from '../Button';
import { HomeLink } from '../Misc';

import { IoCloseOutline } from 'react-icons/io5';
import { BsArrowLeft } from 'react-icons/bs';

import ReactTagInput from '@pathofdev/react-tag-input';
import '@pathofdev/react-tag-input/build/index.css';

import './tags.css';
import JobDescriptionAnalyzer from '../AIAssist/JobDescriptionAnalyzer';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import TemplateSelector from '../TemplateSelector';
import ResumeTemplatePreview from '../resume/ResumeTemplatePreview';
import ATSOptimizer from '../AIAssist/ATSOptimizer';

const AISectionTitle = styled.h3`
	font-size: 18px;
	margin: 30px 0 15px;
	color: ${props => props.theme.primary.normal};
`;

const SectionTab = styled.button`
	padding: 10px 20px;
	background: none;
	border: none;
	cursor: pointer;
	font-size: 16px;
	font-weight: ${props => props.active ? 'bold' : 'normal'};
	color: ${props => props.active ? props.theme.primary.normal : '#666'};
	border-bottom: ${props => props.active ? `3px solid ${props.theme.primary.normal}` : 'none'};
	margin-bottom: -1px;
	
	&:hover {
		color: ${props => props.theme.primary.normal};
	}
`;

const FifthStep = (props) => {
	const [selectedTemplate, setSelectedTemplate] = useState(props.getState('templateId') || 'modern');
	const [previewScale, setPreviewScale] = useState(0.8);
	const [activeSection, setActiveSection] = useState('skills');
	
	useEffect(() => {
		if (props.setState) {
			props.setState('templateId', selectedTemplate);
		}
	}, [selectedTemplate, props]);
	
	const handleTemplateSelect = (templateId) => {
		setSelectedTemplate(templateId);
	};

	const onBTNClick = (e) => {
		e.preventDefault();
		props.next();
	};
	
	const handleAddKeyword = (keyword) => {
		// Add this keyword to skills if not already there
		const currentSkills = props.getState('skills') || [];
		if (!currentSkills.includes(keyword)) {
			const updatedSkills = [...currentSkills, keyword];
			props.setState('skills', updatedSkills);
		}
	};
	
	return (
		<Wrapper>
			<div>
				<InnerWrapper size="medium">
					<HomeLink to="/">
						<IoCloseOutline />
					</HomeLink>
					<div className="head">
						<StepIndicator style={{ marginBottom: '4px' }}>Step 5/5</StepIndicator>
						<H1>{props.getState('title') || 'Resume'}</H1>
					</div>

					<div className="body" style={{ marginTop: '50px' }}>
						<div onClick={(e) => e.stopPropagation()}>
							<div className="section-tabs">
								<SectionTab 
									active={activeSection === 'skills'} 
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setActiveSection('skills');
									}}
								>
									Skills
								</SectionTab>
								<SectionTab 
									active={activeSection === 'templates'} 
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setActiveSection('templates');
									}}
								>
									Template
								</SectionTab>
								<SectionTab 
									active={activeSection === 'ats'} 
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setActiveSection('ats');
									}}
								>
									ATS Optimization
								</SectionTab>
							</div>
							
							{activeSection === 'skills' && (
								<>
									<FormGroup>
										<div 
											className="react-tag-input" 
											onClick={(e) => e.stopPropagation()}
										>
											<ReactTagInput
												tags={props.getState('skills') || []}
												onChange={(newTags) => {
													if (Array.isArray(newTags)) {
														props.setState('skills', newTags);
													}
												}}
												placeholder="Type a skill and press enter"
												removeOnBackspace={true}
											/>
										</div>
									</FormGroup>
									
									<AISectionTitle>
										<span role="img" aria-label="AI">🧠</span> AI-Powered Skill Suggestions
									</AISectionTitle>
									<p>Paste a job description to get relevant skill suggestions that match what employers are looking for.</p>
									
									<JobDescriptionAnalyzer onSkillSelect={(skillList) => {
										if (Array.isArray(skillList)) {
											props.setState('skills', skillList);
										}
									}} />
								</>
							)}
							
							{activeSection === 'templates' && (
								<div className="template-selection-section">
									<h3>Select a Template</h3>
									<TemplateSelector 
										selectedTemplate={selectedTemplate}
										onTemplateSelect={handleTemplateSelect}
									/>
								</div>
							)}
							
							{activeSection === 'ats' && (
								<ATSOptimizer 
									resume={props.getState()} 
									onAddKeyword={handleAddKeyword}
								/>
							)}
							
							<div className="preview-section">
								<h3>Resume Preview</h3>
								<div className="preview-controls">
									<button 
										className="preview-scale-button"
										onClick={(e) => {
											e.preventDefault();
											setPreviewScale(prev => Math.min(prev + 0.1, 1));
										}}
									>
										Zoom In
									</button>
									<button 
										className="preview-scale-button"
										onClick={(e) => {
											e.preventDefault();
											setPreviewScale(prev => Math.max(prev - 0.1, 0.5));
										}}
									>
										Zoom Out
									</button>
								</div>
								<div className="resume-preview-wrapper">
									<ResumeTemplatePreview 
										resume={props.getState() || {}}
										templateId={selectedTemplate}
										scale={previewScale}
									/>
								</div>
							</div>

							<div style={{ textAlign: 'right', marginTop: '30px' }}>
								<Button
									variant="link"
									onClick={(e) => {
										e.preventDefault();
										props.prev();
									}}
								>
									<span>
										<BsArrowLeft />{' '}
									</span>Back
								</Button>
								<Button onClick={onBTNClick}>Finish</Button>
							</div>
						</div>
					</div>
				</InnerWrapper>
			</div>
		</Wrapper>
	);
};

export default FifthStep;

import { Wrapper, InnerWrapper } from '../Containers';
import { H1, StepIndicator } from '../Text';
import { FormGroup, Label, TextArea } from '../Form';
import { Button } from '../Button';
import { HomeLink } from '../Misc';
import React, { useState } from 'react';

import { IoCloseOutline } from 'react-icons/io5';
import { BsArrowLeft } from 'react-icons/bs';
import styled from 'styled-components';
import { suggestProfessionalSummary, improveWording } from '../../services/aiSuggestions';

const AISectionTitle = styled.h3`
	font-size: 18px;
	margin: 30px 0 15px;
	color: ${props => props.theme.primary.normal};
`;

const SuggestionCard = styled.div`
	background: white;
	border: 1px solid ${props => props.theme.gray.lighter};
	border-radius: 4px;
	padding: 15px;
	margin-bottom: 10px;
	cursor: pointer;
	transition: all 0.2s;
	
	&:hover {
		border-color: ${props => props.theme.primary.light};
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}
`;

const AIButton = styled.button`
	background-color: ${props => props.theme.primary.normal};
	color: white;
	border: none;
	border-radius: 4px;
	padding: 8px 16px;
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	transition: background-color 0.2s;
	margin-right: 10px;
	display: flex;
	align-items: center;
	
	&:hover {
		background-color: ${props => props.theme.primary.dark};
	}
	
	&:disabled {
		background-color: ${props => props.theme.gray.light};
		cursor: not-allowed;
	}
`;

const AIIcon = styled.span`
	margin-right: 8px;
	font-size: 16px;
`;

const SecondStep = (props) => {
	const [suggestion, setSuggestion] = useState('');
	const [isGenerating, setIsGenerating] = useState(false);
	const [showImprove, setShowImprove] = useState(false);
	
	const onBTNClick = (e) => {
		e.preventDefault();
		props.next();
	};
	
	const generateSuggestion = () => {
		setIsGenerating(true);
		setShowImprove(false);
		
		// Get job title from previous step
		const jobTitle = props.getState('job', '');
		
		// Generate a suggestion using the AI service
		setTimeout(() => {
			const summary = suggestProfessionalSummary(jobTitle, '');
			setSuggestion(summary);
			setIsGenerating(false);
		}, 800);
	};
	
	const applySuggestion = () => {
		props.setState('summary', suggestion);
		setSuggestion('');
	};
	
	const improveSummary = async () => {
		setIsGenerating(true);
		const currentSummary = props.getState('summary', '');
		
		if (currentSummary.trim()) {
			// Improve the current summary using the AI service
			try {
				const improved = await improveWording(currentSummary, 'summary');
				setSuggestion(improved);
				setShowImprove(true);
			} catch (error) {
				console.error('Error improving summary:', error);
			}
		}
		
		setIsGenerating(false);
	};

	return (
		<Wrapper>
			<div>
				<InnerWrapper size="medium">
					<HomeLink to="/">
						<IoCloseOutline />
					</HomeLink>
					<div className="head">
						<StepIndicator style={{ marginBottom: '4px' }}>Step 2/5</StepIndicator>
						<H1>{props.title}</H1>
					</div>

					<div className="body" style={{ marginTop: '50px' }}>
						<form>
							<FormGroup>
								<Label>Include 2-3 clear sentences about your overall experience</Label>
								<TextArea
									rows="8"
									name="summary"
									id="summary"
									value={props.getState('summary')}
									onChange={props.handleChange}
									placeholder="Describe your professional background, key strengths, and career goals..."
								/>
							</FormGroup>
							
							<div style={{ marginBottom: '20px', display: 'flex' }}>
								<AIButton 
									onClick={(e) => {
										e.preventDefault();
										generateSuggestion();
									}}
									disabled={isGenerating}
								>
									<AIIcon role="img" aria-label="AI">🧠</AIIcon>
									{isGenerating && !showImprove ? 'Generating...' : 'Generate AI Summary'}
								</AIButton>
								
								<AIButton 
									onClick={(e) => {
										e.preventDefault();
										improveSummary();
									}}
									disabled={isGenerating || !props.getState('summary')}
								>
									<AIIcon role="img" aria-label="Improve">✨</AIIcon>
									{isGenerating && showImprove ? 'Improving...' : 'Improve My Summary'}
								</AIButton>
							</div>
							
							{suggestion && (
								<div style={{ marginBottom: '20px' }}>
									<AISectionTitle>
										{showImprove ? 'Improved Version:' : 'AI-Generated Summary:'}
									</AISectionTitle>
									<SuggestionCard onClick={applySuggestion}>
										<p>{suggestion}</p>
										<div style={{ textAlign: 'right', fontSize: '12px', marginTop: '10px', color: '#666' }}>
											Click to apply this suggestion
										</div>
									</SuggestionCard>
								</div>
							)}

							<div style={{ textAlign: 'right' }}>
								<Button
									variant="link"
									onClick={(e) => {
										e.preventDefault();
										props.prev();
									}}
								>
									<BsArrowLeft /> Back
								</Button>
								<Button onClick={onBTNClick}>Next step</Button>
							</div>
						</form>
					</div>
				</InnerWrapper>
			</div>
		</Wrapper>
	);
};

export default SecondStep;

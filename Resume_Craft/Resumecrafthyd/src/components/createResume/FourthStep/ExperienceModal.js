import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { FormGroup, Label, Input, TextArea } from '../../Form';
import { Button } from '../../Button';
import { H2 } from '../../Text';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import './modal.css';
import { suggestAchievements } from '../../../services/aiSuggestions';

const ModalContent = styled.div`margin-top: 35px;`;

const Row = styled.div`display: flex;`;

const SmallFormGroup = styled(FormGroup)`
	margin-bottom: 30px;
`;

const SmallLabel = styled(Label)`
	font-size: 16px;
`;
const SmallInput = styled(Input)`
	padding: 14px 15px;
`;

const AISectionTitle = styled.h3`
  font-size: 18px;
  margin: 15px 0;
  color: ${props => props.theme.primary.normal};
  display: flex;
  align-items: center;
`;

const AIIcon = styled.span`
  margin-right: 10px;
  font-size: 18px;
`;

const SuggestionCard = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.gray.lighter};
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  z-index: 1;
  
  &:hover {
    border-color: ${props => props.theme.primary.light};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    background-color: #f9f9f9;
  }
  
  &:active {
    background-color: #f0f0f0;
    transform: translateY(1px);
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

const ExperienceModal = (props) => {
	const [ formState, setFormState ] = useState({
		title: '',
		employer: '',
		startDate: null,
		endDate: null,
		description: '',
		current: false
	});
	
	const [suggestions, setSuggestions] = useState([]);
	const [isGenerating, setIsGenerating] = useState(false);

	const handleChange = (e) => {
		if (e.target.type === 'checkbox') {
			setFormState({
				...formState,
				[e.target.name]: e.target.checked
			});
		} else {
			setFormState({
				...formState,
				[e.target.name]: e.target.value
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const { title, employer, startDate, endDate, description } = formState;

		props.setState('experiences', [
			...props.getState('experiences', []),
			{
				title,
				employer,
				startDate,
				endDate,
				description
			}
		]);

		// close the modal
		props.onClose();

		// Reset the form
		setFormState({
			title: '',
			employer: '',
			startDate: null,
			endDate: null,
			description: '',
			current: false
		});
		
		// Clear suggestions
		setSuggestions([]);
	};
	
	const generateAchievements = (e) => {
	  if (e) e.preventDefault();
	  if (!formState.title) return;
	  
	  setIsGenerating(true);
	  
	  // Generate achievement suggestions using the AI service
	  setTimeout(() => {
	    const achievementSuggestions = suggestAchievements(formState.title);
	    setSuggestions(achievementSuggestions);
	    setIsGenerating(false);
	  }, 800);
	};
	
	const applySuggestion = (suggestion, index) => {
	  const currentDescription = formState.description || '';
	  const newDescription = currentDescription 
	    ? `${currentDescription}\n\n• ${suggestion}`
	    : `• ${suggestion}`;
	  
	  setFormState({
	    ...formState,
	    description: newDescription
	  });
	  
	  // Optional: Provide visual feedback that the suggestion was applied
	  const element = document.querySelector(`[data-suggestion-index="${index}"]`);
	  if (element) {
	    // Temporarily change background color to indicate selection
	    const originalBackground = element.style.backgroundColor;
	    element.style.backgroundColor = '#e6f7e6';
	    
	    setTimeout(() => {
	      element.style.backgroundColor = originalBackground;
	    }, 500);
	  }
	};

	useEffect(() => {
		// Only update if current changed and is true
		if (formState.current) {
			setFormState(prevState => ({
				...prevState,
				endDate: 'Present'
			}));
		}
		// The dependency here is just formState.current, which is fine
	}, [formState.current]);

	return (
		<Modal open={props.open} onClose={props.onClose} closeOnOverlayClick={false} center>
			<H2>Work experience</H2>
			<ModalContent>
				<form onSubmit={handleSubmit}>
					<Row>
						<SmallFormGroup style={{ marginRight: '20px', flex: 1 }}>
							<SmallLabel>Job title</SmallLabel>
							<SmallInput
								type="text"
								placeholder="Job title"
								name="title"
								value={formState.title}
								onChange={handleChange}
							/>
						</SmallFormGroup>

						<SmallFormGroup style={{ flex: 1 }}>
							<SmallLabel>Employer</SmallLabel>
							<SmallInput
								placeholder="Enter the employer name"
								name="employer"
								value={formState.employer}
								onChange={handleChange}
							/>
						</SmallFormGroup>
					</Row>

					<Row>
						<SmallFormGroup style={{ marginRight: '20px', flex: 1 }}>
							<SmallLabel>Start date</SmallLabel>
							<SmallInput
								type="date"
								placeholder="Start date"
								name="startDate"
								value={formState.startDate}
								onChange={handleChange}
							/>
						</SmallFormGroup>

						<SmallFormGroup style={{ flex: 1 }}>
							<SmallLabel>End date</SmallLabel>
							<SmallInput
								type={formState.current ? 'text' : 'date'}
								placeholder="End date"
								name="endDate"
								value={formState.endDate}
								onChange={handleChange}
								disabled={formState.current}
							/>
						</SmallFormGroup>
					</Row>

					<SmallFormGroup>
						<SmallLabel>
							I currently work here{' '}
							<input
								name="current"
								type="checkbox"
								checked={formState.current}
								onChange={handleChange}
							/>{' '}
						</SmallLabel>
					</SmallFormGroup>

					<SmallFormGroup>
						<SmallLabel>Job description</SmallLabel>
						<TextArea
							rows="5"
							placeholder="Description of what you did at the job"
							name="description"
							value={formState.description}
							onChange={handleChange}
						/>
					</SmallFormGroup>
					
					<div style={{ marginBottom: '20px' }}>
					  <AIButton 
					    type="button"
					    onClick={generateAchievements}
					    disabled={isGenerating || !formState.title}
					  >
					    <AIIcon role="img" aria-label="AI">🧠</AIIcon>
					    {isGenerating ? 'Generating...' : 'Suggest Achievements'}
					  </AIButton>
					</div>
					
					{suggestions.length > 0 && (
					  <div style={{ marginBottom: '20px' }}>
					    <AISectionTitle>
					      <AIIcon role="img" aria-label="Achievements">🏆</AIIcon>
					      Achievement Suggestions
					    </AISectionTitle>
					    <p style={{ marginBottom: '10px', fontSize: '14px' }}>
					      Click on any suggestion to add it to your job description:
					    </p>
					    {suggestions.map((suggestion, index) => (
					      <SuggestionCard 
					        key={index} 
					        onClick={(e) => {
					          e.preventDefault();
					          applySuggestion(suggestion, index);
					        }}
					        role="button"
					        tabIndex={0}
					        aria-label={`Apply suggestion: ${suggestion}`}
					        data-suggestion-index={index}
					      >
					        <p>• {suggestion}</p>
					      </SuggestionCard>
					    ))}
					  </div>
					)}

					<div style={{ textAlign: 'right' }}>
						<Button type="submit">Submit</Button>
					</div>
				</form>
			</ModalContent>
		</Modal>
	);
};

export default ExperienceModal;

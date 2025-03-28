import { Steps, Step } from 'react-step-builder';

import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import FourthStep from './FourthStep';
import FifthStep from './FifthStep';

import Final from './Final';

import Layout from './Layout';
import AccessibleStep from './AccessibleStep';
import React from 'react';

// Helper function to make a step accessible with text-to-speech
const makeStepAccessible = (StepComponent, title, description) => {
	return (props) => (
		<AccessibleStep stepTitle={title} stepDescription={description}>
			<StepComponent {...props} />
		</AccessibleStep>
	);
};

// We don't wrap FirstStep because it's already wrapped in its own component
const AccessibleSecondStep = makeStepAccessible(
	SecondStep,
	"Step 2: Professional Summary",
	"Write a brief professional summary highlighting your experience and skills."
);

const AccessibleThirdStep = makeStepAccessible(
	ThirdStep,
	"Step 3: Contact Information",
	"Add your contact details such as email, phone number, and location."
);

const AccessibleFourthStep = makeStepAccessible(
	FourthStep,
	"Step 4: Work Experience",
	"Add your work history including job titles, companies, and achievements."
);

const AccessibleFifthStep = makeStepAccessible(
	FifthStep,
	"Step 5: Skills",
	"List your professional skills and competencies."
);

const AccessibleFinal = makeStepAccessible(
	Final,
	"Preview Your Resume",
	"Review your complete resume and make any final adjustments before downloading."
);

const Index = () => {
	return (
		<Steps>
			<Step title="Enter your basic information" component={FirstStep} />
			<Step title="Professional Summary" component={AccessibleSecondStep} />
			<Step title="Contact information" component={AccessibleThirdStep} />
			<Step title="Your work experience" component={AccessibleFourthStep} />
			<Step title="Skills" component={AccessibleFifthStep} />

			<Step title="Preview your resume" component={AccessibleFinal} />
			<Step title="Testing" component={Layout} />
		</Steps>
	);
};

export default Index;

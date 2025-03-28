import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import theme from './theme';

// Components
import Home from './components/Home';
import CreateResume from './components/createResume';

import React, { useEffect } from 'react';
import './App.css'; // Import CSS here if needed

import './Hcontrast.css'; // Import CSS here if needed

import Hcontrast from './Hcontrast'; // Import Hcontrast component
import { TextToSpeechProvider, useTextToSpeech } from './contexts/TextToSpeechContext';
import { HighContrastProvider } from './contexts/HighContrastContext';

const App = () => {
	return (
	  <ThemeProvider theme={theme}>
	    <HighContrastProvider>
		  <TextToSpeechProvider>
		    <Router>
		      <AppWrapper>
			    <Switch>
			      <Route path="/create" component={CreateResumeWithAccessibility} />
			      <Route exact path="/" component={HomeWithAccessibility} />
			    </Switch>
		      </AppWrapper>
		    </Router>
		  </TextToSpeechProvider>
		</HighContrastProvider>
	  </ThemeProvider>
	);
};

// Wrapper component to hold global UI elements
const AppWrapper = ({ children }) => {
  return (
    <div className="app-container">
      <div className="accessibility-controls">
        <Hcontrast />
      </div>
      {children}
    </div>
  );
};
  
// Create a new component that wraps the Home component with accessibility features
const HomeWithAccessibility = () => {
	const { updatePageText } = useTextToSpeech();
	const homeText = "This is a tool that helps you to create a resume that you can download in PDF format, you can get started by clicking the button below.";
	
	useEffect(() => {
	  updatePageText(homeText);
	}, [updatePageText]);
	
	return (
	  <div className="App">
		<header className="App-header">
		  {homeText}
		  
		  {/* Your Home component */}
		  <Home />
		</header>
	  </div>
	);
};

// Create a component that wraps the CreateResume component with accessibility features
const CreateResumeWithAccessibility = () => {
	const { updatePageText } = useTextToSpeech();
	const createResumeText = "Create your professional resume by following the steps below. Fill in each section with your information.";
	
	useEffect(() => {
	  updatePageText(createResumeText);
	}, [updatePageText]);
	
	return (
	  <div className="App">
		<CreateResume />
	  </div>
	);
};
  
export default App;

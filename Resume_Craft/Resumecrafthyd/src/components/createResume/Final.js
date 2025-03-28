import styled from 'styled-components';
import { Wrapper, InnerWrapper } from '../Containers';
import { H1 } from '../Text';
import { Button } from '../Button';
import { HomeLink } from '../Misc';
import { IoCloseOutline } from 'react-icons/io5';
import { BsArrowLeft, BsFileText, BsFileEarmark } from 'react-icons/bs';

import Resume from '../resume';
import { analyzeATSFriendliness } from '../../services/atsOptimization';

// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';

import { PDFExport } from '@progress/kendo-react-pdf';
import React, { useEffect, useState } from 'react';

const Body = styled.div`margin-top: 50px;`;

// const Circle = styled.div`
// 	width: 47px;
// 	height: 47px;
// 	border-radius: 50%;
// 	display: inline-block;
// 	margin-right: 20px;
// `;

// const PurpleCircle = styled(Circle)`
// 	background: ${(props) => props.theme.primary.normal}
// `;

// const BlueCircle = styled(Circle)`
// 	background: #1E64F1;
// `;

// const GreenCircle = styled(Circle)`
// 	background: #5DD57E;
// `;

// const RedCircle = styled(Circle)`
// 	background: #DF2935;
// `;

const ToolsContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
`;

const ActionsContainer = styled.div`
	display: flex;
	gap: 10px;
`;

const ResumeWrapper = styled.div`
	margin-top: 30px;
	overflow-x: auto;
	background: ${props => props.theme.gray.lightest};
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const DownloadOptions = styled.div`
	display: flex;
	gap: 10px;
	margin-top: 15px;
`;

const DownloadButton = styled(Button)`
	display: flex;
	align-items: center;
	gap: 8px;
`;

const FormatIcon = styled.div`
	display: flex;
	align-items: center;
	font-size: 18px;
`;

const ATSScoreContainer = styled.div`
	display: flex;
	align-items: center;
	background: #f9f9ff;
	padding: 15px;
	border-radius: 8px;
	margin-bottom: 20px;
	border: 1px solid #e0e0ff;
`;

const ScoreCircle = styled.div`
	width: 60px;
	height: 60px;
	border-radius: 50%;
	background-color: ${props => {
		if (props.score >= 80) return '#5DD57E';
		if (props.score >= 60) return '#FFA500';
		return '#FF6B6B';
	}};
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 22px;
	font-weight: bold;
	margin-right: 15px;
`;

const ScoreInfo = styled.div`
	flex: 1;
	
	h4 {
		margin: 0 0 5px 0;
		color: #333;
	}
	
	p {
		margin: 0;
		color: #666;
		font-size: 14px;
	}
`;

const IssuesList = styled.div`
	margin-top: 15px;
`;

const Issue = styled.div`
	padding: 12px;
	margin-bottom: 10px;
	background: white;
	border-left: 4px solid ${props => {
		switch(props.severity) {
			case 'high': return '#FF6B6B';
			case 'medium': return '#FFA500';
			default: return '#5DD57E';
		}
	}};
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
	
	h5 {
		margin: 0 0 5px 0;
		color: #333;
	}
	
	p {
		margin: 0;
		color: #666;
	}
`;

const Final = (props) => {
	let resume = null;
	const [atsAnalysis, setAtsAnalysis] = useState(null);
	
	useEffect(() => {
		if (props.state) {
			const result = analyzeATSFriendliness(props.state);
			setAtsAnalysis(result);
		}
	}, [props.state]);
	
	const downloadPDF = () => {
		if (resume) {
			resume.save();
		}
	};
	
	const downloadDOCX = () => {
		// In a real implementation, you'd use a library like docx.js
		// to generate a real DOCX file. This is a simplified mock.
		alert('DOCX download feature would be implemented here using docx.js library');
		
		// Pseudo-code for DOCX generation:
		// 1. Convert resume data to DOCX format
		// 2. Create blob and download
		// const blob = new Blob([docxContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
		// const link = document.createElement('a');
		// link.href = URL.createObjectURL(blob);
		// link.download = 'my_resume.docx';
		// link.click();
	};
	
	return (
		<Wrapper>
			<InnerWrapper>
				<HomeLink to="/">
					<IoCloseOutline />
				</HomeLink>
				<div className="head">
					<H1>{props.title || 'Preview Your Resume'}</H1>
				</div>

				<Body>
					{atsAnalysis && (
						<ATSScoreContainer>
							<ScoreCircle score={atsAnalysis.overallScore}>
								{atsAnalysis.overallScore}%
							</ScoreCircle>
							<ScoreInfo>
								<h4>ATS Compatibility Score</h4>
								<p>
									This score indicates how well your resume will perform with Applicant Tracking Systems.
									{atsAnalysis.overallScore >= 80 ? ' Your resume is well-optimized for ATS systems!' :
									 atsAnalysis.overallScore >= 60 ? ' Your resume has good ATS compatibility but could be improved.' :
									 ' Your resume may have issues with ATS systems. See suggestions below.'}
								</p>
								
								{atsAnalysis.issues.length > 0 && (
									<IssuesList>
										{atsAnalysis.issues.map((issue, index) => (
											<Issue key={index} severity={issue.severity}>
												<h5>{issue.message}</h5>
												<p>{issue.solution}</p>
											</Issue>
										))}
									</IssuesList>
								)}
							</ScoreInfo>
						</ATSScoreContainer>
					)}
					
					<ToolsContainer>
						<Button
							variant="link"
							onClick={(e) => {
								e.preventDefault();
								props.prev();
							}}
						>
							<BsArrowLeft /> Back to Edit
						</Button>
						
						<ActionsContainer>
							<DownloadButton onClick={downloadPDF}>
								<FormatIcon><BsFileText /></FormatIcon>
								Download as PDF
							</DownloadButton>
							<DownloadButton onClick={downloadDOCX}>
								<FormatIcon><BsFileEarmark /></FormatIcon>
								Download as DOCX
							</DownloadButton>
						</ActionsContainer>
					</ToolsContainer>

					<ResumeWrapper>
						<PDFExport 
							fileName={`${props.state?.firstName || 'my'}_${props.state?.lastName || ''}_resume.pdf`}
							title="Resume" 
							subject="Job Application" 
							keywords="resume, cv, job application"
							ref={(r) => (resume = r)}
							paperSize="Letter"
							scale={0.8}
							margin="20pt"
						>
							<Resume resume={props.state} />
						</PDFExport>
					</ResumeWrapper>
					
					<p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
						📝 <strong>ATS Tip:</strong> When uploading your resume to job sites or applying through company portals, 
						use the PDF format for best results with Applicant Tracking Systems.
					</p>
				</Body>
			</InnerWrapper>
		</Wrapper>
	);
};

export default Final;

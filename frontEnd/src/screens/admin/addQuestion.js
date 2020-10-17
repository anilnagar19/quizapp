import axios from 'axios';
import React, { useEffect } from 'react';
import Step from '@material-ui/core/Step';
import Paper from '@material-ui/core/Paper';
import { useLocation } from "react-router-dom";
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import StepContent from '@material-ui/core/StepContent';
import AddQuestionForm from './components/addQuestionForm';

let questionArray = [];

function getSteps(noOfQuestion) {
	let stepLabels = [];

	for (let i = 1; i <= noOfQuestion; i++) {
		stepLabels.push('Question ' + i);
	}
	return stepLabels;
}

function getOptions(questionData) {
	let options = {};
	Object.entries(questionData).forEach(([key, value]) => {
		if (key !== 'question' && key !== 'correctOption') {
			options[key] = value;
		}
	});
	return options;
}

const AddQuestion = () => {
	const classes = useStyles();
	const location = useLocation();
	const [quizId, setQuizId] = React.useState();
	const [activeStep, setActiveStep] = React.useState(0);
	const [noOfQuestion, setNoOfQuestion] = React.useState();

	useEffect(() => {
		setQuizId(location.state.quizId);
		setNoOfQuestion(location.state.noOfQuestion);
	}, [location]);

	const steps = getSteps(noOfQuestion);

	const onStepChange = (questionData) => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);

		let options = getOptions(questionData[0]);

		questionArray.push({
			quizID: quizId,
			options: options,
			question: questionData[0].question,
			correctOption: questionData[0].correctOption,
		});

		if (activeStep === steps.length - 1) {

			axios.post('http://localhost:8000/quiz/addQuestions', { questionArray: questionArray })
				.then(function (response) {
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});
		}

	};

	return (
		<div className={classes.root}>
			<Stepper activeStep={activeStep} orientation="vertical">
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
						<StepContent>
							<AddQuestionForm
								onChangeValue={onStepChange}
								totalSteps={steps.length}
								activeStep={activeStep}></AddQuestionForm>
						</StepContent>
					</Step>
				))}

			</Stepper>
			{activeStep === steps.length && (
				<Paper square elevation={0} className={classes.resetContainer}>
					<Typography>All steps completed - you&apos;re finished</Typography>
				</Paper>
			)}
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
}));


export default AddQuestion;
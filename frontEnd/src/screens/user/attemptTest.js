import axios from 'axios';
import React, { useEffect } from 'react';
import Step from '@material-ui/core/Step';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import StepContent from '@material-ui/core/StepContent';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import ShowQuestion from './components/showQuestion';

let count = 0;
let userAnswersArray = [];

function AttemptTest() {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();
	const [name, setName] = React.useState();
	const [contact, setContact] = React.useState();
	const [isLoading, setIsLoading] = React.useState();
	const [questions, setQuestions] = React.useState([]);
	const [activeStep, setActiveStep] = React.useState(0);
	const [correctAnswerCount, setCorrectAnswerCount] = React.useState(0);

	useEffect(() => {
		getQuestions(location.state.quizId);
	}, [location]);

	const getQuestions = (quizId) => {
		setIsLoading(true);

		axios.get('http://localhost:8000/quiz/getQuestions/' + quizId)
			.then(function (response) {
				setIsLoading(false);
				setQuestions(response.data);
			})
			.catch(function (error) {
				console.log(error);
			})
			.then(function () {
				// always executed
			});
	}

	const onStepChange = (selectedOption) => {
		if (questions[activeStep].correctoption === parseInt(selectedOption)) {
			count = count + 1;
			setCorrectAnswerCount(count)
		}

		userAnswersArray.push(selectedOption);
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const submitTest = () => {

		let data = {
			name: name,
			contact: contact,
			quizid: location.state.quizId,
			answers: JSON.stringify(userAnswersArray),
		}

		axios.post('http://localhost:8000/quiz/createUser', data)
			.then(function () {
				history.push({
					pathname: '/user'
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	if (isLoading) {
		return (
			<div>Loading</div>
		)
	}
	return (
		<div className={classes.root}>

			{questions && questions.length ? (
				<Paper>
					<Stepper activeStep={activeStep} orientation="vertical">
						{questions && questions.map((question, index) => (
							<Step key={index}>
								<StepLabel>Question : {index + 1}</StepLabel>
								<StepContent>
									<ShowQuestion
										onChangeValue={onStepChange}
										totalSteps={questions.length}
										activeStep={activeStep}
										questionData={question} />
								</StepContent>
							</Step>

						))}
					</Stepper>
				</Paper>

			) : (

					<Typography className={classes.nodata} variant="h5" component="h2">NO Question Found</Typography>

				)}

			{activeStep === questions.length && questions.length ? (
				<Paper>


					<Grid container spacing={3}>
						<Grid item xs={12}>
							<div className={classes.userForm} >
								<Typography variant="h5" component="h2">Quiz completed</Typography>
								<Typography variant="h5" component="h2">Correct Answers - {correctAnswerCount}</Typography>
								<Grid container spacing={3} >
									<Grid item xs={12} md={6}>
										<TextField onChange={e => setName(e.target.value)} fullWidth id="outlined-basic"
											label="Enter Name here" variant="outlined" />
									</Grid>
									<Grid item xs={12} md={6} lg={6}>
										<TextField InputProps={{ inputProps: { min: 10, max: 10 } }} type="number" onChange={e => setContact(e.target.value)} fullWidth id="outlined-basic" label="Enter Mobile Number" variant="outlined" />
									</Grid>
								</Grid>
								<Button
									disabled={!name || !contact}
									className={classes.actionBtn}
									variant="contained"
									color="primary"
									onClick={submitTest}
								>Submit	</Button>
							</div>
						</Grid>
					</Grid>
				</Paper>
			) : null}
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
	userForm: {
		padding: '24px'
	},
	actionBtn: {
		marginTop: 10
	},
	nodata: {
		textAlign: 'center',
		color: '#fff',
		minHeight: '100px',
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
		fontSize: '2em',
		cursor: 'pointer',
		height: '80vh'
	}
}));

export default AttemptTest;
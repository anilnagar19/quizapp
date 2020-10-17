import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

function AddQuestionForm(props) {
	const classes = useStyles();

	const [option1, setOption1] = useState('');
	const [option2, setOption2] = useState('');
	const [option3, setOption3] = useState('');
	const [option4, setOption4] = useState('');
	const [question, setQuestion] = useState('');
	const [correctOption, setCorrectOption] = useState('');

	const handleNext = () => {
		let questionData = [];

		questionData.push({
			option1: option1,
			option2: option2,
			option3: option3,
			option4: option4,
			question: question,
			correctOption: correctOption,
		});

		props.onChangeValue(questionData);
	};

	return (
		<div>
			<form noValidate autoComplete="off" className={classes.form}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TextField onChange={e => setQuestion(e.target.value)} fullWidth className={classes.margin} id="standard-multiline-flexible" multiline
							rows={4} label="Enter question here" variant="outlined" />
					</Grid>
					<Grid item xs={12} md={6} lg={6}>
						<TextField onChange={e => setOption1(e.target.value)} fullWidth className={classes.margin} id="outlined-basic" label="Option 1" variant="outlined" />
					</Grid>
					<Grid item xs={12} md={6} lg={6}>
						<TextField onChange={e => setOption2(e.target.value)} fullWidth className={classes.margin} id="outlined-basic" label="Option 2" variant="outlined" />
					</Grid>
					<Grid item xs={12} md={6} lg={6}>
						<TextField onChange={e => setOption3(e.target.value)} fullWidth className={classes.margin} id="outlined-basic" label="Option 3" variant="outlined" />
					</Grid>
					<Grid item xs={12} md={6} lg={6}>
						<TextField onChange={e => setOption4(e.target.value)} fullWidth className={classes.margin} id="outlined-basic" label="Option 4" variant="outlined" />
					</Grid>
					<Grid item xs={12} md={6} lg={6}>
						<TextField onChange={e => setCorrectOption(e.target.value = Math.max(0, parseInt(e.target.value) <= 4 && parseInt(e.target.value) > 0 ? parseInt(e.target.value) : setCorrectOption(null)))} fullWidth className={classes.margin} id="outlined-basic"
							type="number" label="Correct Option Number" variant="outlined" />
					</Grid>
				</Grid>
				<Button
					variant="contained"
					color="primary"
					onClick={handleNext}
					className={classes.button}
					disabled={!option1 || !option2 || !option3 || !option4 || !question || !correctOption}
				>
					{props.activeStep === props.totalSteps - 1 ? 'Finish' : 'Next'}
				</Button>
			</form>
		</div >
	);
}


const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	margin: {
		marginBottom: theme.spacing(1)
	},
	withoutLabel: {
		marginTop: theme.spacing(3),
	},
	textField: {
		width: '25ch',
	},
	form: {
		width: '100%'
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		height: 50,
		paddingLeft: theme.spacing(4),
	}
}));
export default AddQuestionForm;
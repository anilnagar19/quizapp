import 'date-fns';
import React from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { CardHeader, Divider, Typography } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';

function AddQuiz() {
	const classes = useStyles();
	const [quizName, setQuizName] = React.useState('');
	const [successMsg, setSuccessMsg] = React.useState('');
	const [numberOfQuestion, setNumberOfQuestion] = React.useState('');
	const [endDate, setEndDate] = React.useState(new Date('2014-08-18T21:11:54'));
	const [startDate, setStartdDate] = React.useState(new Date('2014-08-18T21:11:54'));

	const addNewQuiz = () => {
		let data = {
			name: quizName,
			endDate: endDate,
			startDate: startDate,
			numberofquestion: parseInt(numberOfQuestion),
		}
		setSuccessMsg('Loading');

		axios.post('http://localhost:8000/quiz/createQuiz', data)
			.then(function (response) {
				setQuizName('');
				setNumberOfQuestion('');
				setSuccessMsg('Quiz Added');
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	return (
		<div>
			<Card>
				<CardHeader
					title="Create New Quiz"
				/>
				<Divider></Divider>
				<form autoComplete="off" >
					<CardContent>
						<Grid container spacing={2}>
							<Grid container xs={12} md={12} lg={12} spacing={2}>
								<Grid item xs={12} md={6} lg={6}>
									<TextField value={quizName} onChange={e => setQuizName(e.target.value)} fullWidth className={classes.margin} id="outlined-basic" label="Quiz Name" variant="outlined" />
								</Grid>
								<Grid item xs={12} md={6} lg={6}>
									<TextField value={numberOfQuestion} type="number" onChange={e => setNumberOfQuestion(e.target.value)} fullWidth className={classes.margin} id="outlined-basic" label="Number Of Questions" variant="outlined" />
								</Grid>
							</Grid>

							<Grid item xs={12} md={6} lg={6}>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker fullWidth
										disableToolbar
										variant="inline"
										format="MM/dd/yyyy"
										margin="normal"
										id="date-picker-inline"
										label="Start Date"
										value={startDate}
										onChange={e => setStartdDate(e)}
										KeyboardButtonProps={{
											'aria-label': 'change date',
										}}
									/>
								</MuiPickersUtilsProvider>
							</Grid>

							<Grid item xs={12} md={6} lg={6}>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker fullWidth
										disableToolbar
										variant="inline"
										format="MM/dd/yyyy"
										margin="normal"
										id="date-picker-inline"
										label="Expiry Date"
										value={endDate}
										onChange={e => setEndDate(e)}
										KeyboardButtonProps={{
											'aria-label': 'change date',
										}}
									/>
								</MuiPickersUtilsProvider>
							</Grid>
						</Grid>
					</CardContent>
					<CardActions>

						<Button disabled={!quizName || !numberOfQuestion} variant="contained" color="primary" onClick={addNewQuiz}>Add</Button>
						<Typography>{successMsg}</Typography>
					</CardActions>
				</form>
			</Card>
		</div >
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	margin: {
		margin: theme.spacing(1)
	},
	withoutLabel: {
		marginTop: theme.spacing(3),
	},
}));

export default AddQuiz;
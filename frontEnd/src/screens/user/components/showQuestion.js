import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function ShowQuestion(props) {
	const classes = useStyles();
	const [value, setValue] = React.useState('');
	const [options, setOptions] = React.useState([]);

	useEffect(() => {
		let optionsList = JSON.parse(props.questionData.options)
		setOptions([optionsList]);
	}, []);

	const handleNext = () => {
		props.onChangeValue(value);
	};

	return (
		<div>
			<Typography variant="h5" component="h2">{props.questionData.question} </Typography>
			<div className={classes.options}>
				<RadioGroup onChange={ev => setValue(ev.target.value)} value={value}>
					{options && options.map((option, index) => (
						<div key={index}>
							<Grid container spacing={3}>
								<Grid item xs={12} md={6} lg={6} >
									<Card className={classes.root} variant="outlined" >
										<CardContent className={classes.optionCard}>
											<FormControlLabel value='1' control={<Radio />} label={option.option1} />
										</CardContent>
									</Card>
								</Grid>
								<Grid item xs={12} md={6} lg={6}>
									<Card className={classes.root} variant="outlined">
										<CardContent className={classes.optionCard}>
											<FormControlLabel value='2' control={<Radio />} label={option.option2} />
										</CardContent>
									</Card>
								</Grid>
								<Grid item xs={12} md={6} lg={6}>
									<Card className={classes.root} variant="outlined">
										<CardContent className={classes.optionCard}>
											<FormControlLabel value='3' control={<Radio />} label={option.option3} />
										</CardContent>
									</Card>
								</Grid>
								<Grid item xs={12} md={6} lg={6}>
									<Card className={classes.root} variant="outlined">
										<CardContent className={classes.optionCard}>
											<FormControlLabel value='4' control={<Radio />} label={option.option4} />
										</CardContent>
									</Card>
								</Grid>
							</Grid>
						</div>
					))}
				</RadioGroup>
			</div>

			<div>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Button
							disabled={!value}
							variant="contained"
							color="primary"
							onClick={handleNext}
						>
							{props.activeStep === props.totalSteps - 1 ? 'Finish' : 'Next'}
						</Button>
					</Grid>
				</Grid>

			</div>
		</div >
	);
}

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 16,
	},
	optionCard: {
		paddingBottom: '12px !important',
		padding: 12,
	},
	options: {
		margin: '30px 0'
	}
});

export default ShowQuestion;
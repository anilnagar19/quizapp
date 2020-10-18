
import React from 'react';
import Grid from '@material-ui/core/Grid';

import { Switch, Route } from "react-router-dom";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import ListQuiz from './listQuiz';
import AttemptTest from './attemptTest';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
	},
	card: {
		textAlign: 'center'
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	}
}));

export default function UserDashboard() {
	const classes = useStyles();
	return (
		<div>
			<Container maxWidth="lg" className={classes.container}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={12} lg={12}>
						<Switch>
							<Route path="/user" component={ListQuiz} exact />
							<Route path="/user/listQuiz" component={ListQuiz} />
							<Route path="/user/takeTest" component={AttemptTest} />
						</Switch>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

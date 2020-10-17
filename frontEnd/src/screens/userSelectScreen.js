import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import pickColor from '../utils/utils';

function MainScreen(props) {
	const classes = useStyles();
	const history = useHistory();

	const goToDashboard = (user) => {
		history.push({
			pathname: '/' + user
		});
	}

	return (
		<div className={classes.root}>
			<Grid spacing={3}
				container
				direction="row"
				justify="center"
				alignItems="center"
				className={classes.container}
			>
				<Grid className={classes.userCard} item xs={6} sm={6} md={3} onClick={() => goToDashboard('user')} >
					<Paper className={classes.paper} style={{ background: pickColor() }} >USER</Paper>
				</Grid>
				<Grid className={classes.userCard} item xs={6} sm={6} md={3} onClick={() => goToDashboard('admin')}>
					<Paper className={classes.paper} style={{ background: pickColor() }} >ADMIN</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: '#fff',
		minHeight: '100px',
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
		fontSize: '2em',
		cursor: 'pointer'
	},
	container: {
		height: '100vh'
	},
	userCard: {

	}
}));

export default MainScreen;
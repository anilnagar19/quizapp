import axios from 'axios';
import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import pickColor from '../../utils/utils';

function ListQuiz() {
	const classes = useStyles();
	const history = useHistory();
	const [quizList, setQuizList] = React.useState([]);

	useEffect(() => {
		getQuizList();
	}, []);

	async function getQuizList() {
		try {
			const response = await axios.get('http://localhost:8000/quiz/');
			setQuizList(response.data)
		} catch (error) {
			console.error(error);
		}
	}

	const attemptTest = (quizId) => {
		history.push({
			pathname: '/user/takeTest',
			state: {
				quizId: quizId,
			}
		});
	}

	return (
		<div>
			<Grid container spacing={2}>
				{quizList.map((row) => (
					<Grid item xs={12} md={3} lg={3} key={row.id}>
						<Card className={classes.card} style={{ background: pickColor() }} onClick={() => attemptTest(row.id)}>
							<CardActionArea>
								<CardContent>
									<Typography variant="h5" component="h2">
										{row.name} </Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				))}
			</Grid>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
	},
	card: {
		display: 'flex',
		minHeight: '100px',
		textAlign: 'center',
		background: '#242e3c',
		fontSize: '2em',
		cursor: 'pointer',
		color: '#fff'
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	}
}));

export default ListQuiz;
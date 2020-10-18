import axios from 'axios';
import moment from 'moment';
import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import { useHistory } from 'react-router-dom';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';

export default function QuizList() {
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

	const goToAddQuestion = (quizData) => {
		history.push({
			pathname: '/admin/addQuestion',
			state: {
				quizId: quizData.id,
				noOfQuestion: quizData.numberofquestion
			}
		});
	}

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow >
						<TableCell>Name</TableCell>
						<TableCell align="right">#Question</TableCell>
						<TableCell align="right">Start Date</TableCell>
						<TableCell align="right">Expiry</TableCell>
						<TableCell align="right"></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{quizList.map((row) => (
						<TableRow key={row.id} >
							<TableCell component="th" scope="row">{row.name}</TableCell>
							<TableCell align="right">{row.numberofquestion}</TableCell>
							<TableCell align="right">{moment(row.startDate, 'x').format("DD MMM YYYY")} </TableCell>
							<TableCell align="right">{moment(row.endDate, 'x').format("DD MMM YYYY")}</TableCell>
							<TableCell align="right">
								<Button
									variant="contained"
									color="primary"
									onClick={() => goToAddQuestion(row)}>add</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

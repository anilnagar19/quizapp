import questions from '../models/questions.js';
import quizMaster from '../models/quizMaster.js';
import userDetail from '../models/userDetail.js';

export const createQuiz = (req, res) => {
	// Save Quiz in the database
	// Create a Quiz
	const quizData = {
		name: req.body.name,
		startDate: req.body.startDate,
		endDate: req.body.endDate,
		numberofquestion: req.body.numberofquestion
	};

	quizMaster.create(quizData)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the Quiz."
			});
		});
};

export const addQuestions = (req, res) => {
	req.body.questionArray.forEach(questionItem => {

		const questionsData = {
			options: JSON.stringify(questionItem.options),
			question: questionItem.question,
			quizid: questionItem.quizID,
			correctoption: questionItem.correctOption,
		};

		questions.create(questionsData)
			.then(data => {
				res.send(data);
			})
			.catch(err => {
				res.status(500).send({
					message:
						err.message || "Some error occurred while creating the Quiz."
				});
			});
	});
};

export const getAllQuiz = (req, res) => {
	quizMaster.findAll()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving Quizs."
			});
		});
};

export const getQuizById = (req, res) => {
	const id = req.params.id;

	quizMaster.findByPk(id)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving Quiz with id=" + id
			});
		});
};

export const findAllQuestionByQuizId = (req, res) => {

	questions.findAll({ where: { quizid: req.params.id } })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving tutorials."
			});
		});
};

export const createUser = (req, res) => {
	const userData = {
		name: req.body.name,
		quizId: req.body.quizid,
		answers: req.body.answers,
		contact: req.body.contact
	};

	userDetail.create(userData)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the Quiz."
			});
		});
};
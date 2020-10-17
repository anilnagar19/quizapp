import express from 'express';
const router = express.Router();

import { createQuiz, getAllQuiz, getQuizById, addQuestions, findAllQuestionByQuizId, createUser } from '../controllers/quizController.js'

//Quiz
router.get('/', getAllQuiz);
router.get('/:id', getQuizById);
router.post('/createQuiz', createQuiz);
router.post('/createUser', createUser);

router.post('/addQuestions', addQuestions);

router.get('/getQuestions/:id', findAllQuestionByQuizId);

router.post('/addQuestions', addQuestions);

export default router;
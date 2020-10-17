import db from '../database.js';
import Sequelize from 'sequelize';

const questions = db.define('questions', {
	id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	question: {
		type: Sequelize.STRING
	},
	options: {
		type: Sequelize.STRING
	},
	correctoption: {
		type: Sequelize.INTEGER
	},
	quizid: {
		type: Sequelize.INTEGER
	}
});

export default questions;
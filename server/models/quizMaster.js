import db from '../database.js';
import Sequelize from 'sequelize';

const quizMaster = db.define('quizmaster', {
	id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	name: {
		type: Sequelize.STRING
	},
	startDate: {
		type: Sequelize.STRING
	},
	endDate: {
		type: Sequelize.STRING
	},
	numberofquestion: {
		type: Sequelize.INTEGER
	},
});

export default quizMaster;
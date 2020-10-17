import db from '../database.js';
import Sequelize from 'sequelize';

const userDetail = db.define('userDetail', {
	id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	name: {
		type: Sequelize.STRING
	},
	contact: {
		type: Sequelize.INTEGER
	},
	answers: {
		type: Sequelize.STRING
	},
	quizId: {
		type: Sequelize.INTEGER
	}
});

export default userDetail;
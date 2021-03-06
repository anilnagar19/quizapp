import Sequelize from 'sequelize';

const db = new Sequelize('quiz', 'postgres', 'postgres', {
	host: 'localhost',
	dialect: 'postgres',

	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
});
export default db;
import express from 'express';
import db from './database.js';
import bodyParser from 'body-parser';
import cors from 'cors';

import router from './routes/routes.js';

const app = express();

db.authenticate()
	.then(() => {
		console.log("Database connected");
	}).catch((err) => {
		console.log(err);
	});

db.sync().then(function (err) {
	console.log('Connected');
}, function (err) {
	console.log('An error occurred while creating the table:', err);
});

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/quiz', router);

app.get('/', (req, res) => {
	res.send('index');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server Started on port ${PORT}`))
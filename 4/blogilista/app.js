const config = require('./utils/config.js');
const express = require('express');
const app = express();
const logger = require('./utils/logger.js');
const middleware = require('./utils/middleware.js');

const cors = require('cors');
const blogRouter = require('./controllers/blogs.js');
const mongoose = require('mongoose');

mongoose
	.connect(config.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology:true})
	.then(() => {
		logger.info('Connected to mongo');
	})
	.catch((error) => {
		logger.error('Error connecting to mongo', error.message);
	});

app
	.use(cors())
	.use(express.json())
	.use(middleware.requestLogger)

	.use('/api/blogs', blogRouter)
	.use(middleware.unknownEndpoint)
	.use(middleware.errorHandler);



module.exports = app;
const config = require('./utils/config.js');
const express = require('express');
require('express-async-errors');
const app = express();
const logger = require('./utils/logger.js');
const middleware = require('./utils/middleware.js');

const cors = require('cors');
const blogRouter = require('./controllers/blogs.js');
const userRouter = require('./controllers/users.js');
const loginRouter = require('./controllers/login.js');
const testingRouter = require('./controllers/testing.js');
const mongoose = require('mongoose');

mongoose
	.set('useFindAndModify', false)
	.set('useCreateIndex', true)
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
	.use(middleware.extractToken)

	.use('/api/blogs', blogRouter)
	.use('/api/users', userRouter)
	.use('/api/login', loginRouter)

	if(process.env.NODE_ENV === 'test'){
		console.log('running on test environment')
		
		app.use('/api/testing', testingRouter);
	}
app	
	.use(middleware.unknownEndpoint)
	.use(middleware.errorHandler);



module.exports = app;
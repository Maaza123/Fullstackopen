const logger = require('./logger');
const tokenAuth = require('../utils/tokenAuth');
const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method);
	logger.info('Path:  ', request.path);
	logger.info('Body:  ', request.body);
	next();
};

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};
const extractToken = async (request, response, next) => {
	const authorization = await request.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		request.token = authorization.substring(7);
	}
	next();
};
const errorHandler = (error, request, response, next) => {
	logger.error(error.message);
  
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	} else if(error.name === 'JsonWebTokenError'){
		return response.status(401).send({error: 'token missing or invalid.'});
	}
  
	next(error);
};
const validateToken = async (request, response, next) => {
	const token = request.token;
	if(!token){
		return response.status(401).json({error: 'token missing or invalid.'});
	}
	const decodedToken = await tokenAuth.verify(token);

	if(!decodedToken.id){
		return response.status(401).json({error: 'token missing or invalid.'});
	}
	request.token = decodedToken;
	next();

};
module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	extractToken,
	validateToken
};
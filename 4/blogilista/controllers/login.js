const loginRouter = require('express').Router();
const bcrypt = require('../utils/bcrypt');
const tokenAuth = require('../utils/tokenAuth');

const User = require('../models/users');

loginRouter.post('/', async (request, response) => {
	const body = request.body;

	const user = await User.findOne({username: body.username});
	const passwordCorrect = user === null
		? false
		: await bcrypt.compare(body.password, user.password);

	if(!(user && passwordCorrect)) {
		return response.status(401).json({
			error: 'invalid username or password'
		});
	}

	const token = await tokenAuth.sign(user);

	response
		.status(200)
		.send({token, username: user.username, name: user.name});

});
module.exports = loginRouter;
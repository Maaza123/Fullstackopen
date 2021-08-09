const userRouter = require('express').Router();
const User = require('../models/users');
const hash = require('../utils/bcrypt').hash;



userRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs', {title: 1, author:1, likes:1});
	response.json(users);

});
userRouter.get('/:id', async (request, response) => {
	const user = await User.findById(request.params.id);
	response.json(user);
})
userRouter.post('/', async (request, response) => {
	const passwordExist = request.body.password !== undefined ? true : false;
	if(!(passwordExist && request.body.password.length >= 3)){
		return response.status(400).send({error: 'Password must be atleast 3 characters long'});
	}

	const hashedPassword = await hash(request.body.password);
	const newUser = new User({
		username : request.body.username,
		name : request.body.name,
		password : hashedPassword
	});

	const result = await newUser.save();

	response.status(201).json(result);

});

module.exports = userRouter;
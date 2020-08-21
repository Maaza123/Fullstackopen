const blogRouter = require('express').Router();
const Blog = require('../models/blogs.js');
const User = require('../models/users.js');
const middleWare = require('../utils/middleware');

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', {username: 1, name: 1});
	response.json(blogs);
});

blogRouter.put('/:id', async (request, response) => {
	const result = await Blog.findByIdAndUpdate(request.params.id, {likes: request.body.likes}, {new:true});
	response.status(201).json(result);
});

blogRouter.post('/', middleWare.validateToken, async (request, response) => {
	const token = request.token;

	const user = await User.findById(token.id);
	let body = request.body;
	body['user'] = user.id;
	console.log(`modified body ${body}`);

	const blog = new Blog(body);
  
	const result = await blog.save();
	user.blogs = user.blogs.concat(result.id);

	await user.save();

	response.status(201).json(result);
});
blogRouter.delete('/:id', middleWare.validateToken, async (request, response) => {
	const token = request.token;
	const blog = await Blog.findById(request.params.id);

	if(!blog){
		return response.status(404).end();
	}
	if(blog.user.toString() !== token.id.toString()){
		return response.status(403).json({error: 'token missing or invalid.'});
	}
	
	await Blog.findByIdAndDelete(request.params.id);
	response.status(204).end();
});


module.exports = blogRouter;

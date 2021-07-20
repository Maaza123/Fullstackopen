testRouter = require('express').Router();
Blog = require('../models/blogs.js');
User = require('../models/users.js');

testRouter.post('/reset', async (request, response) => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    response.status(204).end();
});

module.exports = testRouter;
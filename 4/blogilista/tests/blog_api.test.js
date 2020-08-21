const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');

const initialBlogs = helper.initialBlogs;
const app = require('../app.js');

const Blog = require('../models/blogs.js');
const User = require('../models/users.js');


const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});
	await Blog.insertMany(initialBlogs);
});
describe('testing api/blogs', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});
	
	test('correct amount of blogs are returned', async () => {
		const response = await api.get('/api/blogs');
		expect(response.body).toHaveLength(initialBlogs.length);
	});
	
	test('returned blogs have id', async () => {
		const response = await api.get('/api/blogs');
		response.body.forEach(element => expect(element.id).toBeDefined());
	});
	
	test('A blog can be added', async () => {
		const newBlog = {
			title: 'Juna kulkee aina vaan',
			author: 'Matti',
			url: 'www.oho.fi',
			likes: 5 
		}; 
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/);
		
		const blogsAfter = await helper.blogsInDb();
	
		expect(blogsAfter).toHaveLength(initialBlogs.length + 1);
	});
	
	test('Test if no likes value is defined, the default value will be 0', async () => {
		const newBlog = {
			title: 'Juhani ja orava',
			author: 'Matti',
			url: 'www.oho.fi' 
		}; 
	
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/);
		
		const blogsAfter = await helper.blogsInDb();
	
		expect(blogsAfter).toHaveLength(initialBlogs.length + 1);
	
		expect(blogsAfter[blogsAfter.length -1].likes).toBeDefined();
		expect(blogsAfter[blogsAfter.length -1].likes).toBe(0);
	});
	
	test('No missing title in new blog', async () => {
		const newBlog = new Blog({
			author: 'Johannes Sipuli',
			url: 'www.eiku.fi',
			likes: 5
		});
	
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400);
	});
	
	test('No missing author in new blog', async () => {
		const newBlog = new Blog({
			url: 'www.eiku.fi',
			title: 'Johannes Sipulin matka',
			likes: 5
		});
	
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400);
	});
	
	test('A blog can be deleted', async () => {
		const blogs = await helper.blogsInDb();
	
		await api
			.delete(`/api/blogs/${blogs[0].id}`)
			.expect(204);
		
		const blogsAfter = await helper.blogsInDb();
	
		expect(blogsAfter.length).toEqual(blogs.length-1);
	});
	
	test('A blog can be modified', async () => {
		const blogs = await helper.blogsInDb();
	
		await api
			.put(`/api/blogs/${blogs[0].id}`)
			.send({likes: 66})
			.expect(201);
		
		const afterUpdate = await helper.blogsInDb();
		expect(afterUpdate[0].likes).not.toEqual(blogs[0].likes);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
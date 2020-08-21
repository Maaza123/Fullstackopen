const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const url = '/api/users';

const initialUsers = helper.initialUsers;
const app = require('../app.js');

const User = require('../models/users.js');
const api = supertest(app);

beforeEach(async () => {
	await User.deleteMany({});
	await User.insertMany(initialUsers);
});

describe('Testing api/users', () => {
	test('users are returned as json', async () => {
		await api
			.get(url)
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	test('No users with invalid or missing password are created', async () => {
		let newUser = new User({
			Name: 'asdfasdf',
			username: 'fuufuu',
			password: 'as'
		});

		await api
			.post(url)
			.send(newUser)
			.expect(400);

		newUser = {
			Name: 'asdfasdf',
			username: 'fuufuu'
		};

		await api
			.post(url)
			.send(newUser)
			.expect(400);

	});

	test('Test that no invalid users are made', async () => {
		const users = await helper.usersInDb();
		const nonUniqueUsername = users[0].username;

		const newUser = new User({
			username: nonUniqueUsername,
			name: 'unique',
			password: 'acceptable'
		});

		await api
			.post(url)
			.send(newUser)
			.expect(400);

		const tooShortUserName = new User({
			username: 'a',
			name: 'Jaakko Panda',
			password: 'agreeable'
		});

		await api
			.post(url)
			.send(tooShortUserName)
			.expect(400);
        
		const userNameMissing = new User({
			name: 'unique2',
			password: 'longenough'
		});

		await  api
			.post(url)
			.send(userNameMissing)
			.expect(400);
        
		const usersAfter = await helper.usersInDb();

		expect(users.length).toBe(usersAfter.length);
	});

});

afterAll(() => {
	mongoose.connection.close();
});
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const sign = async (user) => {
	const userForToken = {
		username: user.username,
		id: user.id,
	};
	return jwt.sign(userForToken, JWT_SECRET);
};

const verify = async (token) => {
	return jwt.verify(token, JWT_SECRET);
};


module.exports = {
	sign,
	verify
};
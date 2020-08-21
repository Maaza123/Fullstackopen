const bcrypt = require('bcrypt');

const hash = async (password) => {
    const saltRounds = 10;
	return bcrypt.hash(password, saltRounds);
};

const compare = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}
module.exports = {
    hash,
    compare
};
const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Title is required']
	},
	author: {
		type: String,
		required: [true, 'Author is required']
	},
	url: String,
	likes: {
		type: Number,
		default: 0
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	comments: {
		type: [String]
	}
});

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});
module.exports = mongoose.model('Blog', blogSchema);
  
  
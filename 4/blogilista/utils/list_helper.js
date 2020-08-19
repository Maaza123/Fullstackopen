const maxBy = require('lodash').maxBy;
const dummy = () => {
	return 1;
};
  
const totalLikes = (blogs) => {
	return blogs.reduce((sum, blog) => {
		return sum + blog.likes;
	}, 0);
};

const favoriteBlog = (blogs) => {
	const test = {likes: -1};

	const result = blogs.reduce((most, blog) => {
		if(most.likes <= blog.likes){
			return blog;
		}
		return most;
	}, test);
    
	if(result.likes === -1){
		return {};
	}

	return result;
};

const mostBlogs = (blogs) => {
	const allBlogs = blogs.reduce((back, blog) => {
		const found = back.find(element => element.author === blog.author);

		if(found){
			found.blogs += 1;
		}else{
			back.push({
				author: blog.author,
				blogs: 1
			});
		}
		return back;

	}, []);

	const result = maxBy(allBlogs, (blog) => {
		return blog.blogs;
	});

	return result;
};

const mostLikes = (blogs) => {
	const allBlogs = blogs.reduce((back, blog) => {
		const found = back.find(element => element.author === blog.author);

		if(found){
			found.likes += blog.likes;
		}else{
			back.push({
				author: blog.author,
				likes: blog.likes
			});
		}
		return back;

	}, []);
	const result = maxBy(allBlogs, (blog) => {
		return blog.likes;
	});

	return result;
};
module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
};
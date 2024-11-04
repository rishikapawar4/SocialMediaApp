const { readData, writeData } = require('../utils/fileUtils');
const { v4: uuidv4 } = require('uuid');

function createPost(req, res) {
    const { title, description } = req.body;
    const posts = readData('Post.json');
    const newPost = { id: uuidv4(), title, description, author: req.user.id, likes: 0, comments: [] };

    posts.push(newPost);
    writeData('Post.json', posts);
    res.json({ message: 'Post created successfully' });
}

module.exports = { createPost };

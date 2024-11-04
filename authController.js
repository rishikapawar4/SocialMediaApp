const { readData, writeData } = require('../utils/fileUtils');
const { hashPassword, comparePassword } = require('../utils/hashHelper');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const config = require('../config/config');

async function registerUser(req, res) {
    const { email, password, mobile } = req.body;
    const users = readData('User.json');
    
    if (users.some(user => user.email === email || user.mobile === mobile)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = { id: uuidv4(), email, mobile, password: hashedPassword, following: [], followers: [] };
    
    users.push(newUser);
    writeData('User.json', users);

    res.json({ message: 'User registered successfully' });
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    const users = readData('User.json');
    const user = users.find(u => u.email === email);

    if (!user || !(await comparePassword(password, user.password))) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, { expiresIn: '1h' });
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
    });
}

module.exports = { registerUser, loginUser };

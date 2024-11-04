const { readData, writeData } = require('../utils/fileUtils');

function followUser(req, res) {
    const { id: userId } = req.user;
    const { followId } = req.body;
    const users = readData('User.json');

    const user = users.find(u => u.id === userId);
    const followUser = users.find(u => u.id === followId);

    if (!followUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    user.following.push(followId);
    followUser.followers.push(userId);

    writeData('User.json', users);
    res.json({ message: `Now following ${followUser.email}` });
}

module.exports = { followUser };

const express = require('express');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

const PORT =8008;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

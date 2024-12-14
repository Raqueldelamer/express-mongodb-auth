// index.js
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');


require('dotenv').config();
const app = express();
const port = 3003;

const MONGO_URL = process.env.MONGO_URL;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose
    .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => {
    console.log('Connected to MongoDB');
    })
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/users', async (req, res) => {
    const data = req.body;
    const newUser = new User({
        name: data.name,
        email: data.email,
        password: data.password,
    });

    //save to database
    try {
        const savedUser = await newUser.save();
        console.log(savedUser);
      //return the user object back
        res.json(savedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'failed to save user' });
    }
    }
);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
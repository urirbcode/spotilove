const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./models/db'); // Ensure this points to the correct location of your DB module

const app = express();

// Import the routes for the API endpoints
const songRoutes = require('./routes/songRoutes');
const userRoutes = require('./routes/userRoutes');

// Serve static files from 'public' and 'views' directories
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes for HTML pages to allow for cleaner URLs
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Use the API routes
app.use('/api/songs', songRoutes);
app.use('/api/users', userRoutes);

// Start the server on the specified port or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});

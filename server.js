const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./models/db'); // Import the database connection


// Import the routes for the '/api/songs' endpoint, and other endpoints
const songRoutes = require('./routes/songRoutes')
const userRoutes = require('./routes/userRoutes');

// Serve static files (e.g., images, CSS, JavaScript) from the 'public' and 'views' directories
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/views'))

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve the 'index.html' file when the root URL is requested
app.get('/', function(req, res){
    res.sendFile("index.html")
});

// Use the 'songRoutes' for the '/api/songs' endpoint
app.use('/api/songs', songRoutes)


// Use the 'userRoutes' for the '/api/users' endpoint
app.use('/api/users', userRoutes);


// Start the server on the specified port (or 3000 if not specified)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
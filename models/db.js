const sqlite3 = require('sqlite3').verbose(); // Assuming you installed 'sqlite3'

const db = new sqlite3.Database('./database.db'); // Creates/connects to database.db

module.exports = db; // Export the database connection
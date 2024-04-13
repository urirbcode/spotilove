const db = require('./db'); // Import the database connection

// Function to create the song table if it doesn't exist
function createSongTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS songs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            dateAdded DATE DEFAULT CURRENT_DATE,
            iframe TEXT NOT NULL
        )
    `;
    db.run(sql);
}

createSongTable(); // Create the table when the model is loaded
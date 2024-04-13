const db = require('./db'); // Import the database connection

// Function to create the song table if it doesn't exist
function createSongTable() {
    const sqlCreate = `
        CREATE TABLE IF NOT EXISTS songs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            dateAdded DATE DEFAULT CURRENT_DATE,
            iframe TEXT NOT NULL,
            link TEXT
        )
    `;
    db.run(sqlCreate, (err) => {
        if (err) {
            console.error("Error creating table:", err.message);
        } else {
            console.log("Table created or already exists with updated schema.");
            updateSongTable(); // Call to ensure the table is updated
        }
    });
}

// Function to update the song table to include a link column if not exists
function updateSongTable() {
    const sqlAlter = `
        ALTER TABLE songs
        ADD COLUMN link TEXT;
    `;

    db.run(sqlAlter, (err) => {
        if (err && err.message.includes("duplicate column name")) {
            console.log("Link column already exists.");
        } else if (err) {
            console.error("Error updating table:", err.message);
        } else {
            console.log("Table updated successfully to include 'link' column.");
        }
    });
}

createSongTable(); // Create or update the table when the model is loaded

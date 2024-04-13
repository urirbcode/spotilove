const db = require('./db'); // Import the database connection

// Function to create or update the song table
function createOrUpdateSongTable() {
    const sqlCreate = `
        CREATE TABLE IF NOT EXISTS songs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            dateAdded DATE DEFAULT CURRENT_DATE,
            iframe TEXT NOT NULL
        )
    `;

    db.run(sqlCreate, (err) => {
        if (err) {
            console.error("Error creating table:", err.message);
        } else {
            console.log("Table created or already exists.");
            addColumnIfNotExists('link', 'TEXT');
            addColumnIfNotExists('userId', 'INTEGER', 'REFERENCES users (id)');
        }
    });
}

// Function to add a column to the song table if it doesn't exist
function addColumnIfNotExists(columnName, columnType, additionalConstraints = '') {
    const sqlCheckColumn = `
        PRAGMA table_info(songs);
    `;

    db.all(sqlCheckColumn, (err, columns) => {
        if (err) {
            console.error(`Error checking ${columnName} column:`, err.message);
        } else {
            const columnExists = columns.some(column => column.name === columnName);

            if (!columnExists) {
                const sqlAddColumn = `
                    ALTER TABLE songs
                    ADD COLUMN ${columnName} ${columnType} ${additionalConstraints};
                `;

                db.run(sqlAddColumn, (err) => {
                    if (err) {
                        console.error(`Error adding ${columnName} column:`, err.message);
                    } else {
                        console.log(`${columnName} column added successfully.`);
                    }
                });
            } else {
                console.log(`${columnName} column already exists.`);
            }
        }
    });
}

createOrUpdateSongTable(); // Create or update the song table when the model is loaded
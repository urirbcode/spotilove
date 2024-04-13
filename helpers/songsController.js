const db = require('../models/db'); // Import the database connection

exports.getSongs = function(req, res) {
    db.all('SELECT * FROM songs', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
};

exports.addSong = function(req, res) {
    const { title, description, iframe } = req.body;
    const sql = 'INSERT INTO songs (title, description, iframe) VALUES (?, ?, ?)';
    db.run(sql, [title, description, iframe], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id: this.lastID, title, description, iframe });
        }
    });
};

exports.getSongById = function(req, res) {
    const songId = req.params.songId;
    const sql = 'SELECT * FROM songs WHERE id = ?';
    db.get(sql, [songId], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!row) {
            res.status(404).json({ message: 'Song not found' });
        } else {
            res.json(row);
        }
    });
};

exports.updateSong = function(req, res) {
    const songId = req.params.songId;
    const { title, description, iframe } = req.body;
    const sql = 'UPDATE songs SET title = ?, description = ?, iframe = ? WHERE id = ?';
    db.run(sql, [title, description, iframe, songId], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ message: 'Song not found' });
        } else {
            res.json({ message: 'Song updated successfully' });
        }
    });
};

exports.deleteSong = function(req, res) {
    const songId = req.params.songId;
    const sql = 'DELETE FROM songs WHERE id = ?';
    db.run(sql, [songId], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ message: 'Song not found' });
        } else {
            res.json({ message: 'Song deleted successfully' });
        }
    });
};
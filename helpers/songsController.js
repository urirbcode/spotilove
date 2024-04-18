const db = require('../models/db'); // Import the database connection

exports.getSongs = async function(req, res) {
    try {
        const { data, error } = await db.from('songs').select('*');
        if (error) {
            throw error;
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addSong = async function(req, res) {
    const { title, description, iframe } = req.body;
    try {
        const { data, error } = await db.from('songs').insert({ title, description, iframe, link });
        if (error) {
            throw error;
        }
        res.status(201).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSongById = async function(req, res) {
    const songId = req.params.songId;
    try {
        const { data, error } = await db.from('songs').select('*').eq('id', songId).single();
        if (error) {
            throw error;
        }
        if (!data) {
            res.status(404).json({ message: 'Song not found' });
        } else {
            res.json(data);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateSong = async function(req, res) {
    const songId = req.params.songId;
    const { title, description, iframe } = req.body;
    try {
        const { data, error } = await db.from('songs').update({ title, description, iframe, link }).eq('id', songId);
        if (error) {
            throw error;
        }
        if (data.length === 0) {
            res.status(404).json({ message: 'Song not found' });
        } else {
            res.json({ message: 'Song updated successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteSong = async function(req, res) {
    const songId = req.params.songId;
    try {
        const { data, error } = await db.from('songs').delete().eq('id', songId);
        if (error) {
            throw error;
        }
        if (data.length === 0) {
            res.status(404).json({ message: 'Song not found' });
        } else {
            res.json({ message: 'Song deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
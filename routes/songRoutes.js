const express = require('express');
const router = express.Router();
const songsController = require('../helpers/songsController');

// Get all songs
router.get('/', songsController.getSongs);

// Add a new song
router.post('/', songsController.addSong);

// Get a song by ID
router.get('/:songId', songsController.getSongById);

// Update a song by ID (Optional, remove if not needed)
router.put('/:songId', songsController.updateSong);

// Delete a song by ID (Optional, remove if not needed)
router.delete('/:songId', songsController.deleteSong);

module.exports = router;
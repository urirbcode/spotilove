const express = require('express');
const router = express.Router();
const songsController = require('../helpers/songsController');

router.route('/')
    .get(songsController.getSongs) // Get all songs
    .post(songsController.addSong);


router.route('/:songId')
    .get(songsController.getSongById) // Get a song by ID
    .put(songsController.updateSong) // Update a song by ID (Optional, remove if not needed)
    .delete(songsController.deleteSong); // Delete a song by ID (Optional, remove if not needed)

module.exports = router;
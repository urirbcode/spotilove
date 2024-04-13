const express = require('express');
const router = express.Router();
const songsController = require('../helpers/songsController');
const authenticateToken = require('../middleware/authMiddleware');

router.route('/')
    .get(songsController.getSongs) // Get all songs
    .post(authenticateToken, songsController.addSong); // Add authentication middleware

router.route('/:songId')
    .get(songsController.getSongById) // Get a song by ID
    .put(authenticateToken, songsController.updateSong) // Add authentication middleware
    .delete(authenticateToken, songsController.deleteSong); // Add authentication middleware

module.exports = router;
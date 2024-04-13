const express = require('express');
const router = express.Router();
const db = require("../models");
const { now } = require('mongoose');
const helpers = require('../helpers/songsController')

router.route('/')
    .get(helpers.getSongs)
    .post(helpers.addSong)


router.route('/:songId')
    .get(helpers.getSongById)
    .put(helpers.updateSong)
    .delete(helpers.deleteSong)


module.exports = router;

//from the original get funciton
//// this get / is basically saying that all the routes start here, in this directory
// in the main app we'll be adding what will come before this /, like spotilove.com/api/STARTOFROUTESDIRECTORy
// so in  way this get / is basically saying: this is the home directory of the API. This is where computers land to talk to each other
// router.get('/', function(req,res){
//     // SongList is the name of the Model. We've defined when exporting it in the las line of code in models/index.js. Given db is required the model earlier, we can access the SongList model from the object db
//     db.Song.find()
//     // so mongo will now go and find the song list, and then it will send a json with all those songs in a list. songs is an arbitrary word here, it just means the outcome returned from the .find()
//     .then(function(songs){
//         res.json(songs);
//     })
//     .catch(function(err){
//         res.send(err);
//     })
// });

// router.post('/', function(req,res){
//     db.Song.create(req.body)
//     .then(function(newSong){
//         res.status(201).json(newSong)
//     })
//     .catch(function(err){
//         res.send(err);
//     })
// });
const db = require('../models/db')

exports.getSongs = function(req,res){
    db.Song.find()
    .then(function(songs){
        res.json(songs);
    })
    .catch(function(err){
        res.send(err);
    })
};

exports.addSong = function(req,res){
    db.Song.create(req.body)
    .then(function(newSong){
        res.status(201).json(newSong)
    })
    .catch(function(err){
        res.send(err);
    })
};

exports.getSongById = function(req, res) {
    db.Song.findById(req.params.songId)
    .then(function(foundSong) {
        res.json(foundSong);
    })
    .catch(function(err) {
        res.send(err);
    });
};

exports.updateSong = function(req, res) {
    db.Song.findByIdAndUpdate(req.params.songId, req.body, { new: true })
    .then(function(updatedSong) {
        res.json(updatedSong);
    })
    .catch(function(err) {
        res.send(err);
    });
};

exports.deleteSong = function(req, res) {
    db.Song.deleteOne({ _id: req.params.songId })
    .then(function(result) {
        if (result.deletedCount >  0) {
            res.json({ message: "The song has been deleted" });
        } else {
            res.status(404).json({ message: "Song not found" });
        }
    })
    .catch(function(err) {
        res.send(err);
    });
};


module.exports = exports;
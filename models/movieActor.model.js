const mongoose = require('mongoose');

const movieActorSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  actorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Actor',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MovieActor', movieActorSchema);

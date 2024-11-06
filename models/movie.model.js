const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  genreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
    required: true
  },
  directorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Director',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);

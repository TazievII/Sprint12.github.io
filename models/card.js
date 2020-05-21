const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^((https?:\/{2})([a-z-_0-9]{1,}\.)?[a-z-_0-9]{2,}\.[a-z]{2,}((\/[a-z-_0-9]+)*?)(\/[a-z-_0-9]+\.[a-z-_0-9]{3,}))$/.test(v);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});


module.exports = mongoose.model('card', cardSchema);
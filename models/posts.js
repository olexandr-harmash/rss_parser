const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  creator: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  pubDate: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  guid: {
    type: String,
    unique: true,
  }, // delete guid becouse we use _id but if we need guid for platform were we take this maybe it is stay
  categories: {
    type: [String],
    required: true,
  },
  isoDate: {
    type: String,
    required: true,
  },
});

mongoose.model('Post', postSchema);

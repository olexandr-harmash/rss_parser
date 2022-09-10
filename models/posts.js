var mongoose = require( 'mongoose' );

var postSchema = new mongoose.Schema({
    creator: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    pubDate: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    guid: {
        type: String,
        unique: true,
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    isoDate: {
        type: String,
        required: true
    }
});

mongoose.model('Post', postSchema);
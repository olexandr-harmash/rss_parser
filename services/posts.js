var mongoose = require('mongoose');
var Post = mongoose.model('Post');

var error = require('../config/errors')

/* POST a new review, providing a locationid */
/* /api/locations/:locationid/reviews */
module.exports.postsCreate =  async function(posts) {
    let result;
    try {
        result = await Post.insertMany(posts);
    } catch (err) {
        throw error.checkMongoError(err);
    }

    return result;
};

module.exports.postsReadOne =  async function(id) {  
    if(!mongoose.isValidObjectId(id)) {
        throw error.badRequest();    
    }
    console.log('id ok')

    let post;
    try {
        post = await Post.findById(id);
        console.log('post ok')
    } catch(err) {
        console.log(err)
        throw error.checkMongoError(err);
    }

    if(!post) {
        console.log('post empty')
        throw error.notFound(); 
    } 
    
    return post;
};

module.exports.postsReadMany =  async function(offset, limit) {
    if (limit > 25 || offset < 0) {
        throw error.badRequest();   
    }
    console.log('params ok', limit, offset)
    let posts;
    try {
        posts = await Post.find({}).skip(offset).limit(limit);
        console.log('posts ok')
    } catch(err) {
        console.log(err)
        throw error.checkMongoError(err);
    }
    console.log('return posts')
    return posts;
};

module.exports.postsUpdateOne =  async function(id, update) {
    if(!mongoose.isValidObjectId(id)) {
        throw error.badRequest(); 
    }

    let result;
    try {
        result = await Post.findByIdAndUpdate(id, update);
    } catch(err) {
        throw error.checkMongoError(err);
    }

    return result
};

module.exports.postsDeleteOne =  async function(id) {
    if(!mongoose.isValidObjectId(id)) {
        throw error.badRequest();
    }

    let result;
    try {
        result = await Post.findByIdAndDelete(id)
    } catch(err) {
        throw error.checkMongoError(err);
    }

    return result;
};

module.exports.postsUpdateMany =  async function(posts) {
    let result;
    try {
        for (post of posts) {
            const finded = await Post.findOne({
                guid: post.guid
            });

            if (finded) {
                await Post.findByIdAndUpdate(finded._id, post);
            } else {
                await Post.create(post);
            }
        }

        result = posts;
    } catch(err) {
        throw error.checkMongoError(err);
    }

    return result;
};
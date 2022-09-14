const mongoose = require('mongoose');
const Post = mongoose.model('Post');

const error = require('../config/errors');

module.exports.postsCreate = async function (posts) {
  let result;
  try {
    result = await Post.insertMany(posts);
  } catch (err) {
    console.log(err);
    throw error.checkMongoError(err);
  }

  return result;
};

module.exports.postsReadOne = async function (id) {
  if (!mongoose.isValidObjectId(id)) {
    throw error.badRequest();
  }

  let post;
  try {
    post = await Post.findById(id);
  } catch (err) {
    console.log(err);
    throw error.checkMongoError(err);
  }

  if (!post) {
    throw error.notFound();
  }

  return post;
};

module.exports.postsReadMany = async function (offset, limit) {
  if (limit > 25 || offset < 0) {
    throw error.badRequest();
  }

  let posts;
  try {
    posts = await Post.find({}).skip(offset).limit(limit);
  } catch (err) {
    throw error.checkMongoError(err);
  }
  
  return posts;
};

module.exports.postsUpdateOne = async function (id, update) {
  if (!mongoose.isValidObjectId(id)) {
    throw error.badRequest();
  }

  let result;
  try {
    result = await Post.findByIdAndUpdate(id, update);
  } catch (err) {
    throw error.checkMongoError(err);
  }

  return result;
};

module.exports.postsDeleteOne = async function (id) {
  if (!mongoose.isValidObjectId(id)) {
    throw error.badRequest();
  }

  let result;
  try {
    result = await Post.findByIdAndDelete(id);
  } catch (err) {
    throw error.checkMongoError(err);
  }

  return result;
};

module.exports.postsUpdateMany = async function (posts) {
  let result;
  try {
    for (post of posts) {
      const finded = await Post.findOne({
        guid: post.guid,
      });

      if (finded) {
        await Post.findByIdAndUpdate(finded._id, post);
      } else {
        await Post.create(post);
      }
    }

    result = posts;
  } catch (err) {
    throw error.checkMongoError(err);
  }

  return result;
};

module.exports.getCount = async function () {
  let result;
  try {
    result = await Post.count();
  } catch (err) {
    console.log(err);
    throw error.checkMongoError(err);
  }
  return result;
};

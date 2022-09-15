const PostService = require('../services/posts');
const error = require('../config/errors');
const response = require('../config/response');

module.exports.postsCreate = async function (req, res, next) {
  try {
    if (!req.body.posts) {
      throw error.badRequest();
    }

    const result = await PostService.postsCreate(req.body.posts);
    response.sendJSONresponse(res, 200, {
      message: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.postsReadOne = async function (req, res, next) {
  try {
    if (!req.params && !req.params.id) {
      throw error.badRequest();
    }

    const result = await PostService.postsReadOne(req.params.id);

    response.sendJSONresponse(res, 200, {
      message: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.postsReadMany = async function (req, res, next) {
  try {
    if (!req.query && !req.query.offset && !req.query.limit) {
      throw error.badRequest();
    }
    console.log('params ok');
    const result = await PostService.postsReadMany(
      req.query.offset,
      req.query.limit
    );
    console.log('posts ok');

    response.sendJSONresponse(res, 200, {
      count: await PostService.getCount(),
      message: result,
    });
  } catch (err) {
    console.log('err');
    next(err);
  }
};

module.exports.postsUpdateOne = async function (req, res, next) {
  try {
    if (!req.params && !req.params.id && !req.body.post) {
      throw error.badRequest();
    }

    const result = await PostService.postsUpdateOne(req.params.id, req.body);
    response.sendJSONresponse(res, 200, {
      message: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.postsDeleteOne = async function (req, res, next) {
  try {
    if (!req.params && !req.params.id) {
      throw error.badRequest();
    }

    const result = await PostService.postsDeleteOne(req.params.id);
    response.sendJSONresponse(res, 200, {
      message: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.postsUpdateMany = async function (req, res, next) {
  try {
    if (!req.body && !req.body.posts) {
      throw error.badRequest();
    }

    const result = await PostService.postsUpdateMany(req.body.posts);
    response.sendJSONresponse(res, 200, {
      message: result,
    });
  } catch (err) {
    next(err);
  }
};

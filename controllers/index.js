const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');
const auth = jwt({
  algorithms: ['HS256'],
  secret: process.env.JWT_SECRET,
  userProperty: 'payload',
});

const ctrlPosts = require('../controllers/posts');
const ctrlAuth = require('../controllers/authentication');

// reviews
router.post('/posts/', auth, ctrlPosts.postsCreate);
router.get('/posts/:id/', ctrlPosts.postsReadOne);
router.get('/posts/', ctrlPosts.postsReadMany);
router.put('/posts/:id/', auth, ctrlPosts.postsUpdateOne);
router.put('/posts/', auth, ctrlPosts.postsUpdateMany);
router.delete('/posts/:id/', auth, ctrlPosts.postsDeleteOne);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;

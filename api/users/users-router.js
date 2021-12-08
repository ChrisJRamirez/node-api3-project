const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const User = require("./users-model");
const Post = require("../posts/posts-model");
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get(req.query)
    .then(users => {
      console.log(users)
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(500).json({
        message: "Error retrieving the users",
        error: error.message
      })
    })

});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  res.status(200).json(req.users)
  // this needs a middleware to verify user id
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  User.insert(req.body)
    .then(users => {
      res.status(201).json(users)
    })
    .catch(error => {
      res.status(500).json({
        message: "Error adding the user",
        error: error.message
      })
    })
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  User.update(req.params.id, req.body)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(500).json({
        message: "Error updating the user",
        error: error.message
      })
    })
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // the first check is redundant and does same as validateuserId - fix
  const {id} = req.params
  try{
    const userTbd = await User.getById(id)
    if(!userTbd){
      res.status(404).json({
        message: "The user with the specified ID does not exist"
      })
    }else{
      await User.remove(id)
      res.json(userTbd)
    }
  } catch(err){
    res.status(500).json({
      message: "The user could not be removed"
    })
  }
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  const {id} = req.params
  User.getUserPosts(id)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(() => {
      res.status(500).json({
        message: "The posts information could not be retrieved"
      })
    })
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
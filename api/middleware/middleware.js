const User = require("../users/users-model")

function logger(req, res, next) {
  const date = new Date();
  console.log(`
    REQUEST METHOD: ${req.method},
    REQUEST URL: ${req.originalUrl},
    TIMESTAMP: ${date.toLocaleString()}
  `)
  next()
}

const validateUserId = async(req, res, next) => {
  const {id} = req.params
  try{
    const users = await User.getById(id)
    if(!users){
      res.status(404).json({ 
        message: "user not found" })
    }else{
      req.users = users
      next()
    }
  }catch(err){
    res.status(500).json({
      message:`Error:${err.message}`
    })
    next()
  }
}

function validateUser(req, res, next) {
  if(!req.body.name){
    res.status(400).json({message: "missing required name field"})
  }else{
    next()
  }
}

function validatePost(req, res, next) {
  if(!req.body.text){
    res.status(400).json({message: "missing required text field"})
  }else{
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
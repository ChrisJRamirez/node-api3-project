const User = require("../users/users-model")

function logger(req, res, next) {
  // DO YOUR MAGIC
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
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
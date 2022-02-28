const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router()
const User = require('../models/user')
const Logger = require("../utils/logger")

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if( !body.password || body.password.length < 3 ){
      Logger.info("Password's length is smaller than 3")
      response.status(400)
      response.json({error: "Password length must be at least 3"})
  }
  else{
  
    const passwordHash = await bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("B4c0/\/", salt, function(err, hash) {
            // Store hash in your password DB.
        });
    });

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
}
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {title:1, author:1, url:1})
    response.json(users)
  })

module.exports = usersRouter
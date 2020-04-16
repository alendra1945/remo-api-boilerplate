const bcrypt = require('bcryptjs')
const { users: UserModel } = require('../models')

exports.CreateUser = async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password || !req.body.confirm_password) {
      throw new Error('username, password, and confirm password is required')
    }
    if (req.body.password !== req.body.confirm_password) {
      throw new Error('Password and confirm password not match')
    }
    if (!(/^.{8,}/.test(req.body.password))) {
      throw new Error('Password Must Contain Minimal eight character')
    }
    const hashPassword = bcrypt.hashSync(req.body.password)
    const createUser = await UserModel.create({ username: req.body.username, password: hashPassword })
    if (createUser) {
      res.status(201).json({
        success: true,
        msg: `User with username ${createUser.get('username')} created`,
        data: {
          id: createUser.get('id'),
          username: createUser.get('username')
        }
      })
    }
  } catch (err) {
    console.log(err)
    console.log(err.status)
    console.log(err.message)
    res.status(err.status || 202).json({
      success: false,
      msg: err.message || 'Something Error'
    })
  }
}

const express = require('express')

const router = express.Router()

const md5 = require('blueimp-md5')

const UserModel = require('../models/user')

const filter = { passWord: 0, __v: 0 }


//注册
router.post('/register', (req, res, next) => {
  const { userName, passWord, type } = req.body
  console.log(req.body)
  UserModel.findOne(req.body).then((data) => {
    if (data)
      res.json({ code: 1, msg: '用户存在 ' })
    else {
      new UserModel({ userName, passWord, type }).save((err, user) => {
        if (err)
          next(err)
        else {
          res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 * 7 })
          const data = { userName, type, _id: user._id }
          res.json({
            code: 0,
            data
          })
        }
      })
    }
  })
})

//登陆
router.post('/login', (req, res, next) => {
  UserModel.findOne(req.body, filter, (err, doc) => {
    if (err)
      next(err)
    else {
      res.json({
        code: 0,
        data: doc
      })
    }
  })
})



module.exports = router
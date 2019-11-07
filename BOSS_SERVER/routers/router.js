const express = require('express')

const router = express.Router()

const md5 = require('blueimp-md5')

const UserModel = require('../models/user')

const filter = { passWord: 0, __v: 0 }


//注册
router.post('/register', (req, res, next) => {
  const { userName, passWord, type } = req.body
  UserModel.findOne({ userName }).then((data) => {
    if (data)
      res.json({ code: 1, msg: '用户存在 ' })
    else {
      new UserModel({ userName, type, passWord: md5(passWord) }).save((err, user) => {
        if (err)
          return next(err)
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
router.post('/login', (req, res) => {
  const { userName, passWord } = req.body
  UserModel.findOne({ userName, passWord: md5(passWord) }, filter, (err, user) => {
    if (!user) { res.send({ code: 1, msg: '用户名或密码错误' }) }
    else {
      // 生 成 一 个 cookie(userid: user._id), 并 交 给 浏 览 器 保 存 
      res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 * 7 })
      // 3.2. 如 果 user 有 值 , 返 回 u
      res.send({ code: 0, data: user })
    }
    // user 中 没 有 pwd
  })
})

// 完善用户信息
router.post('/updateInfo', (req, res) => {
  const userid = req.cookies.userid
  if (!userid) {
    // 如 果 没 有 , 说 明 没 有 登 陆 ,直 接 返 回 提 示 
    return res.json({ code: 1, msg: '请先登陆' })
  }
  UserModel.findByIdAndUpdate(userid, req.body, (err, oldUser) => {
    if (!oldUser) {
      res.clearCookie('userid')
      res.send({ code: 1, msg: '请先登陆' })
    } else {
      const { _id, userName, type } = oldUser
      const data = Object.assign(req.body, { _id, userName, type })
      res.json({ code: 0, data })
    }
  })
})

//获取用户信息
router.get('/user', (req, res) => {
  const userid = req.cookies.userid
  UserModel.findById(userid, filter).then(data => {
    if (!data) {
      res.clearCookie('userid')
      res.send({ code: 1, msg: '请先登陆' })
    } else {
      res.json({ code: 0, data })
    }
  })
})

//获取用户列表
router.get('/userlist', (req, res) => {
  const { type } = req.query
  UserModel.find({ type: type * 1 }, filter).then(data => {
    if (data.length === 0) {
      res.send({ code: 1, msg: '暂无数据' })
    }
    else {
      res.json({ code: 0, data })
    }
  })
})

module.exports = router
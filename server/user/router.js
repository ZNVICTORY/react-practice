const express = require('express')
const router = express.Router()
const models = require('../modal/modal')
const User = models.getModel('user')
const Chat = models.getModel('chat')
const util = require('utility')
const _filter = {'pwd': 0, '_v':0}

// Chat.remove({}, function(err, doc){
//   console.log('ok')
// })
// User.remove({}, function(err, doc) {
//   console.log('ok')
// })

router.get('/list', function(req, res,next) {
  const registerType = req.query.type
  User.find({registerType}, function(err, docs) {
   return res.json({ code:0, data: docs})
  })
 
})

router.get('/info', function(req, res) {
  const { userId } = req.cookies
  if(!userId) {
    // 如果用户没有cookie
    // 则返回 code 1
    return res.json({ code: 1, success: false})
  }
  //  用户cookie存在
  User.findOne({_id: userId }, _filter, function(err, docs) {
    if(err) {
      return res.json({code: 1, msg: '后端出错了', success: false})
    } else {
      return res.json({code: 0 ,success: true ,data: docs})
    }
  })
})

router.post('/register', function(req, res) {
  const { user, pwd, registerType  } = req.body
  User.find({user}, function(err, docs) {
    if(docs.length !== 0) {
       const data = { code: 1, msg: '用户名重复', success: false }
        return res.json(data)
    }
    // create 方法无法拿到的用户的id
    const userModel = new User({user, pwd:md5(pwd), registerType})
    userModel.save((err,doc) => {
      if(err) {
        const data = { code: 1, msg: '服务端错误', success: false }
        return res.json(data)
      } 
      const { user, type, _id} = doc
      // 设置cookie
      res.cookie('userId', _id)
      return res.json({ code: 0, success: true, data: {user, type, _id}})
    })
  })
})

router.post('/login', function(req, res) {
  const { user, pwd } = req.body
  User.findOne({user, pwd: md5(pwd) }, _filter, function(err, docs){
    if(!docs) {
      return res.json({ code: 1, success:false, msg: '您的账号密码错误'})
    } else {
      // 设置cookie保存用户登录状态
      res.cookie('userId', docs._id)
      return res.json({ code: 0, success: true, data: docs })
    } 
  })
})

router.post('/update', function(req, res) {
  const { userId } = req.cookies
  if(!userId) {
    return res.json({code: 1, success: false})
  }
  const body = req.body
  User.findByIdAndUpdate(userId, body, function(err, docs) {
    const data = Object.assign({}, {
      user: docs.user,
      registerType: docs.registerType
    }, body)
    return res.json({ code: 0 , success: true, data})
  })
})

router.get('/getmsglist', function(req, res) {
  const id = req.cookies.userId
  User.find({}, function(err, userdoc) {
    let users = {}
    userdoc.forEach(v=> {
      users[v._id] = {name: v.user, avatar: v.avatar}
    })
    // "$or", 查询，存在多个条件
    Chat.find({"$or":[{from: id}, { to: id}]}, function(err, docs) {
      if(!err) {
        return res.json({code: 0, msgs: docs, users: users})
      }
    })
  })
})

router.post('/readmsg', function(req, res) {
  const { from } = req.body
  const userid = req.cookies.userId
  Chat.update(
    {from, to: userid}, 
    {'$set':{ read: true}},
    {'multi': true},
     function(err, docs) {
    if(!err){
      return res.json({code: 0, num: docs.nModified})
    }
    return res.json({code: 1, msg:'修改失败'})
  })
  
})

function md5(pwd) {
  const salt = '1234567snldkfjks.,_#$%%'
  return util.md5(util.md5(pwd+salt))
}

module.exports = router
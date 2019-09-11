const express = require('express')
const router = express.Router()

router.get('/info', function(req, res) {
  res.json({
    code:1,
    success: true
  })
})
router.post('/register', function(req, res) {
  const { user, pwd, registerType } = req.body
  console.log(user, pwd, registerType)
  res.json({
    code: 0,
    success: true
  })
})

module.exports = router
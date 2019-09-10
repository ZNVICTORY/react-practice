const express = require('express')
const router = express.Router()

router.get('/info', function(req, res) {
  res.json({
    code:1,
    success: true
  })
})

module.exports = router
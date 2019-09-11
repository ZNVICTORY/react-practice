const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cookieParser)
app.use(bodyParser.json())

const userRoutes = require('./user/router')
// app.use使用中间件
//以user开头的路由，转到userRoutes下
app.use('/user', userRoutes)

app.listen(9099, () => {
    console.log('server is start, port is 9099')
})
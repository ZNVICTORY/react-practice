const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
// 引入 http， 创建 server
const server = require('http').Server(app)
// 引入socket.io， 并关联server 
const io = require('socket.io')(server)
const models = require('./modal/modal')
const Chat = models.getModel('chat')
io.on('connection', function(socket) {
    // console.log('user login')
    socket.on('sendmsg', function(data){
        const { from , to, msg} = data
        const chatid = [from, to].sort().join('_')
        Chat.create({chatid, from, to, content:msg}, function(err, doc) {
            io.emit('recvmsg', Object.assign({}, doc._doc))
        })
    }) // 监听 方法
    // socket.emit()  // 发送 方法
})


app.use(cookieParser())
app.use(bodyParser.json())
app.use(function(req, res, next) {
    console.log('reqpath',req.url)
    next();
})

const userRoutes = require('./user/router')

// app.use使用中间件
//以user开头的路由，转到userRoutes下
app.use('/api/v1/user', userRoutes)

server.listen(8088, () => {
    console.log('server is start, port is 8080')
})
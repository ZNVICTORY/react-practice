const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/imooc-chat'
//连接数据库, 创建名字为imooc-chat数据库
mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})

const models = {
  user: {
    'user': { type: String, require: true},
    'pwd': { type: String, require: true},
    'registerType': { type: String, require: true},
    // 头像
    'avatar': { type: String},
    // 个人简介或者职位简介
    'desc': { type:String},
    // 职位名
    'title': { type: String},
    // 如果你是；老板
    'company': { type: String},
    'money': {type: String}
  },
  chat:{
    'chatid': { 'type': String, 'require': true},
    'from': { type: String, require: true},
    'to': { type: String, require: true},
    'read': { type: Boolean, default: false},
    'content': { type: String, require: true, default: ''},
    'create_time': { type: Number, default: new Date().getTime() }

  }
}
// 在数据库中建立数据表

var Schema = mongoose.Schema;

for(m in models) {
  mongoose.model(m, new Schema(models[m]))
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name)
  }
}

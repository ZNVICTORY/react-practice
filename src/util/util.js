// 工具函数
// 根据用户信息跳转地址
 export function getRedirectPath({registerType, avatar}) {
// user.type => boss || staff
// user.avatar => bossinfo || staffinfout
  console.log(registerType, avatar)
  let url = registerType === 'BOSS' ? '/boss': '/staff'
  if(!avatar) {
    url+= 'info'
  }
  return url
}
// 获取chatid
export function getChatId(userId, targetId) {
  return [userId, targetId].sort().join('_')
}


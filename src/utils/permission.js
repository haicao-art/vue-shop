/**
 * @Author: crababy
 * @Date:   2017-10-25T09:51:52+08:00
 * @Last modified by:   crababy
 * @Last modified time: 2018-01-02T16:49:47+08:00
 * @License: http://www.opensource.org/licenses/mit-license.php MIT License
 */

import router from './../router'
import store from './../store'
import { getToken } from '@/utils/auth' // 验权
import { wxAuthorize } from '@/apis/member'

/**
 * 权限验证
 * @param  {[type]}  roles           [description]
 * @param  {[type]}  permissionRoles [description]
 * @return {Boolean}                 [description]
 */
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = [
  '/404',
  '/wxfwhLogin'
]

router.beforeEach((to, from, next) => {
  if(whiteList.indexOf(to.path) !== -1) {
    next()
  } else if(getToken()) {
    if(to.path === '/wxfwhLogin') {
      next({path : '/'})
    } else {
      next()
    }
  } else {
    //未登录 或者 登录失效 去获取token
    let redirect_url = to.fullPath
    wxAuthorize('snsapi_base', 'wxlogin', 'http://44686a2b.ngrok.io/wxfwhLogin?redirect_url=' + redirect_url).then(response => {
      let _url = response.data.url
      window.location.href = _url
    }).catch(error => {
      console.log(error)
    })
    next()
    return false
  }
})

router.afterEach(() => {
})

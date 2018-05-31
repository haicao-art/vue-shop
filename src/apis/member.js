import fetch from '@/utils/fetch'

/**
 * 授权
 */
  export function wxAuthorize(scope, state, redirect_url) {
   return fetch({
     url: 'weixin/wxAuthorize',
     method: 'POST',
     data: {
       version: process.env.INTERFACE,
       scope: scope,
       state: state,
       redirect_url: redirect_url,
     }
   });
  }

 /**
  * 登录
  * @param  {[type]} code        微信获取的code值
  * @return {[type]}              [description]
  */
  export function wxfwhLogin(code) {
   return fetch({
     url: 'weixin/wxfwhLogin',
     method: 'POST',
     data: {
       version: process.env.INTERFACE,
       code: code,
     }
   });
  }

  /**
   * 获取会员信息
   * @param  {[type]} token [description]
   * @return {[type]}       [description]
   */
  export function info(token) {
   return fetch({
     url: 'member/info',
     method: 'POST',
     data: {
       version: process.env.INTERFACE,
       token: token,
     }
   });
  }

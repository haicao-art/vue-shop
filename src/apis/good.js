import fetch from '@/utils/fetch'

/**
 * 登陆
 */
 export function getGoodList(params) {
   return fetch({
     url: 'good/index',
     method: 'POST',
     data: {
       version: process.env.INTERFACE,
       token: params.token,
       q: params.q || '',
       page: params.page || 1,
       limit: 4
     }
   });
 }

 export function getGoodInfo(params) {
   return fetch({
     url: 'good/info',
     method: 'POST',
     data: {
       version: process.env.INTERFACE,
       token: params.token,
       good_id: params.id
     }
   });
 }

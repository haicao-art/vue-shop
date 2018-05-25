import fetch from '@/utils/fetch'

/**
 * 登陆
 */
 export function getIndexData(params) {
   return fetch({
     url: 'home/index',
     method: 'POST',
     data: {
       version: process.env.INTERFACE,
       token: params.token,
     }
   });
 }

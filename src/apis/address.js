import fetch from '@/utils/fetch'

/**
 * 登陆
 */
 export function getAddressList(params) {
   return fetch({
     url: 'address/getList',
     method: 'POST',
     data: {
       version: process.env.INTERFACE,
       token: params.token,
     }
   });
 }

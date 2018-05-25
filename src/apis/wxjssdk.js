import fetch from '@/utils/fetch'

/**
 * js-sdk 签名
 */
 export function signature(url, jsApiList) {
   return fetch({
     url: 'weixin/jsSdkSignature',
     method: 'POST',
     data: {
       version: process.env.INTERFACE,
       url: url,
       jsApiList: jsApiList
     }
   });
 }

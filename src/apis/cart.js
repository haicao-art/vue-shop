import fetch from '@/utils/fetch'

/**
 * checkout
 */
 export function checkout(params) {
   return fetch({
     url: 'cart/checkout',
     method: 'POST',
     data: {
       version: process.env.INTERFACE,
       token: params.token,
       entities: params.entities
     }
   });
 }

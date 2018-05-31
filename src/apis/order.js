import fetch from '@/utils/fetch'

/**
 * 订单列表
 */
 export function list(params) {
   return fetch({
     url: 'order/index',
     method: 'POST',
     data: {
       version: process.env.INTERFACE,
       token: params.token,
       state: params.state,
       page: params.page,
       limit: params.limit
     }
   });
 }

 export function detail(params) {
   return fetch({
     url: 'order/detail',
     method: 'POST',
     data: {
       version: process.env.INTERFACE,
       token: params.token,
       order_id: params.order_id,
     }
   });
 }

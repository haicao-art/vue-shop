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

export function orders(params) {
  return fetch({
    url: 'cart/orders',
    method: 'POST',
    data: {
      version: process.env.INTERFACE,
      token: params.token,
      entities: params.entities,
      consignee_id: params.consignee_id,
      payment: params.payment
    }
  });
}

export function orderPay(params) {
  return fetch({
    url: 'pay/prepay',
    method: 'POST',
    data: {
      version: process.env.INTERFACE,
      token: params.token,
      order_id: params.order_id
    }
  });
}

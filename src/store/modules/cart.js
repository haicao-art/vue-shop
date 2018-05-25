/**
 * @Author: crababy
 * @Date:   2018-05-25T10:42:55+08:00
 * @Last modified by:   crababy
 * @Last modified time: 2018-05-25T10:46:41+08:00
 * @License: http://www.opensource.org/licenses/mit-license.php MIT License
 */


 import {setStore, getStore} from '@/utils/util'

const cart = {
  state: {
    cartList: {}
  },
  mutations: {
    ADD_CART: (state, {shop_id, good_id, spec_id, good_title, spec_title, good_price, buy_num}) => {
      console.log(good_id)
      let cart = state.cartList
      let shop = cart[shop_id] = (cart[shop_id] || {})
      let good = shop[good_id] = (shop[good_id] || {})
      if(good[spec_id]) {
        good[spec_id]['buy_num'] += buy_num
      } else {
        good[spec_id] = {
          'buy_num': buy_num,
          'good_id': good_id,
          'good_title': good_title,
          'good_price': good_price,
          'spec_title': spec_title
        }
      }
      state.cartList = { ...cart }
      setStore('buyCart', state.cartList);
    },
  },
  actions: {

  }

}

export default cart

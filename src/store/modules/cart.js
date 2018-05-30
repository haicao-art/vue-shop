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
    cartList: [],
    choosedAddress: null,
    addressIndex: null,

  },
  mutations: {
    INIT_CART: (state) => {
      let initCart = getStore('buyCart')
      if(initCart && state.cartList.length == 0) {
        console.log('init_cart')
        state.cartList = JSON.parse(initCart)
      }
      console.log(state.cartList)
    },
    ADD_CART: (state, {shop_id, good_id, spec_id, good_title, good_pic, spec_title, good_price, buy_num, ischecked}) => {
      console.log(spec_id)
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
          'good_pic': good_pic,
          'good_price': good_price,
          'spec_id': spec_id,
          'spec_title': spec_title,
          'ischecked': ischecked
        }
      }
      state.cartList = { ...cart }
      setStore('buyCart', state.cartList)
    },
    //移除购物车
    REDUCE_CART: (state, {shop_id, good_id, spec_id, buy_num}) => {
      console.log('REDUCE_CART')
      let cart = state.cartList
      let shop = cart[shop_id] = (cart[shop_id] || {})
      let good = shop[good_id] = (shop[good_id] || {})
      if(good && good[spec_id]) {
        if(buy_num > 0) {
          good[spec_id]['buy_num'] -= buy_num
        } else {
          //good.remove(spec_id)
          delete good[spec_id]
        }
      }
      state.cartList = { ...cart }
      //存入localStorage
      setStore('buyCart', state.cartList)
      console.log('REDUCE_CART SUCCESS')
    },

    CHOOSE_ADDRESS:(state, {address, index}) => {
      state.choosedAddress = address
      state.addressIndex = index
    }
  },
  actions: {

  }

}

export default cart

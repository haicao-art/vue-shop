import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = r => require.ensure([], () => r(require('@/pages/home/home')), 'home')
const good = r => require.ensure([], () => r(require('@/pages/good/index')), 'good')
const goodDetail = r => require.ensure([], () => r(require('@/pages/good/detail')), 'goodDetail')
const cart = r => require.ensure([], () => r(require('@/pages/cart/cart')), 'cart')
const cartIndex = r => require.ensure([], () => r(require('@/pages/cart/index')), 'cart_index')
const comfirmOrder = r => require.ensure([], () => r(require('@/pages/cart/confirmOrder')), 'confirm_order')
const chooseAddress = r => require.ensure([], () => r(require('@/pages/cart/children/chooseAddress')), 'choose_address')

const wxfwhLogin = r => require.ensure([], () => r(require('@/pages/weixin/login')), 'wxfwhLogin')

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      meta:{
        index: 0,
        title: '定制美丽',
        keepAlive: true
      },
      component: home
    }, {
      path: '/wxfwhLogin',
      name: 'wxfwhLogin',
      meta: {
        index: 1,
        title: '微信快捷登录'
      },
      component: wxfwhLogin
    }, {
      path: '/good',
      name: 'good',
      component: good,
      meta:{
        index: 2,
        title: '商品列表'
      },
      children: [
        {
          path: 'detail',
          name: 'good_detail',
          meta:{
            index: 2,
            title: '商品详情'
          },
          component: goodDetail
        }
      ]
    }, {
      path: '/cart',
      name: 'cart',
      meta:{
        index: 3,
        title: '我的购物车',
      },
      component: cart,
      children: [
        {
          path: 'index',
          name: 'cart_index',
          meta:{
            index: 2,
            title: '我的购物车'
          },
          component: cartIndex
        },{
          path: 'confirm',
          name: 'confirm_order',
          meta:{
            index: 3,
            title: '订单结算',
          },
          component: comfirmOrder,
          children: [
            {
              path: 'chooseAddress',
              name: 'choose_address',
              meta:{
                index: 4,
                title: '我的收货地址',
              },
              component: chooseAddress
            }
          ]
        }
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
	  if (savedPosition) {
		  return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
		  return { x: 0, y: 0 }
		}
	}
})

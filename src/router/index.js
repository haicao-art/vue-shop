import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = r => require.ensure([], () => r(require('@/pages/home/home')), 'home')
const good = r => require.ensure([], () => r(require('@/pages/good/index')), 'good')
const goodDetail = r => require.ensure([], () => r(require('@/pages/good/detail')), 'goodDetail')
const cart = r => require.ensure([], () => r(require('@/pages/cart/index')), 'cart')

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
            title: '商品详情',
            keepAlive: true
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
        keepAlive: true
      },
      component: cart
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

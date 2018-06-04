import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const template = r => require.ensure([], () => r(require('@/pages/common/index')), 'template')
const icon = r => require.ensure([], () => r(require('@/pages/common/icon')), 'icon')

const home = r => require.ensure([], () => r(require('@/pages/home/home')), 'home')
const search = r => require.ensure([], () => r(require('@/pages/search/index')), 'search')
const searchList = r => require.ensure([], () => r(require('@/pages/search/list')), 'search_list')

const goodDetail = r => require.ensure([], () => r(require('@/pages/good/detail')), 'goodDetail')
const cart = r => require.ensure([], () => r(require('@/pages/cart/cart')), 'cart')
const cartIndex = r => require.ensure([], () => r(require('@/pages/cart/index')), 'cart_index')
const comfirmOrder = r => require.ensure([], () => r(require('@/pages/cart/confirmOrder')), 'confirm_order')
const chooseAddress = r => require.ensure([], () => r(require('@/pages/cart/children/chooseAddress')), 'choose_address')
const addAddress = r => require.ensure([], () => r(require('@/pages/cart/children/addAddress')), 'add_address')
const editAddress = r => require.ensure([], () => r(require('@/pages/cart/children/editAddress')), 'edit_address')

const member = r => require.ensure([], () => r(require('@/pages/member/index')), 'member')
const addressList = r => require.ensure([], () => r(require('@/pages/member/address')), 'address')
const memberAddAddress = r => require.ensure([], () => r(require('@/pages/member/children/addAddress')), 'member_add_address')
const memberEditAddress = r => require.ensure([], () => r(require('@/pages/member/children/editAddress')), 'member_edit_address')

const order = r => require.ensure([], () => r(require('@/pages/order/index')), 'order')
const detail = r => require.ensure([], () => r(require('@/pages/order/detail')), 'detail')
const logistics = r => require.ensure([], () => r(require('@/pages/order/logistics')), 'logistics')

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
      path: '/search',
      name: 'search',
      meta:{
        index: 1,
        title: '搜索'
      },
      component: template,
      children: [
        {
          path: 'index',
          name: 'search_index',
          meta:{
            index: 1,
            title: '搜索'
          },
          component: search
        },
        {
          path: 'list',
          name: 'search_list',
          meta:{
            index: 1,
            title: '搜索详情'
          },
          component: searchList
        }
      ]
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
      component: template,
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
      redirect: '/cart/index',
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
              component: chooseAddress,
              children: [
                {
                  path: 'addAddress',
                  name: 'add_address',
                  meta:{
                    index: 5,
                    title: '新增收货地址',
                  },
                  component: addAddress
                }, {
                  path: 'editAddress',
                  name: 'edit_address',
                  meta:{
                    index: 6,
                    title: '编辑收货地址',
                  },
                  component: editAddress
                }
              ]
            }
          ]
        }, {
          path: '*',
          name: 'other',
          redirect: '/cart/index',
        }
      ]
    },{
      path: '/member',
      name: 'member',
      meta:{
        index: 5,
        title: '个人中心',
        keepAlive: true,
      },
      component: template,
      children: [
        {
          path: 'index',
          name: 'member_index',
          meta: {
            index: 6,
            title: '个人中心',
            keepAlive: true,
          },
          component: member
        }, {
          path: 'address',
          name: 'address_list',
          meta: {
            index: 7,
            title: '收货地址管理',
          },
          component: addressList,
          children: [
            {
              path: 'addAddress',
              name: 'add_address',
              meta:{
                index: 5,
                title: '新增收货地址',
              },
              component: memberAddAddress
            }, {
              path: 'editAddress',
              name: 'edit_address',
              meta:{
                index: 6,
                title: '编辑收货地址',
              },
              component: memberEditAddress
            }
          ]
        }
      ]
    },{
      path: '/order',
      name: 'order',
      component: template,
      children: [
        {
          path: 'index',
          name: 'order_index',
          meta: {
            index: 7,
            title: '订单列表',
          },
          component: order
        }, {
          path: 'detail',
          name: 'order_detail',
          meta: {
            index: 8,
            title: '订单详情',
          },
          component: detail
        }, {
          path: 'logistics',
          name: 'order_logistics',
          meta: {
            index: 9,
            title: '订单物流信息',
          },
          component: logistics
        }
      ]
    }, {
      path: '/icon',
      name: 'icon',
      meta: {
        index: 8,
        title: 'icon',
      },
      component: icon,
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

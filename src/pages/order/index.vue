<template>
  <div class="orders_container" v-wechat-title="$route.meta.title">
    <header-top :navbarTitle="$route.meta.title" leftText="返回" leftArrow></header-top>
    <section class="orders-nav-bar size12">
      <ul>
        <li>
          <router-link :to="{ path: '/order/index', params: {state: ''} }" :class="state == '' ? 'activated' : ''" replace>全部</router-link>
        </li>
        <li>
          <router-link :to="{ path: '/order/index', query: {state: '待付款'} }" :class="state == '待付款' ? 'activated' : ''" replace>待付款</router-link>
        </li>
        <li>
          <router-link :to="{ path: '/order/index', query: {state: '待发货'} }" :class="state == '待发货' ? 'activated' : ''" replace>待发货</router-link>
        </li>
        <li>
          <router-link :to="{ path: '/order/index', query: {state: '待收货'} }" :class="state == '待收货' ? 'activated' : ''" replace>待收货</router-link>
        </li>
      </ul>
    </section>

    <section class="orders" v-if="orders.length">
      <van-list v-model="listLoading" :finished="finished" :offset="offset" @load="onLoad" >
        <section v-for="order in orders" :key="order.id" class="orders-item">
          <router-link :to="{ path: '/order/detail', query: {id: order.id} }">
            <van-cell :title="order.order_sn" :value="order.order_status" is-link style="font-size: .5rem;">
                <div slot="title" class="size12">{{order.order_sn}}</div>
                <div class="orders-status size12" >{{order.order_status}}</div>
            </van-cell>
            <div class="orders-goods" v-for="(good, index) in order.goods" :key="index">
              <van-cell-group>
                <van-card desc="" :num="good.buy_num" price="1200" :thumb="good.good_pic">
                  <div slot="title" class="goods-title">
                    <van-tag mark plain type="danger" class="tag-item" v-if="good.good_trade_type">{{good.good_trade_type}}</van-tag>{{good.good_title}}
                  </div>
                  <div slot="desc" class="goods-desc">
                    {{formatPrice(good.good_price)}}<span class="goods-desc-num"> x {{good.buy_num}}</span>
                  </div>
                  <div slot="tags" class="goods-tags">
                    {{good.spec_title}}
                  </div>
                </van-card>
              </van-cell-group>
            </div>
            <van-cell class="orders-goods-footer">
              <div slot="title" class="size12">共{{order.goods.length}}样商品</div>
              <div class="orders-amount size12">金额:<span class="price">{{formatPrice(order.order_amount)}}</span>(含运费:{{formatPrice(order.shipping_amount)}})</div>
            </van-cell>
          </router-link>
          <div class="orders-footer">
            <van-button size="small" type="danger" v-if="order.order_status == '待付款'">立即支付</van-button>
            <van-button size="small" type="danger" v-if="order.order_status == '已完成' || order.order_status == '已取消'">删除订单</van-button>
            <van-button size="small" v-if="order.order_status == '已完成' || order.order_status == '已取消'">查看物流</van-button>
          </div>
        </section>
      </van-list>
    </section>
    <section v-else class="has-no-order">

    </section>
  </div>
</template>

<script>
  import { list } from '@/apis/order'
  import headerTop from '@/components/header/header'
  import { Tag, Card, Tabbar, TabbarItem, Cell, CellGroup, Button, List} from 'vant'
  export default {
    components: {
      headerTop,
      [Tag.name]: Tag,
      [Card.name]: Card,
      [Tabbar.name]: Tabbar,
      [TabbarItem.name]: TabbarItem,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Button.name]: Button,
      [List.name]: List
    },
    data() {
      return {
        ready: false,
        state: '',
        page: 1,
        limit: 20,
        timeout: 500,
        listLoading: false, //是否显示加载中提示，加载过程中不触发load事件
        finished: false,  //是否已加载完成，加载完成后不再触发load事件
        offset: 100,    //list  滚动条与底部距离小于 offset 时触发load事件
        orders: []
      }
    },
    mounted() {
      this.state = this.$route.query.state || ''
      console.log('order index mounted')
      this.init()
    },
    update() {
      console.log('order index created')
    },
    created() {
      console.log('order index created')
    },
    activated() {
      console.log('order index activated')
    },
    deactivated() {
      console.log('order index deactivated')
    },
    watch: {
      '$route' (to, from) {
        this.state = to.query.state || ''
        this.finished = true
        this.listLoading = true
        this.init()
      }
    },
    methods: {
      async init() {
        let token = this.$store.getters.token
        await list({token: token, state: this.state, page: 1, limit: this.limit}).then(response => {
          let _data = response.data
          this.orders = _data.items
          if(_data.items.length < this.limit) {
            this.listLoading = false
            this.finished = true
          }
          this.ready = true
          console.log(response)
        }).catch(error => {
          console.log(error)
        })
      },
      formatPrice(good_price) {
        return '￥' + (good_price / 100).toFixed(2)
      },
      onLoad() {
        if(this.ready) {
          setTimeout(() => {
            this.page = this.page + 1
            let token = this.$store.getters.token
            list({token: token, state: this.state, page: this.page, limit: this.limit}).then(respone => {
              let _data = respone.data
              if(_data.items.length < this.limit) {
                this.finished = true
              }
              if(_data.items.length > 0) {
                this.orders.push(..._data.items)
              }
              this.listLoading = false
            }).catch(error => {
              this.$toast(error)
            })
          }, this.timeout)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .orders_container {
    .orders {
      &-nav-bar {
        margin-bottom: .5rem;
        ul {
          display: flex;
          background-color: #fff;
          li {
            font-size: .5rem;
            line-height: 1.5rem;
            width: 25%;
            text-align: center;
            a {
              color: #000;
              &:active {
                color: #f44;
              }
              &.activated {
                color: #f44;
              }
            }
          }
        }
      }
      .size12 {
        font-size: .5rem;
      }
      &-item {
        margin-bottom: .5rem;
      }
      &-status {
        color: #f44;
      }
      &-amount {
        font-size: .5rem;
      }
      &-goods {
        .goods-title {
          font-size: .5rem;
          max-height: 36px;
          overflow: hidden;
        }
        .goods-desc {
          font-size: .5rem;
          text-align: right;
          &-num {
            color: #f44;
            font-weight: bold;
          }
        }
        .goods-tags {
          font-size: .5rem;
        }
        &-footer {
          .price {
            color: #f44;
          }
        }
      }
      &-footer {
        background-color: #fff;
        text-align: right;
        padding: .2rem .5rem .3rem;
        border-top: 1px solid #eee;
      }
    }

    .has-no-order {
      font-size: 1rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      line-height: 10rem;
      min-height: 10rem;
      a {
        color: #f44;
      }
    }
  }
</style>

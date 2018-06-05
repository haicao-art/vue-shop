<template>
  <div class="orders_container" v-wechat-title="$route.meta.title">
    <header-top :navbarTitle="$route.meta.title" leftText="返回" leftArrow gobackUrl="/order/index"></header-top>
    <section class="orders">
      <section class="orders-top-message">
        <span>{{order.order_status}}</span>
      </section>
      <!-- 收货地址 -->
      <section class="address_container">
        <div class="address_empty_left">
          <svg class="location_icon">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#location"></use>
          </svg>
          <div class="address_detail_container">
            <header>
              <span>{{order_consignee.consignee}}</span>
              <span>{{order_consignee.mobile}}</span>
            </header>
            <div class="address_detail">
              <span>{{order_consignee.province}} {{order_consignee.city}} {{order_consignee.district}} {{order_consignee.address}}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 商品信息 -->
      <div class="orders-goods" v-for="(good, index) in order_goods" :key="index">
        <van-cell-group>
          <van-card desc="" :num="good.buy_num" :thumb="good.good_pic">
            <div slot="title" class="goods-title size12">
              <van-tag mark plain type="danger" class="tag-item" v-if="good.good_trade_type">{{good.good_trade_type}}</van-tag>{{good.good_title}}
            </div>
            <div slot="desc" class="goods-desc size12">
              {{formatPrice(good.good_price)}}<span class="goods-desc-num"> x {{good.buy_num}}</span>
            </div>
            <div slot="tags" class="goods-tags size12">
              {{good.spec_title}}
            </div>
          </van-card>
        </van-cell-group>
      </div>

      <section class="order-base-info size12">
        <ul class="order-amount">
          <li>商品金额:<span>{{formatPrice(order.good_amount)}}</span></li>
          <li>关   税:<span>{{formatPrice(order.tax_amount)}}</span></li>
          <li>运   费:<span>{{formatPrice(order.shipping_amount)}}</span></li>
          <li>优惠金额:<span>{{formatPrice(order.coupon_amount)}}</span></li>
        </ul>
        <ul class="order-amount real-pay">
          <li>实   付: <span>{{formatPrice(order.order_amount)}}</span></li>
        </ul>
        <ul class="base-info info">
          <li>订单信息</li>
        </ul>
        <ul class="info">
          <li><span>订 单 号:</span>{{order.id}}</li>
          <li><span>订单编号:</span>{{order.order_sn}}</li>
          <li class="red"><span>订单状态:</span>{{order.order_status}}</li>
          <li><span>创建时间:</span>{{order.create_time}}</li>
          <li v-if="order.send_time > 0"><span>发货时间:</span>{{order.send_time}}</li>
          <li v-if="order.confirm_time > 0"><span>签收时间:</span>{{order.confirm_time}}</li>
          <li v-if="order.over_time > 0"><span>完成时间:</span>{{order.over_time}}</li>
        </ul>
        <ul class="info" v-if="order_pay">
          <li><span>支付方式:</span>{{order_pay.pay_title}}</li>
          <li><span>支付金额:</span>{{formatPrice(order_pay.pay_money)}}</li>
          <li><span>支付流水:</span>{{order_pay.pay_serial_number}}</li>
          <li v-if="order.send_time > 0"><span>支付时间:</span>{{order_pay.pay_time}}</li>
        </ul>
      </section>

    </section>
  </div>
</template>

<script>
  import { detail } from '@/apis/order'
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
    },
    data() {
      return {
        order_id: null,
        order: [],
        order_goods: [],
        order_consignee: [],
        order_pay: []
      }
    },
    mounted() {
      this.order_id = this.$route.query.id || false
      console.log('order detail mounted')
      this.init()
    },
    update() {
      console.log('order detail created')
    },
    created() {
      console.log('order detail created')
    },
    activated() {
      console.log('order detail activated')
    },
    deactivated() {
      console.log('order detail deactivated')
    },
    methods: {
      async init() {
        if(!this.order_id) {
          this.$toast.loading({
            duration: 0,
            forbidClick: true,
            loadingType: 'spinner',
            message: '请求参数异常'
          })
          setTimeout(() => {
            this.$toast.clear()
            this.$router.go(-1)
          }, 2000)
        }
        let token = this.$store.getters.token
        await detail({token: token, order_id: this.order_id}).then(response => {
          console.log(response)
          let _data = response.data
          this.order = _data.order
          this.order_goods = _data.order_goods
          this.order_consignee = _data.order_consignee
          this.order_pay = _data.order_pay
        }).catch(error => {
          console.log(error)
        })
      },
      formatPrice(good_price) {
        return '￥' + (good_price / 100).toFixed(2)
      },
    }
  }
</script>

<style lang="less" scoped>
  .orders_container {
    .orders {
      &-top-message {
        display: flex;
        line-height: 4rem;
        background-color: #f66;
        padding: .4rem;
        span {
          color: #fff;
        }
      }
      .size12 {
        font-size: .55rem;
      }
      .address_container {
        display: block;
        position: relative;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        min-height: 2rem;
        line-height: 2rem;
        margin-bottom: .2rem;
        padding: .3rem 0 .1rem 0;
        &::after {
          content: '';
          position: absolute;
          width: 100%;
          display: flex;
          height: 2px;
          background: repeating-linear-gradient(
            -45deg,
            #ff6c6c 0,
            #ff6c6c 20%,
            transparent 0,
            transparent 25%,
            #3283fa 0,
            #3283fa 45%,
            transparent 0,
            transparent 50%
          );
          background-size: 3rem;
        }
        .address_empty_left {
          display: inline-block;
          align-items: center;
          padding-left: .3rem;
          .location_icon{
            position: absolute;
            top: 50%;
            transform: translate3d(0, -50%, 0);
            display: inline-block;
            vertical-align: middle;
            width: .8rem;
            height: .8rem;
            fill: #38f;
            margin-right: .2rem;
          }
          .address_detail_container {
            display: inline-block;
            margin-left: 1.2rem;
            height: 2rem;
            line-height: 1rem;
            header {
              font-size: .65rem;
              color: #333;
              span:nth-of-type(1) {
                font-size: .8rem;
                font-weight: bold;
              }
            }
            .address_detail {
              display: block;
              width: 100%;
              align-items: center;
              span {
                font-size: .55rem;
                line-height: 1rem;
                color: #777;
              }
            }
          }
        }
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

      .order-base-info {
        ul {
          background-color: #fff;
          display: flex;
          flex-direction: column;
          padding-right: .5rem;
          line-height: 1.2rem;
          .red {
            color: #f44;
          }
        }
        .info {
          padding-left: .2rem;
          span {
            padding: 0 .2rem;
            width: 2.5rem;
            display: inline-block;
            color: #444;
            text-align: right;
          }
        }
        .base-info {
          margin-top: .3rem;
          line-height: 2rem;
          border-bottom: 1px solid #eee;
          font-size: .6rem;
          font-weight: bold;
        }
        .order-amount {
          align-items: flex-end;
          li {
            span {
              width: 60px;
              display: inline-block;
              padding-left: .2rem;
              text-align: left;
            }
          }
        }
        .real-pay {
          font-size: .6rem;
          color: #f44;
          border-top: 1px solid #eee;
          li {
            line-height: 2rem;
            span {
              font-weight: bold;
            }
          }
        }
      }
    }
  }
</style>

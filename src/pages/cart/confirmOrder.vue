<template>
  <div class="carts" v-wechat-title="$route.meta.title">
    <header-top :navbarTitle="$route.meta.title" leftText="返回" leftArrow></header-top>

    <router-link :to="{path: 'confirm/chooseAddress'}" class="address_container">
      <section class="address">
        <div class="address_empty_left">
          <svg class="location_icon">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#location"></use>
          </svg>
          <div class="add_address" v-if="!choosedAddress">请添加一个收货地址</div>
          <div v-else class="address_detail_container">
            <header>
              <span>{{choosedAddress.consignee}}</span>
              <span>{{choosedAddress.mobile}}</span>
            </header>
            <div class="address_detail">
              <span>{{choosedAddress.address}}</span>
            </div>
          </div>
        </div>
        <svg class="address_empty_right">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
        </svg>
      </section>
    </router-link>

    <van-cell-group>
      <van-cell value="商品信息" :border="false"/>
    </van-cell-group>
    <div class="carts-goods" v-for="(good, index) in goods" :key="index">
      <van-cell-group>
        <van-card desc="" :num="good.buy_num" price="1200" :thumb="good.good_pic">
          <div slot="title" class="carts-goods-title">
            <van-tag mark plain type="danger" class="carts-tag-item">{{good.good_trade_type}}</van-tag>{{good.good_title}}
          </div>
          <div slot="desc" class="carts-goods-desc">
            {{formatPrice(good.price)}}<span class="carts-goods-desc-num"> x {{good.buy_num}}</span>
          </div>
          <div slot="tags" class="carts-goods-tags">
            {{good.spec_title}}
          </div>
        </van-card>
      </van-cell-group>
    </div>
    <div class="carts-total">
      <van-cell-group>
        <van-cell title="配送方式">
          <div slot="" class="carts-freight">
            普通快递
          </div>
        </van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="支付方式"></van-cell>
        <div class="carts-choose_type_container">
          <ul>
            <li v-for="item in payments" :key="item.id" :class="{choose: payment_id === item.id}">
              <span>{{item.title}}</span>
              <svg class="address_empty_right" @click="choosePayWay(item)">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
              </svg>
            </li>
          </ul>
        </div>
      </van-cell-group>

      <van-cell-group style="margin: 5px 0 60px;">
        <van-cell title="优惠券" is-link>
          <div slot="" class="carts-coupon">
            暂无可用
          </div>
        </van-cell>
        <van-cell title="商品金额" :value="formatPrice(good_price)" />
        <van-cell title="关税" :value="formatPrice(tax_price)" v-if="tax_price" />
        <van-cell title="运费" :value="formatPrice(freight)" />
      </van-cell-group>
    </div>

    <van-submit-bar v-if="showSubmitBar" :loading="loading" :price="totalPrice" button-text="提交订单" @submit="onSubmit"/>

    <!-- 遮罩层 -->
    <transition name="fade">
      <div class="carts-cover" v-if="showPayment" @click="onClickChoosePayment"></div>
    </transition>

    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import wx from 'weixin-js-sdk'
  import { checkout, orders, orderPay } from '@/apis/cart'
  import { signature } from '@/apis/wxjssdk'
  import headerTop from '@/components/header/header'
  import { Tag, Card, Cell, CellGroup, SubmitBar, Popup } from 'vant';
  export default {
    components: {
      headerTop,
      [Tag.name]: Tag,
      [Card.name]: Card,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [SubmitBar.name]: SubmitBar,
      [Popup.name]:Popup
    },
    data() {
      return {
        showSubmitBar: false,
        showPayment: false,
        checked: false,
        loading: false,
        payment_id: 1,
        payment: null,
        good_price: 100,
        freight: 0,
        tax_price: 0,
        coupon: 0,
        entities: [],
        goods: [],
        payments: []
      }
    },
    mounted() {
      console.log('confirmOrder mounted')
      this.goods = []
      this.INIT_CART()
      let cart_list = this.cartList[1]
      for(let idx in cart_list) {
        for(let index in cart_list[idx]) {
          let good = cart_list[idx][index]
          if(good.ischecked) {
            this.entities.push(good)
          }
        }
      }
      if(this.entities.length === 0) {
        this.$router.replace({ path: '/cart/index'})
      }
      this.init()
    },
    created() {
      console.log('confirmOrder created')
    },
    activated() {
      console.log('confirmOrder activated')
    },
    deactivated() {
      console.log('confirmOrder deactivated')
    },
    computed: {
      ...mapState({
        cartList: state => state.cart.cartList,
        choosedAddress: state => state.cart.choosedAddress
      }),
      totalPrice() {
        console.log('totalPrice')
        return this.good_price + this.tax_price + this.freight - this.coupon
      }
    },
    methods: {
      ...mapMutations([
        'INIT_CART', 'REDUCE_CART'
      ]),
      async init() {
        let token = this.$store.getters.token
        await checkout({token: token, entities: this.entities}).then(response => {
          console.log(response)
          let _data = response.data
          this.good_price = _data.good_price
          this.freight = _data.freight
          this.tax_price = _data.tax_price
          this.goods = _data.goods
          _data.payments.map(item => {
            if(item.default) {
              this.payment = item
            }
          })
          this.payments = _data.payments
        }).catch(error => {
          console.log('checout error')
          console.log(error)
          //this.$router.replace({'path': '/cart/index'})
        })
        this.signatureMethod()
        setTimeout(() => {
          this.showSubmitBar = true
        }, 1400)
      },
      formatPrice(good_price) {
        return '￥' + (good_price / 100).toFixed(2)
      },
      async onSubmit() {
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
          loadingType: 'spinner',
          message: '正在发送请求...'
        })
        console.log('开始准备提交订单')
        if(!this.choosedAddress) {
          console.log('请选择收货地址')
          return
        }
        if(!this.payment) {
          console.log('请选择支付方式')
          return
        }
        console.log(this.payment)
        //创建成功 调用支付接口 清除state状态
        let token = this.$store.getters.token
        await orders({token: token, entities: this.entities, consignee_id: this.choosedAddress.id, payment: this.payment}).then(response => {
          this.$toast.success({
            duration: 3000,
            forbidClick: true,
            loadingType: 'spinner',
            message: '订单创建成功'
          })
          //清除state localStorage
          this.entities.forEach((item, index) => {
            this.REDUCE_CART({shop_id: 1, good_id: item.good_id, spec_id: item.spec_id, buy_num: 0})
          })
          return response
        }).then(response => {
          let _data = response.data
          setTimeout(() => {
            this.$toast.loading({
              duration: 0,
              forbidClick: true,
              loadingType: 'spinner',
              message: '正在发起支付请求'
            })
          }, 1000)
          const order_id = _data.order_id
          orderPay({token: token, order_id: order_id}).then(response => {
            let _data = response.data
            console.log(_data.prePay)
            wx.ready(function() {
              wx.chooseWXPay({
                timestamp: _data.prePay.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: _data.prePay.nonceStr, // 支付签名随机串，不长于 32 位
                package: _data.prePay.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                signType: _data.prePay.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: _data.prePay.paySign, // 支付签名
                success: function (res) {
                  // 支付成功后的回调函数
                  console.log('来这里了....表示支付失败')
                  console.log(res)
                }
              });
            })
          }).catch(error => {
            console.log('来这里了....表示支付失败')
            console.log(error)
          })

          setTimeout(() => {
            console.log('支付完成')
            this.$toast.clear()
            this.$router.replace({path: '/order/detail', query: {id: order_id}})
          }, 3000)


        }).catch(error => {
          console.log('来这里了....表示创建订单失败')
          this.$toast.fail(error.desc)
        })
      },
      async signatureMethod() {
        let that = this
        let _url = document.URL
        await signature(_url, ['chooseWXPay']).then(response => {
          let _config = response.data.config
          wx.config(_config)
        }).catch(error => {
          console.log(error)
        })
      },
      //点击选择联系人
      onContactClick() {
        console.log('onContactClick')
        this.$router.replace({path: 'chooseAddress'})
      },
      onClickChoosePayment() {
        this.showPayment = !this.showPayment
      },
      //选择付款方式
      choosePayWay(payment){
        //this.showPayment = !this.showPayment;
        this.payment_id = payment.id
        this.payment = payment
      },
    }
  }
</script>
<style lang="less" scoped>
  .carts {
    .address_container {
      display: block;
      position: relative;
      justify-content: space-between;
      align-items: center;
      margin-bottom: .3rem;
      background-color: #fff;
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
      .address {
        min-height: 2rem;
        line-height: 2rem;
        padding: .5rem;
      }
      .address_empty_left {
        display: inline-block;
        align-items: center;
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
        .add_address {
          display: inline-block;
          font-size: .7rem;
          margin-left: 1.2rem;
          color: #333;
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
      .address_empty_right{
        position: absolute;
        top: 50%;
        right: 10px;
        width: .6rem;
        height: .6rem;
        fill: #999;
        transform: translate3d(0, -50%, 0);
      }
    }
    &-tag-item {
      padding: 1px 5px;
      margin-right: 4px;
      &::after {
        border-radius: 8px;
      }
    }
    &-coupon, &-freight {
      color: #f44;
    }

    &-total {
      margin-top: 5px;
    }

    &-goods {
      background-color: #fff;
      position: relative;
      &-title {
        font-size: .5rem;
        max-height: 36px;
        overflow: hidden;
      }
      &-desc {
        display: block;
        font-size: .5rem;
        text-align: right;
        &-num {
          color: #f44;
          font-weight: bold;
        }
      }
      &-tags, &-footer {
        font-size: .5rem;
      }
      .van-card {
        margin-left: 0px;
      }
    }

    &-cover{
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0,0,0,.3);
      z-index: 199;
    }

    &-choose_type_container {
      background-color: #fff;
      position: relative;
      width: 100%;
      header{
        background-color: #fafafa;
        font-size: .7rem;
        color: #333;
        text-align: center;
        line-height: 2rem;
      }
      ul{
        li{
          display: flex;
	        justify-content: space-between;
          padding: 0 .7rem;
          line-height: 2rem;
          align-items: center;
          span{
            font-size: .7rem;
            color: #666;
          }
          svg{
            width: .8rem;
            height: .8rem;
            fill: #eee;
          }
        }
        .choose{
          span{
          }
          svg{
            fill: #4cd964;
          }
        }
      }
    }
  }
  .address_empty_right{
    width: .6rem;
    height: .6rem;
    fill: #999;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
  .slid_up-enter-active, .slid_up-leave-active {
    transition: all .3s;
  }
  .slid_up-enter, .slid_up-leave-active {
    transform: translate3d(0,10rem,0)
  }
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
</style>

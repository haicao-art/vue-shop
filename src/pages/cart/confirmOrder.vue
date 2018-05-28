<template>
  <div class="carts" v-wechat-title="$route.meta.title">
    <header-top :navbarTitle="$route.meta.title" leftText="返回" leftArrow></header-top>

    <div class="carts-contact-card carts-contact-card--add" @click="onContactClick()">
      <div class="carts-contact-card__content">
        <i class="van-icon van-icon-add2 carts-contact-card__icon"><!----></i>
        <div class="carts-contact-card__text">添加订单联系人信息</div>
      </div>
      <i class="van-icon van-icon-arrow carts-contact-card__arrow"><!----></i>
    </div>

    <van-cell-group>
      <van-cell value="商品信息" :border="false"/>
    </van-cell-group>
    <div class="carts-goods" v-for="(good, index) in goods" :key="index">
      <van-cell-group>
        <van-card desc="" :num="good.buy_num" :price="formatPrice(good.price)" :thumb="good.good_pic">
          <div slot="title" class="carts-goods-title">
            <van-tag mark plain type="danger" class="carts-tag-item">{{good.good_trade_type}}</van-tag>{{good.good_title}}
          </div>
          <div slot="tags">
            {{good.spec_title}}
          </div>
          <div slot="footer">
            {{good.good_origin}}
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

      <van-cell-group style="margin-top: 5px;">
        <van-cell title="商品金额" value="￥198.00" />
        <van-cell title="运费" value="￥5.00" />
        <van-cell title="优惠券" is-link>
          <div slot="" class="carts-coupon">
            暂无可用
          </div>
        </van-cell>
      </van-cell-group>
    </div>

    <van-submit-bar :loading="loading" :price="totalPrice" button-text="提交订单" @submit="onSubmit"/>

  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import { checkout } from '@/apis/cart'
  import headerTop from '@/components/header/header'
  import { Tag, Card, Cell, CellGroup, SubmitBar } from 'vant';
  export default {
    components: {
      headerTop,
      [Tag.name]: Tag,
      [Card.name]: Card,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [SubmitBar.name]: SubmitBar
    },
    data() {
      return {
        checked: false,
        loading: false,
        good_price: 100,
        freight: 0,
        coupon: 0,
        entities: [],
        goods: []
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
        cartList: state => state.cart.cartList
      }),
      totalPrice() {
        return this.good_price + this.freight - this.coupon
      }
    },
    methods: {
      ...mapMutations([
        'INIT_CART'
      ]),
      goodTitle(title, trade_type) {
        return '['+trade_type+']' + title
      },
      async init() {
        let token = this.$store.getters.token
        await checkout({token: token, entities: this.entities}).then(response => {
          console.log(response)
          let _data = response.data
          this.goods = _data.goods
        }).catch(error => {
          console.log(error)
        })
        console.log(this.cartList)
      },
      formatPrice(good_price) {
        return (good_price / 100).toFixed(2)
      },
      onSubmit() {
      },
      //点击选择联系人
      onContactClick() {
        console.log('onContactClick')
      }
    }
  }
</script>
<style lang="less">
  .carts {
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
    &-contact-card {
      position: relative;
      background-color: #fff;
      margin: 5px 0px 10px;
      &::after {
        content: '';
        display: block;
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
    }
    &-contact-card--add {
      line-height: 2rem;
    }
    &-contact-card__content {
      padding: .65rem .5rem
    }
    &-contact-card__icon {
      width: 39px;
      color: #38f;
      font-size: 1.7rem;
      vertical-align: middle;
    }
    &-contact-card__arrow {
      top: 50%;
      right: 10px;
      font-size: .5rem;
      position: absolute;
      color: #999;
      transform: translate3d(0, -50%, 0);
    }
    &-contact-card__text {
      line-height: .9rem;
      font-size: .6rem;
      display: inline-block;
      vertical-align: middle;
    }

    &-total {
      margin-top: 5px;
    }

    &-goods {
      background-color: #fff;
      position: relative;
      &-title {
        max-height: 36px;
        overflow: hidden;
      }
      .van-card {
        margin-left: 0px;
      }
    }
  }
</style>

<template>
  <div class="carts" v-wechat-title="$route.meta.title">
    <header-top :navbarTitle="$route.meta.title" leftText="返回" leftArrow></header-top>
    <van-checkbox-group class="carts-goods" v-for="(good, index) in goods" :key="index" v-model="checkedGoods">
      <van-checkbox class="carts-goods__item" :key="good.spec_id" :name="good.spec_id"></van-checkbox>
      <van-card :title="good.good_title" :desc="good.spec_title" :num="good.buy_num" :price="formatPrice(good.good_price)" :thumb="good.good_pic">
        <div slot="footer">
          <van-stepper :default-value="good.buy_num" v-model="good.buy_num" :min="good.min" :max="good.max" :step="good.step" integer disable-input/>
        </div>
      </van-card>
    </van-checkbox-group>
    <van-submit-bar :loading="loading" :price="totalPrice" :disabled="!checkedGoods.length" :button-text="submitBarText" @submit="onSubmit">
      <van-checkbox v-model="checked" @change="allChecked()">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import headerTop from '@/components/header/header'
  import { Checkbox, CheckboxGroup, Card, SubmitBar, Stepper } from 'vant';
  export default {
    components: {
      headerTop,
      [Checkbox.name]: Checkbox,
      [CheckboxGroup.name]: CheckboxGroup,
      [Card.name]: Card,
      [SubmitBar.name]: SubmitBar,
      [Stepper.name]: Stepper
    },
    data() {
      return {
        checked: false,
        loading: false,
        checkedGoods: [],
        goods: []
      }
    },
    mounted() {
    },
    created() {
    },
    activated() {
      this.INIT_CART()
      let cart_list = this.cartList[1]
      for(let idx in cart_list) {
        for(let index in cart_list[idx]) {
          let good = cart_list[idx][index]
          this.goods.push(good)
        }
      }
      console.log(cart_list)
    },
    computed: {
      ...mapState({
        cartList: state => state.cart.cartList
      }),
      submitBarText() {
        let count = this.checkedGoods.length
        return '结算' + (count ? `(${count})` : '')
      },
      totalPrice() {
        return this.goods.reduce((total, item) => total + (this.checkedGoods.indexOf(item.spec_id) !== -1 ? item.good_price * item.buy_num : 0), 0)
      }
    },
    methods: {
      ...mapMutations([
        'INIT_CART'
      ]),
      formatPrice(good_price) {
        return (good_price / 100).toFixed(2)
      },
      onSubmit() {
        //checkout
        this.$toast('结算中...')
      },
      allChecked() {
        let that = this
        that.checkedGoods = []
        if(that.checked) {
          //this.checkedGoods.push(this.goods.forEach())
          that.goods.forEach((good, index) => {
            that.checkedGoods.push(good.spec_id)
          })
        }
      }
    }
  }
</script>

<style lang="less">
  .carts {
    &-goods {
      background-color: #fff;
      position: relative;
      .van-card {
        margin-left: 25px;
        padding-right: 5px;
        background-color: #fff;
      }
      &__item {
        position: absolute;
        width: 32px;
        height: 32px;
        top: 30%;
        margin-bottom: 5px;
        .van-checkbox__label {
          width: 100%;
          padding: 0 10px 0 15px;
          box-sizing: border-box;
        }
      }
      .van-checkbox__icon {
        top: 50%;
        left: 10px;
        z-index: 1;
        position: absolute;
        margin-top: -10px;
      }
      .van-card__price {
        color: #f44;
      }
    }
    .van-submit-bar {
      border-top: 1px solid #eee;
      .van-checkbox {
        margin-left: 5px;
      }
    }
  }
</style>

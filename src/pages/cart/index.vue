<template>
  <div class="carts" v-wechat-title="$route.meta.title">
    <header-top :navbarTitle="$route.meta.title" leftText="返回" leftArrow></header-top>
    <van-checkbox-group class="carts-goods" v-for="(good, index) in goods" :key="index" v-model="checkedGoods">
      <van-checkbox class="carts-goods__item" :key="good.id" :name="good.id"></van-checkbox>
      <van-card :title="good.title" :desc="good.desc" :num="good.num" :price="formatPrice(good.sale_price)" :thumb="good.thumb">
        <div slot="footer">
          <van-stepper :default-value="good.num" v-model="good.num" :min="good.min" :max="good.max" :step="good.step" integer disable-input/>
        </div>
      </van-card>
    </van-checkbox-group>
    <van-submit-bar :loading="loading" :price="totalPrice" :disabled="!checkedGoods.length" :button-text="submitBarText" @submit="onSubmit">
      <van-checkbox v-model="checked" @change="allChecked()">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
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
        checkedGoods: ['1'],
        goods: [{
          id: '1',
          title: '进口香蕉',
          desc: '约250g， 2根',
          sale_price: 200,
          num: 2,
          min: 1,
          max: 100,
          step: 2,
          thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
        }, {
          id: '2',
          title: '陕西蜜梨',
          desc: '约600g',
          sale_price: 690,
          num: 10,
          min: 10,
          step: 10,
          thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
        }]
      }
    },
    mounted() {
    },
    computed: {
      submitBarText() {
        let count = this.checkedGoods.length
        return '结算' + (count ? `(${count})` : '')
      },
      totalPrice() {
        return this.goods.reduce((total, item) => total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.sale_price * item.num : 0), 0)
      }
    },
    methods: {
      formatPrice(sale_price) {
        return (sale_price / 100).toFixed(2)
      },
      onSubmit() {
        this.$toast('结算中...')
      },
      allChecked() {
        let that = this
        that.checkedGoods = []
        if(that.checked) {
          //this.checkedGoods.push(this.goods.forEach())
          that.goods.forEach((good, index) => {
            that.checkedGoods.push(good.id)
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

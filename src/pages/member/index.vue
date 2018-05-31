<template>
  <div class="member_container" v-wechat-title="$route.meta.title">
    <header-top :navbarTitle="$route.meta.title" leftText="返回" leftArrow></header-top>

    <section>
      <section class="member-detail">
        <img :src="member.avatar" />
        <p>{{member.nickname}}</p>
      </section>

      <section class="member-orders">
        <van-cell title="我的订单" value="全部订单" is-link @click="onClickAllOrder()"/>
        <van-tabbar style="position: relative; height: 60px;">
          <van-tabbar-item icon="pending-payment" info="20" :to="{path: '/order/index', query: {'state': '待付款'}}">待付款</van-tabbar-item>
          <van-tabbar-item icon="pending-deliver" :to="{path: '/order/index', query: {'state': '待发货'}}">待发货</van-tabbar-item>
          <van-tabbar-item icon="logistics" :to="{path: '/order/index', query: {'state': '待收货'}}">待收货</van-tabbar-item>
          <van-tabbar-item icon="pending-orders" :to="{path: '/order/index', query: {'state': '售后'}}">退款/售后</van-tabbar-item>
        </van-tabbar>
      </section>
    </section>
  </div>
</template>

<script>
  import { info } from '@/apis/member'
  import headerTop from '@/components/header/header'
  import {Tabbar, TabbarItem, Cell} from 'vant'
  export default {
    components: {
      headerTop,
      [Tabbar.name]: Tabbar,
      [TabbarItem.name]: TabbarItem,
      [Cell.name]: Cell,
    },
    data() {
      return {
        member: []
      }
    },
    mounted() {
      console.log('member index mounted')
      this.init()
    },
    created() {
      console.log('member index created')
    },
    activated() {
      console.log(this.member)
      console.log('member index activated')
    },
    deactivated() {
      console.log('member index deactivated')
    },
    methods: {
      async init() {
        let token = this.$store.getters.token
        await info(token).then(response => {
          let _data = response.data
          this.member = _data.member
          console.log(response)
        }).catch(error => {
          console.log(error)
        })
        console.log(this.member)
      },
      onClickAllOrder() {
        this.$router.push({path: '/order/index'})
      }
    }
  }
</script>

<style lang="less" scoped>
  .member_container {
    .member-detail {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: .5rem;
      background-color: #fff;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50px;
      }
      p {
        font-size: .6rem;
      }
    }
    .member-orders {
      margin-top: .5rem;
    }
  }
</style>

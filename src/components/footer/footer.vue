<template>
  <footer id="footer">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home" :to="{path: '/'}">首页</van-tabbar-item>
      <van-tabbar-item icon="search" :to="{path: '/search'}">搜索</van-tabbar-item>
      <van-tabbar-item icon="records" :to="{path: '/orders/index'}">订单</van-tabbar-item>
      <van-tabbar-item icon="contact" :to="{path: '/member/index'}">个人中心</van-tabbar-item>
    </van-tabbar>
  </footer>
</template>

<script>
  import { Tabbar, TabbarItem } from 'vant';
  export default {
    components: {
      [Tabbar.name]: Tabbar,
      [TabbarItem.name]: TabbarItem
    },
    data() {
      return {
        active: 0
      }
    },
    mounted() {

    },
    props: [

    ],
    methods: {
    }
  }
</script>

<style lang="less" scoped>
  #footer {
    max-width: 750px;
    margin-top: 51px;
  }
</style>

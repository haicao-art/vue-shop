<template>
  <footer id="footer">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item icon="search">搜索</van-tabbar-item>
      <van-tabbar-item icon="records">订单</van-tabbar-item>
      <van-tabbar-item icon="contact" url="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx46ee0b166d8ac06b&redirect_uri=http%3A%2F%2F94eb66b1.ngrok.io%2Fweixin%2FwxfwhLogin&response_type=code&scope=snsapi_userinfo&state=2343243#wechat_redirect">个人中心</van-tabbar-item>
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

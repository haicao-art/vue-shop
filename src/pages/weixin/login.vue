<template>
  <div class="" v-wechat-title="$route.meta.title">
    微信登录
  </div>
</template>

<script>
  import wx from 'weixin-js-sdk'
  import { wxAuthorize, wxfwhLogin } from  '@/apis/member'
  import { signature } from '@/apis/wxjssdk'
  export default {
    data() {
      return {
      }
    },
    mounted() {
      let _code = this.$route.query.code
      //请求API 根据code获取access_token
      this.wxfwhLogin(_code)
    },
    methods: {
      async wxfwhLogin(_code) {
        await this.$store.dispatch('wxfwhLogin', _code).then(respone => {
          this.$router.replace({ 'path': this.$route.query.redirect_url || '/'})
        }).catch(error => {
          console.log(error)
        })
      },
      async signatureMethod() {
        let that = this
        let _url = document.URL
        await signature(_url, ['onMenuShareTimeline']).then(response => {
          let _config = response.data.config
          wx.config(_config)
          wx.ready(function() {
            wx.onMenuShareTimeline({
              title: '为你定制的美丽', // 分享标题
              link: 'http://c0614966.ngrok.io/good/detail?id=1', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg', // 分享图标
              success: function () {
                // 用户点击了分享后执行的回调函数
                that.$toast('用户自定义分享成功~')
              }
            })
          })
        }).catch(error => {

        })
      }
    }
  }
</script>

<style>

</style>

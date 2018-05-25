<template>
  <header id="header_top">
    <slot name='logo'></slot>
    <slot name='search'></slot>
    <van-nav-bar
      :title="navbarTitle"
      :left-text="leftText"
      :left-arrow="leftArrow"
      :right-text="rightText"
      fixed
      @click-left="goBackMethod"
      @click-right="onClickRight"
      class="navbar"
      v-if="navbarTitle"
    >
    </van-nav-bar>
    <slot name='notice'></slot>
  </header>
</template>

<script>
  import { NavBar } from 'vant'
  export default {
    components: {
      [NavBar.name]: NavBar
    },
    data() {
      return {
      }
    },
    mounted() {

    },
    props: ['signInUp', 'navbarTitle', 'leftArrow', 'leftText', 'rightText', 'noticeText'],
    methods: {
      goBackMethod() {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push({path: '/'})
      },
      onClickRight() {
        this.$toast('ok')
      }
    }
  }
</script>

<style lang="less">
  #header_top {
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 46px;
    .van-icon {
      color: #454545;
    }
    .van-nav-bar__left {
      .van-nav-bar__text {
        color: #454545;
      }
    }
    .van-nav-bar__right {
      .van-nav-bar__text {
        font-size: 26px;
        color: #454545;
      }
    }
  }
</style>

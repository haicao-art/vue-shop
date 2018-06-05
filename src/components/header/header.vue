<template>
  <header id="header_top">
    <slot name='logo'></slot>
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
    <slot name='search' class="search"></slot>
    <slot name='notice' class="notice"></slot>
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
    props: ['signInUp', 'navbarTitle', 'leftArrow', 'leftText', 'rightText', 'noticeText', 'gobackUrl'],
    methods: {
      goBackMethod() {
        if(this.gobackUrl) {
          this.$router.replace({path: this.gobackUrl})
        } else {
          window.history.length > 1 ? this.$router.go(-1) : this.$router.push({path: '/'})
        }
      },
      onClickRight() {
      }
    }
  }
</script>

<style lang="less" scoped>
  #header_top {
    z-index: 9;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    width: 100%;
    min-height: 2rem;
    display: flex;
    flex-direction: column;
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

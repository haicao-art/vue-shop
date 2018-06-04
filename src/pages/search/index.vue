<template>
  <div class="container" v-wechat-title="$route.meta.title">
    <header-top>
      <van-search slot="search"
        v-model="q"
        placeholder="请输入商品名称"
        @search="onSearch">
      </van-search>
    </header-top>

    <section class="search-list">
      <ul class="history-title">
        <li>热门搜索</li>
      </ul>
      <section class="history-item">
        <router-link :to="{ path: 'list', query: {q: item} }" v-for="item in list" :key="item">{{item}}</router-link>
      </section>
    </section>

    <!-- 底部导航栏 -->
    <footer-bottom :myActive="1"></footer-bottom>
  </div>
</template>

<script>
  import headerTop from '@/components/header/header'
  import footerBottom from '@/components/footer/footer'
  import { Search } from 'vant';
  export default {
    components: {
      headerTop,footerBottom,
      [Search.name]: Search,
    },
    data() {
      return {
        q: '',
        list: [
          '女装', '夏季 童装'
        ]
      }
    },
    mounted() {
      this.init()
    },
    activated() {
    },
    methods: {
      async init() {
      },
      onSearch() {
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
          mask: true,
          loadingType: 'spinner',
          message: '正在发送请求...'
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 202;
    .search-list {
      .history-title {
        li {
          font-size: .5rem;
          padding: .3rem;
          background-color: #fff;
          border-bottom: .05rem solid #eee;
        }
      }
      .history-item {
        a {
          font-size: .5rem;
          padding: .2rem .3rem;
          margin-left: .3rem;
          border: .05rem solid #eee;
          background-color: #fff;
          border-radius: .2rem;
          color: #444;
        }
      }
    }
  }

  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
</style>

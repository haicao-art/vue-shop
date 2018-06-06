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
          '测试', '夏季 童装'
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
        setTimeout(() => {

        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .container {
    height: 100%;
    .search-list {
      min-height: 100%;
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
</style>

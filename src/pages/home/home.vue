<template>
  <div>
    <div class="container" v-show="!showLoading" v-wechat-title="$route.meta.title">
      <header-top style="position: fixed;">
        <van-search slot="search"
          v-model="q"
          placeholder="请输入商品名称"
          @search="onSearch">
        </van-search>

        <!-- 通知公告 -->
        <section slot="notice">
          <van-notice-bar
            :text="noticeText"
            scrollable
            left-icon="http://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png"
          />
        </section>

      </header-top>

      <!-- 轮播图 -->
      <van-swipe :autoplay="3000" class="swipe">
        <van-swipe-item v-for="(image, index) in images" :key="index" class="swipe-item">
          <img :src="image" />
        </van-swipe-item>
      </van-swipe>

      <!-- 列表 -->
      <van-list
        v-model="listLoading"
        :finished="finished"
        :offset="offset"
        @load="onLoad"
      >
        <product-item :list="list"></product-item>
      </van-list>

      <div class="hairline" v-if="finished">我是有底线的</div>

      <!-- 底部导航栏 -->
      <footer-bottom :myActive="0"></footer-bottom>
    </div>
    <loading v-show="showLoading"></loading>
  </div>
</template>

<style rel="stylesheet/less" lang="less" scoped>

</style>
<script>
  import headerTop from '@/components/header/header'
  import productItem from '@/components/product/item'
  import footerBottom from '@/components/footer/footer'
  import loading from '@/components/common/loading'
  import { Search, Button, Swipe, SwipeItem, List, Card, Lazyload, NoticeBar } from 'vant';
  import { getGoodList } from '@/apis/good'
  import { getIndexData } from '@/apis/home'
  export default {
    components: {
      headerTop,footerBottom, productItem, loading,
      [Search.name]: Search,
      [Button.name]: Button,
      [List.name]: List,
      [Card.name]: Card,
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Lazyload.name]: Lazyload,
      [NoticeBar.name]: NoticeBar,
    },
    data() {
      return {
        q: '',
        ready: false,
        page: 1,
        limit: 20,
        total_page: 1,
        timeout: 2000,
        showLoading: true,
        listLoading: false, //是否显示加载中提示，加载过程中不触发load事件
        finished: false,  //是否已加载完成，加载完成后不再触发load事件
        offset: 100,    //list  滚动条与底部距离小于 offset 时触发load事件
        list: [],
        images: [],
        noticeText: 'notice 青意萱 青意宣 特大号落地紫砂陶瓷花盆红砂紫砂花盆 客厅花卉绿植粗砂花盆 口径19cm 大号青意萱 青意宣 特大号落地紫砂陶瓷花盆红砂紫砂花盆 客厅花卉绿植粗砂花盆 口径19cm 大号'
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      async init() {
        let token = this.$store.getters.token
        await getIndexData({token: token}).then(respone => {
          let _data = respone.data;
          this.images = [..._data.images]
          //this.noticeText = _data.notice.title
        }).catch(error => {
          this.$toast('getIndexData')
          this.$toast(error)
        })

        await getGoodList({token: token, page: this.page, limit: this.limit}).then(respone => {
          let _data = respone.data
          this.list = [..._data.items]
          if(_data.items.length < this.limit) {
            this.listLoading = false
            this.finished = true
          }
          this.ready = true
        }).catch(error => {
          this.$toast('getGoodList')
          this.$toast(error)
        })

        this.showLoading = false
      },
      onSearch() {
        this.$toast(this.q)
      },
      onLoad() {
        if(this.ready) {
          setTimeout(() => {
            this.page = this.page + 1
            if(this.page > this.total_page) {
              this.listLoading = false
              this.finished = true
            } else {
              let token = this.$store.getters.token
              getGoodList({token: token, page: this.page, limit: this.limit}).then(respone => {
                let _data = respone.data
                if(_data.items.length < this.limit) {
                  this.finished = true
                }
                if(_data.items.length > 0) {
                  this.list.push(..._data.items)
                }
                this.listLoading = false
              }).catch(error => {
                this.$toast(error)
              })
            }
          }, this.timeout)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .container {
    margin-top: 80px;
  }
  .swipe {
    height: 207px;
    .swipe-item {
      img {
        height: 100%;
      }
    }
  }

  .hairline {
    position: relative;
    padding: 5px 1px;
    text-align: center;
    color: #454545;
    font-size: .5rem;
    &::before {
      content: '';
      position: absolute;
      left: 1%;
      top: 52%;
      background-color: #414949;
      width: 32%;
      height: 1px;
    }
    &::after {
      content: '';
      position: absolute;
      right: 1%;
      top: 52%;
      background-color: #494949;
      width: 32%;
      height: 1px;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

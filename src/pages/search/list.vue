<template>
  <div class="container" v-wechat-title="$route.meta.title">
    <header-top :navbarTitle="$route.meta.title" leftText="返回" leftArrow></header-top>

    <!-- 列表 -->
    <van-list v-model="listLoading" :finished="finished" :offset="offset" @load="onLoad">
      <product-item :list="list"></product-item>
    </van-list>

    <div class="hairline" v-if="finished">我是有底线的</div>

    <!-- 底部导航栏 -->
    <footer-bottom :myActive="1"></footer-bottom>
  </div>
</template>

<script>
  import headerTop from '@/components/header/header'
  import productItem from '@/components/product/item'
  import footerBottom from '@/components/footer/footer'
  import { List } from 'vant';
  import { getGoodList } from '@/apis/good'
  export default {
    components: {
      headerTop,footerBottom, productItem,
      [List.name]: List,
    },
    data() {
      return {
        q: '',
        ready: false,
        page: 1,
        limit: 20,
        total_page: 1,
        timeout: 2000,
        showLoading: false,
        listLoading: false, //是否显示加载中提示，加载过程中不触发load事件
        finished: false,  //是否已加载完成，加载完成后不再触发load事件
        offset: 100,    //list  滚动条与底部距离小于 offset 时触发load事件
        list: [],
        images: [],
        noticeText: ''
      }
    },
    mounted() {
      this.q = this.$route.query.q
      this.init()
    },
    methods: {
      async init() {
        let token = this.$store.getters.token
        await getGoodList({token: token, q: this.q, page: this.page, limit: this.limit}).then(respone => {
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
              getGoodList({token: token, q: this.q, page: this.page, limit: this.limit}).then(respone => {
                let _data = respone.data
                if(_data.items.length < this.limit) {
                  this.finished = true
                }
                if(_data.items.length > 0) {
                  this.list.push(..._data.items)
                }
                this.listLoading = false
              }).catch(error => {
                this.$toast(error.desc)
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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 202;
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
</style>

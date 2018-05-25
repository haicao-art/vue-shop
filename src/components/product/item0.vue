<template>
  <div>
    <div class="item" v-for="item in list">
      <img v-lazy="item.image" class="image"/>
      <div class="info">
        <span class="title">{{item.title}}</span>
        <div class="tag">
          <span class="tag-item">立减{{item.price - item.sale_price}}元</span>
          <span v-for="tag in item.tag" class="tag-item">{{tag}}</span>
        </div>
        <van-row class="ps">
          <van-col span="14" class="sale_price">
            ￥{{item.sale_price}}
          </van-col>
          <van-col span="9" class="sale" v-if="item.sale">已售{{item.sale}}件</van-col>
        </van-row>
      </div>
    </div>
    <div style="clear: both;"></div>
  </div>
</template>

<script>
  import { Lazyload, Row, Col} from 'vant'
  export default {
    components: {
      [Lazyload.name]: Lazyload,
      [Row.name]: Row,
      [Col.name]: Col
    },
    data() {
      return {
      }
    },
    mounted() {

    },
    props: ['list'],
    methods: {
    }
  }
</script>

<style lang="less" scoped>
  .item {
    width: 49%;
    margin: .2rem 0;
    border-radius: .2rem;
    background-color: #fff;
    border: 1px solid #fff;
    float: left;
    text-align: left;
    &:nth-child(even) {
      float: right;
    }
    .image {
      width: 100%;
      border-radius: .2rem;
    }
    .info {
      padding: .2rem;
      .title {
        font-size: .5rem;
        height: 1.5rem;
        overflow: hidden;
        display: block;
      }
      .tag {
        color: #f00;
        padding-right: .1rem;
        font-size: .5rem;
        height: 1rem;
        line-height: 1rem;
        overflow: hidden;
        &::after {
          content: '';
          display: block;
        }
        .tag-item {
          border: 1px solid #f00;
          border-radius: .2rem;
          padding: .08rem .2rem;
          margin-right: .2rem;
        }
      }
      .ps {
        margin-top: .3rem;
        line-height: 1rem;
        height: 1rem;
        .sale_price {
          color: #f00;
          font-size: .7rem;
          font-weight: 500;
          .price {
            font-size: .3rem;
            color: #eee;
          }
        }
        .sale {
          font-size: .5rem;
        }
      }
    }
  }
</style>

<template>
  <div>
    <div class="item" v-for="(item, index) in list" :key="index">
      <router-link :to="{ path: 'good/detail', query: {id: item.id} }">
        <img v-lazy="item.good_pic" class="image"/>
        <div class="info">
          <span class="title"><van-tag plain type="danger" class="tag-item" v-if="item.good_trade_type">{{item.good_trade_type}}</van-tag>{{item.good_title}}</span>
          <div class="tag">
            <van-tag plain type="danger" v-for="(tag, idx) in item.good_tag" :key="idx" class="tag-item">{{tag}}</van-tag>
          </div>
          <van-row class="ps">
            <van-col span="14" class="sale_price">
              ￥{{formatPrice(item.good_price)}}
            </van-col>
            <van-col span="9" class="sale" v-if="item.sale">已售{{item.sale}}件</van-col>
          </van-row>
        </div>
      </router-link>
    </div>
    <div style="clear: both;"></div>
  </div>
</template>

<script>
  import { Row, Col, Tag} from 'vant'
  export default {
    components: {
      [Tag.name]: Tag,
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
      formatPrice(good_price) {
        return (good_price / 100).toFixed(2)
      }
    }
  }
</script>

<style lang="less" scoped>
  .item {
    width: 49%;
    margin: 5px 0px;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #fff;
    float: left;
    text-align: left;
    &:nth-child(even) {
      float: right;
    }
    .image {
      width: 8rem;
      height: 8rem;
      max-width: 100%;
      border-radius: 5px;
    }
    .info {
      padding: 5px;
      .title {
        font-size: 12px;
        height: 36px;
        overflow: hidden;
        display: block;
        color: #454545;
        .tag-item {
          padding: 0px 5px;
          margin-right: 3px;
          &::after {
            border-radius: 8px;
          }
        }
      }
      .tag {
        color: #f00;
        padding-right: 3px;
        font-size: 12px;
        height: 22px;
        line-height: 22px;
        overflow: hidden;
        &::after {
          content: '';
          display: block;
        }
        .tag-item {
          padding: 1px 5px;
          margin-right: 5px;
          &::after {
            border-radius: 8px;
          }
        }
      }
      .ps {
        margin-top: 8px;
        line-height: 24px;
        height: 24px;
        .sale_price {
          color: #f00;
          font-size: 18px;
          font-weight: 500;
          .price {
            font-size: 8px;
            color: #eee;
          }
        }
        .sale {
          font-size: 12px;
          color: #454545;
        }
      }
    }
  }
</style>

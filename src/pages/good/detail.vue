<template>
  <div class="goods" v-wechat-title="$route.meta.title">
    <header-top :navbarTitle="$route.meta.title" leftText="返回" leftArrow></header-top>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" class="swipe">
      <van-swipe-item v-for="(image, index) in good.good_pic" :key="index" class="swipe-item">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell class="goods-info">
        <div class="goods-title"><van-tag mark plain type="danger" class="tag-item">{{good.good_trade_type}}</van-tag>{{good.good_title}}</div>
        <div class="goods-sale-price">￥{{formatPrice(good.good_price)}}</div>
      </van-cell>
      <van-cell class="goods-info">
        <div class="goods-intro" v-html="good_extend.good_desc"></div>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <!--
      <van-cell value="进入店铺" icon="shop" is-link>
        <template slot="title">
          <span class="van-cell-text">有赞的店</span>
          <van-tag type="danger">官方</van-tag>
        </template>
      </van-cell>
      <van-cell title="线下门店" icon="location" is-link/>
      -->
      <van-cell>
        <template slot="title">
          <div class="goods-tag">
            <van-tag plain type="danger" class="tag-item" v-for="(tag, idx) in good.good_tag" :key="idx">{{tag}}</van-tag>
          </div>
        </template>
      </van-cell>
      <van-cell title="请选择商品规格" icon="location" is-link @click="onShowAction"/>
    </van-cell-group>
    <van-sku
      v-model="good.showBase"
      :sku="good_spec"
      :goods="good"
      :goods-id="good.id"
      :hide-stock="good_spec.hide_stock"
      :quota="quota"
      :close-on-click-overlay="good_spec.loseOnClickOverlay"
      disable-stepper-input=""
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />

    <van-tabs class="goods-detail">
      <van-tab title="商品详情">
        <div v-html="good_extend.good_detail"></div>
      </van-tab>
      <van-tab title="评论">
        评论 <br />
        评论 <br />
        评论 <br />
        评论 <br />
        评论 <br />
        评论 <br />
        评论 <br />
      </van-tab>
    </van-tabs>

    <!-- 底部加入购物车 -->
    <van-goods-action class="goods-bottom-btn">
      <van-goods-action-mini-btn icon="wap-home" text="首页" @click="onClickHomeMiniBtn" />
      <van-goods-action-mini-btn icon="cart" text="购物车" @click="onClickCartMiniBtn" />
      <van-goods-action-big-btn text="加入购物车" @click="onClickBigBtn" />
      <van-goods-action-big-btn text="立即购买" @click="onClickBigBtn" primary />
    </van-goods-action>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import headerTop from '@/components/header/header'
import { Tag, Col, Cell, Tab, Tabs, Icon, CellGroup, Swipe, SwipeItem, Sku, GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn} from 'vant';
import { getGoodInfo } from '@/apis/good'
export default {
  components: {
    headerTop,
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Cell.name]: Cell,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Icon.name]: Icon,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Sku.name]: Sku,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
  },
  data() {
    return {
      disableStepperInput: true,
      quota: 0,   //限购数 0表示不限购
      good: {
        id: 0,
        good_title: '',
        title: '',
        picture: '',
        good_pic: [],
        good_trade_type: '',
        good_tag: [],
        good_price: '0.00',
        good_tax: '',
        good_origin: '',
        showBase: false,
      },
      good_extend: {
        good_detail: '',
        good_desc: '',
      },
      good_spec: {
        tree: [],
        list: [],
        price: 0,
        stock_num: 0,
        none_sku: false,
        hide_stock: false,
        closeOnClickOverlay: true
      }
    }
  },
  mounted() {
    //this.$route.meta.title = '青意萱 青意宣 特大号落地紫砂陶瓷花盆红砂紫砂花盆 客厅花卉绿植粗砂花盆 口径19cm 大号'
  },
  created() {
  },
  activated() {
    let id = this.$route.query.id
    this.init(id)
  },
  computed: {
    ...mapState([
      'cartList'
    ]),
  },
  methods: {
    ...mapMutations([
      'ADD_CART'
    ]),
    async init(id) {
      let that = this
      let token = this.$store.getters.token
      await getGoodInfo({token: token, id: id}).then(respone => {
        let _data = respone.data
        _data.good.title = _data.good.good_title
        _data.good.picture = _data.good.good_pic[0]
        this.good = _data.good
        this.good_extend = _data.good_extend
        this.good_spec.tree = [{k: '商品规格',v: _data.good_spec, k_s: 's1'}]
        _data.good_spec.forEach((item, index, arr) => {
          let _price = that.formatPrice(item.price)
          if(that.good_spec.price == 0 || that.good_spec.price > _price) {
            that.good_spec.price = _price
          }
          if(that.good_spec.stock_num == 0 || that.good_spec.stock_num > item.stock) {
            that.good_spec.stock_num = item.stock
          }
          arr[index]['name'] = item.spec_title
          arr[index]['s1'] = item.id.toString()
          arr[index]['s2'] = "0"
          arr[index]['s3'] = "0"
          arr[index]['price'] = item.price
          arr[index]['stock_num'] = item.stock
        })
        this.good_spec.list = [..._data.good_spec]
      }).catch(error => {
        console.log(error)
      })
    },
    formatPrice(good_price) {
      return (good_price / 100).toFixed(2)
    },
    onClickHomeMiniBtn() {
      this.$router.push({ path: '/'})
    },
    onClickCartMiniBtn() {
      this.$router.push({ path: '/cart'})
    },
    onShowAction() {
      this.good.showBase = true
    },
    onClickBigBtn() {
      this.good.showBase = true
    },
    onBuyClicked(params) {
      console.log(params)
      this.$toast('点击购买按钮')
      this.ADD_CART({shop_id: 1, good_id: params.goodsId, spec_id: params.selectedSkuComb.id, good_title: params.selectedSkuComb.name, spec_title: params.selectedSkuComb.spec_title, good_price: params.selectedSkuComb.price, buy_num: params.selectedNum})
    },
    onAddCartClicked() {
      this.$toast('点击加入购物车按钮')
      this.$router.push({ path: '/cart'})
    }
  }
}
</script>

<style lang="less" scoped>
  .goods {
    background-color: #eee;
    .goback{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2rem;
        z-index: 11;
        padding-top: 0.2rem;
        padding-left: 0.2rem;
    }
    .swipe {
      height: 100%;
      .swipe-item {
        img {
          width: 16rem;
          max-width: 100%;
          height: 16rem;
        }
      }
    }
    &-info {
      padding: 5px 8px;
      line-height: 32px;
    }
    &-title {
      font-size: .5rem;
      line-height: 18px;
      .tag-item {
        padding: 1px 5px;
        margin-right: 4px;
        &::after {
          border-radius: 8px;
        }
      }
    }
    &-tag {
      .tag-item {
        padding: 1px 5px;
        margin-right: 4px;
        &::after {
          border-radius: 8px;
        }
      }
      .van-icon {
        font-size: 1rem;
        margin-top: 18px;
      }
    }
    &-sale-price {
      font-size: 18px;
      color: #f00;
    }
    &-intro {
      font-size: .5rem;
      line-height: 18px;
      color: #555;
    }
    &-cell-group {
      margin: 10px 0;
    }
    &-bottom-btn {
      z-index: 100
    }
    &-detail {
      margin-bottom: 50px;
      font-size: .5rem;
    }
  }
</style>

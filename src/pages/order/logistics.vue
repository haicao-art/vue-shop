<template>
    <div class="container" v-wechat-title="$route.meta.title">
      <header-top :navbarTitle="$route.meta.title" leftText="返回" leftArrow></header-top>
      <van-steps direction="vertical" :active="0" active-color="#f60" icon="logistics" :title="logisticsNo(logistics)" :description="logistics.com">
        <van-step v-if="logistics.data.length > 0" v-for="item in logistics.data" :key="item.time">
          <h3>{{item.context}}</h3>
          <p>{{item.ftime}}</p>
        </van-step>
        <van-step v-else>
          <h3>暂无物流信息</h3>
        </van-step>
        <van-step v-if="logistics.invoice">
          <h3>商家已发货</h3>
          <p>{{logistics.addtime}}</p>
        </van-step>
      </van-steps>
    </div>
</template>

<script>
import { logistics } from '@/apis/order'
import headerTop from '@/components/header/header'
import { Tag, Step, Steps} from 'vant'
export default {
  components: {
    headerTop,
    [Tag.name]: Tag,
    [Step.name]: Step,
    [Steps.name]: Steps,
  },
  data() {
    return {
      order_id: null,
      logistics: []
    }
  },
  mounted() {
    this.order_id = this.$route.query.id
    this.init()
  },

  methods: {
    async init() {
      let token = this.$store.getters.token
      await logistics({token: token, order_id: this.order_id}).then(response => {
        console.log(response)
        let _data = response.data
        this.logistics = _data.logistics
      }).catch(error => {
        console.log(error)
      })
    },
    logisticsNo(logistics) {
      return logistics.title + ':' + logistics.invoice
    }
  }
}
</script>

<style lang="less" scoped>

</style>

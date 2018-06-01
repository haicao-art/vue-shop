<template>
  <div class="address" v-wechat-title="$route.meta.title">
    <header-top :navbarTitle="$route.meta.title" leftText="返回" leftArrow></header-top>

    <van-address-edit
      :area-list="areaList"
      :address-info="addressInfo"
      @save="onSave"
    />

  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import { getAddressList, addAddress } from '@/apis/address'
  import headerTop from '@/components/header/header'
  import { AddressEdit } from 'vant'
  import areaList from '@/assets/js/area'
  export default {
    components: {
      headerTop,
      [AddressEdit.name]: AddressEdit
    },
    data() {
      return {
        addressInfo: {
          id: 0,
          name: '',
          tel: '',
          province: '',
          city: '',
          county: '',
          address_detail: '',
          area_code: '',
          is_default: false
        },
        areaList
      }
    },
    mounted() {
      //获取当前用户收货信息
    },
    created() {
      console.log('add Address created')
    },
    activated() {
      console.log('add Address activated')
    },
    deactivated() {
      console.log('add Address deactivated')
    },
    methods: {
      ...mapMutations([
        'CHOOSE_ADDRESS'
      ]),
      async onSave(content) {
        console.log('新增收货地址')
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
          loadingType: 'spinner',
          message: '加载中...'
        })
        let token = this.$store.getters.token
        await addAddress(token, content).then(response => {
          console.log(response)
          this.$toast.success({
            duration: 3000,
            forbidClick: true,
            message: '保存成功'
          })
          setTimeout(() => {
            this.$router.replace({path: '/cart/confirm/chooseAddress'})
          }, 3000)
        }).catch(error => {
          console.log(error)
          this.$toast.fail({
            duration: 3000,
            forbidClick: true,
            message: error.desc
          })
        })
      },
      async init() {
        let token = this.$store.getters.token
        await getAddressList({token: token}).then(response => {
          let _data = response.data
          this.address = _data.items
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .address {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 202;
    &-lists {
      margin-top: .3rem;
      margin-bottom: 2.2rem;
    }
    &-lists-container {
      padding-bottom: 2.5rem;
    }
    .deliverable_address {
      background-color: #fff;
      li {
        display: flex;
        align-items: center;
        border-bottom: 0.025rem solid #f5f5f5;
        padding: .4rem;
        line-height: .5rem;
        .choosed_address {
          width: .8rem;
          height: .8rem;
          fill: #4cd964;
          margin-right: .4rem;
          opacity: 0;
        }
        .default_address {
          opacity: 1;
        }
        header {
          font-size: .7rem;
          line-height: 1rem;
          color: #333;
          span:nth-of-type(1) {
            font-size: .8rem;
            font-weight: bold;
          }
        }
        p {
          font-size: .5rem;
          color: #777;
        }
      }
    }
    .add-new-consignee {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      a {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        line-height: 2rem;
        height: 2rem;
        border-top: 1px solid #eee;
        background-color: #f66;
        color: #fff;
      }
    }
  }
</style>

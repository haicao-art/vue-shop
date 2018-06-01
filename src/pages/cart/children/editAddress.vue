<template>
  <div class="address" v-wechat-title="$route.meta.title">
    <header-top :navbarTitle="$route.meta.title" leftText="返回" leftArrow></header-top>

    <van-address-edit
      :area-list="areaList"
      :address-info="addressInfo"
      show-delete
      :tel-validator="validator"
      @save="onSave"
      @delete="onDelete"
    />

  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import { getAddressInfo, updateAddress, deleteAddress } from '@/apis/address'
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
        consignee_id: 0,
        addressInfo: {
          id: 0,
          name: '',
          tel: '',
          province: '',
          city: '',
          county: '',
          address_detail: '',
          area_code: 0,
          is_default: false
        },
        areaList
      }
    },
    mounted() {
      //获取当前用户收货信息
      this.consignee_id = this.$route.query.id
      this.init()
    },
    created() {
      console.log('edit Address created')
    },
    activated() {
      console.log('edit Address activated')
    },
    deactivated() {
      console.log('edit Address deactivated')
    },
    methods: {
      ...mapMutations([
        'CHOOSE_ADDRESS'
      ]),
      async onSave(content) {
        console.log('更新收货地址')
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
          loadingType: 'spinner',
          message: '正在发送请求...'
        })
        let token = this.$store.getters.token
        await updateAddress(token, content).then(response => {
          console.log(response)
          this.$toast.success({
            duration: 3000,
            forbidClick: true,
            message: '保存成功'
          })
          setTimeout(() => {
            this.$router.replace({path: '/cart/confirm/chooseAddress'})
          }, 1500)
        }).catch(error => {
          console.log(error)
          this.$toast.fail({
            duration: 3000,
            forbidClick: true,
            message: error.desc
          })
        })
      },
      async onDelete(content) {
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
          loadingType: 'spinner',
          message: '正在发送请求...'
        })
        let token = this.$store.getters.token
        await deleteAddress({token: token, consignee_id: content.id}).then(response => {
          this.$toast.success({
            duration: 3000,
            forbidClick: true,
            message: '收货地址删除成功'
          })
          setTimeout(() => {
            this.$router.replace({path: '/cart/confirm/chooseAddress'})
          }, 1500)
        }).catch(error => {
          this.$toast.fail({
            duration: 3000,
            forbidClick: true,
            message: error.desc
          })
        })
      },
      validator(tel) {
        return true
      },
      async init() {
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
          loadingType: 'spinner',
          message: '正在发送请求...'
        })
        let token = this.$store.getters.token
        await getAddressInfo({token: token, consignee_id: this.consignee_id}).then(response => {
          let consignee = response.data.consignee
          this.addressInfo.id = consignee.id
          this.addressInfo.name = consignee.consignee
          this.addressInfo.tel = consignee.mobile
          this.addressInfo.province = consignee.province
          this.addressInfo.city = consignee.city
          this.addressInfo.county = consignee.district
          this.addressInfo.address_detail = consignee.address
          this.addressInfo.area_code = consignee.area_code.toString()
          setTimeout(() => {
            this.$toast.clear()
          }, 500)
        }).catch(error => {
          this.$toast.fail({
            duration: 3000,
            forbidClick: true,
            message: error.desc
          })
          setTimeout(() => {
            this.$router.replace({path: '/cart/confirm/chooseAddress'})
          }, 1500)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
</style>

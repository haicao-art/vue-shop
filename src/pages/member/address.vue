<template>
  <div class="address" v-wechat-title="$route.meta.title">
    <header-top :navbarTitle="$route.meta.title" leftText="返回" leftArrow></header-top>

    <section>
      <van-address-list
        :list="address"
        @add="onAdd"
        @edit="onEdit"
      />
    </section>

    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import { getAddressList } from '@/apis/address'
  import headerTop from '@/components/header/header'
  import { AddressList } from 'vant'
  export default {
    components: {
      headerTop,
      [AddressList.name]: AddressList
    },
    data() {
      return {
        address: []
      }
    },
    mounted() {
      //获取当前用户收货信息
      this.init()
    },
    created() {
      console.log('chooseAddress created')
    },
    activated() {
      console.log('chooseAddress activated')
    },
    deactivated() {
      console.log('chooseAddress deactivated')
    },
    watch: {
      '$route' (to, from) {
        console.log('choose Address Router Change')
        this.init()
      }
    },
    methods: {
      onAdd() {
        console.log('新增收货地址')
        this.$router.push({path: 'address/addAddress'})
      },
      onEdit(item, index) {
        console.log('编辑收货地址')
        this.$router.push({path: 'address/editAddress', query: {id: item.id}})
      },
      async init() {
        let token = this.$store.getters.token
        await getAddressList({token: token}).then(response => {
          let _data = response.data
          _data.items.map((item) => {
            item.name = item.consignee
            item.tel = item.mobile
            item.address = item.province + ' ' + item.city + ' ' + item.district + ' ' + item.address
          })
          this.address = _data.items
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style lang="less">
.van-address-list__add {
  z-index: 1;
}
</style>
<style lang="less" scoped>
  .address {
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

    .router-slid-enter-active, .router-slid-leave-active {
      transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
      transform: translate3d(2rem, 0, 0);
      opacity: 0;
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

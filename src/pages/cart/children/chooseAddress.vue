<template>
  <div class="address" v-wechat-title="$route.meta.title">
    <header-top :navbarTitle="$route.meta.title" leftText="返回" leftArrow></header-top>

    <section class="address-lists">
      <section class="address-lists-container">
        <ul class="deliverable_address">
          <li v-for="item in address" @click.prevent.stop="chooseAddress(item, item.id)">
            <svg class="choosed_address default_address" >
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
            </svg>
            <div>
              <header>
                <span>{{item.consignee}}</span>
                <span>{{item.mobile}}</span>
              </header>
              <p>{{item.provice}} {{item.city}} {{item.district}} {{item.address}}</p>
            </div>
          </li>
        </ul>
      </section>
    </section>

  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import { getAddressList } from '@/apis/address'
  import headerTop from '@/components/header/header'
  export default {
    components: {
      headerTop
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
    methods: {
      ...mapMutations([
        'CHOOSE_ADDRESS'
      ]),
      chooseAddress(address, index) {
        this.CHOOSE_ADDRESS({address, index});
        this.$router.go(-1)
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
  }
</style>

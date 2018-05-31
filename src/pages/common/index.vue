<template>
  <div>
    <transition :name="transitionName" mode="out-in">
  		<keep-alive>
  		  <router-view  v-if="$route.meta.keepAlive"></router-view>
  		</keep-alive>
    </transition>
    <transition :name="transitionName" mode="out-in">
  		<router-view  v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showLoading: true,
        transitionName: 'slide-fade'
      }
    },
    watch: {
      $route(to, from) {  //监听路由变化
        if(to.meta.index == 0) {
          this.transitionName = ''
        } else {
          if(to.meta.index > from.meta.index) {
            this.transitionName = 'slide-fade'
          } else {
            this.transitionName = 'slide-fade'
          }
        }
      }
    },
  }
</script>

<style>

</style>

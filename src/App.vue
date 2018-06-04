<template>
  <div id="app">
    <transition :name="transitionName" mode="out-in">
			<keep-alive>
			  <router-view  v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
    </transition>
    <transition :name="transitionName" mode="out-in">
			<router-view  v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import svgIcon from '@/components/common/svg'
export default {
  components: {
    svgIcon
  },
  data() {
    return {
      showLoading: true,
      transitionName: 'slide-fade'
    }
  },
  watch: {
    $route(to, from) {  //监听路由变化
      if(to.meta.index > from.meta.index) {
        this.transitionName = 'slide-fade'
      } else {
        this.transitionName = 'slide-fade'
      }
    }
  },
  methods: {
  }
}
</script>

<style>
html, body {
  background-color: #f8f8f8;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f5f5f5;
  padding: 0 1px;
  height: 100%;
}
.van-stepper__input[disabled] {
  color: #f00 !important;
}
.van-toast--default {
  min-width: 120px;
  width: auto;
}
.slide-fade{
  position: absolute;
  left:0;
  right: 0;
}
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  left:0;
  right: 0;
  transform: translateX(100px);
  opacity: 0;
}
</style>

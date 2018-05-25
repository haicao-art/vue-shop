<template>
  <div id="app">
    <transition :name="transitionName" mode="out-in">
			<keep-alive>
			  <router-view  v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
    </transition>
    <transition :name="transitionName" mode="out-in">
			<keep-alive>
			  <router-view  v-if="!$route.meta.keepAlive"></router-view>
			</keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  components: {
  },
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
  methods: {
  }
}
</script>

<style>
body {
  background-color: #f8f8f8;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f5f5f5;
  padding: 0 1px;
}
.van-stepper__input[disabled] {
  color: #666 !important;
}
.slide-fade{
  position: absolute;
  left:0;
  right: 0;
}
.slide-fade-enter-active {
  transition: all 1.2s ease;
}
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  left:0;
  right: 0;
  transform: translateX(80px);
  opacity: 0;
}
</style>

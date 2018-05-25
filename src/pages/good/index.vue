<template>
  <transition name="router-fade" mode="out-in">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </transition>
</template>

<script>
  export default {
    data() {
      return {

      }
    }
  }
</script>

<style>

</style>

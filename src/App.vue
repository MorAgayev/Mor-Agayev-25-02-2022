<template>
  <div id="app">
    <user-msg></user-msg>
    <app-header/>
    <router-view/>
  </div>
</template>

<script>
import appHeader from './components/appHeader.vue'
import userMsg from './components/user-msg.vue'
export default {
  components: {
    appHeader,
    userMsg
  }
}
</script>



<template>
  <el-alert v-if="alive" :title="msg.txt" :type="msg.type" effect="dark" show-icon>
  </el-alert>
</template>

<script>
import { eventBusService, SHOW_MSG } from "../services/event-bus.service.js";

export default {
  created() {
    eventBusService.$on(SHOW_MSG, (msg) => {
      this.msg = msg;
      var delay = msg.delay || 2000;
      this.alive = true;
      setTimeout(() => {
        this.alive = false;
      }, delay);
    });
  },
  data() {
    return {
      alive: false,
      msg: null
    };
  }
};

</script>
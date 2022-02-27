<template>
  <header class="app-header main-layout">
    <div class="flex align-center space-between">
      <h1>Weather</h1>
      <nav class="flex align-center">
        <ul class="clean-list flex align-center">
          <router-link to="/weather">Weather</router-link>
          <router-link to="/favorites">Favorites</router-link>
        </ul>
          <button @click="toggleLoginModal" v-if="!user" class="login-btn">Login / Signup</button>
          <avatar v-else :username="this.user.username" :size="35"></avatar>
      </nav>
      <login-signup-modal v-if="isLoginModal" @closeModal="isLoginModal = false" @getUser="getUser"/>
    </div>
  </header>
</template>

<script>
import loginSignupModal from "./loginSignupModal.vue";
import Avatar from 'vue-avatar'
export default {
  name: "app-header",

  props: {},

  data() {
    return {
      isLoginModal: false,
      user: null
    };
  },
  created() {
    this.getUser();
  },

  methods: {
    toggleLoginModal() {
      this.isLoginModal = !this.isLoginModal;
    },
    async getUser() {
      this.user = await this.$store.getters.getLoggedinUser;
    },
    toggleMenu() {
      this.isShowMenu = !this.isShowMenu;
    }
  },

  components: {
    loginSignupModal,
    Avatar
  },
};
</script>


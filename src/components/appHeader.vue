<template>
  <header class="app-header main-layout">
    <div class="flex align-center space-between">
      <p class="logo">Weather</p>
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
import Avatar from 'vue-avatar';

export default {
  name: "app-header",

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
    async getUser() {
      this.user = await this.$store.getters.getLoggedinUser;
    },
    toggleLoginModal() {
      this.isLoginModal = !this.isLoginModal;
    },
    toggleMenu() {
      this.isShowMenu = !this.isShowMenu;
    }
  },

  components: {
    loginSignupModal,
    Avatar
  }
};
</script>


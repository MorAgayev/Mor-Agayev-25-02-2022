<template>
  <section v-if="user" class="favorite-page main-layout flex column">
    <form class="search-container flex align-center justify-center" @submit.prevent="addToFavorite">
      <input type="text" placeholder="Search City" v-model="searchVal">
      <button>Add</button>
    </form>
    <favorite-list :favorites="user.favorites" @removeFavorite="removeFavorite" @showWeather="showWeather"/>
  </section>
</template>

<script>
import favoriteList from "../components/favoriteList.vue";
import { showMsg } from '../services/event-bus.service'
export default {
  name: "",

  props: {},

  data() {
    return {
      user: null,
      searchVal: ""
    };
  },
  created() {
    this.loadUser();
  },

  methods: {
    async loadUser() {
      try {
        this.user = await this.$store.getters.getLoggedinUser;
      } catch (e) {
        showMsg(`Load User Faild`, 'faild');
      }
    },
    async addToFavorite() {
      try {
        this.$store.dispatch({type: "addFavorite", city: this.searchVal});
        showMsg(`Add Favorite Success`);
      } catch (error) {
        showMsg(`Add Favorite Faild`, 'faild');
      }
    },
    async removeFavorite(favoriteId) {
      try {
        this.$store.dispatch({type: "removeFavorite", favoriteId})
        showMsg(`Remove Success`);
      } catch (error) {
        showMsg(`Remove Faild`, 'faild');
      }
    },
    showWeather(favoritesName) {
      this.$router.push( `/weather/${favoritesName}`)
    }
  },

  computed: {},

  components: {
    favoriteList,
  },
};
</script>

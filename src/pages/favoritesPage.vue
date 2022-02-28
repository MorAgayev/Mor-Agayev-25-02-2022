<template>
  <section v-if="user" class="favorite-page main-layout flex column">
    <form class="search-container flex align-center justify-center" @submit.prevent="addToFavorite">
      <input type="text" placeholder="Search City" v-model="searchVal">
      <button>Add</button>
      <el-switch @change="changeTempType" v-model="isCelsius" active-text="C" inactive-text="F">
      </el-switch>
    </form>
    <favorite-list :favorites="user.favorites" :tempType="tempType" @removeFavorite="removeFavorite" @showWeather="showWeather"/>
  </section>
</template>

<script>
import favoriteList from "../components/favoriteList.vue";
import { showMsg } from '../services/event-bus.service';

export default {
  name: "fav-perPage",

  data() {
    return {
      user: null,
      searchVal: "",
      tempType: null,
      isCelsius: true
    };
  },

  created() {
    this.tempType = this.$store.getters.getTempType;
    (this.tempType === 'c') ? this.isCelsius = true : this.isCelsius = false;
    this.loadUser();
  },

  methods: {
    async loadUser() {
      try {
        this.user = await this.$store.getters.getLoggedinUser;
      } catch (e) {
        showMsg(`Load User Faild`, 'error');
      }
    },
    async addToFavorite() {
      try {
        this.$store.dispatch({type: "addFavorite", city: this.searchVal});
        showMsg(`Add Favorite Success`);
      } catch (error) {
        showMsg(`Add Favorite Faild`, 'error');
      }
    },
    async removeFavorite(favoriteId) {
      try {
        this.$store.dispatch({type: "removeFavorite", favoriteId});
        showMsg(`Remove Success`);
      } catch (error) {
        showMsg(`Remove Faild`, 'error');
      }
    },
    showWeather(favoritesName) {
      this.$router.push( `/weather/${favoritesName}`);
    },
    async changeTempType() {
      this.tempType = await this.$store.dispatch({type: 'changeTempType'});
    }
  },

  components: {
    favoriteList
  }
};
</script>

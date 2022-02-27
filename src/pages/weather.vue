<template>
  <section class="weather-page main-layout"  v-if="this.cityWeather">
    <div class="filter-container flex align-center wrap">
      <app-filter @setFilter="setFilter"/>
      <button v-if="user" @click="toggleFavorite">{{setFavoriteBtn}}</button>
    </div>
    <div class="current-weather flex align-center">
      <img :src="setWeatherImg" alt="">
      <div class="flex column align-center">
        <small>{{this.cityWeather.description}}</small>
        <h3>{{this.cityWeather.currWeather.Value}} {{this.cityWeather.currWeather.Unit}}</h3>
        <small>{{this.cityWeather.name}}</small>
      </div>
    </div>
    <forecasts-list :forecasts="cityWeather.dailyForecasts"/>
  </section>
</template>

<script>
import appFilter from "../components/appFilter.vue";
import forecastsList from "../components/forecasts-list.vue";
import { showMsg } from '../services/event-bus.service'

export default {
  name: "appWeather",

  data() {
    return {
      cityWeather: null,
      user:null,
      isFavorite: false
    };
  },
  
  methods: {
    async loadWeather() {
      this.cityWeather = await this.$store.dispatch({ type: "loadWeather" });
    },
    async loadUser() {
      this.user = await this.$store.getters.getLoggedinUser
    },
    async setFilter(searchVal) {
      this.cityWeather = await this.$store.dispatch({ type: "loadWeather", city: searchVal});
      this.setIsFavorite()
    },
    async toggleFavorite() {
      try {
        if(this.isFavorite) {
          await this.$store.dispatch({ type: "removeFavorite", city: this.cityWeather.name})
          showMsg(`Remove success`);
        } else {
          await this.$store.dispatch({ type: "addFavorite", city: this.cityWeather.name})
          showMsg(`Add ${this.cityWeather.name} to favorites success`);
        }
        this.isFavorite = !this.isFavorite;
      } catch (e) {
        if (this.isFavorite) {
         showMsg(`Remove Favorite faild`, 'faild');
        } else { 
          showMsg(`Add Favorite faild`, 'faild');
        }
      }
    },
    setIsFavorite() {
      this.isFavorite = this.user.favorites.some(favorite=> favorite.name.toLowerCase() === this.cityWeather.name.toLowerCase())
    }
  },

  computed: {
    setFavoriteBtn() {
      return (this.isFavorite) ? 'Remove From Favorite' : 'Add To Favorites';
    },
    setWeatherImg() {
      let img = 'rainy'
      if(this.cityWeather.description.toLowerCase().includes('sunny')) img = 'sunny'
      if(this.cityWeather.description.toLowerCase().includes('cloud')) img = 'cloudy'
      if(this.cityWeather.description.toLowerCase().includes('rain')) img = 'rainy'
      if(this.cityWeather.description.toLowerCase().includes('snow')) img = 'snow'
      return require(`../assets/imgs/${img}.png`)
    }
  },

  watch: {
    "$route.params.cityName": {
      async handler(cityName) {
        this.cityWeather = await this.$store.dispatch({type: "loadWeather", city: cityName});
        await this.loadUser();
        this.setIsFavorite();
      },
      immediate: true,
    }
  },

  components: {
    appFilter,
    forecastsList
  },
};
</script>

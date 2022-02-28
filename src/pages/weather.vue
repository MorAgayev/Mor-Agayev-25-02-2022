<template>
  <section class="weather-page main-layout"  v-if="this.cityWeather">
    <div class="filter-container flex align-center wrap">
      <app-filter @setFilter="setFilter"/>
      <el-switch @change="changeTempType" v-model="isCelsius" active-text="C" inactive-text="F">
      </el-switch>
      <button v-if="user" @click="toggleFavorite">{{setFavoriteBtn}}</button>
    </div>
    <div class="current-weather flex align-center">
      <img :src="setWeatherImg" alt="">
      <div class="flex column align-center">
        <small>{{this.cityWeather.description}}</small>
        <h3>{{setTempType}}</h3>
        <small>{{this.cityWeather.name}}</small>
      </div>
    </div>
    <forecasts-list v-if="tempType" :tempType="tempType" :forecasts="cityWeather.dailyForecasts"/>
  </section>
</template>

<script>
import appFilter from "../components/appFilter.vue";
import forecastsList from "../components/forecasts-list.vue";
import { showMsg } from '../services/event-bus.service';

export default {
  name: "appWeather",

  data() {
    return {
      cityWeather: null,
      user:null,
      isFavorite: false,
      tempType: null,
      isCelsius: true
    };
  },

  created() {
    this.tempType = this.$store.getters.getTempType;
    (this.tempType === 'c') ? this.isCelsius = true : this.isCelsius = false;
  },
  
  methods: {
    async loadWeather() {
      this.cityWeather = await this.$store.dispatch({ type: "loadWeather" });
    },
    async loadUser() {
      this.user = await this.$store.getters.getLoggedinUser;
    },
    async setFilter(searchVal) {
      try {
        const city = await this.$store.dispatch({ type: "loadWeather", city: searchVal});
        if(!city) {
            showMsg(`Load City Faild`, 'error');
            this.cityWeather = await this.$store.dispatch({type: "loadWeather", city: 'Tel Aviv'});
        } else {
          this.cityWeather = city;
        }
        this.setIsFavorite()
      } catch (e) {
        showMsg(`Load City Faild`, 'error');
      }
    },
    async toggleFavorite() {
      try {
        if(this.isFavorite) {
          await this.$store.dispatch({ type: "removeFavorite", city: this.cityWeather.name});
          showMsg(`Remove success`);
        } else {
          await this.$store.dispatch({ type: "addFavorite", city: this.cityWeather.name});
          showMsg(`Add ${this.cityWeather.name} to favorites success`);
        }
        this.isFavorite = !this.isFavorite;
      } catch (e) {
        if (this.isFavorite) {
         showMsg(`Remove Favorite faild`, 'error');
        } else { 
          showMsg(`Add Favorite faild`, 'error');
        }
      }
    },
    async changeTempType() {
      this.tempType = await this.$store.dispatch({type: 'changeTempType'});
    },
    setIsFavorite() {
        if(!this.user || !this.user.favorites.length) return
        this.isFavorite = this.user.favorites.some(favorite=> favorite.name.toLowerCase() === this.cityWeather.name.toLowerCase());
    }
  },

  computed: {
    setFavoriteBtn() {
      return (this.isFavorite) ? 'Remove From Favorite' : 'Add To Favorites';
    },
    setWeatherImg() {
      let img = 'default';
      if(this.cityWeather.description.toLowerCase().includes('sunny')) img = 'sunny';
      if(this.cityWeather.description.toLowerCase().includes('cloud')) img = 'cloudy';
      if(this.cityWeather.description.toLowerCase().includes('rain')) img = 'rainy';
      if(this.cityWeather.description.toLowerCase().includes('snow')) img = 'snow';
      return require(`../assets/imgs/${img}.png`)
    }, 
    setTempType() {
      if(this.tempType === 'c') {
        return this.cityWeather.currWeatherC.Value + ' ' + this.cityWeather.currWeatherC.Unit;
      } else {
        return this.cityWeather.currWeatherF.Value + ' ' + this.cityWeather.currWeatherF.Unit;
      }
    },
  },

  watch: {
    "$route.params.cityName": {
      async handler(cityName) {
        if(!cityName) {
          this.cityWeather = await this.$store.dispatch({type: "loadWeather", city: 'Tel Aviv'});
        } else {
          const city = await this.$store.dispatch({type: "loadWeather", city: cityName});
          if(!city) {
            showMsg(`Load City Faild`, 'error');
            this.cityWeather = await this.$store.dispatch({type: "loadWeather", city: 'Tel Aviv'});
          }
          this.cityWeather = city;
        }
        await this.loadUser();
        this.setIsFavorite();
      },
      immediate: true
    }
  },

  components: {
    appFilter,
    forecastsList
  }
};
</script>

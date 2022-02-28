<template>
    <article v-if="favorite" class="fevorite-preview flex column align-center p10" @mouseover="isHover = true" @mouseleave="isHover = false" @click="showWeather">
        <h3>{{favorite.name}}</h3>
        <img :src="setWeatherImg" alt="">
        <small>{{setTempType}}</small>
        <div v-if="isHover" class="actions-container flex align-center space-between p10">
            <font-awesome-icon icon="fa-solid fa-trash-can" class="icon" title="Remove favorite" @click="remove"/>
        </div>
    </article>
</template>

<script>
export default {
    name: "fav-prev",

    props: {
        favorite: Object,
        tempType: String
    },

    data() {
        return {
            isHover: false
        }
    },

    methods: {
        remove() {
            this.$emit('removeFavorite', this.favorite._id);
        },
        showWeather() {
            this.$emit('showWeather', this.favorite.name);
        }
    },

    computed: {
        setWeatherImg() {
            let img = 'default';
            if(this.favorite.description.toLowerCase().includes('sunny')) img = 'sunny';
            if(this.favorite.description.toLowerCase().includes('cloud')) img = 'cloudy';
            if(this.favorite.description.toLowerCase().includes('rain')) img = 'rainy';
            if(this.favorite.description.toLowerCase().includes('snow')) img = 'snow';
            return require(`../assets/imgs/${img}.png`);
        },
        setTempType() {
            if(this.tempType === 'c') {
                return this.favorite.currWeatherC.Value + ' ' + this.favorite.currWeatherC.Unit; 
            } else {
                return this.favorite.currWeatherF.Value + ' ' + this.favorite.currWeatherF.Unit; 
        }
    }
    }
}
</script>

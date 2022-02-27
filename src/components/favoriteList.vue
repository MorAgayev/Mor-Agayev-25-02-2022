<template>
    <ul v-if="favorites" class="fevorite-list clean-list">
        <li v-for="favorite in favorites" :key="favorite._id">
            <fav-prev :favorite="favorite" @removeFavorite="removeFavorite" @showWeather="showWeather"/>
        </li>
    </ul>
</template>

<script>
import favPrev from './favoritePreview.vue'
export default {
    props: {
        favorites: Array
    },
    methods: {
        removeFavorite(favoriteId) {
            this.$emit('removeFavorite', favoriteId)
        },
        showWeather(favoriteName) {
            this.$emit('showWeather', favoriteName)
        },
    },
    components: {
        favPrev
    }
}
</script>

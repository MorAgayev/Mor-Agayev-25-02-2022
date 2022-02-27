<template>
    <article v-if="favorite" class="fevorite-preview flex column align-center p10" @mouseover="isHover = true" @mouseleave="isHover = false" @click="showWeather">
        <h3>{{favorite.name}}</h3>
        <img src="../assets/imgs/sunny.png" alt="">
        <small>{{favorite.currWeather.Value}} {{favorite.currWeather.Unit}}</small>
        <div v-if="isHover" class="actions-container flex align-center space-between p10">
            <font-awesome-icon icon="fa-solid fa-trash-can" class="icon" title="Remove favorite" @click="remove"/>
        </div>
    </article>
</template>

<script>
export default {
    name: "fav-prev",
    props: {
        favorite: Object
    },
    data() {
        return {
            isHover: false
        }
    },
    methods: {
        remove() {
            this.$emit('removeFavorite', this.favorite._id)
        },
        showWeather() {
            this.$emit('showWeather', this.favorite.name)
        }
    }
}
</script>

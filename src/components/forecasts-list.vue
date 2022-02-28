<template>
    <section class="align-center">
        <ul v-if="forecasts" class="forecasts-list clean-list simple-cards-grid">
            <li v-for="forecast in this.forecasts" :key="forecast.EpochDate">
                <forecast-preview :forecast="forecast" :tempType="tempType"/>
            </li>
        </ul>
    </section>
</template>

<script>
import forecastPreview from './forecastPreview.vue';

export default {
    name: 'forecastList',

    props: {
       forecasts: Array,
       tempType: String
    },

    components: {
        forecastPreview
    }
}
</script>

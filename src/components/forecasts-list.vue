<template>
    <section class="align-center">
        <ul v-if="forecasts" class="forecasts-list clean-list simple-cards-grid">
            <li v-for="forecast in this.forecasts" :key="forecast.EpochDate">
                <forecast-preview :forecast="forecast"/>
            </li>
        </ul>
    </section>
</template>

<script>
import forecastPreview from './forecastPreview.vue'
export default {
    props: {
       forecasts: Array
    },
    methods: {
        
    },
    components: {
        forecastPreview
    }
}
</script>

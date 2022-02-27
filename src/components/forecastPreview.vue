<template>
    <article v-if="forecast" class="forecast flex space-between p10">
        <div  class="flex column align-center">
        <h3>{{setDay}}</h3>
        <img src="../assets/imgs/sunny.png" alt="weather image">
        <small>Min: {{setMinTemp}}</small>
        <small>Max: {{setMaxTemp}}</small>
        </div>
    </article>
</template>

<script>

export default {
    props: {
        forecast: Object
    },
    computed: {
        setDay() {
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const day = new Date(this.forecast.Date).getDay();
            return days[day]
        },
        setMinTemp() {
            const temp = this.forecast.Temperature.Minimum.Value;
            const unit = this.forecast.Temperature.Minimum.Unit
            return temp + ' ' + unit 
        },
        setMaxTemp() {
            const temp = this.forecast.Temperature.Maximum.Value;
            const unit = this.forecast.Temperature.Maximum.Unit
            return temp + ' ' + unit 
        },
        setForecastImg() {
            const HoursOfSun = this.forecast.HoursOfSun;
            console.log(HoursOfSun);
            const imgName = ['sunny','rainy', 'cloudy', 'snow']
            return `../assets/imgs/sunny.png`
        }
    }

}
</script>

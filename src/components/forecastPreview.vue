<template>
    <article v-if="forecast" class="forecast flex space-between p10">
        <div  class="flex column align-center">
        <h3>{{setDay}}</h3>
        <img :src="setWeatherImg" alt="weather image">
        <small>Min: {{setMinTemp}}</small>
        <small>Max: {{setMaxTemp}}</small>
        </div>
    </article>
</template>

<script>
export default {
    props: {
        forecast: Object,
        tempType: String,
    },

    computed: {
        setDay() {
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const day = new Date(this.forecast.Date).getDay();
            return days[day]
        },
        setMinTemp() {
            let temp = null
            let unit = null
             if(this.tempType === 'c') {
                 temp = this.forecast.Temperature.Minimum.Value;
                 unit = this.forecast.Temperature.Maximum.Unit;
             } else {
                 const F = ((this.forecast.Temperature.Minimum.Value * 1.8 ) + 32).toFixed(1);
                 temp = F;
                 unit = 'F';
             }
            return temp + ' ' + unit; 
        },
        setMaxTemp() {
            let temp = null;
            let unit = null;
            if(this.tempType === 'c') {
                temp = this.forecast.Temperature.Maximum.Value;
                unit = this.forecast.Temperature.Maximum.Unit;
            } else {
                const F = ((this.forecast.Temperature.Maximum.Value * 1.8 ) + 32).toFixed(1);
                temp = F;
                unit = 'F';
            }
            return temp + ' ' + unit; 
        },
        setWeatherImg() {
            let img = 'default';
            if(this.forecast.Day.IconPhrase.toLowerCase().includes('sunny')) img = 'sunny';
            if(this.forecast.Day.IconPhrase.toLowerCase().includes('cloud')) img = 'cloudy';
            if(this.forecast.Day.IconPhrase.toLowerCase().includes('rain')) img = 'rainy';
            if(this.forecast.Day.IconPhrase.toLowerCase().includes('snow')) img = 'snow';
            return require(`../assets/imgs/${img}.png`);
        }
    }
}
</script>

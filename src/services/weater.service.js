import axios from 'axios';

export const weatherService = {
  query
}

const STORAGE_KEY = 'cities'
const API_KEY = 'pdw7pKEq08fLLvW4vGvE4uWyVZejz5CT';
const gCities = JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || []

async function query(location ='tel aviv') {
  if(gCities.length) {
    let city = gCities.find(city=> city.name.toLowerCase() === location.toLowerCase())
    if(city) return city;
  }
    let city = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${location}`)
    .then(res => { return {code: res.data[0].Key, name: res.data[0].LocalizedName}})
    
    city = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${city.code}?apikey=${API_KEY}&details=true`)
    .then(res => { return {...city ,currWeatherC:res.data[0].ApparentTemperature.Metric, currWeatherF:res.data[0].ApparentTemperature.Imperial, description: res.data[0].WeatherText}})

    city.dailyForecasts = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city.code}?apikey=${API_KEY}&details=true&metric=true`)
    .then(res => { return res.data.DailyForecasts})

    gCities.push(city)
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(gCities))

    return city; 
}
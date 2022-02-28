import { weatherService } from '../services/weater.service';

export default {
    state: {
        weather: null,
        city: 'tel aviv',
        tempType: 'c'
    },

    getters: {
        getCity(state) {
            return state.city
        },
        getTempType(state) {
            return state.tempType
        }
    },

    mutations: {
        setWeather(state, { weather }) {
            state.weather = weather
        },
        setCity(state, { city }) {
            state.city = city
        },
        setTempType(state, { tempType }) {
            state.tempType = tempType
        }
    },

    actions:{
        async loadWeather({ commit }, { city }) {
            try {
              const weather = await weatherService.query(city)
              commit({ type: 'setWeather', weather })
              commit({ type: 'setCity', city })
              return weather
            } catch (err) {
              console.log('Load weather failed..', err);
            }
        },
        async changeTempType({ commit , state}) {
            try {
                let currType = state.tempType;
                (currType === 'c') ? currType = 'f' : currType = 'c'
                commit({ type: 'setTempType', tempType: currType});
                return currType;
            } catch (err) {
                console.log('Change Temp Type Failed..', err);
            }
        }
    }
}
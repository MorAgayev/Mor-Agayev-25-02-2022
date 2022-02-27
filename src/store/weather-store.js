import {weatherService} from '../services/weater.service'
export default {
    state: {
        weather: null,
        city: 'tel aviv'
    },
    getters: {
        getCity(state) {
            return state.city
        },
        // get_(state) {
        //     return state.value
        // },
    },
    mutations: {
        setWeather(state, { weather }) {
            state.weather = weather
        },
        setCity(state, { city }) {
            state.city = city
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
        // async addFavorite({ commit }, { city }) {
        //     try {
        //         console.log('favorite', city);
        //     } catch (err) {
        //         console.log('Add favorite failed..', err);
        //     }
        // }
        // async get_ById({ commit }, { id }) {
        //     try {
        //       const item = await _Service.getById(id);
        //       commit({ type: 'set_', item })
        //       return item
        //     } catch (err) {
        //       console.log('Load value failed..', err);
        //     }
        // },
        // async create_({ }, { title, style }) {
        //     try {
        //       const _Id = await valueService.add(title, style)
        //       return _Id
        //     } catch (err) {
        //       console.log('Create _ failed..', err);
        //     }
        // },
        // async update_({ }, { item }) {
        //     try {
        //       const updatedItem = await _Service.update(item);
        //       return updatedItem;
        //     } catch (err) {
        //       console.log('Update item failed..', err);
        //     }
        // },
        // async remove_({ }, { itemId }) {
        //     try {
        //       _Service.remove(itemId);
        //       commit({ type: 'removeItem', itemId });
      
        //     } catch (err) {
        //       console.log('Remove value failed..', err);
        //     }
        // },

    }
}
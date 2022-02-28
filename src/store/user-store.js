import { userService } from '../services/userService';

export default {
    state: {
        loggedinUser: userService.getLoggedinUser()
    },

    getters: {
        getLoggedinUser(state) {
            return state.loggedinUser
        }
    },

    mutations: {
        setUser(state, {user}) {
            state.loggedinUser = user;
        },
    },

    actions:{
        async login({commit}, {user}) {
            try {
                const loggedinUser = await userService.login(user);
                commit({type: 'setUser', user:loggedinUser})
            } catch (err) {
                console.log('Login faild...', err);
            }
        },
        async signup({commit}, {user}) {
            try {
                const signedUser = await userService.signup(user);
                commit({type: 'setUser', user: signedUser})
            } catch (err) {
                console.log('Signup faild...', err);
            }
        },
        async logout({commit}) {
            try {
                await userService.logout();
                commit({type: 'setUser', user: null})
            } catch (err) {
                console.log('Logout faild...', err);
            }
        },
        async addFavorite({ commit, state }, { city }) {
            try {
                const user = await userService.addFavorite(city, state.loggedinUser)
                commit({type: 'setUser', user})
                return user;
            } catch (err) {
                console.log('Add favorite failed..', err);
            }
        },
        async removeFavorite({ state }, { favoriteId }) {
            try {
              userService.removeFavorite(state.loggedinUser ,favoriteId);      
            } catch (err) {
              console.log('Remove favorite failed..', err);
            }
        },

    }
}
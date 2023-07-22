import axios from "axios";

export default {
    namespaced: true,
    state: {
        token: null,
        user: null,
    },
    getters: {
        authenticated(state) {
            return state.token;
        },

        user(state) {
            return state.user;
        }

    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_USER_INFO(state, data) {
            state.user = data;
        }
    },
    actions: {
        async login({ dispatch }, credentials) {
            let response = await axios.post('login', credentials)
            return dispatch('attempt', response.data.token);
        },

        async signup({ dispatch }, credentials) {
            let response = await axios.post('signup', credentials)
            return dispatch('attempt', response.data.token);
        },

        async attempt({commit, state}, token) {

            if (token) {
                commit('SET_TOKEN', token);
            }

            if (!state.token) {
                return
            }


            try {
               let user = await axios.get('user-info', {
                   headers: {
                       'Authorization': 'Bearer ' + token
                   }
               });
               commit('SET_USER_INFO', user.data);

            }catch (e){
                commit('SET_TOKEN', null)
                commit('SET_USER_INFO', null)
            }
        },

        logout({commit}) {
            return axios.post('logout').then(() => {
                commit('SET_TOKEN', null)
                commit('SET_USER_INFO', null)
            })
        }
    }
}

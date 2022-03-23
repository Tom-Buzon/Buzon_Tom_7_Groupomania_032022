import { createStore } from 'vuex'

//import Axios from 'axios';

const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000/'
});


let user = localStorage.getItem('user');

if (!user) {
    user = {
        token: '',
        ID: -1,
        isAdmin: ''
    };
} else {
    try {
        user = JSON.parse(user);

    } catch (ex) {
        user = {
            token: '',
            ID: -1,
            isAdmin: ''
        };
    }
}

// Create a new store instance.
const store = createStore({
    state: {
        status: '',
        user: user,
        userInfos: {
            NAME: '',
            PASSWORD: ''
        },
        articles: {}
    },
    mutations: {
        setArticles(state, result) {
            state.articles = result;
        },
        setStatus: function(state, status) {
            state.status = status;
        },
        logUser: function(state, user) {
            localStorage.setItem('user', JSON.stringify(user));

            //instance.defaults.headers.common['Authorization'] = user.token;
            state.user = user;
        },
        userInfos: function(state, userInfos) {
            state.userInfos = userInfos;
        },
        logout: function(state) {
            state.user = {
                ID: -1,
                token: '',
                isAdmin: ''
            }
            localStorage.removeItem('user');
        }


    },

    actions: {

        updateArticles({ commit }, req) {
            commit('setArticles', req);
        },
        login: ({ commit }, userInfos) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                instance.post('/users/login', userInfos)
                    .then(function(response) {
                        commit('setStatus', '');
                        commit('logUser', response.data);
                        resolve(response);
                    })
                    .catch(function(error) {
                        commit('setStatus', 'error_login');
                        reject(error);
                    });
            });
        },
        signup: ({ commit }, userInfos) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                commit;
                instance.post('/users/signup', userInfos)
                    .then(function(response) {
                        commit('setStatus', 'created');
                        resolve(response);
                    })
                    .catch(function(error) {
                        commit('setStatus', 'error_create');
                        reject(error);
                    });
            });
        },
        getUserInfos: ({ commit }) => {
            instance.post('/infos')
                .then(function(response) {
                    commit('userInfos', response.data.infos);
                })
                .catch(function() {});
        },
        async authentificateRequest() {
            this.state.user = JSON.parse(localStorage.getItem('user'))

            let authorization = [];
            authorization.push(this.state.user.userId)
            authorization.push(this.state.user.token)
            authorization.push(this.state.user.isAdmin)
            return { authorization }
        }

    }
})

export default store;
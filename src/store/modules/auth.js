import EventService from "@/services/EventService.js";
import router from '@/router'

export const namespaced = true

export const state = {
    user: [],
    user_loading: false,
    errors: {},
}

export const getters = {

}

export const  mutations = {

    SET_USER(state, user) {
        state.user = user
    },

    SET_USER_LOADING(state, loading) {
        state.user_loading = loading
    },

    SET_ERRORS(state, errors) {
        state.errors = errors
    },
}

export const actions = {

    login({ commit }, payloads)
    {
        commit('SET_USER_LOADING', true)

        EventService.login(payloads)
        .then(response => {
            commit('SET_USER', response.data.user)
            commit('SET_USER_LOADING', false)
            localStorage.setItem('scheduling_token', response.data.token)
            router.push('/')
        })
        .catch(error => {
            console.log('error', error.response.data.errors);
            commit('SET_ERRORS', error.response.data.errors)
            commit('SET_USER_LOADING', false)
        })

    }

}

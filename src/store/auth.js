import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";
import router from '@/router'

export const useAuthStore = defineStore({

    id: 'auth',

    state: () => ({
        user: [],
        user_loading: false,
        errors_register: {},
        errors_login: {},
    }),

    actions: {

        handleRegister(payloads) {

            this.user_loading = true

            EventService.login(payloads)
            .then(response => {
                this.user = response.data.user
                this.user_loading = false
                localStorage.setItem('scheduling_token', response.data.token)
                router.push('/')
            })
            .catch(error => {
                this.errors_register = error.response.data.errors
                this.user_loading = false
            })
        },

        handleLogin(payloads) {

            this.user_loading = true

            EventService.login(payloads)
            .then(response => {
                this.user = response.data.user
                this.user_loading = false
                console.log('token', response.data.token)
                localStorage.setItem('scheduling_token', response.data.token)
                router.push('/')
            })
            .catch(error => {
                this.errors_login = error.response.data.errors
                this.user_loading = false
            })
        }
    },






})
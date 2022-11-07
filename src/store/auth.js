import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";
import { notify } from "@kyvg/vue3-notification";
import router from '@/router'

export const useAuthStore = defineStore({

    id: 'auth',

    state: () => ({
        user: [],
        user_loading: false,
        verification_loading: false,
        errors_register: {},
        errors_login: {},
    }),

    getters: {
        isLoggedIn(state) {
            return Object.keys(state.user || {}).length ? Object.keys(state.user).length : 0
        }
    },

    actions: {

        handleRegister(payloads) {

            this.user_loading = true

            EventService.register(payloads)
            .then(response => {
                this.user = response.data.user
                this.user_loading = false
                localStorage.setItem('scheduling_token', response.data.token)
                localStorage.setItem('scheduling_id', response.data.user.id)
                router.push({name: 'Dashboard'})
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

                localStorage.setItem('scheduling_token', response.data.token)
                localStorage.setItem('scheduling_id', response.data.user.id)
                router.push({name: 'Dashboard'})
                notify({ type: "success", duration: 6000, title: "SUCCESSFULLY LOGIN" });
            })
            .catch(error => {
                this.errors_login = error.response.data.errors
                this.user_loading = false
            })
        },

        handleLogout() {
            this.errors_login = ''
            this.user_loading = true

            EventService.logout()
            .then(response => {
                this.user = response.data.user
                this.user_loading = false
                localStorage.removeItem('scheduling_token')
                localStorage.removeItem('scheduling_id')
                router.push({name: 'Login'})
                notify({ type: "success", duration: 6000, title: "SUCCESSFULLY LOGOUT" });
            })
            .catch(error => {
                this.errors_login = error.response.data.errors
                this.user_loading = false
            })
        },

        handleResendVerification() {

            this.verification_loading = true
            EventService.resendVerification()
            .then(response => {
                this.verification_loading = false
                notify({ type: "success", duration: 6000, title: response.data.message });
            })
            .catch(error => {
                this.errors_login = error.response.data.errors
                this.verification_loading = false
            })
        },

        getUser() {

            EventService.getUser()
            .then(response => {
                this.user = response.data
                this.verification_loading = false
            })
            .catch(error => {
                this.errors_login = [[error.response.data.message]]
                this.verification_loading = false
                if (error.response.status == 401) {
                    router.push({name: 'Login'})
                }
            })
        }

    },






})
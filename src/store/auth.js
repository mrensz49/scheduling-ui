import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";
import { notify } from "@kyvg/vue3-notification";
import router from '@/router'

export const useAuthStore = defineStore({

    id: 'auth',

    state: () => ({
        prof: 'me',
        user: [],
        user_loading: false,
        verification_loading: false,
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
                console.log('token', response.data.token)
                localStorage.setItem('scheduling_token', response.data.token)
                router.push({name: 'Dashboard'})
                notify({ type: "success", title: "SUCCESSFULLY LOGIN" });
            })
            .catch(error => {
                this.errors_login = error.response.data.errors
                this.user_loading = false
            })
        },

        handleLogout() {
            this.user_loading = true

            EventService.logout()
            .then(response => {
                this.user = response.data.user
                this.user_loading = false
                localStorage.removeItem('scheduling_token')
                router.push({name: 'Login'})
                notify({ type: "success", title: "SUCCESSFULLY LOGOUT" });
            })
            .catch(error => {
                this.errors_login = error.response.data.errors
                this.user_loading = false
            })
        },

        handleResendVerification() {

            this.user_loading = true
            EventService.resendVerification()
            .then(response => {
                this.verification_loading = false
                notify({ type: "success", duration: 6000, title: response.data.message });
            })
            .catch(error => {
                this.errors_login = error.response.data.errors
                this.verification_loading = false
            })
        }
    },






})
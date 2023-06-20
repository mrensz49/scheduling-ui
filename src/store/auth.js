import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";
import { useToast } from 'vue-toastification'
import router from '@/router'

const toast = useToast()

export const useAuthStore = defineStore({

    id: 'auth',

    state: () => ({
        editInfo: 0,
        editPassword: 0,
        user: [],
        loading: false,
        loading_password: false,
        user_loading: false,
        verification_loading: false,
        errors_register: {},
        errors_login: {},
        errors: {},
        errors_password: {},
    }),

    getters: {
        isLoggedIn(state) {
            return Object.keys(state.user || {}).length ? Object.keys(state.user).length : 0
        },

        showCongregation(state) {
           return  Object.keys(state.user || {}).length ? state.user.congregation : []
        }

    },

    actions: {

        async getToken() {
            await EventService.getToken()
            .then(response => {
                return response;
            })
        },

        updateUser(payloads) {

            this.loading = true
            this.errors = {}
            EventService.updateUser(payloads)
            .then(response => {
                this.editInfo = 0
                this.user = response.data
                this.loading = false
                toast.success("Successfully Save")
            })
            .catch(error => {
                this.errors = error.response.data.errors
                this.loading = false
            })
        },

        updateUserPassword(payloads) {

            this.loading_password = true
            EventService.updateUserPassword(payloads)
            .then(() => {
                this.editPassword = 0
                this.loading_password = false
                this.errors_password = {}
                toast.success("Successfully Changed")

            })
            .catch(error => {
                this.errors_password = error.response.data.errors
                this.loading_password = false
            })
        },

        handleRegister(payloads) {
            this.errors_register = {}
            this.user_loading = true
            let url = window.location.origin
            EventService.register(payloads)
            .then(response => {
                this.user = response.data.user
                this.user_loading = false
                localStorage.setItem('scheduling_token', response.data.token)
                localStorage.setItem('scheduling_id', response.data.user.id)
                // router.push({name: 'Dashboard'})
                location.href = url+'/?#/dashboard';
            })
            .catch(error => {
                this.errors_register = error.response.data.errors
                this.user_loading = false
            })
        },

        async handleLogin(payloads) {

            await this.getToken()

            this.errors_login = {}
            this.user_loading = true
            let url = window.location.origin
            EventService.login(payloads)
            .then(response => {
                this.user = response.data.user
                this.user_loading = false

                localStorage.setItem('scheduling_token', response.data.token)
                localStorage.setItem('scheduling_id', response.data.user.id)
                // router.push({name: 'Dashboard'})
                location.href = url+'/?#/dashboard';
                toast.success("Successfully Login")
                setTimeout(()=>{
                    window.location.reload()
                },250)
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
                toast.success("Successfully Logout")

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
                toast.success(response.data.message)
            })
            .catch(error => {
                this.errors_login = error.response.data.errors
                this.verification_loading = false
            })
        },

        async getUser() {

            await EventService.getUser()
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
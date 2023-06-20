import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";
import { useToast } from 'vue-toastification'
const toast = useToast()

export const useUserStore = defineStore({

    id: 'users',

    state: () => ({
        users: [],
        roles: [],
        loading: false,
        errors: {},
    }),

    actions: {

        fetchUsers() {
            this.loading = true
            EventService.fetchUsers()
            .then(response => {
                this.users = response.data
                this.loading = false
                this.errors = {}
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }
                this.loading = false
            })
        },

        fetchCongregationUsers() {
            this.loading = true
            EventService.fetchCongregationUsers()
            .then(response => {
                this.users = response.data
                this.loading = false
                this.errors = {}
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }
                this.loading = false
            })
        },

        setUserCongregation(payloads) {
            EventService.setUserCongregation(payloads)
            .then(() => {
                toast.success("Successfully Save")
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }
                this.loading = false
            })
        },

        getRoles() {
            this.loading = true
            EventService.getRoles()
            .then(response => {
                this.roles = response.data
                this.loading = false
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }
                this.loading = false
            })
        },

        updateRoles(payloads) {
            EventService.updateRoles(payloads)
            .then(() => {
                toast.success("Successfully Save")
                this.fetchCongregationUsers()
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }
                this.loading = false
            })
        },
    }
})
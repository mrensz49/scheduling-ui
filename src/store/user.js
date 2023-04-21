import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";
import { notify } from "@kyvg/vue3-notification"

export const useUserStore = defineStore({

    id: 'users',

    state: () => ({
        users: [],
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

        setUserCongregation(payloads) {
            EventService.setUserCongregation(payloads)
            .then(() => {
                notify({ type: "success", duration: 6000, title: "Successfully Save!" });
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }
                this.loading = false
            })
        }
    }
})
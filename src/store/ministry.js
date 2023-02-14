import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";

export const useMinistryStore = defineStore({

    id: 'ministries',

    state: () => ({
        ministries: [],
        loading: false,
        errors: {},
    }),

    actions: {

        fetchMeetingMinistries() {
            this.loading = true
            EventService.fetchMeetingMinistries()
            .then(response => {
                this.ministries = response.data
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
    }
})
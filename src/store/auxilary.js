import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";
import { notify } from "@kyvg/vue3-notification"

export const useAuxilaryStore = defineStore({

    id: 'auxilary',

    state: () => ({
        data: [],
        loading: false,
        errors: {},
    }),

    actions: {

        addAuxilary(payloads) {
            this.loading = true
            EventService.addAuxilary(payloads)
            .then(response => {
                this.data = response.data
                this.loading = false
                notify({ type: "success", duration: 6000, title: "SUCCESSFULLY ADDED" });
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }
                this.loading = false
            })
        },

        fetchAuxiDates(payload) {
            this.loading = true
            EventService.fetchAuxiDates(payload)
            .then(response => {
                this.data = response.data
                this.loading = false
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
import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";

export const useAssignmentStore = defineStore({

    id: 'assignments',

    state: () => ({
        data: [],
        loading: false,
        errors: {},
    }),

    getters: {
    },

    actions: {

        showAssignment(payloads) {
            this.loading = true
            EventService.showAssignment(payloads)
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

        updateAssignment(payloads) {
            this.loading = true
            EventService.updateAssignment(payloads)
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
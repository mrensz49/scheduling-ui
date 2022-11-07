import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";

export const useCongregationStore = defineStore({

    id: 'congregations',

    state: () => ({
        congregations: [],
        loading: false,
        errors: {},
    }),

    actions: {

        getCongregation() {
            EventService.getCongregation()
            .then(response => {
                this.congregations = response.data
                this.loading = false
            })
            .catch(error => {
                this.errors = error.response.data.message
                this.loading = false
            })
        }
    }
})
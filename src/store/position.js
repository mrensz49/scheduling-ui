import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";

export const usePositionStore = defineStore({

    id: 'positions',

    state: () => ({
        positions: [],
        loading: false,
        errors: {},
    }),

    actions: {

        getPosition() {
            EventService.getPosition()
            .then(response => {
                this.positions = response.data
                this.loading = false
            })
            .catch(error => {
                this.errors = error.response.data.message
                this.loading = false
            })
        }
    }
})
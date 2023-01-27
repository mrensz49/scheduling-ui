import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";

export const usePositionStore = defineStore({

    id: 'positions',

    state: () => ({
        positions: [],
        members: [],
        loading: false,
        errors: {},
    }),

    getters: {

        getDesignates() {
            const listPositions = this.positions.map((position) => {
                position.value = position.id
                return position
            })
            return listPositions;
        }
    },

    actions: {

        getPositions() {
            EventService.getPositions()
            .then(response => {
                this.positions = response.data
                this.loading = false
            })
            .catch(error => {
                this.errors = error.response.data.message
                this.loading = false
            })
        },

        getPosition(id) {
            this.loading = true
            EventService.getPosition(id)
            .then(response => {
                this.members = response.data
                this.loading = false
            })
            .catch(error => {
                this.errors = error.response.data.message
                this.loading = false
            })
        },

    }
})
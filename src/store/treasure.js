import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";
import { notify } from "@kyvg/vue3-notification"

import { useHelperStore } from '@/services/helper'
const helperStore = useHelperStore()

export const useTreasureStore = defineStore({

    id: 'treasures',

    state: () => ({
        treasures: [],
        treasure: {},
        loading: false,
        errors: {},
    }),

    getters: {

        removeTreasure: state => id =>  {
            const index = state.treasures.findIndex(treasure => treasure.id === id);
             if (index !== -1) {
                 state.treasures.splice(index, 1);
             }
         },

        appendTreasure: state => (payload) => {
            state.treasures.push(payload); // append added song
        },

        updateTreasure: state => (payload) => {
            const index = state.treasures.findIndex(item => item.id === payload.id);
            if (index !== -1) {
                state.treasures[index] = payload
            }
        },
    },

    actions: {

        addTreasure(payloads) {
            helperStore.loading = true
            EventService.addTreasure(payloads)
            .then(response => {

                this.appendTreasure(response.data)
                helperStore.loading = false
                notify({ type: "success", duration: 6000, title: "SUCCESSFULLY ADDED" });
                helperStore.visibleModalTreasure=false
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    helperStore.errors = error.response.data.errors
                }
                helperStore.loading = false
            })
        },

        fetchMeetingTreasures() {
            this.loading = true
            EventService.fetchMeetingTreasures()
            .then(response => {
                this.treasures = response.data
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

        editTreasure(payloads) {
            helperStore.loading = true
            EventService.editTreasure(payloads)
            .then(response => {
                this.updateTreasure(response.data)
                helperStore.loading = false
                notify({ type: "success", duration: 6000, title: "SUCCESSFULLY UPDATED" });
                helperStore.visibleModalTreasure=false
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    helperStore.errors = error.response.data.errors
                }
                helperStore.loading = false
            })
        },

        deleteMeetingTreasure(id) {

            helperStore.loading_delete = true
            setTimeout(() => {
                EventService.deleteMeetingTreasure(id)
                .then(() => {
                    helperStore.loading_delete = false
                    helperStore.confirm = 0
                    this.removeTreasure(id)
                    notify({ type: "success", duration: 6000, title: "SUCCESSFULLY DELETED" });
                })
                .catch(error => {
                    if (typeof error.response !== 'undefined') {
                        this.errors = error.response.data.errors
                    }
                    helperStore.loading_delete = false
                    helperStore.confirm = 0

                })
            },1000)
        },

        showTreasure(payloads) {
            this.loading = true
            EventService.showTreasure(payloads)
            .then(response => {
                this.treasure = response.data
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
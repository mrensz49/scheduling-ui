import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";
import { notify } from "@kyvg/vue3-notification"

import { useHelperStore } from '@/services/helper'
const helperStore = useHelperStore()

export const useChristianLivingStore = defineStore({

    id: 'christian-living',

    state: () => ({
        livings: [],
        loading: false,
        errors: {},
    }),

    getters: {

        removeChristianLiving: state => id =>  {
            const index = state.livings.findIndex(living => living.id === id);
             if (index !== -1) {
                 state.livings.splice(index, 1);
             }
        },

        appendChristianLiving: state => (payload) => {
            state.livings.push(payload); // append
        },

        updateChristianLiving: state => (payload) => {
            const index = state.livings.findIndex(item => item.id === payload.id);
            if (index !== -1) {
                state.livings[index] = payload
            }
        },
    },

    actions: {

        addChristianLiving(payloads) {
            helperStore.loading = true
            EventService.addChristianLiving(payloads)
            .then(response => {

                this.appendChristianLiving(response.data)
                helperStore.loading = false
                notify({ type: "success", duration: 6000, title: "SUCCESSFULLY ADDED" });
                helperStore.visibleModal=false
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    helperStore.errors = error.response.data.errors
                }
                helperStore.loading = false
            })
        },

        fetchMeetingLivings() {
            this.loading = true
            EventService.fetchMeetingLivings()
            .then(response => {
                this.livings = response.data
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

        editChristianLiving(payloads) {
            helperStore.loading = true
            EventService.editChristianLiving(payloads)
            .then(response => {
                this.updateChristianLiving(response.data)
                helperStore.loading = false
                notify({ type: "success", duration: 6000, title: "SUCCESSFULLY UPDATED" });
                helperStore.visibleModal=false
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    helperStore.errors = error.response.data.errors
                }
                helperStore.loading = false
            })
        },

        deleteChristianLiving(id) {

            helperStore.loading_delete = true
            setTimeout(() => {
                EventService.deleteChristianLiving(id)
                .then(() => {
                    helperStore.loading_delete = false
                    helperStore.confirm = 0
                    this.removeChristianLiving(id)
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

        fetchChristianLivingTitles(payloads) {
            this.loading = true
            EventService.fetchChristianLivingTitles(payloads)
            .then(response => {
                this.titles = response.data
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
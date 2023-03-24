import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";
import { notify } from "@kyvg/vue3-notification"

import { useHelperStore } from '@/services/helper'
const helperStore = useHelperStore()

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
                this.errors = {}
                helperStore.visibleModal = false
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

        deleteAuxilary(id) {

            helperStore.loading_delete = true
            setTimeout(() => {
                EventService.deleteAuxilary(id)
                .then(response => {
                    this.data = response.data
                    helperStore.loading_delete = false
                    helperStore.confirm = false
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
    }
})
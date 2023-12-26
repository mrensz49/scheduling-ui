import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";
import { useHelperStore } from '@/services/helper'
import { useToast } from 'vue-toastification'

const helperStore = useHelperStore()
const toast = useToast()

export const useMinistryStore = defineStore({

    id: 'ministries',

    state: () => ({
        ministries: [],
        loading: false,
        errors: {},
    }),

    getters: {

        removeEffectiveMinistry: state => id =>  {
            const index = state.ministries.findIndex(living => living.id === id);
             if (index !== -1) {
                 state.ministries.splice(index, 1);
             }
        },

        appendEffectiveMinistry: state => (payload) => {
            state.ministries.push(payload); // append
        },

        updateEffectiveMinistry: state => (payload) => {
            const index = state.ministries.findIndex(item => item.id === payload.id);
            if (index !== -1) {
                state.ministries[index] = payload
            }
        },
    },

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

        addEffectiveMinistry(payloads) {
            helperStore.loading = true
            EventService.addEffectiveMinistry(payloads)
            .then(response => {
                this.appendEffectiveMinistry(response.data)
                helperStore.loading = false
                toast.success("Successfully Added")
                helperStore.visibleModalEffectiveMinistry=false
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    helperStore.errors = error.response.data.errors
                }
                helperStore.loading = false
            })
        },

        editEffectiveMinistry(payloads) {
            helperStore.loading = true
            EventService.editEffectiveMinistry(payloads)
            .then(response => {
                this.updateEffectiveMinistry(response.data)
                helperStore.loading = false
                toast.success("Successfully updated")
                helperStore.visibleModalEffectiveMinistry=false
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    helperStore.errors = error.response.data.errors
                }
                helperStore.loading = false
            })
        },

    }
})
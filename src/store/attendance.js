import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";
// import { notify } from "@kyvg/vue3-notification"

// import { useHelperStore } from '@/services/helper'
// const helperStore = useHelperStore()

export const useAttendanceStore = defineStore({

    id: 'attendance',

    state: () => ({
        attendances: [],
        loading: false,
        errors: {},
        errors_attendance: {},
    }),

    actions: {

        saveAttendance(payloads) {
            this.loading =
            this.errors_attendance = {}
            EventService.saveAttendance(payloads)
            .then(response => {
                this.attendances = response.data
                this.loading = false
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors_attendance = error.response.data.errors
                }
                this.loading = false
            })
        },

        getAttendances(payload) {
            EventService.getAttendances(payload)
            .then(response => {
                this.attendances = response.data
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

});
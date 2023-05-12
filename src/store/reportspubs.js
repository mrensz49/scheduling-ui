import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";

import { useHelperStore } from '@/services/helper'
const helperStore = useHelperStore()

export const useReportsPubsStore = defineStore({

    id: 'reportspubs',

    state: () => ({
        reports: [],
        members: [],
        loading: false,
        errors: {},
    }),


    actions: {

        getNoReportsPubs(payload) {
            EventService.getNoReportsPubs(payload)
            .then(response => {
                this.reports = response.data
                this.loading = false
            })
            .catch(error => {
                this.errors = error.response.data.message
                this.loading = false
            })
        },

        calcNoReportsPubs(payloads) {

            this.loading = true
            helperStore.selectedModal = 'report_pub'

            if (payloads.type == 'show')
                helperStore.visibleModal = true

            EventService.calcNoReportsPubs(payloads)
            .then(response => {
                 if (payloads.type == 'calc')
                    this.reports = response.data
                else
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
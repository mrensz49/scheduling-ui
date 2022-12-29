import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";

export const useFieldServiceStore = defineStore({

    id: 'field_service',

    state: () => ({
        all_reports: [],
        monthly_reports: [],
        data: [],
        loading: false,
        errors: {},
    }),

    actions: {

        storeReport(payload) {
            this.loading = true
            EventService.storeReport(payload)
            .then(response => {
                this.data = response.data
                this.loading = false
            })
            .catch(error => {
                this.errors = error.response.data.message
                this.loading = false
            })
        },

        saveReport(payload, id) {
            this.loading = true
            EventService.saveReport(payload, id)
            .then(response => {
                this.data = response.data
                this.loading = false
            })
            .catch(error => {
                this.errors = error.response.data.message
                this.loading = false
            })
        },

        showTotalReport(reports) {

            // report[0]
            // report[1] type of reports like placements, video_showings, etc

            let sum_report = 0
            for (const member of reports[0]) {
                sum_report += member[reports[1]] * 1
            }

            this.all_reports.push({[reports[1]]: sum_report}) // stored all total reports
            return sum_report
        },

        sumTotalReport(report) {
            if (this.all_reports.length) {
                const total = this.all_reports.reduce((currentTotal, all_report) => {
                    return isNaN(parseInt(all_report[report]))  ? 0 + currentTotal : all_report[report]  + currentTotal
                }, 0)


                return total
            }
        },

        fetchMonthlyReport(payloads) {

            this.loading = true
            EventService.fetchMonthlyReport(payloads)
            .then(response => {
                this.monthly_reports = response.data
                this.loading = false
            })
            .catch(error => {
                this.errors = error.response.data.message
                this.loading = false
            })
        }
    }
})
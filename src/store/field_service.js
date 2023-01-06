import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";

export const useFieldServiceStore = defineStore({

    id: 'field_service',

    state: () => ({
        all_reports: [],
        monthly_reports: [],
        data: {
            stats: {},
            reports: {
                regular_pioneer: {},
                auxillary_pioneer: {},
            },
            placements: 0,
            video_showings: 0,
            hours: 0,
            return_visits: 0,
            bible_studies: 0,
        },
        loading: false,
        calc_loading: false,
        errors: {},
    }),

    actions: {

        storeReport(payload) {
            this.calc_loading = true
            EventService.storeReport(payload)
            .then(response => {
                this.data = response.data
                this.calc_loading = false
            })
            .catch(error => {
                this.errors = error.response.data.message
                this.calc_loading = false
            })
        },

        saveReport(payload, id) {
            this.calc_loading = true
            EventService.saveReport(payload, id)
            .then(response => {
                this.data = response.data
                this.calc_loading = false
            })
            .catch(error => {
                this.errors = error.response.data.message
                this.calc_loading = false
            })
        },

        grandTotalReports(date) {
            this.calc_loading = true
            EventService.grandTotalReports(date)
            .then(response => {
                this.data = response.data
                this.calc_loading = false
            })
            .catch(error => {
                this.errors = error.response.data.message
                this.calc_loading = false
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
                // var total = this.all_reports.reduce((currentTotal=0, all_report) => {
                //     return isNaN(parseInt(all_report[report]))  ? 0 + currentTotal : all_report[report]  + currentTotal
                // }, 0)
                let sum = 0
                for (const n of this.all_reports) {
                    console.log(report,' - ', parseInt(n[report]))
                    isNaN(parseInt(n[report])) ? sum+=0 : sum += n[report]
                    console.log('total - ', report , ' - ' ,sum)
                }

                return sum
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
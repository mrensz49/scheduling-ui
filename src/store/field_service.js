import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";
import moment from 'moment'

export const useFieldServiceStore = defineStore({

    id: 'field_service',

    state: () => ({
        member_reports: [],
        all_reports: [],
        monthly_reports: [],
        lineMonths: [],
        linePlacements: [],
        lineVideoShowings: [],
        lineHours: [],
        lineReturnVisits: [],
        lineBibleStudies: [],
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
        reports_loading: false,
        calc_loading: false,
        errors: {},
    }),

    getters: {

    },

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

                let sum = 0
                for (const n of this.all_reports) {
                    console.log(report,' - ', parseInt(n[report]))
                    isNaN(parseInt(n[report])) ? sum+=0 : sum += n[report]
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
        },

        async memberReports(id) {
            this.loading = true
            await EventService.memberReports(id)
            .then(response => {
                this.member_reports = response.data
                this.lineChartData(response.data)
                this.reports_loading = false
            })
            .catch(error => {
                this.errors = error.response.data.message
                this.reports_loading = false
            })
        },

        lineChartData(data) {

            console.log('data - ', data.years)

            let index=0
            for(let year in data.years) {
                let y = data.years[year]
                var list_months = data.reports[y].map(month => {
                    return this.getHumanDate(month.date_rendered)
                })
                this.lineMonths.push({[index]: list_months})
                index++
            }

            let index2=0
            for(let year in data.years) {

                var list_placements = []
                var list_video_showings = []
                var list_return_visits = []
                var list_bible_studies = []
                let y = data.years[year]
                var list_hours = data.reports[y].map(month => {

                    list_placements.push(month.placements)
                    list_video_showings.push(month.video_showings)
                    list_return_visits.push(month.return_visits)
                    list_bible_studies.push(month.bible_studies)

                    return month.hours

                })

                this.lineHours.push({[index2]: list_hours})
                this.linePlacements.push({[index2]: list_placements})
                this.lineVideoShowings.push({[index2]: list_video_showings})
                this.lineReturnVisits.push({[index2]: list_return_visits})
                this.lineBibleStudies.push({[index2]: list_bible_studies})

                index2++
            }


            // var list_placements = []
            // var list_video_showings = []
            // var list_return_visits = []
            // var list_bible_studies = []

            // var list_hours = reports.map(month => {

            //     list_placements.push(month.placements)
            //     list_video_showings.push(month.video_showings)
            //     list_return_visits.push(month.return_visits)
            //     list_bible_studies.push(month.bible_studies)

            //     return month.hours
            // })

            // this.lineData.data = list_months
            // this.lineData.placements = list_placements
            // this.lineData.video_showings = list_video_showings
            // this.lineData.hours = list_hours
            // this.lineData.return_visits = list_return_visits
            // this.lineData.bible_studies = list_bible_studies
        },

        getHumanDate(date) {
            return moment(date, 'YYYY-MM-DD').format('YYYY-MMM');
        },
    }
})
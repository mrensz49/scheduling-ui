import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";
import moment from 'moment'
import router from '@/router'
import { useToast } from 'vue-toastification'

import { useHelperStore } from '@/services/helper'

const helperStore = useHelperStore()
const toast = useToast()

export const useFieldServiceStore = defineStore({

    id: 'field_service',

    state: () => ({
        show_fs: 0,
        fs_report: [],
        member_reports: [],
        all_reports: [],
        group_reports: [],
        monthly_reports: [],
        lineMonths: [],
        linePlacements: [],
        lineVideoShowings: [],
        lineHours: [],
        lineReturnVisits: [],
        lineBibleStudies: [],
        lineCreditHours: [],
        lineIsMinistry: [],
        data: {
            stats: {},
            reports: {
                regular_pioneer: {},
                special_pioneer: {},
                auxillary_pioneer: {},
            },
            placements: 0,
            video_showings: 0,
            hours: 0,
            return_visits: 0,
            bible_studies: 0,
            credit_hours: 0,
            is_ministry: 0,
        },
        service_year: [],
        date_rendered: '',
        active_publishers: '',
        list_publishers: '',
        ap_loading: false,
        aps_loading: false,
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
                if (error.response.status == 401) {
                    toast.error("Session timeout. Please log in again.")
                    router.push({name: 'Login'})
                }
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
                if (error.response.status == 401) {
                    toast.error("Session timeout. Please log in again.")
                    router.push({name: 'Login'})
                }
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
                var value = 0
                if (reports[1] == 'is_ministry') {
                    value = (member[reports[1]] * 1) >= 1 ? 1:0
                } else {
                    value = member[reports[1]] * 1
                }

                sum_report += value
            }

            this.all_reports.push({[reports[1]]: sum_report}) // stored all total reports
            // this.group_reports.push({'group': reports[0], [reports[1]]: sum_report}) // stored all total reports
            return sum_report
        },

        sumTotalReport(report) {
            if (this.all_reports.length) {

                let sum = 0
                for (const n of this.all_reports) {
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

        memberReports(id) {
            this.reports_loading = true
            EventService.memberReports(id)
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

            var service_year = []
            if (parseInt(data.rp)) {
                service_year = data.years.map(year => {
                    return year.service_year
                })
                this.service_year = service_year
                this.processChart(data, service_year)
            }
            else {
                this.service_year = data.years
                this.processChart(data, data.years)
            }

        },

        processChart(data, service_year) {

            let index=0
            for(let year in service_year) {
                let y = service_year[year]
                var list_months = data.reports[y].map(month => {
                    return this.getHumanDate(month.date_rendered)
                })
                this.lineMonths.push({[index]: list_months})
                index++
            }

            let index2=0
            for(let year in service_year) {

                var list_placements = []
                var list_video_showings = []
                var list_return_visits = []
                var list_bible_studies = []
                var list_credit_hours = []
                var list_is_ministry = []
                let y = service_year[year]
                var list_hours = data.reports[y].map(month => {

                    list_placements.push(month.placements)
                    list_video_showings.push(month.video_showings)
                    list_return_visits.push(month.return_visits)
                    list_bible_studies.push(month.bible_studies)
                    list_credit_hours.push(month.credit_hours)
                    list_is_ministry.push(month.is_ministry)

                    return month.hours

                })

                this.lineHours.push({[index2]: list_hours})
                this.linePlacements.push({[index2]: list_placements})
                this.lineVideoShowings.push({[index2]: list_video_showings})
                this.lineReturnVisits.push({[index2]: list_return_visits})
                this.lineBibleStudies.push({[index2]: list_bible_studies})
                this.lineCreditHours.push({[index2]: list_credit_hours})
                this.lineIsMinistry.push({[index2]: list_is_ministry})

                index2++
            }
        },

        activePublishers(payloads) {

            if (payloads.type == 'get') {

                helperStore.visibleModal = true
                helperStore.selectedModal = 'active_pub'

                this.aps_loading = true
                EventService.activePublishers(payloads)
                .then(response => {
                    this.list_publishers = response.data
                    this.aps_loading = false
                })
                .catch(error => {
                    this.errors = error.response.data.message
                    this.aps_loading = false
                })
            }
            else {
                this.ap_loading = true
                EventService.activePublishers(payloads)
                .then(response => {


                    this.active_publishers = response.data
                    this.ap_loading = false
                })
                .catch(error => {
                    this.errors = error.response.data.message
                    this.ap_loading = false
                })
            }
        },

        latestFSReport() {

            this.loading = true
            EventService.latestFSReport()
            .then(response => {
                this.fs_report = response.data
                this.loading = false
                this.show_fs = 1
            })
            .catch(error => {
                this.errors = error.response.data.message
                this.loading = false
            })
        },

        downloadMonthlyFSReports(payload) {
            this.loading = true
            let month_year = helperStore.getMonthYear(payload.date_rendered)

            EventService.downloadMonthlyFSReports(payload)
            .then(response => {
                var fileURL = window.URL.createObjectURL(
                    new Blob([response.data], {type:'application/pdf'})
                );

                var fileLink = document.createElement('a');
                fileLink.href = fileURL;
                fileLink.setAttribute('download', 'Field_Service_Report_'+month_year+'.pdf');
                document.body.appendChild(fileLink);
                fileLink.click();
                this.loading = false

                toast.success("Successfully Downloaded!")
            })
            .catch(error => {
                this.errors = error.response.data.message
                this.loading = false
            })
        },

        clearData() {
            this.lineMonths = []
            this.lineHours = []
            this.linePlacements = []
            this.lineVideoShowings = []
            this.lineReturnVisits = []
            this.lineBibleStudies = []
            this.lineIsMinistry = []
        },

        getHumanDate(date) {
            return moment(date, 'YYYY-MM-DD').format('YYYY-MMM');
        },
    }
})
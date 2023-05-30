import { defineStore } from 'pinia'
import moment from 'moment'
import EventService from "@/services/EventService.js";

export const useHelperStore = defineStore({

    id: 'helper',

    state: () => ({
        loading_delete: false,
        loading: false,
        confirm: false,
        errors: {},

        weeks: {},
        year: 0,
        month: 0,
        years_months:{},
        service_years:[],

        visibleModalSongsMeeting: false,
        visibleModalTreasure: false,
        visibleModal: false,

        selectedModal: '',

        edit_name: [],

        editFS: 0,
        screen: 'smaller',
    }),

    getters: {

        showWeeks() {
            if (Object.keys(this.weeks).length) {
                const weeks = this.weeks.map((week) => {
                    return {
                        "start": moment(week.start, 'YYYY-MM-DD').format('MMM DD YYYY'),
                        "end": moment(week.end, 'YYYY-MM-DD').format('MMM DD YYYY'),
                        "dateStart": moment(week.start, 'YYYY-MM-DD').format('YYYY/MM/DD'),
                        "dateEnd": moment(week.end, 'YYYY-MM-DD').format('YYYY/MM/DD'),
                    }
                })
                return weeks
            }
        }
    },

    actions: {

        confirmDelete(id) {
            this.confirm = id
        },

        fetchWeeks() {
            EventService.fetchWeeks()
            .then(response => {
                this.weeks = response.data
            })
            .catch(error => {
                this.errors = error.response.data.message
            })
        },

        async fetchMonthYear() {
            this.loading = true
            await EventService.fetchMonthYear()
            .then(response => {
                this.year = response.data.current_year
                this.month = response.data.current_month
                this.years_months = response.data.years_months
                this.loading = false
            })
            .catch(error => {
                this.errors = error.response.data.message
                this.loading = false
            })
        },

        async getServiceYears() {
            this.loading = true
            await EventService.getServiceYears()
            .then(response => {
                this.service_years = response.data
                this.loading = false
            })
            .catch(error => {
                this.errors = error.response.data.message
                this.loading = false
            })
        },

        getLatestReportDate(date) {
            if (date) {
                return moment(date, 'YYYY-MM-DD').format('MMM. YYYY');
            }
        },

        getMonthYear(date) {
            if (date) {
                return moment(date, 'YYYY-MM-DD').format('MMM. YYYY');
            }
        },

        getMonth(date) {
            if (date) {
                return moment(date, 'YYYY-MM-DD').format('MMM.');
            }
        },

        getHumanDateDay(date) {
            if (date) {
                return moment(date, 'YYYY-MM-DD').format('MMM. DD, YYYY - dd');
            }
        },

        getHumanDate(date) {
            if (date) {
                return moment(date, 'YYYY-MM-DD').format('MMM. DD, YYYY');
            }
        },

        getHumanAge(date) {
            if (date) {
                return moment().diff(date, 'years');
            }
        }

    }
})
import { defineStore } from 'pinia'
import moment from 'moment'
import EventService from "@/services/EventService.js";

export const useHelperStore = defineStore({

    id: 'helper',

    state: () => ({
        loading_delete: false,
        loading: false,
        loading_seen: false,
        confirm: false,
        errors: {},

        notification_inform: [],

        weeks: {},
        year: 0,
        month: 0,
        years_months:{},
        service_years:[],

        visibleModalSongsMeeting: false,
        visibleModalTreasure: false,
        visibleModal: false,
        visibleModalNotificationInform: false,

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

        getNotificationInform() {
            EventService.getNotificationInform()
            .then(response => {
                if (!parseInt(response.data.message) && response.data.message != '') {
                    this.visibleModalNotificationInform=true
                    this.notification_inform = response.data
                }
            })
            .catch(error => {
                this.errors = error.response.data.message
            })
        },

        seenNotificationInform() {
            this.loading_seen = true
            EventService.seenNotificationInform()
            .then(() => {
                this.loading_seen = false
                this.visibleModalNotificationInform=false
            })
            .catch(error => {
                this.loading_seen = false
                this.errors = error.response.data.message
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
        },

        getYMDDate(date) {
            if (date) {
                return moment(date, 'YYYY-MM-DD').format('YYYY/MM/DD');
            }
        },

        getHumanDateTime(date) {
            if (date) {
                // return moment(date, 'YYYY-MM-DD').format('YYYY/MM/DD');
                return moment(date).format('LLL');
            }
        },

        getHumanTime(date) {
            if (date) {
                return moment(date).format('h:mma');
            }
        },

        searchRole(role_id, roles) {
            const foundRole = roles.find((role) => {
                return parseInt(role.id) === parseInt(role_id)
            })
            return foundRole
        },
    }
})
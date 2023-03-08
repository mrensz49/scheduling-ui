import { defineStore } from 'pinia'
import moment from 'moment'
import EventService from "@/services/EventService.js";

export const useHelperStore = defineStore({

    id: 'helper',

    state: () => ({
        loading_delete: false,
        loading: false,
        confirm: 0,
        errors: {},

        weeks: {},
        year: 0,
        month: 0,
        years_months:{},

        visibleModalSongsMeeting: false,
        visibleModalTreasure: false,
        visibleModal: false,

        edit_name: [],
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


    }
})
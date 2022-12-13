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

        visibleModalSongsMeeting: false,
        visibleModalTreasure: false,
    }),

    getters: {

        showWeeks() {
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
        }
    }
})
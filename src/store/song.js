import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js"
import { notify } from "@kyvg/vue3-notification"

import { useHelperStore } from '@/services/helper'
const helperStore = useHelperStore()

export const useSongStore = defineStore({

    id: 'songs',

    state: () => ({
        meetings: [],
        loading: false,
        errors: {},
    }),

    getters: {

        removeMeetingSong: state => id =>  {
            const index = state.meetings.findIndex(meeting => meeting.id === id);
             if (index !== -1) {
                 state.meetings.splice(index, 1);
             }
         },

         appendMeetingSong: state => (payload) => {
             state.meetings.push(payload); // append added song
        },

        updateMeetingSong: state => (payload) => {

            const index = state.meetings.findIndex(item => item.id === payload.id);
            if (index !== -1) {
                state.meetings[index] = payload
            }
        },
    },

    actions: {

        addSongMeeting(payloads) {

            helperStore.loading = true
            EventService.addSongMeeting(payloads)
            .then(response => {

                this.appendMeetingSong(response.data)
                helperStore.loading = false
                notify({ type: "success", duration: 6000, title: "SUCCESSFULLY ADDED" });
                helperStore.visibleModalSongsMeeting=false
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    helperStore.errors = error.response.data.errors
                }
                helperStore.loading = false
            })
        },

        editSongMeeting(payloads) {
            helperStore.loading = true
            EventService.editSongMeeting(payloads)
            .then(response => {
                this.updateMeetingSong(response.data)
                helperStore.loading = false
                notify({ type: "success", duration: 6000, title: "SUCCESSFULLY UPDATED" });
                helperStore.visibleModalSongsMeeting=false
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    helperStore.errors = error.response.data.errors
                }
                helperStore.loading = false
            })
        },

        fetchSongsMeeting() {
            this.loading = true
            EventService.fetchSongsMeeting()
            .then(response => {
                this.meetings = response.data
                this.loading = false
                this.errors = {}
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }
                this.loading = false
            })
        },

        deleteMeetingSong(id) {

            helperStore.loading_delete = true
            setTimeout(() => {
                EventService.deleteMeetingSong(id)
                .then(() => {
                    helperStore.loading_delete = false
                    helperStore.confirm = 0
                    this.removeMeetingSong(id)
                    notify({ type: "success", duration: 6000, title: "SUCCESSFULLY DELETED" });
                })
                .catch(error => {
                    if (typeof error.response !== 'undefined') {
                        this.errors = error.response.data.errors
                    }
                    helperStore.loading_delete = false
                    helperStore.confirm = 0

                })
            },1000)
        }
    }
})
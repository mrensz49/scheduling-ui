import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js"
import { useToast } from 'vue-toastification'

import { useHelperStore } from '@/services/helper'

const helperStore = useHelperStore()
const toast = useToast()

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
                toast.success("Successfully Added")
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
                toast.success("Successfully Updated")
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
                    toast.success("Successfully Deleted")
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
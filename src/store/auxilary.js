import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";
import { useToast } from 'vue-toastification'

import { useHelperStore } from '@/services/helper'
import { useMemberStore } from '@/store/member'

const helperStore = useHelperStore()
const memberStore = useMemberStore()
const toast = useToast()

export const useAuxilaryStore = defineStore({

    id: 'auxilary',

    state: () => ({
        data: [],
        loading: false,
        errors: {},
    }),

    actions: {

        addAuxilary(payloads) {
            this.loading = true
            EventService.addAuxilary(payloads)
            .then(response => {
                this.data = response.data.data
                memberStore.getMember(response.data.member_id)
                this.loading = false
                this.errors = {}
                helperStore.visibleModal = false
                toast.success("Successfully Added")
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }
                this.loading = false
            })
        },

        fetchAuxiDates(payload) {
            this.loading = true
            EventService.fetchAuxiDates(payload)
            .then(response => {
                this.data = response.data
                this.loading = false
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }
                this.loading = false
            })
        },

        deleteAuxilary(id) {

            helperStore.loading_delete = true
            setTimeout(() => {
                EventService.deleteAuxilary(id)
                .then(response => {
                    memberStore.getMember(response.data.member_id)
                    this.data = response.data.dates
                    helperStore.loading_delete = false
                    helperStore.confirm = false
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
        },
    }
})
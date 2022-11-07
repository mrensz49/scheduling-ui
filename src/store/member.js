import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";
// import { notify } from "@kyvg/vue3-notification";
// import router from '@/router'

export const useMemberStore = defineStore({

    id: 'members',

    state: () => ({
        member: [],
        loading: false,
        errors: {},
    }),

    actions: {

        addMember(payloads) {

            this.loading = true
            EventService.addMember(payloads)
            .then(response => {
                this.member = response.data
                this.loading = false
            })
            .catch(error => {
                this.errors = error.response.data.errors
                this.loading = false
            })
        }
    }
})
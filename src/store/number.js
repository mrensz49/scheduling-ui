import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js"
import { notify } from "@kyvg/vue3-notification"

export const useNumberStore = defineStore({

    id: 'numbers',

    state: () => ({
        data: [],
        loading: false,
        errors: {},
    }),

    actions: {

        deleteMemberPhone(id) {
            this.loading = true
            EventService.deleteMemberPhone(id)
            .then(response => {
                this.data = response.data
                this.loading = false
                notify({ type: "success", duration: 6000, title: "SUCCESSFULLY DELETED" });
                this.errors = {}
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }

                this.loading = false
            })
        },

    }
})
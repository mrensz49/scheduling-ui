import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";
import { notify } from "@kyvg/vue3-notification";
import {
    // regions,
    // provinces,
    // cities,
    barangays,
} from "select-philippines-address";

import { usePositionStore } from '@/store/position'
const positionStore = usePositionStore()

export const useMemberStore = defineStore({

    id: 'members',

    state: () => ({
        def_brgys: [], // default brgy to avoid multiple query
        member: [],
        members: [],
        loading: false,
        loading_search: false,
        errors: {},
    }),

    getters: {

        showMembers() {
            if (typeof this.members.data !== 'undefined') {

                const listMembers = this.members.data.map((member) => {
                    if (member.address) {
                        member.brgy = this.locateAddress(member.address.brgy_code)
                    }
                    if (member.position_id) {
                        member.position = this.getPosition(member.position_id)
                    }
                    return member
                })
                return listMembers;
            }
        }
    },

    actions: {

        addMember(payloads) {

            this.loading = true
            EventService.addMember(payloads)
            .then(response => {
                this.member = response.data
                this.loading = false
                this.errors = ''
                notify({ type: "success", duration: 6000, title: "SUCCESSFULLY ADDED" });
                // redirect this to view user
            })
            .catch(error => {
                this.errors = error.response.data.errors
                this.loading = false
            })
        },

        getMembers(page=1) {
            this.loading = true
            EventService.getMembers(page)
            .then(response => {
                this.members = response.data
                this.loading = false
            })
            .catch(error => {
                this.errors = error.response.data.errors
                this.loading = false
            })
        },

        loadDefBrgys(city_town_code) {

            barangays(city_town_code).then((barangay) => this.def_brgys = barangay);
        },

        locateAddress(brgy_code) {
            const foundBrgy = this.def_brgys.find((brgy) => {
                return brgy.brgy_code === brgy_code
            })
            return foundBrgy
        },

        search(event) {
            this.loading_search = true
            EventService.search(event.target.value)
            .then(response => {
                console.log(response)
                this.members = response.data
                this.loading = false
            })
            .catch(error => {
                this.errors = error.response.data.errors
                this.loading_search = false
            })
        },

        getPosition(id) {

            const foundPosition = positionStore.positions.find((position) => {
                return position.id === id
            })
            return foundPosition
        }

    }
})
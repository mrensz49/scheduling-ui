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
import { useHelperStore } from '@/services/helper'

const positionStore = usePositionStore()
const helperStore = useHelperStore()

export const useMemberStore = defineStore({

    id: 'members',

    state: () => ({
        def_brgys: [], // default brgy to avoid multiple query
        member: [],
        members: [],
        loading: false,
        loading_search: false,
        loading_delete: 0,
        errors: {},
    }),

    getters: {

        showMembers() {
            if (typeof this.members.data !== 'undefined') {

                const listMembers = this.members.data.map((member) => {
                    if (member.address) {
                        member.brgy = this.locateAddress(member.address.brgy_code)
                    }
                    if (member.designates.length) {
                        member.positions = this.getPosition(member.designates)
                    }
                    return member
                })
                return listMembers;
            }
        },

        removeMember: state => id =>  {
           const index = state.members.data.findIndex(member => member.id === id);
            if (index !== -1) {
                state.members.data.splice(index, 1);
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
                this.members = response.data
                this.loading_search = false
            })
            .catch(error => {
                this.errors = error.response.data.errors
                this.loading_search = false
            })
        },

        getPosition(designates) {
            const foundPosition = designates.map((designate) => {
                return positionStore.positions.find((position) => {
                    return position.id === designate.position_id
                })
            })

            return foundPosition
        },

        deleteMember(id) {

            this.loading_delete = id
            setTimeout(() => {
                EventService.deleteMember(id)
                .then(() => {
                    this.loading_delete = 0
                    helperStore.confirm = 0
                    this.removeMember(id)
                    notify({ type: "success", duration: 6000, title: "SUCCESSFULLY DELETED" });
                })
                .catch(error => {
                    this.errors = error.response.data.errors
                    this.loading_delete = 0
                    helperStore.confirm = 0

                })
            },1000)
        }

    }
})
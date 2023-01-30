import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js"
import { notify } from "@kyvg/vue3-notification"
import {
    // regions,
    // provinces,
    // cities,
    barangays,
} from "select-philippines-address"
import router from '@/router'

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
        phones: [],
        loading: false,
        loading_search: false,
        loading_delete: 0,
        loading_update: false,
        edit: 0,
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

        showMember() {

            if (Object.keys(this.member).length) {
                this.member.brgy = this.locateAddress(this.member.address.brgy_code)
                this.member.positions = this.getPosition(this.member.designates)
                return this.member
            }
        },

        defPosition() {
            const listPositions = this.member.positions.map((position) => {
                return position.id
            })
            return listPositions;
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
                this.errors = {}
                notify({ type: "success", duration: 6000, title: "SUCCESSFULLY ADDED" });
                // redirect this to view user
                router.push({name: 'View Member', params: { id: response.data.id } })
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }

                this.loading = false
            })
        },

        updateMember(payloads) {

            this.loading_update = true
            EventService.updateMember(payloads)
            .then(response => {
                this.member = response.data.data
                this.phones = response.data.data.numbers
                this.loading_update = false
                this.errors = ''
                notify({ type: "success", duration: 6000, title: "SUCCESSFULLY UPDATED" });
                this.edit=0
            })
            .catch(error => {
                this.errors = error.response.data.errors
                this.loading_update = false
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

        async getMember(id) {
            this.loading = true
            await EventService.getMember(id)
            .then(response => {
                this.member = response.data.data
                this.phones = response.data.data.numbers
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

            helperStore.loading_delete = true
            setTimeout(() => {
                EventService.deleteMember(id)
                .then(() => {
                    helperStore.loading_delete = false
                    helperStore.confirm = 0
                    this.removeMember(id)
                    notify({ type: "success", duration: 6000, title: "SUCCESSFULLY DELETED" });
                })
                .catch(error => {
                    this.errors = error.response.data.errors
                    helperStore.loading_delete = false
                    helperStore.confirm = 0

                })
            },1000)
        }

    }
})
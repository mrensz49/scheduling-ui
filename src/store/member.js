import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js"
import { useToast } from 'vue-toastification'

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
const toast = useToast()

export const useMemberStore = defineStore({

    id: 'members',

    state: () => ({
        is_count_ap: '',
        def_brgys: [], // default brgy to avoid multiple query -> query from address.js
        def_cities: [], // default cities to avoid multiple query -> query from address.js
        co_members: [],
        member: [],
        members: [],
        unchecked_members: [],
        phones: [],
        loading_ap: false,
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
                        member.brgy = this.locateAddrBrgy(member.address.brgy_code)
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
                this.member.brgy = this.locateAddrBrgy(this.member.address.brgy_code)
                this.member.city_town = this.locateAddrCity(this.member.address.city_town_code)
                this.member.positions = this.getPosition(this.member.designates)
                return this.member
            }
        },

        defPosition() {
            const listPositions = this.member.positions.map((position) => {
                return position?.id
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
                toast.success("Successfully Added")
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
                toast.success("Successfully Updated")
                this.edit=0
            })
            .catch(error => {
                this.errors = error.response.data.errors
                this.loading_update = false
            })
        },

        getAllMembers() {
            this.loading = true
            EventService.getAllMembers()
            .then(response => {
                this.members = response.data
                this.loading = false
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

        async getMember(id) {
            this.loading = true
            await EventService.getMember(id)
            .then(response => {
                this.member = response.data.data
                this.phones = response.data.data.numbers
                this.is_count_ap = response.data.data.is_count_ap
                this.loading = false
            })
            .catch(error => {
                this.errors = error.response.data.errors
                this.loading = false
            })
        },

        getCoMembers(payloads) {
            this.loading = true
            EventService.getCoMembers(payloads)
            .then(response => {
                this.co_members = response.data
                this.loading = false
            })
            .catch(error => {
                this.errors = error.response.data.errors
                this.loading = false
            })
        },

        fetchUncheckedMembers() {
            this.loading = true
            EventService.fetchUncheckedMembers()
            .then(response => {
                this.unchecked_members = response.data
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

        locateAddrBrgy(brgy_code) {
            const foundBrgy = this.def_brgys.find((brgy) => {
                return brgy.brgy_code === brgy_code
            })
            return foundBrgy
        },

        locateAddrCity(city_town_code) {
            const foundCity = this.def_cities.find((city) => {
                return city.city_code === city_town_code
            })
            return foundCity
        },

        search(event) {

            var search = typeof event.target !== 'undefined'
            ? event.target.value : event
            // path - member/view  : schedule/midweek

            if (search.length >= 3) {
                this.loading_search = true

                EventService.search(search)
                .then(response => {
                    this.members = typeof event.target !== 'undefined'
                    ? response.data : response.data.data
                    this.loading_search = false
                })
                .catch(error => {
                    this.errors = error.response.data.errors
                    this.loading_search = false
                })
            }
            },

        getPosition(designates) {
            const foundPosition = designates.map((designate) => {
                return positionStore.positions.find((position) => {
                    return position.id === parseInt(designate.position_id)
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
                    toast.success("Successfully Deleted")
                })
                .catch(error => {
                    this.errors = error.response.data.errors
                    helperStore.loading_delete = false
                    helperStore.confirm = 0

                })
            },1000)
        },

        isCountAP(payloads) {
            this.loading_ap = true
            EventService.isCountAP(payloads)
            .then(response => {
                this.is_count_ap = response.data
                this.loading_ap = false
            })
            .catch(error => {
                this.errors = error.response.data.errors
                this.loading_ap = false
            })
        }

    }
})
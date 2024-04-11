import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";

export const useCongregationStore = defineStore({

    id: 'congregations',

    state: () => ({
        data: [],
        genders: [],
        congregations: [],
        groups:[],
        total_publishers: [],
        loading: false,
        errors: {},
    }),

    getters: {

        showGroups() {
            if (typeof this.groups.congregation !== 'undefined') {

                let arr_group=[];
                for(let g=1; g <= this.groups.congregation.total_groups; g++) {
                    const filteredGroups = this.groups.members.filter((group) => {
                        // console.log('group - ', group)
                        return group.group_no == g
                    })
                    arr_group.push({'group': g, 'members': filteredGroups})
                }
                return arr_group
            }
        },
    },

    actions: {

        getCongregations() {
            this.loading = true
            EventService.getCongregations()
            .then(response => {
                this.congregations = response.data
                this.loading = false
            })
            .catch(error => {
                this.errors = error.response.data.message
                this.loading = false
            })
        },

        async getGroups(payload) {
            this.loading = true
            await EventService.getGroups(payload)
            .then(response => {
                this.groups = response.data
                this.loading = false
            })
            .catch(error => {
                this.errors = error.response.data.message
                this.loading = false
            })
        },

        loadGroupPosition() {

            var positions=[]
            for(var c=1; c<this.groups.congregation.total_groups; c++) {

                const listPositions = this.groups.positions.map((position) => {

                    let members = this.groups.members.filter((member) => {
                        let foundPosition = []
                        if (member.group_no == c) {

                            foundPosition = member.designates.filter((mem) => {
                                return mem.group_no == position.name
                            })
                        }
                        return foundPosition
                    })

                    return {'group': c, 'position': position.name, 'count': members}
                })
                positions.push(listPositions)
            }

            return positions
        },

        getCongregationGenders() {

            this.loading = true
            EventService.getCongregationGenders()
            .then(response => {
                this.genders = response.data
                this.loading = false
            })
            .catch(error => {
                this.errors = error.response.data.message
                this.loading = false
            })
        },

        getCongregationNumbers() {

            this.loading = true
            EventService.getCongregationNumbers()
            .then(response => {
                this.numbers = response.data
                this.loading = false
            })
            .catch(error => {
                this.errors = error.response.data.message
                this.loading = false
            })
        },

        getDOBirths() {

            this.loading = true
            EventService.getDOBirths()
            .then(response => {
                this.dobirths = response.data
                this.loading = false
            })
            .catch(error => {
                this.errors = error.response.data.message
                this.loading = false
            })
        },

        getCongregationDetails() {

            this.loading = true
            EventService.getCongregationDetails()
            .then(response => {
                this.data = response.data
                this.loading = false
            })
            .catch(error => {
                this.errors = error.response.data.message
                this.loading = false
            })
        },

        totalPubishers() {
            EventService.totalPubishers()
            .then(response => {
                this.total_publishers = response.data
            })
            .catch(error => {
                this.errors = error.response.data.errors
            })
        },         
    }
})
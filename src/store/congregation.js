import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";

export const useCongregationStore = defineStore({

    id: 'congregations',

    state: () => ({
        congregations: [],
        groups:[],
        loading: false,
        errors: {},
    }),

    getters: {

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

            // console.log('total - ', this.groups.congregation.total_groups)
            var positions=[]
            for(var c=1; c<this.groups.congregation.total_groups; c++) {

                const listPositions = this.groups.positions.map((position) => {
                    // console.log('group - ', c ,' - ', position)

                    let members = this.groups.members.filter((member) => {
                        let foundPosition = []
                        if (member.group_no == c) {

                            foundPosition = member.designates.filter((mem) => {
                                console.log(mem.position.name , ' == ' , position.name)
                                return mem.group_no == position.name
                            })
                        }
                        return foundPosition
                    })

                    return {'group': c, 'position': position.name, 'count': members}
                })
                positions.push(listPositions)
            }

            // const countPositions = listPositions.map((position) => {
            //     return position
            // })

            return positions
            // this.countGroupPosition
        }
    }
})
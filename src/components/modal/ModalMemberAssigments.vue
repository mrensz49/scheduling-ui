<template>
    <CModal size="lg" :visible="helperStore.visibleModalMemberAssigments" @close="() => { helperStore.visibleModalMemberAssigments = false }">
        <CModalHeader>
            <CModalTitle>Brother Assignments History</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CForm
                class="row g-3 mb-5"
            >
                <CCol :md="12">
                    <CFormLabel for="validationTextarea" class="form-label"
                    >Brother</CFormLabel>
                    <v-select
                        label="name"
                        :filterable="false"
                        :options="options"
                        @search="onSearch"
                        v-model="member"
                    ></v-select>
                </CCol>
            </CForm>

            <CRow>
                <CCol>
                    <CSpinner class="mt-2" v-if="assignmentStore.loading" component="span" size="sm" aria-hidden="true"/>
                    <CTable small striped bordered>
                        <CTableHead>
                            <CTableRow color="light">
                            <CTableHeaderCell scope="col" width="40%">Date</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Assignment</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow v-for="(assignment) in assignmentStore.assignments" :key="assignment.id">
                                <CTableDataCell>{{ helperStore.getHumanDate(assignment.date_start) }} - {{ helperStore.getHumanDate(assignment.date_end) }}</CTableDataCell>
                                <CTableDataCell>
                                    <!-- MAGMAEPEKTIBO SA MINISTERYO -->
                                    <CBadge v-if(showType(assignment)) color="success" class="m-1">
                                      {{ showType(assignment) }}
                                    </CBadge>

                                    <template v-for="(assignment, index) in showAssignments(assignment)" :key="index">
                                        <CBadge  color="success" class="m-1"> {{ assignment }} </CBadge>
                                    </template>
                                </CTableDataCell>
                            </CTableRow>
                            <CTableRow v-if="!assignmentStore.assignments.length">
                                <CTableDataCell colspan="2">No details found.</CTableDataCell>
                            </CTableRow>
                        </CTableBody>
                    </CTable>
                </CCol>
            </CRow>
        </CModalBody>
        <CModalFooter>
            <CButton color="secondary" @click="() => { helperStore.visibleModalMemberAssigments = false }">
                Close
            </CButton>
        </CModalFooter>
  </CModal>
</template>

<script>

import EventService from "@/services/EventService.js"
import router from '@/router'
import { useToast } from 'vue-toastification'

import { useHelperStore } from '@/services/helper'
import { useAssignmentStore } from '@/store/assignment'
import { useMinistryStore } from '@/store/ministry'

const helperStore = useHelperStore()
const assignmentStore = useAssignmentStore()
const ministryStore = useMinistryStore()
const toast = useToast()

export default {

    name: 'ModalMemberAssignments',

    data() {
        return {
            helperStore: helperStore,
            assignmentStore: assignmentStore,
            ministryStore: ministryStore,

            options: [],
            roles: [],
            member: '',
            member_id: '',
        }
    },

    methods: {
        onSearch(search, loading) {
            if(search.length) {
                loading(true);
                this.search(loading, search);
            }
        },

        search(loading, search) {
            EventService.search(`${escape(search)}`)
            .then(response => {
                this.options = response.data.data
                loading(false);
            })
            .catch(error => {
                loading(false);
                if (error.response.status == 401) {
                    toast.error("Session Timeout. Please log in.")
                    router.push({name: 'Login'})
                }
            })
        },

        showType(assignment) {
          var type = '';
          if(
                parseInt(assignment.first_hh_member_id) == parseInt(this.member_id) ||
                parseInt(assignment.first_partner_member_id) == parseInt(this.member_id)
            ) {
              type =  assignment.first_ministry.type + ' - ' + (parseInt(assignment.first_hh_member_id) == parseInt(this.member_id) ? 'Student' : 'Partner')
          }

          if(
                parseInt(assignment.second_hh_member_id) == parseInt(this.member_id) ||
                parseInt(assignment.second_partner_member_id) == parseInt(this.member_id)
            ) {
              type =  assignment.second_ministry.type + ' - ' + (parseInt(assignment.second_hh_member_id) == parseInt(this.member_id) ? 'Student' : 'Partner')
          }

          if(
                parseInt(assignment.third_hh_member_id) == parseInt(this.member_id) ||
                parseInt(assignment.third_partner_member_id) == parseInt(this.member_id)
            ) {
              type =  assignment.third_ministry?.type + ' - ' + (parseInt(assignment.third_hh_member_id) == parseInt(this.member_id) ? 'Student' : 'Partner')
          }

          if(
                parseInt(assignment.fourth_hh_member_id) == parseInt(this.member_id) ||
                parseInt(assignment.fourth_partner_member_id) == parseInt(this.member_id)
            ) {
              type =  assignment.fourth_ministry?.type + ' - ' + (parseInt(assignment.fourth_hh_member_id) == parseInt(this.member_id) ? 'Student' : 'Partner')
          }

          return type
        },

        showAssignments(assignments) {

            var roles=[];
            if (parseInt(assignments.chairman_member_id) == parseInt(this.member_id)) {
                roles.push('Chairman')
            }
            if(parseInt(assignments.meeting_treasures_member_id) == parseInt(this.member_id)) {
                roles.push('Mini Talk')
            }
            if(parseInt(assignments.spiritual_gem_member_id) == parseInt(this.member_id)) {
                roles.push('Bahandi - Q & A')
            }
            if(parseInt(assignments.bible_reading_member_id) == parseInt(this.member_id)) {
                roles.push('Bible Reader')
            }

            // if(
            //     parseInt(assignments.first_hh_member_id) == parseInt(this.member_id) ||
            //     parseInt(assignments.first_partner_member_id) == parseInt(this.member_id)
            // ) {
            //     let type = ministryStore.ministries[(assignments.first_effective_ministries_id - 1)]
            //     let role = parseInt(assignments.first_hh_member_id) == parseInt(this.member_id) ? 'Student' : 'Partner'
            //     roles.push(type.type + ' - ' + role)
            // }

            // if(
            //     parseInt(assignments.second_hh_member_id) == parseInt(this.member_id) ||
            //     parseInt(assignments.second_partner_member_id) == parseInt(this.member_id)
            // ) {
            //     let type = ministryStore.ministries[(assignments.second_effective_ministries_id - 1)]
            //     let role = parseInt(assignments.second_hh_member_id) == parseInt(this.member_id) ? 'Student' : 'Partner'
            //     roles.push(type.type + ' - ' + role)
            // }

            // if(
            //     parseInt(assignments.third_hh_member_id) == parseInt(this.member_id) ||
            //     parseInt(assignments.third_partner_member_id) == parseInt(this.member_id)
            // ) {
            //     let type = ministryStore.ministries[(assignments.third_effective_ministries_id - 1)]
            //     let role = parseInt(assignments.third_hh_member_id) == parseInt(this.member_id) ? 'Student' : 'Partner'
            //     roles.push(type.type + ' - ' + role)
            // }


            if(
                parseInt(assignments.first_member_id) == parseInt(this.member_id) ||
                parseInt(assignments.second_member_id) == parseInt(this.member_id)
            ) {
                roles.push('Kristohanong Pagkinabuhi')
            }

            if(parseInt(assignments.cvs_member_id) == parseInt(this.member_id)) {
                roles.push('CVS Conductor')
            }
            if(parseInt(assignments.cvs_reading_member_id) == parseInt(this.member_id)) {
                roles.push('CVS Reader')
            }
            if(parseInt(assignments.closing_prayer_member_id) == parseInt(this.member_id)) {
                roles.push('Closing Prayer')
            }

            return roles;
        },

    },

    watch: {
        // whenever question changes, this function will run
        member: function (newData) {
            if (newData) {
                this.member_id = newData.id
                assignmentStore.viewMemberAssignments(newData.id)
            }
        }
    },



}

</script>

<template>
    <CCard class="mb-4 shadow bg-body rounded">
        <CCardBody>
            <CTable striped hover responsive>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell colspan="2" scope="col">Average Meeting Attendance</CTableHeaderCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableHeaderCell scope="col" width="50%"><i>Midweek</i></CTableHeaderCell>
                        <CTableHeaderCell scope="col" width="50%"><i>Weekend</i></CTableHeaderCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableHeaderCell scope="col">
                            <CInputGroup>
                                <CFormInput
                                    :readonly="!editAttendance.midweek"
                                    @keyup="saveAttendance({'type': 'midweek', 'type_value' : $event.target.value, 'year_month' : this.date_rendered})"
                                    v-model="attendanceStore.attendances.midweek"
                                />
                                <CInputGroupText v-if="$can('can-add-attendance') && enable_edit" class="pointer" @click="!editAttendance.midweek ? editAttendance.midweek=1 : editAttendance.midweek=0">
                                    <span v-if="editAttendance.midweek">
                                            close
                                        </span>
                                        <span v-else>
                                            <CIcon icon="cil-pencil"/>
                                        </span>
                                </CInputGroupText>

                            </CInputGroup>
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col">
                                <CInputGroup>
                                <CFormInput
                                    :readonly="!editAttendance.weekend"
                                    @keyup="saveAttendance({'type': 'weekend', 'type_value' : $event.target.value, 'year_month' : this.date_rendered})"
                                    v-model="attendanceStore.attendances.weekend"
                                />
                                <CInputGroupText v-if="$can('can-add-attendance') && enable_edit" class="pointer" @click="!editAttendance.weekend ? editAttendance.weekend=1 : editAttendance.weekend=0">
                                        <span v-if="editAttendance.weekend">
                                            close
                                        </span>
                                        <span v-else>
                                            <CIcon icon="cil-pencil"/>
                                        </span>
                                </CInputGroupText>
                            </CInputGroup>
                        </CTableHeaderCell>
                    </CTableRow>
                    <CTableRow v-if="Object.keys(attendanceStore.errors_attendance).length">
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                        <CTableHeaderCell scope="col" colspan="3">
                            <CAlert color="warning">
                                <span v-for="error in attendanceStore.errors_attendance" :key="error"> * {{ error[0] }}<br/></span>
                            </CAlert>
                        </CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
            </CTable>
        </CCardBody>
    </CCard>
</template>

<script>

import { useAttendanceStore } from '@/store/attendance'
const attendanceStore = useAttendanceStore()

    export default {

        name: 'MeetingAttendance',

        props: ['enable_edit'],

        created() {
            this.date_rendered = this.$route.params.year+'-'+this.$route.params.month+'-01'
            attendanceStore.getAttendances(this.date_rendered)
        },

        data() {
            return {
                attendanceStore: attendanceStore,

                old_type: '',
                timeout: 0,
                delay: 1500,

                date_rendered: '',
                editAttendance: {
                    midweek: 0,
                    weekend: 0
                }
            }
        },

        methods: {
            saveAttendance(payloads) {

                if (this.old_type == '' || this.old_type == payloads.type) {
                    clearTimeout(this.timeout);
                }

                this.timeout = setTimeout(function(payloads) {
                    this.saveAttendanceNow(payloads)
                }.bind(this), this.delay, payloads);

                this.old_type = payloads.type
            },

            saveAttendanceNow(payloads) {
                attendanceStore.saveAttendance(payloads)
            }

        },
    }
</script>


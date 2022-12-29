<template>
    <CRow>
      <CCol>
        <h2>{{ getHumanDate() }} Reports</h2>
        <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="congregationStore.loading"/>
        <CCard v-for="group in forms" :key="group.group" class="mb-5">
          <CCardHeader> <CIcon icon="cil-people" />
            Group {{ group.group }}
            <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="congregationStore.loading"/>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol :md="12">
                        <CTable striped hover responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col" width="25%">Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" width="15%">
                                        <span v-c-tooltip="{content: 'Printed and Electronic', placement: 'top'}">Placements</span>
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col" width="15%">Video Showings</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" width="15%">Hours</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" width="15%">Return Visits</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" width="15%">Bible Studies</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow v-for="(member, index) in group.members" :key="member">
                                    <CTableDataCell>
                                        <a href="javascript:void" class="text-decoration-none" @click="viewedit(member.id)">
                                            {{ member.last_name + ' ' + member.first_name }} {{ (member.middle_name) ? member.middle_name: '' }}
                                        </a>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            style="width:25%"
                                            size="sm"
                                            @keyup="saveReport(member.report_field_services_id ?? member.id, member.report_field_services_id ? 'exist':'not', 'placements', group.group, index)"
                                            v-model="member.placements"
                                            :placeholder="!member.placements ? 0 : ''"
                                            />
                                            </CTableDataCell>

                                    <CTableDataCell>
                                        <CFormInput
                                            style="width:25%"
                                            size="sm"
                                            @keyup="saveReport(member.report_field_services_id ?? member.id, member.report_field_services_id ? 'exist':'not', 'video_showings', group.group, index)"
                                            v-model="member.video_showings"
                                            :placeholder="!member.video_showings ? 0 : ''"
                                        />
                                    </CTableDataCell>

                                    <CTableDataCell>
                                        <CFormInput
                                            style="width:25%"
                                            size="sm"
                                            @keyup="saveReport(member.report_field_services_id ?? member.id, member.report_field_services_id ? 'exist':'not', 'hours', group.group, index)"
                                            v-model="member.hours"
                                            :placeholder="!member.hours ? 0 : ''"
                                        />
                                    </CTableDataCell>

                                    <CTableDataCell>
                                        <CFormInput
                                            style="width:25%"
                                            size="sm"
                                            @keyup="saveReport(member.report_field_services_id ?? member.id, member.report_field_services_id ? 'exist':'not', 'return_visits', group.group, index)"
                                            v-model="member.return_visits"
                                            :placeholder="!member.return_visits ? 0 : ''"
                                        />
                                    </CTableDataCell>

                                    <CTableDataCell>
                                        <CFormInput
                                            style="width:25%"
                                            size="sm"
                                            @keyup="saveReport(member.report_field_services_id ?? member.id, member.report_field_services_id ? 'exist':'not', 'bible_studies', group.group, index)"
                                            v-model="member.bible_studies"
                                            :placeholder="!member.bible_studies ? 0 : ''"
                                        />
                                    </CTableDataCell>

                                </CTableRow>
                            </CTableBody>
                            <CTableFoot>
                                <CTableRow>
                                    <CTableDataCell class="text-end"><b >Total : </b> </CTableDataCell>
                                    <CTableDataCell><i>{{ fieldServiceStore.showTotalReport([group.members, 'placements']) }}</i></CTableDataCell>
                                    <CTableDataCell><i>{{ fieldServiceStore.showTotalReport([group.members, 'video_showings']) }}</i></CTableDataCell>
                                    <CTableDataCell><i>{{ fieldServiceStore.showTotalReport([group.members, 'hours']) }}</i></CTableDataCell>
                                    <CTableDataCell><i>{{ fieldServiceStore.showTotalReport([group.members, 'return_visits']) }}</i></CTableDataCell>
                                    <CTableDataCell><i>{{ fieldServiceStore.showTotalReport([group.members, 'bible_studies']) }}</i></CTableDataCell>
                                </CTableRow>
                            </CTableFoot>
                        </CTable>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>

        <CCard class="mb-5">
          <CCardHeader>
                <h3>Total Reports</h3>
            </CCardHeader>
            <CCardBody>
                <CTable striped hover responsive>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col" width="25%">All Groups</CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="15%"><i>Placements</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="15%"><i>Video Showings</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="15%"><i>Hours</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="15%"><i>Return Visits</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="15%"><i>Bible Studies</i></CTableHeaderCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableHeaderCell scope="col" width="25%" class="text-end">Grand Total : </CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="15%">{{ fieldServiceStore.sumTotalReport('placements') }}</CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="15%">{{ fieldServiceStore.sumTotalReport('video_showings') }}</CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="15%">{{ fieldServiceStore.sumTotalReport('hours') }}</CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="15%">{{ fieldServiceStore.sumTotalReport('return_visits') }}</CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="15%">{{ fieldServiceStore.sumTotalReport('bible_studies') }}</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                </CTable>
            </CCardBody>
        </CCard>


       </CCol>
    </CRow>
</template>

<script>

    import router from '@/router'
    import moment from 'moment'

    import { useCongregationStore } from '@/store/congregation'
    import { useFieldServiceStore } from '@/store/field_service'

    const congregationStore = useCongregationStore()
    const fieldServiceStore = useFieldServiceStore()

    export default {

        name: 'FieldService',

        async created() {

            this.date_rendered = this.$route.params.year+'-'+this.$route.params.month+'-01'
            await congregationStore.getGroups(this.date_rendered)
            this.forms = congregationStore.showGroups
            fieldServiceStore.all_reports=[] // reset all the total reports
        },
        data() {

            return {
                congregationStore: congregationStore,
                fieldServiceStore: fieldServiceStore,

                date_rendered: '',
                forms: {},
                formData: {},
                placements: [],
                video_showings: [],
                hours: [],
                return_visits: [],
                bible_studies: [],
            }
        },
        methods: {
            viewedit(id) {
                router.push({name: 'View Member', params: { id: id } })
            },

            saveReport(id, stat, type, group, index)
            {
                group = group-=1

                this.formData = {} // reset all objects

                this.formData.date_rendered = this.date_rendered
                this.formData[type] = this.forms[group].members[index][type] * 1

                if (stat == 'exist') {
                    fieldServiceStore.saveReport(this.formData, id)
                }
                else {
                    this.formData.member_id = id
                    fieldServiceStore.storeReport(this.formData)
                }

            },

            getHumanDate() {
                return moment(this.date_rendered, 'YYYY-MM-DD').format('MMM. YYYY');
            },

        }
    }
</script>
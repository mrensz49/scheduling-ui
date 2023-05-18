<template>
    <CRow>
      <CCol>
        <h1>{{ getHumanDate() }} Reports</h1>
        <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="congregationStore.loading"/>

        <CCard class="mt-2 shadow bg-body rounded">
            <CCardBody>
            <CRow class="ms-1">
                <CCol
                    class="border-start border-start-4 border-start-info py-1 px-3 mb-2"
                    :sm="4"
                    :md="2"
                    v-for="(report, key, index) in fieldServiceStore.data.reports" :key="index"
                >
                    <div class="text-medium-emphasis small">{{ changeText(key)  }}</div>
                    <div class="fw-semibold" style="font-size:12px;border-spacing: 0px;">
                        <table width="100%">
                            <tr>
                                <td width = "80%">Placements:</td>
                                <td>{{  report.placements }}</td>
                            </tr>
                            <tr>
                                <td>Video Showings:</td>
                                <td>{{  report.video_showings }}</td>
                            </tr>
                            <tr>
                                <td>Hours:</td>
                                <td>{{  report.hours }}</td>
                            </tr>
                            <tr>
                                <td>Return Visits:</td>
                                <td>{{  report.return_visits }}</td>
                            </tr>
                            <tr>
                                <td>Bible Studies:</td>
                                <td>{{  report.bible_studies }}</td>
                            </tr>
                        </table>
                    </div>
                </CCol>
            </CRow>
        </CCardBody>
        </CCard>

        <CRow class="mt-4 mb-2">
            <CCol :sm="8">
                <CButtonGroup
                class="mb-2"
                role="group"
                aria-label="Basic outlined example"
                >
                <CButton color="secondary" variant="outline" @click="activeBtn='ar'" :class="{active: activeBtn === 'ar'}">All results</CButton>
                <CButton color="secondary" variant="outline" @click="activeBtn='ro'" :class="{active: activeBtn === 'ro'}">Monthly Report</CButton>
                <CButton color="secondary" variant="outline" @click="activeBtn='stat'" :class="{active: activeBtn === 'stat'}">Statistic</CButton>
                <CButton color="primary" disabled>
                    <CIcon icon="cil-cloud-download" />
                </CButton>
                </CButtonGroup>

            </CCol>
            <CCol :sm="4">
                <CInputGroup v-show = "activeBtn === 'ar'">
                <CButton type="button" color="secondary" >Show</CButton>
                <CFormSelect
                    @change="defShowGroup=$event.target.value"
                >
                    <option
                        v-for="n in parseInt(total_groups)"
                        :key="n"
                        :value="n"
                        :selected="defShowGroup == n ? true : false"
                    > Group {{ n }}</option>
                </CFormSelect>
                <CButton type="button" color="secondary" @click="edit == 1 ? edit=0 : edit=1">
                    <span v-if="!edit" class="text-primary"><CIcon icon="cil-pencil" class="me-2 ms-1" /></span>
                    <span class="text-primary" v-else>close</span>
                </CButton>
                </CInputGroup>
            </CCol>
        </CRow>


        <div class="accordion mt-3 shadow bg-body rounded" v-if="typeof congregationStore.groups.members !== 'undefined'" v-show = "activeBtn === 'ar'">
            <div class="accordion-item" v-for="(group, index) in congregationStore.groups.members.publisher" :key="group" :item-key="index">
                <div class = "accordion-collapse collapse" :class="defShowGroup == index ? 'show' : ''">
                    <div class="accordion-body">
                        <FieldServiceTable :group="group" :edit="edit" designate="Publisher" :date_rendered="date_rendered"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="accordion shadow bg-body rounded" v-if="typeof congregationStore.groups.members !== 'undefined'" v-show = "activeBtn === 'ar'">
            <div class="accordion-item" v-for="(group, index) in congregationStore.groups.members.regular_pioneer" :key="group" :item-key="index">
                <div class = "accordion-collapse collapse" :class="defShowGroup == index ? 'show' : ''">
                    <div class="accordion-body">
                        <FieldServiceTable :group="group" :edit="edit" designate="Regular Pioneer" :date_rendered="date_rendered"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="accordion shadow bg-body rounded" v-if="typeof congregationStore.groups.members !== 'undefined'" v-show = "activeBtn === 'ar'">
            <div class="accordion-item" v-for="(group, index) in congregationStore.groups.members.auxillary_pioneer" :key="group" :item-key="index">
                <div class = "accordion-collapse collapse" :class="defShowGroup == index ? 'show' : ''">
                    <div class="accordion-body">
                        <FieldServiceTable :group="group" :edit="edit" designate="Auxillary Pioneer" :date_rendered="date_rendered"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="accordion shadow bg-body rounded" v-if="typeof congregationStore.groups.members !== 'undefined'" v-show = "activeBtn === 'ar'">
            <div class="accordion-item" v-for="(group, index) in congregationStore.groups.members.special_pioneer" :key="group" :item-key="index">
                <div class = "accordion-collapse collapse" :class="defShowGroup == index ? 'show' : ''">
                    <div class="accordion-body">
                        <FieldServiceTable :group="group" :edit="edit" designate="Special Pioneer" :date_rendered="date_rendered"/>
                    </div>
                </div>
            </div>
        </div>

        <CCard class="mt-4 mb-4 shadow bg-body rounded" v-show = "activeBtn === 'ro'">
            <CCardBody>
                <CTable striped hover responsive>
                    <CTableHead>
                        <CTableRow color="dark">
                            <CTableHeaderCell colspan="2" scope="col" width="37.5%">Totals</CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Placements</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Video Showings</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Hours</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Return Visits</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Bible Studies</i></CTableHeaderCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableHeaderCell colspan="2" scope="col" width="37.5%" class="text-end">
                                <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="fieldServiceStore.calc_loading"/>
                                Grand Total :
                            </CTableHeaderCell>
                            <CTableHeaderCell class="text-primary" scope="col" width="12.5%">{{ fieldServiceStore.data['placements'] }}</CTableHeaderCell>
                            <CTableHeaderCell class="text-primary" scope="col" width="12.5%">{{ fieldServiceStore.data['video_showings'] }}</CTableHeaderCell>
                            <CTableHeaderCell class="text-primary" scope="col" width="12.5%">{{ fieldServiceStore.data['hours'] }}</CTableHeaderCell>
                            <CTableHeaderCell class="text-primary" scope="col" width="12.5%">{{ fieldServiceStore.data['return_visits'] }}</CTableHeaderCell>
                            <CTableHeaderCell class="text-primary" scope="col" width="12.5%">{{ fieldServiceStore.data['bible_studies'] }}</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                </CTable>
            </CCardBody>
        </CCard>

        <CCard class="mt-4 mb-4 shadow bg-body rounded" v-show = "activeBtn === 'ro'">
            <CCardBody>
                <CTable striped hover responsive>
                    <CTableHead>
                        <CTableRow color="dark" class="text-warning">
                            <CTableHeaderCell colspan="2" scope="col" width="37.5%">Publishers</CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Placements</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Video Showings</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Hours</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Return Visits</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Bible Studies</i></CTableHeaderCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableHeaderCell colspan="2" scope="col" width="37.5%" class="text-end">
                                <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="fieldServiceStore.calc_loading"/>
                                Total :
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12.5%">{{ fieldServiceStore.data['publshr_placements'] }}</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12.5%">{{ fieldServiceStore.data['publshr_vs'] }}</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12.5%">{{ fieldServiceStore.data['publshr_hours'] }}</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12.5%">{{ fieldServiceStore.data['publshr_rv'] }}</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12.5%">{{ fieldServiceStore.data['publshr_bs'] }}</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                </CTable>
            </CCardBody>
        </CCard>

        <CCard class="mt-4 mb-4 shadow bg-body rounded" v-show = "activeBtn === 'ro'">
            <CCardBody>
                <CTable striped hover responsive>
                    <CTableHead>
                        <CTableRow color="dark" class="text-warning">
                            <CTableHeaderCell colspan="2" scope="col" width="37.5%">Auxiliary Pioneers</CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Placements</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Video Showings</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Hours</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Return Visits</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Bible Studies</i></CTableHeaderCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableHeaderCell colspan="2" scope="col" width="37.5%" class="text-end">
                                <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="fieldServiceStore.calc_loading"/>
                                Total :
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12.5%">{{ fieldServiceStore.data['reports']['auxillary_pioneer']['placements'] }}</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12.5%">{{ fieldServiceStore.data['reports']['auxillary_pioneer']['video_showings'] }}</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12.5%">{{ fieldServiceStore.data['reports']['auxillary_pioneer']['hours'] }}</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12.5%">{{ fieldServiceStore.data['reports']['auxillary_pioneer']['return_visits'] }}</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12.5%">{{ fieldServiceStore.data['reports']['auxillary_pioneer']['bible_studies'] }}</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                </CTable>
            </CCardBody>
        </CCard>

        <CCard class="mt-4 mb-4 shadow bg-body rounded" v-show = "activeBtn === 'ro'">
            <CCardBody>
                <CTable striped hover responsive>
                    <CTableHead>
                        <CTableRow color="dark" class="text-warning">
                            <CTableHeaderCell colspan="2" scope="col" width="37.5%">Special/Regular Pioneers</CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Placements</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Video Showings</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Hours</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Return Visits</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Bible Studies</i></CTableHeaderCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableHeaderCell colspan="2" scope="col" width="37.5%" class="text-end">
                                <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="fieldServiceStore.calc_loading"/>
                                Total :
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12.5%">{{ fieldServiceStore.data['reports']['regular_pioneer']['placements'] + fieldServiceStore.data['reports']['special_pioneer']['placements'] }}</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12.5%">{{ fieldServiceStore.data['reports']['regular_pioneer']['video_showings'] + fieldServiceStore.data['reports']['special_pioneer']['video_showings'] }}</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12.5%">{{ fieldServiceStore.data['reports']['regular_pioneer']['hours'] + fieldServiceStore.data['reports']['special_pioneer']['hours'] }}</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12.5%">{{ fieldServiceStore.data['reports']['regular_pioneer']['return_visits'] + fieldServiceStore.data['reports']['special_pioneer']['return_visits'] }}</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12.5%">{{ fieldServiceStore.data['reports']['regular_pioneer']['bible_studies'] + fieldServiceStore.data['reports']['special_pioneer']['bible_studies'] }}</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                </CTable>
            </CCardBody>
        </CCard>

        <CCard class="mt-4 mb-4 shadow bg-body rounded" v-show = "activeBtn === 'ro'">
            <CCardBody>
                <CTable striped hover responsive>
                    <CTableHead>
                        <CTableRow color="dark">
                            <CTableHeaderCell colspan="2" scope="col" width="37.5%">Regular Pioneers</CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Placements</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Video Showings</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Hours</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Return Visits</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Bible Studies</i></CTableHeaderCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableHeaderCell colspan="2" scope="col" width="37.5%" class="text-end">
                                <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="fieldServiceStore.calc_loading"/>
                                Total :
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12.5%">{{ fieldServiceStore.data['reports']['regular_pioneer']['placements'] }}</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12.5%">{{ fieldServiceStore.data['reports']['regular_pioneer']['video_showings'] }}</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12.5%">{{ fieldServiceStore.data['reports']['regular_pioneer']['hours'] }}</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12.5%">{{ fieldServiceStore.data['reports']['regular_pioneer']['return_visits'] }}</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12.5%">{{ fieldServiceStore.data['reports']['regular_pioneer']['bible_studies'] }}</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                </CTable>
            </CCardBody>
        </CCard>

        <CCard class="mt-4 mb-4 shadow bg-body rounded" v-show = "activeBtn === 'ro'">
            <CCardBody>
                <CTable striped hover responsive>
                    <CTableHead>
                        <CTableRow color="dark">
                            <CTableHeaderCell colspan="2" scope="col" width="37.5%">Special Pioneers</CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Placements</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Video Showings</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Hours</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Return Visits</i></CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="12.5%"><i>Bible Studies</i></CTableHeaderCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableHeaderCell colspan="2" scope="col" width="37.5%" class="text-end">
                                <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="fieldServiceStore.calc_loading"/>
                                Total :
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12.5%">{{ fieldServiceStore.data['reports']['special_pioneer']['placements'] }}</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12.5%">{{ fieldServiceStore.data['reports']['special_pioneer']['video_showings'] }}</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12.5%">{{ fieldServiceStore.data['reports']['special_pioneer']['hours'] }}</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12.5%">{{ fieldServiceStore.data['reports']['special_pioneer']['return_visits'] }}</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12.5%">{{ fieldServiceStore.data['reports']['special_pioneer']['bible_studies'] }}</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                </CTable>
            </CCardBody>
        </CCard>

        </CCol>
    </CRow>

    <CRow>
        <CCol md="6">
            <MeetingAttendance v-if = "activeBtn === 'ro'" />
        </CCol>
        <CCol md="6">
            <ActivePublishers v-if = "activeBtn === 'ro'" />
        </CCol>
        <CCol md="6">
            <NoReportPublishers v-if = "activeBtn === 'ro'" />
        </CCol>
    </CRow>
    <CRow v-if = "activeBtn === 'stat'">
        <CCol :md="4" v-for="(dataset, key, index) in fieldServiceStore.data.stats.datasets" :key="index">
            <CCard class="mt-4 mb-1 shadow bg-body rounded">
                <CCardBody>
                    <CChartBar :data="defaultData({
                        'key': key,
                        'datasets': dataset,
                        'colorIndex': index
                    })" />
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
    <ModalActivePublishers v-show="helperStore.selectedModal == 'active_pub'"/>
    <ModalNoOfReportsPubs  v-show="helperStore.selectedModal == 'report_pub'"/>

</template>

<script>

    import ModalActivePublishers from '@/components/modal/ModalActivePublishers.vue'
    import ModalNoOfReportsPubs from '@/components/modal/ModalNoOfReportsPubs.vue'
    import FieldServiceTable from '@/components/reports/FieldServiceTable.vue'
    import MeetingAttendance from '@/components/reports/MeetingAttendance.vue'
    import ActivePublishers from '@/components/reports/ActivePublishers.vue'
    import NoReportPublishers from '@/components/reports/NoReportPublishers.vue'

    import { CChartBar } from '@coreui/vue-chartjs'

    import moment from 'moment'

    import { useCongregationStore } from '@/store/congregation'
    import { useFieldServiceStore } from '@/store/field_service'
    import { useHelperStore } from '@/services/helper'

    const congregationStore = useCongregationStore()
    const fieldServiceStore = useFieldServiceStore()
    const helperStore = useHelperStore()

    export default {

        name: 'FieldService',

        async created() {

            this.date_rendered = this.$route.params.year+'-'+this.$route.params.month+'-01'
            fieldServiceStore.date_rendered = this.date_rendered
            await congregationStore.getGroups(this.date_rendered)
            this.total_groups = congregationStore.groups.congregation.total_groups
            fieldServiceStore.grandTotalReports(this.date_rendered)

            this.forms = congregationStore.showGroups
            fieldServiceStore.all_reports=[] // reset all the total reports
        },
        data() {

            return {
                congregationStore: congregationStore,
                fieldServiceStore: fieldServiceStore,
                helperStore: helperStore,

                selectedModal: '',
                defShowGroup: 1, // default value
                activeBtn: 'ar', // default value
                edit: 0,
                editAttendance: {
                    midweek: 0,
                    weekend: 0
                },
                date_rendered: '',
                total_groups: 0,
                forms: {},
                formData: {},
                placements: [],
                video_showings: [],
                hours: [],
                return_visits: [],
                bible_studies: [],
            }
        },
        components: {
            CChartBar,
            FieldServiceTable,
            MeetingAttendance,
            ActivePublishers,
            ModalActivePublishers,
            NoReportPublishers,
            ModalNoOfReportsPubs,
        },
        computed: {

        },
        methods: {
            defaultData(datas) {
                return {
                    datasets: [
                        {
                            label: this.changeText(datas.key),
                            backgroundColor: this.changeColor(datas.colorIndex),
                            data: datas.datasets,
                        },
                    ],
                }
            },

            changeText(val) {
                let v = val.replace(/_/g, ' ')
                return v[0].toUpperCase() + v.slice(1)
            },

            changeColor(index) {
                switch(index) {
                    case 1:
                        return '#36A2EB'
                    case 2:
                        return '#FFCE56'
                    case 3:
                        return '#4BC0C0'
                    case 4:
                        return '#E7E9ED'
                    default:
                        // code block
                        return '#FF6384'
                }

            },

            getHumanDate() {
                return moment(this.date_rendered, 'YYYY-MM-DD').format('MMM. YYYY');
            },

        }
    }
</script>
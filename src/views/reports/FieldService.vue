<template>
    <CRow>
      <CCol>
        <h1>{{ getHumanDate() }} Reports</h1>
        <CCard class="mt-2 shadow bg-body rounded">
            <CCardBody>
            <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="congregationStore.loading"/>
            <CRow class="ms-1">
                <template v-for="(report, key, index) in fieldServiceStore.data.reports" :key="index">
                <CCol
                    class="border-start border-start-4 border-start-info py-1 px-3 mb-2"
                    :sm="4"
                    :md="2"
                    v-if="key == 'elder' || key == 'ministerial'"
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
                </template>
            </CRow>
        </CCardBody>
        </CCard>

        <CRow class="mt-4 mb-2">
            <CCol :sm="8">
                <CButtonGroup
                    class="mb-2"
                    role="group"
                    aria-label="Basic outlined example"
                    size="sm"
                >
                    <CButton color="secondary" variant="outline" @click="activeBtn='ar'" :class="{active: activeBtn === 'ar'}">All results</CButton>
                    <CButton color="secondary" variant="outline" @click="activeBtn='ro'" :class="{active: activeBtn === 'ro'}">Monthly Report</CButton>
                    <CButton color="secondary" variant="outline" @click="activeBtn='stat'" :class="{active: activeBtn === 'stat'}">Statistic</CButton>
                    <CButton
                        color="secondary"
                        variant="outline"
                        @click="fieldServiceStore.downloadMonthlyFSReports({date_rendered: date_rendered})"
                        v-if="activeBtn === 'stat' && $can('can-download-reports')"
                    >
                        <CIcon icon="cil-cloud-download" v-if="!fieldServiceStore.loading"/>
                        <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="fieldServiceStore.loading"/>
                    </CButton>
                <!-- <CButton color="primary" disabled>
                    <CIcon icon="cil-cloud-download" />
                </CButton> -->
                </CButtonGroup>

            </CCol>
            <CCol :sm="4">
                <CInputGroup v-show = "activeBtn === 'ar'" >
                <CButton type="button" color="secondary" size="sm">Show</CButton>

                <span v-if="authStore.user.role_id != 4">
                    <CFormSelect
                        class="rounded-0"
                        size="md"
                        @change="defShowGroup=$event.target.value"
                    >
                        <option
                            v-for="n in parseInt(total_groups)"
                            :key="n"
                            :value="n"
                            :selected="defShowGroup == n ? true : false"
                        > Group {{ n }}</option>
                    </CFormSelect>
                </span>
                <span v-else>
                    <CFormInput class="rounded-0" :value="'Group '+defShowGroup" readonly/>
                </span>
                <CButton
                    v-if="congregationStore.groups.enable_edit"
                    type="button"
                    color="secondary"
                    @click="helperStore.editFS == 1 ? helperStore.editFS=0 : helperStore.editFS=1"
                >
                    <span v-if="!helperStore.editFS" class="text-primary"><CIcon icon="cil-pencil" class="me-2 ms-1" /></span>
                    <span class="text-primary" v-else>close</span>
                </CButton>
                </CInputGroup>
            </CCol>
        </CRow>
        <ShowBy v-if="activeBtn === 'ar' || activeBtn === 'ro'"/>
        <span v-show="helperStore.screen == 'smaller'">
            <div v-if="typeof congregationStore.groups.members !== 'undefined'" v-show = "activeBtn === 'ar'" class="mt-4">
                <FieldServiceGrid
                    :defShowGroup="defShowGroup"
                    :date_rendered="date_rendered"
                />
            </div>
        </span>

        <span v-show="helperStore.screen == 'wider'">
            <div class="accordion mt-3 shadow bg-body rounded" v-if="typeof congregationStore.groups.members !== 'undefined'" v-show = "activeBtn === 'ar'">
                <div class="accordion-item" v-for="(group, index) in congregationStore.groups.members.publisher" :key="group" :item-key="index">
                    <div class = "accordion-collapse collapse" :class="defShowGroup == index ? 'show' : ''">
                        <div class="accordion-body">
                            <FieldServiceTable :group="group" designate="Publisher" :date_rendered="date_rendered"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="accordion shadow bg-body rounded" v-if="typeof congregationStore.groups.members !== 'undefined'" v-show = "activeBtn === 'ar'">
                <div class="accordion-item" v-for="(group, index) in congregationStore.groups.members.regular_pioneer" :key="group" :item-key="index">
                    <div class = "accordion-collapse collapse" :class="defShowGroup == index ? 'show' : ''">
                        <div class="accordion-body">
                            <FieldServiceTable :group="group" designate="Regular Pioneer" :date_rendered="date_rendered"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="accordion shadow bg-body rounded" v-if="typeof congregationStore.groups.members !== 'undefined'" v-show = "activeBtn === 'ar'">
                <div class="accordion-item" v-for="(group, index) in congregationStore.groups.members.auxillary_pioneer" :key="group" :item-key="index">
                    <div class = "accordion-collapse collapse" :class="defShowGroup == index ? 'show' : ''">
                        <div class="accordion-body">
                            <FieldServiceTable :group="group" designate="Auxillary Pioneer" :date_rendered="date_rendered"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="accordion shadow bg-body rounded" v-if="typeof congregationStore.groups.members !== 'undefined'" v-show = "activeBtn === 'ar'">
                <div class="accordion-item" v-for="(group, index) in congregationStore.groups.members.special_pioneer" :key="group" :item-key="index">
                    <div class = "accordion-collapse collapse" :class="defShowGroup == index ? 'show' : ''">
                        <div class="accordion-body">
                            <FieldServiceTable :group="group" designate="Special Pioneer" :date_rendered="date_rendered"/>
                        </div>
                    </div>
                </div>
            </div>
        </span>

        <span v-show="helperStore.screen == 'smaller' && activeBtn === 'ro'">
            <GroupsMonthlyReports/>
        </span>
        <span v-show="helperStore.screen == 'wider'">

            <CCard class="mt-4 mb-4 shadow bg-body rounded" v-show = "activeBtn === 'ro'">
                <CCardBody>
                    <CTable striped hover responsive>
                        <CTableHead>
                            <CTableRow color="dark">
                                <CTableHeaderCell colspan="2" scope="col" width="22%">Totals</CTableHeaderCell>
                                    <!-- <CTableHeaderCell scope="col" width="26%"><i>Placements</i></CTableHeaderCell>
                                    <CTableHeaderCell scope="col" width="26%"><i>Video Showings</i></CTableHeaderCell> -->
                                    <CTableHeaderCell scope="col" width="26%"><i>Ministries</i></CTableHeaderCell>
                                    <CTableHeaderCell scope="col" width="26%"><i>Bible Studies</i></CTableHeaderCell>
                                    <CTableHeaderCell scope="col" width="26%"><i>Hours</i></CTableHeaderCell>
                                    <!-- <CTableHeaderCell scope="col" width="26%"><i>Return Visits</i></CTableHeaderCell> -->
                                    <!-- <CTableHeaderCell scope="col" width="26%"><i>Credit Hours</i></CTableHeaderCell> -->
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell colspan="2" scope="col" width="22%" class="text-end">
                                    <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="fieldServiceStore.calc_loading"/>
                                    Grand Total :
                                </CTableHeaderCell>
                                <!-- <CTableHeaderCell class="text-primary" scope="col" width="26%">{{ fieldServiceStore.data['placements'] }}</CTableHeaderCell> -->
                                <!-- <CTableHeaderCell class="text-primary" scope="col" width="26%">{{ fieldServiceStore.data['video_showings'] }}</CTableHeaderCell> -->
                                <CTableHeaderCell class="text-primary" scope="col" width="26%">{{ fieldServiceStore.data['is_ministry'] }}</CTableHeaderCell>
                                <CTableHeaderCell class="text-primary" scope="col" width="26%">{{ fieldServiceStore.data['bible_studies'] }}</CTableHeaderCell>
                                <CTableHeaderCell class="text-primary" scope="col" width="26%">{{ fieldServiceStore.data['hours'] }}</CTableHeaderCell>
                                <!-- <CTableHeaderCell class="text-primary" scope="col" width="26%">{{ fieldServiceStore.data['return_visits'] }}</CTableHeaderCell> -->
                                <!-- <CTableHeaderCell class="text-primary" scope="col" width="26%">{{ fieldServiceStore.data['credit_hours'] }}</CTableHeaderCell> -->
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
                                <CTableHeaderCell colspan="2" scope="col" width="22%">Publishers</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" width="26%"><i>No. of Reports</i></CTableHeaderCell>
                                    <!-- <CTableHeaderCell scope="col" width="26%"><i>Placements</i></CTableHeaderCell> -->
                                    <!-- <CTableHeaderCell scope="col" width="26%"><i>Video Showings</i></CTableHeaderCell> -->
                                    <CTableHeaderCell scope="col" width="26%"><i>Bible Studies</i></CTableHeaderCell>
                                    <CTableHeaderCell scope="col" width="26%"><i>Ministries</i></CTableHeaderCell>
                                    <!-- <CTableHeaderCell scope="col" width="26%"><i>Hours</i></CTableHeaderCell> -->
                                    <!-- <CTableHeaderCell scope="col" width="26%"><i>Return Visits</i></CTableHeaderCell> -->
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell colspan="2" scope="col" width="22%" class="text-end">
                                    <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="fieldServiceStore.calc_loading"/>
                                    Total :
                                </CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="26%">{{ reportsPubs.reports.publishers ?? 0 }}</CTableHeaderCell>
                                <!-- <CTableHeaderCell scope="col" width="26%">{{ fieldServiceStore.data['publshr_placements'] }}</CTableHeaderCell> -->
                                <!-- <CTableHeaderCell scope="col" width="26%">{{ fieldServiceStore.data['publshr_vs'] }}</CTableHeaderCell> -->
                                <CTableHeaderCell scope="col" width="26%">{{ fieldServiceStore.data['publshr_bs'] }}</CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="26%">{{ fieldServiceStore.data['publshr_is_min'] }}</CTableHeaderCell>
                                <!-- <CTableHeaderCell scope="col" width="26%">{{ fieldServiceStore.data['publshr_hours'] }}</CTableHeaderCell> -->
                                <!-- <CTableHeaderCell scope="col" width="26%">{{ fieldServiceStore.data['publshr_rv'] }}</CTableHeaderCell> -->
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
                                <CTableHeaderCell colspan="2" scope="col" width="22%">Auxiliary Pioneers</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" width="26%"><i>No. of Reports</i></CTableHeaderCell>
                                    <!-- <CTableHeaderCell scope="col" width="26%"><i>Placements</i></CTableHeaderCell> -->
                                    <!-- <CTableHeaderCell scope="col" width="26%"><i>Video Showings</i></CTableHeaderCell> -->
                                    <CTableHeaderCell scope="col" width="26%"><i>Bible Studies</i></CTableHeaderCell>
                                    <CTableHeaderCell scope="col" width="26%"><i>Hours</i></CTableHeaderCell>
                                    <!-- <CTableHeaderCell scope="col" width="26%"><i>Return Visits</i></CTableHeaderCell> -->
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell colspan="2" scope="col" width="22%" class="text-end">
                                    <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="fieldServiceStore.calc_loading"/>
                                    Total :
                                </CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="26%">{{ reportsPubs.reports.auxiliary_pioneers ?? 0 }}</CTableHeaderCell>
                                <!-- <CTableHeaderCell scope="col" width="26%">{{ fieldServiceStore.data['reports']['auxillary_pioneer']['placements'] }}</CTableHeaderCell> -->
                                <!-- <CTableHeaderCell scope="col" width="26%">{{ fieldServiceStore.data['reports']['auxillary_pioneer']['video_showings'] }}</CTableHeaderCell> -->
                                <CTableHeaderCell scope="col" width="26%">{{ fieldServiceStore.data['reports']['auxillary_pioneer']['bible_studies'] }}</CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="26%">{{ fieldServiceStore.data['reports']['auxillary_pioneer']['hours'] }}</CTableHeaderCell>
                                <!-- <CTableHeaderCell scope="col" width="26%">{{ fieldServiceStore.data['reports']['auxillary_pioneer']['return_visits'] }}</CTableHeaderCell> -->
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
                                <CTableHeaderCell colspan="2" scope="col" width="22%">Special/Regular Pioneers</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" width="26%"><i>No. of Reports</i></CTableHeaderCell>
                                    <!-- <CTableHeaderCell scope="col" width="26%"><i>Placements</i></CTableHeaderCell> -->
                                    <!-- <CTableHeaderCell scope="col" width="26%"><i>Video Showings</i></CTableHeaderCell> -->
                                    <CTableHeaderCell scope="col" width="26%"><i>Bible Studies</i></CTableHeaderCell>
                                    <CTableHeaderCell scope="col" width="26%"><i>Hours</i></CTableHeaderCell>
                                    <!-- <CTableHeaderCell scope="col" width="26%"><i>Return Visits</i></CTableHeaderCell> -->
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell colspan="2" scope="col" width="22%" class="text-end">
                                    <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="fieldServiceStore.calc_loading"/>
                                    Total :
                                </CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="26%">{{ reportsPubs.reports.regular_pioneers ?? 0 }}</CTableHeaderCell>
                                <!-- <CTableHeaderCell scope="col" width="26%">{{ fieldServiceStore.data['reports']['regular_pioneer']['placements'] + fieldServiceStore.data['reports']['special_pioneer']['placements'] }}</CTableHeaderCell> -->
                                <!-- <CTableHeaderCell scope="col" width="26%">{{ fieldServiceStore.data['reports']['regular_pioneer']['video_showings'] + fieldServiceStore.data['reports']['special_pioneer']['video_showings'] }}</CTableHeaderCell> -->
                                <CTableHeaderCell scope="col" width="26%">{{ fieldServiceStore.data['reports']['regular_pioneer']['bible_studies'] + fieldServiceStore.data['reports']['special_pioneer']['bible_studies'] }}</CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="26%">{{ fieldServiceStore.data['reports']['regular_pioneer']['hours'] + fieldServiceStore.data['reports']['special_pioneer']['hours'] }}</CTableHeaderCell>
                                <!-- <CTableHeaderCell scope="col" width="26%">{{ fieldServiceStore.data['reports']['regular_pioneer']['return_visits'] + fieldServiceStore.data['reports']['special_pioneer']['return_visits'] }}</CTableHeaderCell> -->
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
                                <CTableHeaderCell colspan="2" scope="col" width="48%">Regular Pioneers</CTableHeaderCell>
                                    <!-- <CTableHeaderCell scope="col" width="26%"><i>Placements</i></CTableHeaderCell> -->
                                    <!-- <CTableHeaderCell scope="col" width="26%"><i>Video Showings</i></CTableHeaderCell> -->
                                    <CTableHeaderCell scope="col" width="26%"><i>Bible Studies</i></CTableHeaderCell>
                                    <CTableHeaderCell scope="col" width="26%"><i>Hours</i></CTableHeaderCell>
                                    <!-- <CTableHeaderCell scope="col" width="26%"><i>Return Visits</i></CTableHeaderCell> -->
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell colspan="2" scope="col" width="48%" class="text-end">
                                    <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="fieldServiceStore.calc_loading"/>
                                    Total :
                                </CTableHeaderCell>
                                <!-- <CTableHeaderCell scope="col" width="26%">{{ fieldServiceStore.data['reports']['regular_pioneer']['placements'] }}</CTableHeaderCell> -->
                                <!-- <CTableHeaderCell scope="col" width="26%">{{ fieldServiceStore.data['reports']['regular_pioneer']['video_showings'] }}</CTableHeaderCell> -->
                                <CTableHeaderCell scope="col" width="26%">{{ fieldServiceStore.data['reports']['regular_pioneer']['bible_studies'] }}</CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="26%">{{ fieldServiceStore.data['reports']['regular_pioneer']['hours'] }}</CTableHeaderCell>
                                <!-- <CTableHeaderCell scope="col" width="26%">{{ fieldServiceStore.data['reports']['regular_pioneer']['return_visits'] }}</CTableHeaderCell> -->
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
                                <CTableHeaderCell colspan="2" scope="col" width="48%">Special Pioneers</CTableHeaderCell>
                                    <!-- <CTableHeaderCell scope="col" width="26%"><i>Placements</i></CTableHeaderCell> -->
                                    <!-- <CTableHeaderCell scope="col" width="26%"><i>Video Showings</i></CTableHeaderCell> -->
                                    <CTableHeaderCell scope="col" width="26%"><i>Bible Studies</i></CTableHeaderCell>
                                    <CTableHeaderCell scope="col" width="26%"><i>Hours</i></CTableHeaderCell>
                                    <!-- <CTableHeaderCell scope="col" width="26%"><i>Return Visits</i></CTableHeaderCell> -->
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell colspan="2" scope="col" width="48%" class="text-end">
                                    <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="fieldServiceStore.calc_loading"/>
                                    Total :
                                </CTableHeaderCell>
                                <!-- <CTableHeaderCell scope="col" width="26%">{{ fieldServiceStore.data['reports']['special_pioneer']['placements'] }}</CTableHeaderCell> -->
                                <!-- <CTableHeaderCell scope="col" width="26%">{{ fieldServiceStore.data['reports']['special_pioneer']['video_showings'] }}</CTableHeaderCell> -->
                                <CTableHeaderCell scope="col" width="26%">{{ fieldServiceStore.data['reports']['special_pioneer']['bible_studies'] }}</CTableHeaderCell>
                                <CTableHeaderCell scope="col" width="26%">{{ fieldServiceStore.data['reports']['special_pioneer']['hours'] }}</CTableHeaderCell>
                                <!-- <CTableHeaderCell scope="col" width="26%">{{ fieldServiceStore.data['reports']['special_pioneer']['return_visits'] }}</CTableHeaderCell> -->
                            </CTableRow>
                        </CTableHead>
                    </CTable>
                </CCardBody>
            </CCard>
        </span>
        </CCol>
    </CRow>

    <CRow>
        <CCol md="6">
            <MeetingAttendance :enable_edit="congregationStore.groups.enable_edit" v-if = "activeBtn === 'ro'" />
        </CCol>
        <CCol md="6">
            <ActivePublishers :enable_edit="congregationStore.groups.enable_edit" v-if = "activeBtn === 'ro'" />
        </CCol>
        <CCol md="6">
            <NoReportPublishers :enable_edit="congregationStore.groups.enable_edit" v-if = "activeBtn === 'ro'" />
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
    <scroll-top/>
</template>

<script>

    import ModalActivePublishers from '@/components/modal/ModalActivePublishers'
    import ModalNoOfReportsPubs from '@/components/modal/ModalNoOfReportsPubs'
    import FieldServiceTable from '@/components/reports/FieldServiceTable'
    import FieldServiceGrid from '@/components/reports/FieldServiceGrid'
    import MeetingAttendance from '@/components/reports/MeetingAttendance'
    import ActivePublishers from '@/components/reports/ActivePublishers'
    import NoReportPublishers from '@/components/reports/NoReportPublishers'
    import GroupsMonthlyReports from '@/components/reports/GroupsMonthlyReports'
    import ShowBy from '@/components/icon/ShowBy'

    import { CChartBar } from '@coreui/vue-chartjs'

    import { useCongregationStore } from '@/store/congregation'
    import { useFieldServiceStore } from '@/store/field_service'
    import { useAuthStore } from '@/store/auth'
    import { useHelperStore } from '@/services/helper'
    import { useReportsPubsStore } from '@/store/reportspubs'

    const congregationStore = useCongregationStore()
    const fieldServiceStore = useFieldServiceStore()
    const helperStore = useHelperStore()
    const authStore = useAuthStore()
    const reportsPubs = useReportsPubsStore()

    export default {

        name: 'FieldService',

        async created() {

            this.date_rendered = this.$route.params.year+'-'+this.$route.params.month+'-01'
            fieldServiceStore.date_rendered = this.date_rendered
            await congregationStore.getGroups(this.date_rendered)
            this.total_groups = congregationStore.groups.congregation.total_groups
            fieldServiceStore.grandTotalReports(this.date_rendered)

            parseInt(authStore.user.role_id) == 4 ? this.defShowGroup = authStore.user.group_no : ''
            // this.forms = congregationStore.showGroups
            fieldServiceStore.all_reports=[] // reset all the total reports

        },
        data() {

            return {
                congregationStore: congregationStore,
                fieldServiceStore: fieldServiceStore,
                helperStore: helperStore,
                authStore: authStore,
                reportsPubs: reportsPubs,

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
            ShowBy,
            FieldServiceGrid,
            GroupsMonthlyReports
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
                return helperStore.getMonthYear(this.date_rendered)
            },

        }
    }
</script>
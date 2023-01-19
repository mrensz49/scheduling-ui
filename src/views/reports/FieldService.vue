<template>
    <CRow>
      <CCol>
        <h1>{{ getHumanDate() }} Reports</h1>
        <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="congregationStore.loading"/>

        <CRow>
            <CCol :sm="5"></CCol>
            <CCol :sm="7" class="d-none d-md-block">
            <CButton color="primary" class="float-end">
                <CIcon icon="cil-cloud-download" />
            </CButton>
            <CButtonGroup
                class="float-end me-3"
                role="group"
                aria-label="Basic outlined example"
            >
                <CButton color="secondary" variant="outline" @click="activeBtn='ar'" :class="{active: activeBtn === 'ar'}">All results</CButton>
                <CButton color="secondary" variant="outline" @click="activeBtn='ro'" :class="{active: activeBtn === 'ro'}">Reports Only</CButton>
                <CButton color="secondary" variant="outline" @click="activeBtn='stat'" :class="{active: activeBtn === 'stat'}">Statistic</CButton>
            </CButtonGroup>
            </CCol>
        </CRow>

        <CCard class="mt-2">
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

        <CRow v-show = "activeBtn === 'ar'">
            <CCol :sm="4">
                <CInputGroup class="mt-3 mb-2">
                <CButton type="button" color="secondary" >Show</CButton>
                <CFormSelect>
                    <option
                        v-for="group in forms"
                        :key="group.group"
                        @click="defShowGroup=group.group"
                        :selected="defShowGroup == group.group ? true : false"
                    > Group {{ group.group }}</option>
                </CFormSelect>
                <CButton type="button" color="secondary">
                    <a href="javascript:void" @click="edit=1" v-if="!edit" class="ms-2">
                        <CIcon icon="cil-pencil" class="me-2 ms-1" />
                    </a>
                    <a href="javascript:void" @click="edit=0" v-else class="ms-2">
                        <small>close</small>
                    </a>
                </CButton>
                </CInputGroup>
            </CCol>
        </CRow>

        <div class="accordion" v-show = "activeBtn === 'ar'">
            <div class="accordion-item" v-for="group in forms" :key="group.group" :item-key="group.group">
                <h2 class="accordion-header" @click="defShowGroup == group.group ? defShowGroup : defShowGroup = group.group">
                    <button
                        class="accordion-button"
                        type="button"
                        data-coreui-toggle="collapse"
                        :class="defShowGroup == group.group ? '' : 'collapsed'"
                        :aria-expanded="defShowGroup == group.group ? true : false"
                    >
                        <CIcon class="me-2" icon="cil-people" /> <strong> Group {{ group.group }} </strong>
                    </button>
                </h2>
                <div class = "accordion-collapse collapse" :class="defShowGroup == group.group ? 'show' : ''">
                    <div class="accordion-body">
                        <CTable striped hover responsive class="mb-5">
                            <CTableHead color="dark">
                                <CTableRow>
                                    <CTableHeaderCell scope="col" width="20%">Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" width="17.5%">Designate</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" width="12.5%">
                                        <span v-c-tooltip="{content: 'Printed and Electronic', placement: 'top'}">Placements</span>
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col" width="12.5%">Video Showings</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" width="12.5%">Hours</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" width="12.5%">Return Visits</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" width="12.5%">Bible Studies</CTableHeaderCell>
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
                                        <template v-for="designate in member.designates" :key= "designate">
                                            <CBadge v-if="designate.position" color="success" class="m-1">
                                                {{ designate.position.name }}
                                            </CBadge>
                                        </template>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <span v-if="!edit">{{ member.placements ?? 0 }}</span>
                                        <span v-else>
                                            <CFormInput
                                                style="width:35%"
                                                size="sm"
                                                @keyup="saveReport(member.report_field_services_id ?? member.id, member.report_field_services_id ? 'exist':'not', 'placements', group.group, index)"
                                                v-model="member.placements"
                                                :placeholder="!member.placements ? 0 : ''"
                                            />
                                        </span>
                                    </CTableDataCell>

                                    <CTableDataCell>
                                        <span v-if="!edit">{{ member.video_showings ?? 0 }}</span>
                                        <span v-else>
                                            <CFormInput
                                                style="width:35%"
                                                size="sm"
                                                @keyup="saveReport(member.report_field_services_id ?? member.id, member.report_field_services_id ? 'exist':'not', 'video_showings', group.group, index)"
                                                v-model="member.video_showings"
                                                :placeholder="!member.video_showings ? 0 : ''"
                                            />
                                        </span>
                                    </CTableDataCell>

                                    <CTableDataCell>
                                        <span v-if="!edit">{{ member.hours ?? 0 }}</span>
                                        <span v-else>
                                            <CFormInput
                                                style="width:35%"
                                                size="sm"
                                                @keyup="saveReport(member.report_field_services_id ?? member.id, member.report_field_services_id ? 'exist':'not', 'hours', group.group, index)"
                                                v-model="member.hours"
                                                :placeholder="!member.hours ? 0 : ''"
                                            />
                                        </span>
                                    </CTableDataCell>

                                    <CTableDataCell>
                                        <span v-if="!edit">{{ member.return_visits ?? 0 }}</span>
                                        <span v-else>
                                            <CFormInput
                                                style="width:35%"
                                                size="sm"
                                                @keyup="saveReport(member.report_field_services_id ?? member.id, member.report_field_services_id ? 'exist':'not', 'return_visits', group.group, index)"
                                                v-model="member.return_visits"
                                                :placeholder="!member.return_visits ? 0 : ''"
                                            />
                                        </span>
                                    </CTableDataCell>

                                    <CTableDataCell>
                                        <span v-if="!edit">{{ member.bible_studies ?? 0 }}</span>
                                        <span v-else>
                                            <CFormInput
                                                style="width:35%"
                                                size="sm"
                                                @keyup="saveReport(member.report_field_services_id ?? member.id, member.report_field_services_id ? 'exist':'not', 'bible_studies', group.group, index)"
                                                v-model="member.bible_studies"
                                                :placeholder="!member.bible_studies ? 0 : ''"
                                            />
                                        </span>
                                    </CTableDataCell>

                                </CTableRow>
                            </CTableBody>
                            <CTableFoot color="dark">
                                <CTableRow>
                                    <CTableDataCell colspan="2" class="text-end"><b >Total : </b> </CTableDataCell>
                                    <CTableDataCell><i>{{ fieldServiceStore.showTotalReport([group.members, 'placements']) }}</i></CTableDataCell>
                                    <CTableDataCell><i>{{ fieldServiceStore.showTotalReport([group.members, 'video_showings']) }}</i></CTableDataCell>
                                    <CTableDataCell><i>{{ fieldServiceStore.showTotalReport([group.members, 'hours']) }}</i></CTableDataCell>
                                    <CTableDataCell><i>{{ fieldServiceStore.showTotalReport([group.members, 'return_visits']) }}</i></CTableDataCell>
                                    <CTableDataCell><i>{{ fieldServiceStore.showTotalReport([group.members, 'bible_studies']) }}</i></CTableDataCell>
                                </CTableRow>
                            </CTableFoot>
                    </CTable>
                    </div>
                </div>
            </div>
        </div>

        <CCard class="mt-4 mb-4" v-show = "activeBtn === 'ro'">
            <CCardBody>
                <CTable striped hover responsive>
                    <CTableHead>
                        <CTableRow color="dark">
                            <CTableHeaderCell colspan="2" scope="col" width="37.5%">All Groups</CTableHeaderCell>
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

        <CCard class="mt-4 mb-4" v-show = "activeBtn === 'ro'">
            <CCardBody>
                <CTable striped hover responsive>
                    <CTableHead>
                        <CTableRow color="dark">
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

        <CCard class="mt-4 mb-4" v-show = "activeBtn === 'ro'">
            <CCardBody>
                <CTable striped hover responsive>
                    <CTableHead>
                        <CTableRow color="dark">
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

        <CCard class="mt-4 mb-4" v-show = "activeBtn === 'ro'">
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

        </CCol>
    </CRow>

    <CRow v-if = "activeBtn === 'stat'">
        <CCol :md="4" v-for="(dataset, key, index) in fieldServiceStore.data.stats.datasets" :key="index">
            <CCard class="mt-4 mb-1">
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


</template>

<script>

    import { CChartBar } from '@coreui/vue-chartjs'

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
            fieldServiceStore.grandTotalReports(this.date_rendered)
            this.forms = congregationStore.showGroups
            fieldServiceStore.all_reports=[] // reset all the total reports
        },
        data() {

            return {
                congregationStore: congregationStore,
                fieldServiceStore: fieldServiceStore,

                defShowGroup: 1, // default value
                activeBtn: 'ar', // default value
                edit: 0,
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
        components: { CChartBar },
        computed: {

        },
        methods: {
            defaultData(datas) {
                return {
                    datasets: [
                        {
                            label: this.changeText(datas.key),
                            backgroundColor: '#A'+ (12 * datas.colorIndex) +'A' + (datas.colorIndex + 2) + 'A',
                            data: datas.datasets,
                        },
                    ],
                }
            },

            changeText(val) {
                let v = val.replace(/_/g, ' ')
                return v[0].toUpperCase() + v.slice(1)
            },

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
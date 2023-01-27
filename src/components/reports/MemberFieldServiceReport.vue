<template>
    <CRow>
        <CCol>
            <CCard class="mt-3">
                <CCardHeader> <CIcon icon="cil-notes" />
                    Field Service Reports
                    <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="fieldServiceStore.reports_loading"/>
                </CCardHeader>
                <CCardBody v-if="delayShow">

                    <CRow>
                        <CCol :sm="5"></CCol>
                        <CCol :sm="7" class="d-none d-md-block">
                        <CButtonGroup
                            class="float-end me-3"
                            role="group"
                            aria-label="Basic outlined example"
                        >
                            <template v-for="year in fieldServiceStore.member_reports.years" :key="year">
                                <CButton
                                    color="secondary"
                                    variant="outline"
                                    @click="activeBtn=year"
                                    :class="{active: activeBtn === year}"
                                >{{ year }}</CButton>
                            </template>
                        </CButtonGroup>
                        </CCol>
                    </CRow>

                    <template v-for="(year, index) in fieldServiceStore.member_reports.years" :key="year">
                        <CCard class="p-2 mt-4" v-if="activeBtn==year">
                            <CChartLine
                                height="60"
                                :data="{
                                    labels: fieldServiceStore.lineMonths[index][0],
                                    datasets: [
                                        {
                                            label: 'Hours',
                                            backgroundColor: '#FFCE56',
                                            borderColor: '#FFCE56',
                                            data: fieldServiceStore.lineHours[index][0]
                                        }
                                    ]
                                }"
                            />
                        </CCard>
                    </template>

                    <template v-for="(year, index) in fieldServiceStore.member_reports.years" :key="year">
                        <CCard class="p-2 mt-4" v-if="activeBtn==year">
                            <CChartLine
                                height="60"
                                :data="{
                                    labels: fieldServiceStore.lineMonths[index][0],
                                    datasets: [
                                        {
                                            label: 'Placements',
                                            backgroundColor: '#FF6384',
                                            borderColor: '#FF6384',
                                            data: fieldServiceStore.linePlacements[index][0]
                                        },
                                        {
                                            label: 'Video Showings',
                                            backgroundColor: '#36A2EB',
                                            borderColor: '#36A2EB',
                                            data: fieldServiceStore.lineVideoShowings[index][0]
                                        },
                                        {
                                            label: 'Return Visits',
                                            backgroundColor: '#4BC0C0',
                                            borderColor: '#4BC0C0',
                                            data: fieldServiceStore.lineReturnVisits[index][0]
                                        },
                                        {
                                            label: 'Bible Studies',
                                            backgroundColor: '#E7E9ED',
                                            borderColor: '#E7E9ED',
                                            data: fieldServiceStore.lineBibleStudies[index][0]
                                        },
                                    ]
                                }"
                            />
                        </CCard>
                    </template>



                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>

<script>

import { CChartLine } from '@coreui/vue-chartjs'

import { useFieldServiceStore } from '@/store/field_service'
import { usePositionStore } from '@/store/position'

const fieldServiceStore = useFieldServiceStore()
const positionStore = usePositionStore()

export default {

    name: 'MemberFieldServiceReport',

    props: ['member_id'],

    async created() {
        fieldServiceStore.memberReports(this.member_id)
        positionStore.getPositions()
        setTimeout(()=>{
            this.activeBtn = fieldServiceStore.member_reports.years[0]
            this.delayShow=true;
        },1000)
    },

    data() {
        return {
            fieldServiceStore: fieldServiceStore,
            positionStore: positionStore,

            delayShow: false,
            activeBtn: 0, // default value, latest year
        }
    },

    components: { CChartLine },

    methods: {
        defaultData() {
                return fieldServiceStore.lineData
            // console.log(1)
            // return {
            //     labels: [],
            //     datasets: [
            //         {
            //             label: 'Hours',
            //             backgroundColor: 'rgb(228,102,81,0.9)',
            //             data: [],
            //         },
            //     ],
            // }
        },
    },


}
</script>
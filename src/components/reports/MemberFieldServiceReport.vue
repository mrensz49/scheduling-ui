<template>
    <CRow>
        <CCol>
            <CCard class="mt-3 mb-4">
                <CCardHeader> <CIcon icon="cil-notes" />
                    Field Service Reports
                    <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="fieldServiceStore.reports_loading || loading"/>
                    <a class="pointer" style="float:right" @click="showReport()" v-if="!delayShow">SHOW REPORT</a>
                </CCardHeader>
                <CCardBody v-if="delayShow">
                    <CRow>
                        <CCol :sm="5"></CCol>
                        <CCol :sm="7" class="">
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
                                :height="height"
                                :data="{
                                    labels: fieldServiceStore.lineMonths[index][index],
                                    datasets: [
                                        {
                                            label: 'Hours',
                                            backgroundColor: '#FFCE56',
                                            borderColor: '#FFCE56',
                                            data: fieldServiceStore.lineHours[index][index]
                                        }
                                    ]
                                }"
                            />
                        </CCard>
                    </template>

                    <template v-for="(year, index) in fieldServiceStore.member_reports.years" :key="year">
                        <CCard class="p-2 mt-4" v-if="activeBtn==year">
                            <CChartLine
                                :height="height"
                                :data="{
                                    labels: fieldServiceStore.lineMonths[index][index],
                                    datasets: [
                                        {
                                            label: 'Placements',
                                            backgroundColor: '#FF6384',
                                            borderColor: '#FF6384',
                                            data: fieldServiceStore.linePlacements[index][index]
                                        },
                                        {
                                            label: 'Video Showings',
                                            backgroundColor: '#36A2EB',
                                            borderColor: '#36A2EB',
                                            data: fieldServiceStore.lineVideoShowings[index][index]
                                        },
                                        {
                                            label: 'Return Visits',
                                            backgroundColor: '#4BC0C0',
                                            borderColor: '#4BC0C0',
                                            data: fieldServiceStore.lineReturnVisits[index][index]
                                        },
                                        {
                                            label: 'Bible Studies',
                                            backgroundColor: '#E7E9ED',
                                            borderColor: '#E7E9ED',
                                            data: fieldServiceStore.lineBibleStudies[index][index]
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

    created() {
        // setTimeout(()=>{
        //     this.activeBtn = fieldServiceStore.member_reports.years[0]
        //     this.delayShow=true;
        // },1000)
        console.log('test')
    },

    data() {
        return {
            fieldServiceStore: fieldServiceStore,
            positionStore: positionStore,

            loading: false,
            delayShow: false,
            activeBtn: 0, // default value, latest year,
            height: window.innerWidth > 1000 ? 60 : 0,
            windowWidth: window.innerWidth
        }
    },

    components: { CChartLine },

    methods: {

        showReport() {

            this.delayShow=false;
            this.loading=true;
            fieldServiceStore.clearData()
            fieldServiceStore.memberReports(this.$route.params.id)

            setTimeout(()=>{
                this.activeBtn = fieldServiceStore.member_reports.years[0]
                this.delayShow=true;
                this.loading=false;
            },1000)
        },
    },

    watch: {
        // whenever question changes, this function will run
        member_id: function () {
            this.delayShow = false
        }
    },

}
</script>
<template>
    <CRow>
        <CCol>
            <CCard>
                <CCardHeader> <CIcon icon="cil-notes" />
                    Service Year

                    <CButtonGroup
                            class="float-end me"
                            role="group"
                            aria-label="Basic outlined example"
                        >
                            <template v-for="(year, index) in helperStore.years_months.year" :key="year">
                                <CButton
                                    color="secondary"
                                    variant="outline"
                                    :class="{active: activeBtn === year}"
                                    @click="fieldServiceStore.fetchMonthlyReport(
                                        {'year': year,
                                        'month': helperStore.years_months.month[index]
                                    }, activeBtn=year)"
                                >{{ year }}</CButton>
                            </template>
                        </CButtonGroup>

                    <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="fieldServiceStore.loading"/>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <template v-for="(report, index) in fieldServiceStore.monthly_reports" :key="index">

                            <CCol :md="4">
                            <CCard class="mb-3">
                                    <CCardBody>
                                        <CCardTitle>
                                            <a href="javascript:void" class="text-decoration-none" @click="view_field_service(report.year, report.month)">
                                                {{ report.month_year }}
                                            </a>
                                        </CCardTitle>
                                        <hr>
                                        <CCardText>
                                            <table width="100%">
                                                <tr>
                                                    <th width="50%">Placements</th>
                                                    <td>: <b class="text-danger">{{ report.placements }}</b></td>
                                                </tr>
                                                <tr>
                                                    <th width="50%">Video Showings</th>
                                                    <td>: <b class="text-danger">{{ report.video_showings }}</b></td>
                                                </tr>
                                                <tr>
                                                    <th width="50%">Hours</th>
                                                    <td>: <b class="text-danger">{{ report.hours }}</b></td>
                                                </tr>
                                                <tr>
                                                    <th width="50%">Return Visits</th>
                                                    <td>: <b class="text-danger">{{ report.return_visits }}</b></td>
                                                </tr>
                                                <tr>
                                                    <th width="50%">Bible Studies</th>
                                                    <td>: <b class="text-danger">{{ report.bible_studies }}</b></td>
                                                </tr>
                                            </table>
                                        </CCardText>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </template>
                    </CRow>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>

<script>

    import router from '@/router'
    import { useHelperStore } from '@/services/helper'
    import { useFieldServiceStore } from '@/store/field_service'

    const helperStore = useHelperStore()
    const fieldServiceStore = useFieldServiceStore()

    export default {
    name: "MonthlyReport",
    async created() {
        await helperStore.fetchMonthYear();
        fieldServiceStore.fetchMonthlyReport({ "year": helperStore.year, "month": helperStore.month });
        this.activeBtn = helperStore.year
    },
    data() {
        return {
            helperStore: helperStore,
            fieldServiceStore: fieldServiceStore,
            activeBtn: 0,
        };
    },
    methods: {
        view_field_service(year, month) {
            router.push({name: 'Field Service', params: { 'year': year, 'month': month } })
        },

    }

}

</script>
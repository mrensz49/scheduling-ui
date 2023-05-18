<template>
    <CCard class="mb-4 shadow bg-body rounded">
        <CCardBody>
            <CCardTitle>No of Reports this Month</CCardTitle>
            <table width="100%">
                <tr>
                    <th width="60%">Totals</th>
                    <td>{{ reportsPubs.reports.total ?? 0 }}</td>
                </tr>
                <tr>
                    <th width="60%">Publishers</th>
                    <td>{{ reportsPubs.reports.publishers ?? 0 }}</td>
                </tr>
                <tr>
                    <th width="60%">Auxiliary Pioneers</th>
                    <td>{{ reportsPubs.reports.auxiliary_pioneers ?? 0 }}</td>
                </tr>
                <tr>
                    <th width="60%">Regular Pioneers</th>
                    <td>{{ reportsPubs.reports.regular_pioneers ?? 0 }}</td>
                </tr>
            </table>
            <div class="mt-2">
                <CButton
                    size="sm"
                    color="primary"
                    variant="ghost"
                    @click="reportsPubs.calcNoReportsPubs({'date_rendered': date_rendered, 'type': 'calc'})"
                    :disabled="reportsPubs.loading"
                >
                    Calculate
                </CButton>
                <CButton
                    size="sm"
                    color="info"
                    variant="ghost"
                    class="ms-1"
                    :disabled="reportsPubs.loading"
                    @click="reportsPubs.calcNoReportsPubs({'date_rendered': date_rendered, 'type': 'show'})"
                >Show Results</CButton>
                <CSpinner color="primary" v-if="reportsPubs.loading" class="ms-1" component="span" size="sm" aria-hidden="true"/>

            </div>
        </CCardBody>
    </CCard>
</template>

<script>

import { useReportsPubsStore } from '@/store/reportspubs'
const reportsPubs = useReportsPubsStore()

export default {

    name: 'ReportsPubs',

    created() {
        this.date_rendered = this.$route.params.year+'-'+this.$route.params.month+'-01'
        reportsPubs.getNoReportsPubs(this.date_rendered)
    },
    data() {

        return {
            reportsPubs: reportsPubs,

            date_rendered: '',
        }
    },
}

</script>
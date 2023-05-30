<template>
    <CModal size="lg" :visible="helperStore.visibleModal  && helperStore.selectedModal == 'report_pub'" @close="() => { helperStore.visibleModal = false }">
        <CModalHeader>
            <CModalTitle> No of Reports this Month </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <div v-if="reportsPubs.loading"><CSpinner color="primary" class="ms-1" component="span" size="sm" aria-hidden="true"/></div>
            <div v-else>
             <CRow>
                <!-- Publisher -->
                <CCol md="12" sm="12">
                    <CTable striped hover responsive >
                    <CTableHead>
                        <CTableRow color="dark">
                            <CTableHeaderCell scope="col" width="7%">No</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="33%">Publisher</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12%">Placements</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12%">VS</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12%">Hours</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12%">R.V.</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12%">B.S.</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <NoOfReportsPubExt :positions="reportsPubs.members?.publishers"/>
                        <NoOfReportsPubExt :counter="reportsPubs.members.publishers?.length" row_color="warning" :positions="reportsPubs.members.unbaptized_publishers"/>
                    </CTableBody>
                    </CTable>
                </CCol>

                <!-- auxiliary_pioneers -->
                <CCol md="12" sm="12">
                    <CTable striped hover responsive >
                    <CTableHead>
                        <CTableRow color="dark">
                            <CTableHeaderCell scope="col" width="7%">No</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="33%">Auxiliary Pioneer</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12%">Placements</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12%">VS</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12%">Hours</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12%">R.V.</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12%">B.S.</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <NoOfReportsPubExt :positions="reportsPubs.members?.auxiliary_pioneers"/>
                    </CTableBody>
                    </CTable>
                </CCol>

                <!-- regular_pioneers -->
                <CCol md="12" sm="12">
                    <CTable striped hover responsive >
                    <CTableHead>
                        <CTableRow color="dark">
                            <CTableHeaderCell scope="col" width="7%">No</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="33%">Regular/ <span class="text-warning">Special Pioneer</span> </CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12%">Placements</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12%">VS</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12%">Hours</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12%">R.V.</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="12%">B.S.</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                       <NoOfReportsPubExt :positions="reportsPubs.members?.regular_pioneers"/>
                       <NoOfReportsPubExt :counter="reportsPubs.members.regular_pioneers?.length" row_color="warning" :positions="reportsPubs.members.special_pioneers"/>
                    </CTableBody>
                    </CTable>
                </CCol>
            </CRow>
            </div>
            <div style="float:right">
                <CButton  color="secondary" @click="() => { helperStore.visibleModal = false }">
                    Close
                </CButton>
            </div>
        </CModalBody>

    </CModal>
</template>

<script setup>

    import NoOfReportsPubExt from '@/components/modal/NoOfReportsPubExt.vue'

    import { useReportsPubsStore } from '@/store/reportspubs'
    import { useHelperStore } from '@/services/helper'

    const reportsPubs = useReportsPubsStore()
    const helperStore = useHelperStore()
</script>
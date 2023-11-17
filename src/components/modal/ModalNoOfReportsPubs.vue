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
                            <CTableHeaderCell scope="col" width="10%">Ministry</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="10%">Placements</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="10%">VS</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="10%">Hours</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="10%">R.V.</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="10%">B.S.</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <NoOfReportsPubExt
                            :counter="reportsPubs.members.publishers?.length"
                            row_color="warning"
                            :positions="reportsPubs.members.unbaptized_publishers"
                            designate="Publishers"
                        />
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
                            <CTableHeaderCell scope="col" width="10%"></CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="10%">Placements</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="10%">VS</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="10%">Hours</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="10%">R.V.</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="10%">B.S.</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <NoOfReportsPubExt
                            :positions="reportsPubs.members?.auxiliary_pioneers"
                            designate="AP"
                        />
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
                            <CTableHeaderCell scope="col" width="10%"></CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="10%">Placements</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="10%">VS</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="10%">Hours</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="10%">R.V.</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width="10%">B.S.</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                       <NoOfReportsPubExt
                            :counter="reportsPubs.members.regular_pioneers?.length"
                            row_color="warning"
                            :positions="reportsPubs.members.special_pioneers"
                            designate="RP"
                        />
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
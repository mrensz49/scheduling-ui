<template>
    <CModal size="lg" :visible="helperStore.visibleModal  && helperStore.selectedModal == 'report_pub'" @close="() => { helperStore.visibleModal = false }">
        <CModalHeader>
            <CModalTitle> No of Reports this Month </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <div v-if="reportsPubs.loading"><CSpinner color="primary" class="ms-1" component="span" size="sm" aria-hidden="true"/></div>
            <div v-else>
                {{  }}
             <CRow>
                <CCol md="12" sm="12">
                    <CTable striped hover responsive >
                    <CTableHead>
                        <CTableRow color="dark">
                            <CTableHeaderCell scope="col">No</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Publisher</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Placements</CTableHeaderCell>
                            <CTableHeaderCell scope="col">VS</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Hours</CTableHeaderCell>
                            <CTableHeaderCell scope="col">R.V.</CTableHeaderCell>
                            <CTableHeaderCell scope="col">B.S.</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow v-for="(pub, index) in reportsPubs.members.publishers" :key="pub.id">
                            <CTableDataCell>{{ index+1 }}</CTableDataCell>
                            <CTableDataCell>{{ pub.last_name + ',' + pub.first_name }}</CTableDataCell>
                            <CTableDataCell>{{ pub.placements }}</CTableDataCell>
                            <CTableDataCell>{{ pub.video_showings }}</CTableDataCell>
                            <CTableDataCell>{{ pub.hours }}</CTableDataCell>
                            <CTableDataCell>{{ pub.return_visits }}</CTableDataCell>
                            <CTableDataCell>{{ pub.bible_studies }}</CTableDataCell>
                       </CTableRow>
                    </CTableBody>
                    </CTable>
                </CCol>

                <CCol md="12" sm="12">
                    <CTable striped hover responsive >
                    <CTableHead>
                        <CTableRow color="dark">
                            <CTableHeaderCell scope="col">No</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Regular/Special Pioneer</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Placements</CTableHeaderCell>
                            <CTableHeaderCell scope="col">VS</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Hours</CTableHeaderCell>
                            <CTableHeaderCell scope="col">R.V.</CTableHeaderCell>
                            <CTableHeaderCell scope="col">B.S.</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow v-for="(pub, index) in reportsPubs.members.regular_pioneers" :key="pub.id">
                            <CTableDataCell>{{ index+1 }}</CTableDataCell>
                            <CTableDataCell>{{ pub.last_name + ',' + pub.first_name }}</CTableDataCell>
                            <CTableDataCell>{{ pub.placements }}</CTableDataCell>
                            <CTableDataCell>{{ pub.video_showings }}</CTableDataCell>
                            <CTableDataCell>{{ pub.hours }}</CTableDataCell>
                            <CTableDataCell>{{ pub.return_visits }}</CTableDataCell>
                            <CTableDataCell>{{ pub.bible_studies }}</CTableDataCell>
                       </CTableRow>
                       <CTableRow color="warning">
                            <CTableHeaderCell colspan="7" scope="row">&nbsp;</CTableHeaderCell>
                        </CTableRow>
                       <CTableRow v-for="(pub, index) in reportsPubs.members.special_pioneers" :key="pub.id">
                            <CTableDataCell>{{ index+1 }}</CTableDataCell>
                            <CTableDataCell>{{ pub.last_name + ',' + pub.first_name }}</CTableDataCell>
                            <CTableDataCell>{{ pub.placements }}</CTableDataCell>
                            <CTableDataCell>{{ pub.video_showings }}</CTableDataCell>
                            <CTableDataCell>{{ pub.hours }}</CTableDataCell>
                            <CTableDataCell>{{ pub.return_visits }}</CTableDataCell>
                            <CTableDataCell>{{ pub.bible_studies }}</CTableDataCell>
                       </CTableRow>
                    </CTableBody>
                    </CTable>
                </CCol>


            </CRow>
            </div>
        </CModalBody>
    </CModal>
</template>

<script setup>
    import { useReportsPubsStore } from '@/store/reportspubs'
    import { useHelperStore } from '@/services/helper'

    const reportsPubs = useReportsPubsStore()
    const helperStore = useHelperStore()
</script>
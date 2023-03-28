<template>
    <CModal size="lg" :visible="helperStore.visibleModal" @close="() => { helperStore.visibleModal = false }">
        <CModalHeader>
            <CModalTitle> Active Publishers & Latest Report</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <div v-if="fieldServiceStore.aps_loading"><CSpinner color="primary" class="ms-1" component="span" size="sm" aria-hidden="true"/></div>
            <div v-else>
                <p>Count all persons in the congregation who reported at least once in the last 6 months.</p>
                <h5>Date: {{ getHumanDate(fieldServiceStore.list_publishers.from) }} - {{ getHumanDate(fieldServiceStore.list_publishers.to) }}</h5>
            <CRow>
                <CCol md="6" sm="12">
                    <CTable striped hover responsive >
                    <CTableHead>
                        <CTableRow color="dark">
                            <CTableHeaderCell scope="col">Active Publishers</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell>
                                <table>
                                    <tr v-for="(pub, key, index) in fieldServiceStore.list_publishers.active" :key="pub.id">
                                        <td>{{ index+1 }}.</td>
                                        <td>{{ pub.full_name }}</td>
                                        <td>
                                            <CBadge
                                                :color="getColor(fieldServiceStore.date_rendered, pub.latest_report.date_rendered)"
                                            >{{  getHumanDate(pub.latest_report.date_rendered) }}</CBadge>
                                        </td>
                                    </tr>
                                </table>
                            </CTableDataCell>
                       </CTableRow>
                    </CTableBody>
                    </CTable>
                </CCol>
                <CCol md="6" sm="12">
                    <CTable striped hover responsive >
                    <CTableHead>
                        <CTableRow color="dark">
                            <CTableHeaderCell scope="col">Inactive Publishers</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell>
                                <table>
                                    <tr v-for="(pub, key, index) in fieldServiceStore.list_publishers.inactive" :key="pub.id">
                                        <td>{{ index + 1 }}.</td>
                                        <td>{{ pub.full_name }}</td>
                                        <td>
                                            <CBadge
                                                :color="getColor(fieldServiceStore.date_rendered, pub.latest_report?.date_rendered)"
                                            >{{  getHumanDate(pub.latest_report?.date_rendered) }}</CBadge>
                                        </td>
                                    </tr>
                                </table>

                            </CTableDataCell>
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

    import moment from 'moment'

    import { useFieldServiceStore } from '@/store/field_service'
    import { useHelperStore } from '@/services/helper'

    const helperStore = useHelperStore()
    const fieldServiceStore = useFieldServiceStore()

    function  getHumanDate(date) {
        if (date) {
            return moment(date, 'YYYY-MM-DD').format('MMM Y');
        }
    }

    function getColor(date_report, date_latest_report) {

        if (date_report && date_latest_report) {

            let d_report = new Date(date_report); // December 31, 2022
            let d_latest_report = new Date(date_latest_report);

            if (d_report.getTime() <= d_latest_report.getTime()) {
                return 'success'
            }
            else {
                return 'warning'
            }
        }
    }
</script>
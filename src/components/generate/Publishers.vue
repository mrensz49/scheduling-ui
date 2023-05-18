<template>
    <CTable small striped bordered>
        <CTableHead>
            <CTableRow color="light">
            <CTableHeaderCell scope="col" width="5%">No</CTableHeaderCell>
            <CTableHeaderCell scope="col" width="25%">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Latest Report</CTableHeaderCell>
            </CTableRow>
        </CTableHead>
        <CTableBody>
            <CTableRow v-for="(member, key, index) in publishers" :key="member.id">
                <CTableDataCell>{{ index+=1 }}</CTableDataCell>
                <CTableDataCell>{{ member.full_name }}</CTableDataCell>
                <CTableDataCell>{{ helperStore.getLatestReportDate(member.latest_report?.date_rendered) }}</CTableDataCell>
            </CTableRow>
        </CTableBody>
    </CTable>
</template>

<script>

    import { useHelperStore } from '@/services/helper'
    const helperStore = useHelperStore()

    export default {

        name: "G-Publishers",
        props: ['publishers'],

        data() {
            return {
                helperStore: helperStore
            }
        }
    }

</script>
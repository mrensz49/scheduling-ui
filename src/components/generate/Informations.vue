<template>
    <CTable small striped bordered>
        <CTableHead>
            <CTableRow color="light">
            <CTableHeaderCell scope="col" width="5%">No</CTableHeaderCell>
            <CTableHeaderCell scope="col" width="25%">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col" v-show="formData.group_no">Group No</CTableHeaderCell>
            <CTableHeaderCell scope="col" v-show="formData.dobirth">DOBirth <sup>yrs.</sup> </CTableHeaderCell>
            <CTableHeaderCell scope="col" v-show="formData.dobaptism">DOBaptism <sup>yrs.</sup> </CTableHeaderCell>
            <CTableHeaderCell scope="col" v-show="formData.numbers">Numbers</CTableHeaderCell>
            <CTableHeaderCell scope="col" v-show="formData.address">Address</CTableHeaderCell>
            </CTableRow>
        </CTableHead>
        <CTableBody>
            <CTableRow v-for="(member, index) in publishers" :key="member.id">
                <CTableDataCell>{{ index+=1 }}</CTableDataCell>
                <CTableDataCell>{{ member.full_name }}</CTableDataCell>
                <CTableDataCell v-show="formData.group_no">{{ member.group_no }}</CTableDataCell>
                <CTableDataCell v-show="formData.dobirth">
                    {{ helperStore.getHumanDateDay(member.dobirth) }}
                    <sup>{{ helperStore.getHumanAge(member.dobirth) }}</sup>
                </CTableDataCell>
                <CTableDataCell v-show="formData.dobaptism">
                    {{ helperStore.getHumanDateDay(member.dobap) }}
                    <sup>{{ helperStore.getHumanAge(member.dobap) }}</sup>
                </CTableDataCell>
                <CTableDataCell v-show="formData.numbers">
                    <p v-for="n in member.numbers" :key="n">
                        {{ n.number }}
                    </p>
                </CTableDataCell>
                <CTableDataCell v-show="formData.address">
                    {{ locateBrgy(member.address.brgy_code) }}
                </CTableDataCell>
            </CTableRow>
        </CTableBody>
    </CTable>
</template>

<script>

    import { useHelperStore } from '@/services/helper'
    const helperStore = useHelperStore()

    export default {

        name: "G-Informations",
        props: ['formData', 'publishers', 'data'],

        data() {
            return {
                helperStore: helperStore
            }
        },

        methods: {
            locateBrgy(brgy_code) {
                if (this.formData.address) {
                    return this.data.brgy.find(x => x.brgy_code === brgy_code).brgy_name;
                }
            },
        }
    }

</script>
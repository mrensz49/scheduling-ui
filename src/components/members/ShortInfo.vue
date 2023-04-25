<template>
    <CRow>
        <CCol :md="4" :sm="6" :xs="6">
            <span class="me-2 fw-semibold">Group :</span>
        </CCol>
        <CCol :md="8" :sm="6" :xs="6">
            {{ detail.group_no }}
        </CCol>
    </CRow>

    <CRow class="mt-2">
        <CCol :md="4" :sm="12" :xs="12">
            <span class="me-2 fw-semibold">Date of Baptized :</span>
        </CCol>
        <CCol :md="8" :sm="12" :xs="12">
            {{ getHumanDate(detail.dobap) }} / {{ getHumanAge(detail.dobap) }}
            <sup>yr(s) ago</sup>
        </CCol>
    </CRow>

    <CRow class="mt-2">
        <CCol :md="4" :sm="12" :xs="12">
            <span class="me-2 fw-semibold">Date of Birth :</span>
        </CCol>
        <CCol :md="8" :sm="12" :xs="12">
            {{ getHumanDate(detail.dobirth) }} / {{ getHumanAge(detail.dobirth) }}
            <sup>yr(s) old</sup>
        </CCol>
    </CRow>

    <CRow class="mt-2">
        <CCol :md="4" :sm="6" :xs="6">
            <span class="me-2 fw-semibold">View More :</span>
        </CCol>
        <CCol :md="8" :sm="6" :xs="6">
            <CButton color="primary" shape="rounded-pill" class="btn-sm" @click="viewedit(detail.id)">
                <CIcon icon="cil-user"/>
            </CButton>
        </CCol>
    </CRow>
</template>

<script>

    import moment from 'moment'
    import router from '@/router'

    export default {

        name: 'ShortInfo',
        props: ['detail'],

        methods: {
            viewedit(id) {
                router.push({name: 'View Member', params: { id: id } })
            },

            getHumanDate(date) {
                if (date) {
                    return moment(date, 'YYYY-MM-DD').format('MMM. DD, YYYY - dd');
                }
            },

            getHumanAge(date) {
                if (date) {
                    return moment().diff(date, 'years');
                }
            }
        }

    }

</script>
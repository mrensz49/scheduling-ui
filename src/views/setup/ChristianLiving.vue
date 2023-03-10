<template>
    <CRow>
      <CCol>
        <CCard>
            <CCardHeader>
                <CIcon icon="cil-notes" />
                Christian Living
                <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="christianLivingStore.loading"/>
                <a href="javascript:void" @click="handleAdd()" class="text-sm">
                    <span style="float:right">
                        Add Assignment
                    </span>
                </a>
            </CCardHeader>
            <CCardBody>
                <CTable striped hover responsive>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col" width="10%">Petsa</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Duration</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Order By</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                            </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow v-for="living in christianLivingStore.livings" :key="living.id">
                            <CTableDataCell width="30%">{{ getHumanDate(living.date_start) }} - {{ getHumanDate(living.date_end) }}</CTableDataCell>
                            <CTableDataCell>{{ living.title }}</CTableDataCell>
                            <CTableDataCell>{{ living.duration }}</CTableDataCell>
                            <CTableDataCell>{{ living.order_by }}</CTableDataCell>
                            <CTableDataCell>
                                <CButton
                                    color="primary"
                                    shape="rounded-pill"
                                    class="btn-sm"
                                    @click="handleEditChristianLiving(living)"
                                    ><CIcon icon="cil-pencil" /></CButton> |
                                <CButton
                                    color="warning"
                                    shape="rounded-pill"
                                    class="btn-sm"
                                    @click="helperStore.confirmDelete(living.id)"
                                    >Delete</CButton>
                            </CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <ModalFormChristianLiving
        :type="type"
        title="Christian Living"
        :data=formData
    />
    <ModalConfirmation data="Are you sure you want to delete this?" type="christian_living" />
</template>

<script>

    import moment from 'moment'

    import ModalConfirmation from '@/components/ModalConfirmation.vue'
    import ModalFormChristianLiving from '@/components/modal/ModalFormChristianLiving.vue'

    import { useHelperStore } from '@/services/helper'
    import { useChristianLivingStore } from '@/store/christian_living'

    const helperStore = useHelperStore()
    const christianLivingStore = useChristianLivingStore()

    export default {

        name: "ChristianLiving",

        created() {

            helperStore.fetchWeeks()
            christianLivingStore.fetchMeetingLivings()
        },
        data() {
            return {
                helperStore:helperStore,
                christianLivingStore:christianLivingStore,

                type: 'AddChristianLiving',
                formData: {
                    date_start: '',
                    date_end: '',
                    title: '',
                }
            }
        },
        components: {
            ModalConfirmation, ModalFormChristianLiving
        },
        methods: {

            handleAdd() {
                this.type = "AddChristianLiving"
                this.clearFormData()
                helperStore.visibleModal = true
            },

            handleEditChristianLiving(living) {
                helperStore.errors = {}
                this.type = "EditChristianLiving"
                this.formData = living
                helperStore.visibleModal = true
            },

            clearFormData() {
                this.formData = {
                    id : '',
                    date_start : '',
                    date_end : '',
                    title : '',
                    duration : '',
                    order_by : '',
                }
            },

            getHumanDate(date) {
                return moment(date, 'YYYY-MM-DD').format('MMM. DD, YYYY');
            },

            getHumanDateFilter(date) {
                return moment(date, 'YYYY-MM-DD').format('YYYY/MM/DD');
            },
        }
    }
</script>
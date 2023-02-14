<template>
    <CRow>
      <CCol>
        <CCard>
            <CCardHeader>
                <CIcon icon="cil-notes" />
                Be Effective in Ministry
                <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="ministryStore.loading"/>
                <a href="javascript:void" @click="handleAddSong(song)" class="text-sm">
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
                                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                            </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow v-for="treasure in ministryStore.treasures" :key="treasure.id">
                            <CTableDataCell width="30%">{{ getHumanDate(treasure.date_start) }} - {{ getHumanDate(treasure.date_end) }}</CTableDataCell>
                            <CTableDataCell>{{ treasure.title }}</CTableDataCell>
                            <CTableDataCell>
                                <CButton
                                    color="primary"
                                    shape="rounded-pill"
                                    class="btn-sm"
                                    @click="handleEditTreasure(treasure)"
                                    ><CIcon icon="cil-pencil" /></CButton> |
                                <CButton
                                    color="warning"
                                    shape="rounded-pill"
                                    class="btn-sm"
                                    @click="helperStore.confirmDelete(treasure.id)"
                                    >Delete</CButton>
                            </CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <ModalFormTreasure
        :type="type"
        title="Be Effective in Ministry"
        :data=formData
        :week="week"
    />
    {{ week }}
    <ModalConfirmation data="Are you sure you want to delete this?" type="treasure" />
</template>

<script>

    import moment from 'moment'

    import ModalConfirmation from '@/components/ModalConfirmation.vue'
    import ModalFormTreasure from '@/components/modal/ModalFormTreasure.vue'

    import { useHelperStore } from '@/services/helper'
    import { useMinistryStore } from '@/store/treasure'

    const helperStore = useHelperStore()
    const ministryStore = useMinistryStore()

    export default {

        name: "Ministries",

        created() {

            helperStore.fetchWeeks()
            ministryStore.fetchMeetingMinistries()
        },
        data() {
            return {
                helperStore:helperStore,
                ministryStore:ministryStore,

                type: 'AddTreasure',
                formData: {
                    date_start: '',
                    date_end: '',
                    title: '',
                }
            }
        },
        components: {
            ModalConfirmation, ModalFormTreasure
        },
        methods: {

            handleAddSong() {
                helperStore.errors = {}
                this.formData.date_start = ''
                this.formData.date_end = ''
                this.formData.title = ''
                helperStore.visibleModalTreasure = true
            },

            handleEditTreasure(treasure) {

                helperStore.errors = {}
                helperStore.visibleModalTreasure = true
                this.type = "EditTreasure"
                this.formData.id = treasure.id
                this.formData.title = treasure.title
                this.formData.date_start = this.getHumanDateFilter(treasure.date_start)
                this.formData.date_end = this.getHumanDateFilter(treasure.date_end)
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
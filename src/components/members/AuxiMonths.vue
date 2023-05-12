<template>
    <CRow class="mt-3">
        <CCol>
            <CSpinner component="span" size="sm" aria-hidden="true" v-if="auxilaryStore.loading"/>
            <h2 v-if="!auxilaryStore.loading">Auxilary Pioneer</h2>
            <CIcon icon="cil-plus" @click="addAuxilarry()" v-if="!auxilaryStore.loading" style="float:right;margin-top: -9%;" class="pointer text-primary"/>
            <CTable hover responsive class="table-sm">
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col" width="20%">No</CTableHeaderCell>
                        <CTableHeaderCell scope="col" colspan="2">Dates</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    <CTableRow v-for="(auxilary, index) in auxilaryStore.data" :key="auxilary">
                        <CTableDataCell>
                            {{ index + 1}}
                        </CTableDataCell>
                        <CTableDataCell>
                            {{ getHumanDate(auxilary.date_start) }} -
                            {{ getHumanDate(auxilary.date_end) }}
                        </CTableDataCell>
                        <CTableDataCell>
                            <CIcon icon="cil-trash" class="text-danger pointer" @click="helperStore.confirmDelete(auxilary.id)"/>
                        </CTableDataCell>
                    </CTableRow>
                    <CTableRow v-if="!auxilaryStore.data.length && !auxilaryStore.loading">
                        <CTableDataCell colspan="2">
                            No results found.
                        </CTableDataCell>
                    </CTableRow>
                </CTableBody>
            </CTable>
        </CCol>
    </CRow>
    <ModalFormAuxilary
        title="Auxilary Pioneer Ministry"
    />
    <ModalConfirmation data="Are you sure you want to delete this?" type="auxilary" />
</template>

<script>

    import moment from 'moment'
    import ModalFormAuxilary from '@/components/modal/ModalFormAuxilary.vue'
    import ModalConfirmation from '@/components/ModalConfirmation.vue'

    import { useAuxilaryStore } from '@/store/auxilary'
    import { useHelperStore } from '@/services/helper'

    const auxilaryStore = useAuxilaryStore()
    const helperStore = useHelperStore()

    export default {

        name: 'Auxilary',

        mounted() {
            auxilaryStore.fetchAuxiDates(this.$route.params.id)
        },

        components: { ModalFormAuxilary, ModalConfirmation },

        data() {
            return {
                auxilaryStore: auxilaryStore,
                helperStore: helperStore,
            }
        },

        methods: {

            getHumanDate(date) {
                return moment(date, 'YYYY-MM-DD').format('MMM Y');
            },

            addAuxilarry() {
                // helperStore.errors = {}
                // this.type = "EditChristianLiving"
                // this.formData = living
                auxilaryStore.errors = {}
                helperStore.visibleModal = true
            },
        },
    }

</script>
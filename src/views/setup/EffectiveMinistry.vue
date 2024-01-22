<template>
    <CRow>
      <CCol>
        <CCard>
            <CCardHeader>
                <CIcon icon="cil-lightbulb" />
                Magmaepektibo sa Ministeryo
                <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="ministryStore.loading"/>
                <a v-if="$can('can-add-setup')" href="javascript:void(0)" @click="handleAddEffectiveMinistry()" class="text-sm">
                    <span style="float:right">
                        Add
                    </span>
                </a>
            </CCardHeader>
            <CCardBody>
                <CTable striped hover responsive>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Duration</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Participants</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Order By</CTableHeaderCell>
                                <CTableHeaderCell scope="col" v-if="$can('can-add-setup')">Action</CTableHeaderCell>
                            </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow v-for="ministries in ministryStore.ministries" :key="ministries.id">
                            <CTableDataCell>{{ ministries.type }}</CTableDataCell>
                            <CTableDataCell>{{ ministries.duration }}</CTableDataCell>
                            <CTableDataCell>{{ ministries.participants }}</CTableDataCell>
                            <CTableDataCell>{{ ministries.order_by }}</CTableDataCell>
                            <CTableDataCell>
                                <CButton
                                    v-if="$can('can-edit-setup')"
                                    color="primary"
                                    shape="rounded-pill"
                                    class="btn-sm me-2"
                                    @click="handleEditEffectiveMinistries(ministries)"
                                    ><CIcon icon="cil-pencil" /></CButton>
                            </CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
            </CCardBody>
            <scroll-top/>
        </CCard>
      </CCol>
    </CRow>
    <ModalEffectiveMinistry
        :type="type"
        title="Magmaepektibo sa Ministeryo"
        :data=formData
        :week="week"
    />
        {{ week }}
    <ModalConfirmation data="Are you sure you want to delete this?" type="treasure" />
</template>

<script>

    import ModalConfirmation from '@/components/ModalConfirmation.vue'
    import ModalEffectiveMinistry from '@/components/modal/ModalEffectiveMinistry.vue'

    import { useHelperStore } from '@/services/helper'
    import { useMinistryStore } from '@/store/ministry'

    const helperStore = useHelperStore()
    const ministryStore = useMinistryStore()

    export default {

        name: "Treasures",

        created() {

            helperStore.fetchWeeks()
            ministryStore.fetchMeetingMinistries()
        },
        data() {
            return {
                helperStore:helperStore,
                ministryStore:ministryStore,

                type: 'AddEffectiveMinistry',
                formData: {}
            }
        },
        components: {
            ModalConfirmation, ModalEffectiveMinistry
        },
        methods: {

            handleAddEffectiveMinistry() {
                helperStore.errors = {}
                this.type = "AddEffectiveMinistry"
                this.formData.date_start = ''
                this.formData.date_end = ''
                this.formData.title = ''
                helperStore.visibleModalEffectiveMinistry = true
            },

            handleEditEffectiveMinistries(ministry) {
                helperStore.errors = {}
                helperStore.visibleModalEffectiveMinistry = true
                this.type = "EditEffectiveMinistry"
                this.formData.id = ministry.id
                this.formData.type = ministry.type
                this.formData.duration = ministry.duration
                this.formData.participants = ministry.participants
                this.formData.order_by = ministry.order_by
            },
        }
    }
</script>
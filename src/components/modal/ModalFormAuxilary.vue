<template>
    <CModal :visible="helperStore.visibleModal" @close="() => { helperStore.visibleModal = false }">
        <CModalHeader>
            <CModalTitle> {{ title }}</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CForm
                class="row g-3"
                @submit="handleAdd"
            >
                <CCol :md="6">
                    <CFormLabel for="" class="form-label"
                    ><sup class="text-danger">*</sup> Month Start</CFormLabel>
                    <month-picker-input
                        @change="showDateStart"
                        :no-default="true"
                        v-model="formData.date_start"
                    ></month-picker-input>
                </CCol>
                <CCol :md="6">
                    <CFormLabel for="" class="form-label"
                    ><sup class="text-danger">*</sup> Month End</CFormLabel>
                    <month-picker-input @change="showDateEnd" :no-default="true"></month-picker-input>
                </CCol>

                <CCol :md="12">
                    <CButton color="primary" type="submit" :disabled="helperStore.loading">
                        <template v-if="helperStore.loading">
                            <CSpinner class="me-1" color="primary" component="span" size="sm" aria-hidden="true" v-if="helperStore.loading"/>
                            saving...
                        </template>
                        <template v-else>
                            Save
                        </template>
                    </CButton>
                </CCol>
            </CForm>

        </CModalBody>
    </CModal>
</template>

<script>

    import { MonthPickerInput } from 'vue-month-picker'

    import { useAuxilaryStore } from '@/store/auxilary'
    import { useHelperStore } from '@/services/helper'

    const helperStore = useHelperStore()
    const auxilaryStore = useAuxilaryStore()
    export default {

        name: 'ModalFormAuxilary',

        props: ['title'],

        data() {
            return {
                helperStore: helperStore,
                auxilaryStore: auxilaryStore,

                formData: {
                    date_start: '',
                    date_end: '',
                }
            }
        },

        components: { MonthPickerInput },

        methods: {
            showDateStart(date) {
                this.formData.date_start= date
            },

            showDateEnd(date) {
                this.formData.date_end= date
            },

            handleAdd() {
                auxilaryStore.addAuxilary(this.formData)
            },
        },
    }
</script>
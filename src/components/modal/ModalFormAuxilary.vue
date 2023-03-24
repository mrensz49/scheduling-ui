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

                <CCallout color="danger" v-if="Object.keys(auxilaryStore.errors).length" class="bg-warning bg-opacity-10 border-start-5 ">
                    <ul>
                        <li v-for="error in auxilaryStore.errors" :key="error" class="text-danger">{{ error[0] }}<br/></li>
                    </ul>
                </CCallout>

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
                    <CButton color="primary" type="submit" :disabled="auxilaryStore.loading">
                        <template v-if="auxilaryStore.loading">
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
                this.formData.date_start= date.to
            },

            showDateEnd(date) {
                this.formData.date_end= date.to
            },

            handleAdd() {
                this.formData.member_id = this.$route.params.id
                auxilaryStore.addAuxilary(this.formData)
            },
        },
    }
</script>
<template>
    <CModal :visible="helperStore.visibleModalEffectiveMinistry" @close="() => { helperStore.visibleModalEffectiveMinistry = false }">
        <CModalHeader>
            <CModalTitle> {{ title }}</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CCallout color="danger" v-if="Object.keys(helperStore.errors).length" class="bg-warning bg-opacity-10 border-start-5 ms-2">
                <ul>
                    <li v-for="error in helperStore.errors" :key="error" class="text-danger">{{ error[0] }}<br/></li>
                </ul>
            </CCallout>

            <CForm
                class="row g-3"
                novalidate
                :validated="validationAdd"
                @submit="handleAdd"
            >

                <CCol :md="12">
                    <CFormLabel for="validationTextarea" class="form-label"
                    ><sup class="text-danger">*</sup> Title</CFormLabel>
                    <CFormInput
                        placeholder="Title"
                        required
                        feedbackInvalid="This is required!"
                        v-model="formData.type"
                    />
                </CCol>

                <CCol :md="12">
                    <CFormLabel for="validationTextarea" class="form-label"
                    ><sup class="text-danger">*</sup> Duration</CFormLabel>
                    <CFormSelect
                    feedbackInvalid="This is required!"
                        required
                        v-model="formData.duration"
                    >
                        <option value="">Choose...</option>
                        <option value="2 min.">2 min.</option>
                        <option value="3 min.">3 min.</option>
                        <option value="4 min.">4 min.</option>
                        <option value="5 min.">5 min.</option>
                        <option value="6 min.">6 min.</option>
                        <option value="7 min.">7 min.</option>
                        <option value="8 min.">8 min.</option>
                        <option value="10 min.">10 min.</option>
                        <option value="15 min.">15 min.</option>
                    </CFormSelect>
                </CCol>

                <CCol :md="12">
                    <CFormLabel for="validationTextarea" class="form-label"
                    ><sup class="text-danger">*</sup> Participants</CFormLabel>
                    <CFormInput
                        placeholder="Participants/Type"
                        required
                        feedbackInvalid="This is required!"
                        v-model="formData.participants"
                    />
                </CCol>

                <CCol :md="12" v-if="this.type!='AddEffectiveMinistry'">
                    <CFormLabel for="validationTextarea" class="form-label"
                    ><sup class="text-danger">*</sup> Order By</CFormLabel>
                    <CFormInput
                        type="number"
                        placeholder="Order By"
                        required
                        feedbackInvalid="This is required!"
                        v-model="formData.order_by"
                    />
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
        <CModalFooter>
            <CButton color="secondary" @click="() => { helperStore.visibleModalEffectiveMinistry = false }">
                Close
            </CButton>
        </CModalFooter>
  </CModal>
</template>

<script>


    import { useMinistryStore } from '@/store/ministry'
    import { useHelperStore } from '@/services/helper'

    const ministryStore = useMinistryStore()
    const helperStore = useHelperStore()

    export default {

        name: 'ModalFormEffectiveMinistry',

        props: ['type', 'title', 'data'],

        data() {
            return {
                helperStore:helperStore,
                ministryStore:ministryStore,

                validationAdd: null,
                formData: this.data,
            }
        },

        methods: {

            handleAdd(event) {
                const form = event.currentTarget
                this.validationAdd = true
                if (form.checkValidity() === false) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                else {
                    if (this.type == 'AddEffectiveMinistry')
                        ministryStore.addEffectiveMinistry(this.formData)
                    else if (this.type == 'EditEffectiveMinistry')
                        ministryStore.editEffectiveMinistry({formData: this.formData, id: this.formData.id})
                }
            },

        },

    }

</script>
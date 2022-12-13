<template>
    <CModal :visible="helperStore.visibleModalTreasure" @close="() => { helperStore.visibleModalTreasure = false }">
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
                    ><sup class="text-danger">*</sup> Week</CFormLabel>
                    <CFormSelect
                        required
                        feedbackInvalid="This is required!"
                        @change="splitDate($event)"
                        v-model="weeks"
                    >
                        <option value="">Choose...</option>
                        <option
                            v-for="week in helperStore.showWeeks" :key="week"
                            :value="week.dateStart+'-'+week.dateEnd"
                            :selected="formData.date_start+'-'+formData.date_end == week.dateStart+'-'+week.dateEnd"
                        >
                            {{ week.start }} - {{ week.end }}
                        </option>
                    </CFormSelect>
                </CCol>

                <CCol :md="12">
                    <CFormLabel for="validationTextarea" class="form-label"
                    ><sup class="text-danger">*</sup> Title</CFormLabel>
                    <CFormInput
                        placeholder="Title"
                        required
                        feedbackInvalid="This is required!"
                        v-model="formData.title"
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
            <CButton color="secondary" @click="() => { helperStore.visibleModalTreasure = false }">
                Close
            </CButton>
        </CModalFooter>
  </CModal>
</template>

<script>


    import { useTreasureStore } from '@/store/treasure'
    import { useHelperStore } from '@/services/helper'

    const treasureStore = useTreasureStore()
    const helperStore = useHelperStore()

    export default {

        name: 'ModalFormMeetingSong.vue',

        props: ['type', 'title', 'data', 'week'],

        data() {
            return {
                helperStore:helperStore,
                treasureStore:treasureStore,

                validationAdd: null,
                weeks: this.data.date_start,
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
                    if (this.type == 'AddTreasure')
                        treasureStore.addTreasure(this.formData)
                        else if (this.type == 'EditTreasure')
                        treasureStore.editTreasure({formData: this.formData, id: this.formData.id})
                    }
            },

            splitDate(event) {
                var c = event.target.value.split('-')
                this.formData.date_start = c[0]
                this.formData.date_end = c[1]
            }
        }
    }

</script>
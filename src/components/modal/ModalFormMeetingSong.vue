<template>
    <CModal :visible="helperStore.visibleModalSongsMeeting" @close="() => { helperStore.visibleModalSongsMeeting = false }">
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
                    ><sup class="text-danger">*</sup> Song No</CFormLabel>
                    <CFormInput
                        type="number"
                        placeholder="Song No."
                        required
                        feedbackInvalid="This is required!"
                        v-model="formData.song_no"
                    />
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
            <CButton color="secondary" @click="() => { helperStore.visibleModalSongsMeeting = false }">
                Close
            </CButton>
        </CModalFooter>
  </CModal>
</template>

<script>


    import { useSongStore } from '@/store/song'
    import { useHelperStore } from '@/services/helper'

    const songStore = useSongStore()
    const helperStore = useHelperStore()

    export default {

        name: 'ModalFormMeetingSong.vue',

        props: ['type', 'title', 'data'],

        data() {
            return {
                helperStore:helperStore,

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
                    if (this.type == 'AddSongMeeting')
                        songStore.addSongMeeting(this.formData)
                    else if (this.type == 'EditSongMeeting')
                        songStore.editSongMeeting({formData: this.formData, id: this.formData.id})
                }
                // songStore.addSongMeeting(this.formData)
            },
        }
    }

</script>
<template>
    <CRow>
      <CCol>
        <CCard class="mb-4">
            <CCardHeader> <CIcon icon="cil-clipboard" /> Personal Information
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol md="12" sm="12" xs="12">
                        <div>
                            <CFormCheck inline id="name"  checked label="Name" disabled/>
                            <CFormCheck inline id="group_no" @click="showContacts()" v-model="formData.group_no" value="group_no" label="Group No"/>
                            <CFormCheck inline id="dobirth" @click="showContacts()" v-model="formData.dobirth" value="age" label="DOBirth"/>
                            <CFormCheck inline id="dobaptism" @click="showContacts()" v-model="formData.dobaptism" value="age" label="DOBaptism"/>
                            <CFormCheck inline id="numbers" @click="showContacts()" v-model="formData.numbers" value="numbers" label="Numbers"/>
                            <CFormCheck inline id="address" @click="showContacts()" v-model="formData.address" value="address" label="Address"/>
                        </div>
                        <CButton color="primary" @click="downloadContacts()" size="sm" :disabled="loading">
                            <CIcon icon="cil-cloud-download" v-if="!loading"/>
                            <CSpinner component="span" v-if="loading" size="sm" aria-hidden="true"/>
                            Generate
                        </CButton>
                    </CCol>
                </CRow>
                <hr>
                <h5 class="mt-2">Preview</h5>
                <CSpinner component="span" v-if="preview_loading" size="sm" aria-hidden="true"/>

                <CCard  v-if="!preview_loading" class="shadow-lg bg-body rounded">
                    <CCardBody>
                        <div class="table-responsive">
                            <h3>{{ data.datas?.name }}</h3>
                            <h5>List of Brothers</h5>
                            <Informations :formData="formData" :publishers="data.datas?.member_male" :data="data"/>

                            <h5>List of Sisters</h5>
                            <Informations :formData="formData" :publishers="data.datas?.member_female" :data="data"/>
                        </div>
                    </CCardBody>
                </CCard>
            </CCardBody>
            <scroll-top/>
        </CCard>
      </CCol>
    </CRow>
</template>

<script>

import Informations  from '@/components/generate/Informations'

import EventService from "@/services/EventService.js"
import { useToast } from 'vue-toastification'

const toast = useToast()

export default {

    name: 'Information',

    mounted() {
        this.showContacts()
    },

    data() {
        return {
            preview_loading: false,
            loading: false,
            formData: {},
            errors: {},
            data: {
                brgy: ''
            },
        }
    },

    components: { Informations },

    methods: {

        showContacts() {

            this.preview_loading = true
            this.formData.type='preview'

            setTimeout(()=>{

                EventService.showInformations(this.formData)
                .then(response => {
                    this.data = response.data
                    this.preview_loading = false
                })
                .catch(error => {
                    if (typeof error.response !== 'undefined') {
                        this.errors = error.response.data.errors
                    }
                    this.preview_loading = false
                })

            },500)
        },

        downloadContacts() {

            this.loading = 1
            this.formData.type='download'
            EventService.downloadInformations(this.formData)
            .then(response => {

                var fileURL = window.URL.createObjectURL(
                    new Blob([response.data], {type:'application/pdf'})
                );

                var fileLink = document.createElement('a');
                fileLink.href = fileURL;
                fileLink.setAttribute('download', 'CONG_INFORMATIONS.pdf');
                document.body.appendChild(fileLink);
                fileLink.click();
                this.loading = 0

                toast.success("Successfully Downloaded!")
            })
        },
    }
}
</script>
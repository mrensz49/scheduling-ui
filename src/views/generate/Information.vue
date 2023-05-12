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
                            <CFormCheck inline id="group_no" v-model="formData.group_no" value="group_no" label="Group No"/>
                            <CFormCheck inline id="birth_date" v-model="formData.dobirth" value="age" label="DOBirth"/>
                            <CFormCheck inline id="birth_date" v-model="formData.dobaptism" value="age" label="DOBaptism"/>
                            <CFormCheck inline id="numbers" v-model="formData.numbers" value="numbers" label="Numbers"/>
                            <CFormCheck inline id="address" v-model="formData.address" value="address" label="Address"/>
                        </div>
                        <CButton color="primary" @click="downloadContacts()" size="sm" :disabled="loading">
                            <CIcon icon="cil-cloud-download" v-if="!loading"/>
                            <CSpinner component="span" v-if="loading" size="sm" aria-hidden="true"/>
                            Generate
                        </CButton>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
      </CCol>
    </CRow>
</template>

<script>

import EventService from "@/services/EventService.js"
import { useToast } from 'vue-toastification'

const toast = useToast()

export default {

    name: 'Information',

    data() {
        return {
            loading: false,
            formData: {}
        }
    },

    methods: {

        downloadContacts() {

            this.loading = 1
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
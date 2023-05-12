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
                            <CFormCheck inline id="report" checked label="Latest Report" disabled/>
                            <CFormCheck inline id="active" v-model="formData.active" value="active" label="Active"/>
                            <CFormCheck inline id="inactive" v-model="formData.inactive" value="inactive" label="Inactive"/>
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
            formData: {
                active: true,
                inactive: false,
            }
        }
    },

    methods: {

        downloadContacts() {

            this.loading = 1
            EventService.downloadPublishers(this.formData)
            .then(response => {

                var fileURL = window.URL.createObjectURL(
                    new Blob([response.data], {type:'application/pdf'})
                );

                var fileLink = document.createElement('a');
                fileLink.href = fileURL;
                fileLink.setAttribute('download', 'CONG_PUBLISHERS.pdf');
                document.body.appendChild(fileLink);
                fileLink.click();
                this.loading = 0

                toast.success("Successfully Downloaded!")
            })
        },

    }
}
</script>
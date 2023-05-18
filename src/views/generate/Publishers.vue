<template>
    <CRow>
      <CCol>
        <CCard class="mb-4">
            <CCardHeader> <CIcon icon="cil-clipboard" /> Publishers
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol md="12" sm="12" xs="12">
                        <div>
                            <CFormCheck inline id="name"  checked label="Name" disabled/>
                            <CFormCheck inline id="latest_report" checked label="Latest Report" disabled/>
                            <CFormCheck inline id="active" @click="showPublishers()" v-model="formData.active" value="active" label="Active"/>
                            <CFormCheck inline id="inactive" @click="showPublishers()" v-model="formData.inactive" value="inactive" label="Inactive"/>
                        </div>
                        <CButton color="primary" @click="downloadPublishers()" size="sm" :disabled="loading">
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
                        <div class="table-responsive" v-show="formData.active">
                            <h3>{{ data.datas?.name }}</h3>
                            <h5>Active Publishers</h5>
                            <Publishers :publishers="data.active"/>
                        </div>

                        <div class="table-responsive" v-show="formData.inactive">
                            <h3>{{ data.datas?.name }}</h3>
                            <h5>Inactive Publishers</h5>
                            <Publishers :publishers="data.inactive"/>
                        </div>
                    </CCardBody>
                </CCard>

            </CCardBody>
        </CCard>
      </CCol>
    </CRow>
</template>

<script>

import Publishers  from '@/components/generate/Publishers'

import EventService from "@/services/EventService.js"
import { useToast } from 'vue-toastification'

const toast = useToast()

export default {

    name: 'Information',

    mounted() {
        this.showPublishers()
    },

    data() {
        return {
            data: [],
            loading: false,
            preview_loading: false,
            formData: {
                active: true,
                inactive: false,
            }
        }
    },

    components: { Publishers },

    methods: {

        showPublishers() {

            this.preview_loading = true
            this.formData.type='preview'

            setTimeout(()=>{

                EventService.showPublishers(this.formData)
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

        downloadPublishers() {

            this.loading = 1
            this.formData.type='download'
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
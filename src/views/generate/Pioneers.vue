<template>
    <CRow>
      <CCol>
        <CCard class="mb-4">
            <CCardHeader> <CIcon icon="cil-clipboard" /> Pioneers
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol md="12" sm="12" xs="12">
                        <CRow class="g-3">
                            <CCol md="6" sm="7" xs="7">
                                <CFormSelect size="sm" @change="selectYear($event)" v-model="select_year" class="mb-3" aria-label="Small select example">
                                    <option
                                        v-for="service_year in helperStore.service_years"
                                        :key="service_year"
                                        :value="[service_year.from, service_year.to]"
                                    >{{ helperStore.getMonthYear(service_year.from) }} - {{ helperStore.getMonthYear(service_year.to) }}</option>
                                </CFormSelect>
                            </CCol>
                            <CCol md="6" sm="5" xs="5">
                                <CButton v-if="$can('can-download-reports')" color="primary" @click="downloadPioneers()" size="sm" :disabled="loading">
                                    <CIcon icon="cil-cloud-download" v-if="!loading"/>
                                    <CSpinner component="span"  size="sm" v-if="loading" aria-hidden="true"/>
                                    Generate
                                </CButton>
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>

                <hr>
                <h5 class="mt-2">Preview</h5>
                <h3>{{ data.congregationName }}</h3>
                <CSpinner component="span" size="sm" aria-hidden="true" v-if="preview_loading"/>

                <div class="table-responsive">
                    <CTable small striped bordered hover class="shadow-lg bg-body rounded p-2">
                        <CTableHead>
                            <CTableRow color="light">
                                <CTableHeaderCell scope="col" colspan="15" class="text-center">
                                    <h4>Regular Pioneers Field Service Report:  Year {{ data.service_year }}</h4>
                                </CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableHead>
                            <CTableRow color="light">
                                <CTableHeaderCell scope="col" width="3%">No</CTableHeaderCell>
                                <CTableHeaderCell scope="col" >Name</CTableHeaderCell>
                                <CTableHeaderCell scope="col" v-for="date in data.dates" :key="date">{{ helperStore.getMonth(date) }}</CTableHeaderCell>
                                <CTableHeaderCell scope="col" class="text-center">Total Hours</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow v-for="(member, index) in data.pioneers" :key="member.id">
                                <CTableDataCell>{{ index+=1 }}</CTableDataCell>
                                <CTableDataCell>{{ member.full_name }}</CTableDataCell>
                                <CTableDataCell scope="col" v-for="date in data.dates" :key="date" with="5%">
                                    {{ reports(member.member_id, date, data.field_services[member.member_id]) }}
                                </CTableDataCell>
                                <CTableDataCell class="fw-semibold text-center"> {{ total_hours(data.field_services[member.member_id]) }}</CTableDataCell>
                            </CTableRow>
                        </CTableBody>
                    </CTable>
                </div>
            </CCardBody>
            <scroll-top/>
        </CCard>
      </CCol>
    </CRow>
</template>

<script>

import EventService from "@/services/EventService.js"
import { useHelperStore } from '@/services/helper'

const helperStore = useHelperStore()
import { useToast } from 'vue-toastification'

const toast = useToast()

export default {

    name: 'Pioneers',

    async mounted() {
        await helperStore.getServiceYears()
        this.formData.from = helperStore.service_years[0].from
        this.formData.to = helperStore.service_years[0].to
        this.showPioneers()
    },

    data() {
        return {
            helperStore: helperStore,

            data: [],
            loading: false,
            preview_loading: false,
            formData: {},
            select_year: ''
        }
    },

    methods: {
        showPioneers() {

            this.preview_loading = true
            setTimeout(()=>{
                this.formData.type = 'preview'
                EventService.showPioneers(this.formData)
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

        downloadPioneers() {

            this.loading = true
            this.formData.type='download'
            EventService.downloadPioneers(this.formData)
            .then(response => {

                var fileURL = window.URL.createObjectURL(
                    new Blob([response.data], {type:'application/pdf'})
                );

                var fileLink = document.createElement('a');
                fileLink.href = fileURL;
                fileLink.setAttribute('download', 'CONG_PIONEERS.pdf');
                document.body.appendChild(fileLink);
                fileLink.click();
                this.loading = false

                toast.success("Successfully Downloaded!")
            })
        },

        reports(member_id, date, field_services) {
            if (field_services) {
                return field_services.filter(x => x.member_id == member_id && x.date_rendered == date)[0]?.hours ?? 0;
            }
        },

        total_hours(field_services) {
            if (field_services) {
                const total = field_services.reduce((currentTotal,item) => {
                    return parseInt(item.hours) + currentTotal
                }, 0)
                return total
            }
        },

        selectYear(event) {
            var date = event.target.value.split(',')
            this.formData.from = date[0]
            this.formData.to = date[1]
            this.showPioneers()
        }
    },



}
</script>
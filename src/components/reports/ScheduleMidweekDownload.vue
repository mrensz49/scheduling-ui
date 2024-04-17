<template>
    <CCardBody>
        <card-title><h3>Download Schedule Report</h3></card-title>
        <CForm
            class="row g-3 needs-validation mt-2 mb-4"
            novalidate
            :validated="validatedDownload"
            @submit="download_midweek_schedule"
        >
        <CCol md="4">
            <CFormSelect
                required
                feedbackInvalid="This is required!"
                v-model="formData.date_start"
            >
                <option value="">Select a week from</option>
                <option
                v-for="week in helperStore.showWeeks" :key="week"
                    :value="week.dateStart"
                >
                {{ week.start }}
                </option>
            </CFormSelect>
        </CCol>

        <CCol md="4">
            <CFormSelect
                required
                feedbackInvalid="This is required!"
                v-model="formData.date_end"
            >
                <option value="">Select a week to</option>
                <option
                v-for="week in helperStore.showWeeks" :key="week"
                    :value="week.dateEnd"
                >
                {{ week.end }}
                </option>
            </CFormSelect>
        </CCol>

        <CCol md="4">
            <CButton type="submit" @click="formData.report='congregation'" class="me-1" color="primary" :disabled="loading">
                <CIcon icon="cil-cloud-download" v-if="!loading" />
                <CSpinner class="mt-2" component="span" v-if="loading" size="sm" aria-hidden="true"/>
            </CButton> 

            <CButton type="submit" @click="formData.report='chairman'" class="me-1" color="warning" :disabled="loading"
                v-c-tooltip="{content: 'Assignment Slip', placement: 'top'}"
            >
                <CIcon icon="cil-cloud-download" v-if="!loading" />
                <CSpinner class="mt-2" component="span" v-if="loading" size="sm" aria-hidden="true"/> Assg. slip
            </CButton> 
            <CButton type="submit" @click="formData.report='student_duration'" color="success" :disabled="loading"
                v-c-tooltip="{content: 'Student Duration', placement: 'top'}"
            >
                <CIcon icon="cil-cloud-download" v-if="!loading" />
                <CSpinner class="mt-2" component="span" v-if="loading" size="sm" aria-hidden="true"/> Stud. Dur.
            </CButton>            
        </CCol>

    </CForm>
    </CCardBody>
</template>

<script>

import moment from 'moment'
import { useToast } from 'vue-toastification'
import EventService from "@/services/EventService.js"
import { useHelperStore } from '@/services/helper'

const helperStore = useHelperStore()
const toast = useToast()

export default {

    name: 'ScheduleMidweekDownload',

    data() {
        return {
            loading: 0,
            helperStore: helperStore,
            validatedDownload: null,
            formData: {
                date_start: '',
                date_end: '',
                report: '',
            }
        }
    },

    methods: {

        getHumanDate(date, format) {
            return moment(date, 'YYYY-MM-DD').format(format);
        },

        download_midweek_schedule(event) {

            const form = event.currentTarget
            this.validatedDownload = true


            if (form.checkValidity() === false) {
                event.preventDefault()
                event.stopPropagation()
            }
            else {

                let date_start = this.getHumanDate(this.formData.date_start, 'YYYY-MM-DD')
                let date_end = this.getHumanDate(this.formData.date_end, 'YYYY-MM-DD')

                let data = {
                    date_start: date_start,
                    date_end: date_end,
                    report: this.formData.report
                }

                this.loading = 1
                if (this.formData.report != 'student_duration') {
               
                    EventService.downloadMidweekSchedule(data)
                    .then(response => {

                        var fileURL = window.URL.createObjectURL(
                            new Blob([response.data], {type:'application/pdf'})
                        );

                        var fileLink = document.createElement('a');
                        fileLink.href = fileURL;
                        fileLink.setAttribute('download', 'weekend_sched_'+this.formData.report+'_'+this.getHumanDate(this.formData.date_start, 'MMM_DD')+'__'+this.getHumanDate(this.formData.date_end, 'MMM_DD')+'.pdf');
                        document.body.appendChild(fileLink);
                        fileLink.click();
                        this.loading = 0

                        toast.success("Successfully Downloaded")
                    })
                } 
                else {
                    EventService.downloadStudentDuration(data)
                    .then(response => {

                        var fileURL = window.URL.createObjectURL(
                            new Blob([response.data], {type:'application/pdf'})
                        );

                        var fileLink = document.createElement('a');
                        fileLink.href = fileURL;
                        fileLink.setAttribute('download', 'weekend_sched_stud_dur_'+this.formData.report+'_'+this.getHumanDate(this.formData.date_start, 'MMM_DD')+'__'+this.getHumanDate(this.formData.date_end, 'MMM_DD')+'.pdf');
                        document.body.appendChild(fileLink);
                        fileLink.click();
                        this.loading = 0

                        toast.success("Successfully Downloaded")
                    })
                }
            }
        }

    }
}
</script>
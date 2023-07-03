<template>
    <template v-for="(member, index) in group" :key="member">
        <CAccordionItem :item-key="index + 1">
            <CAccordionHeader>
                {{index + 1}}. {{ member.full_name }}
            </CAccordionHeader>
            <CAccordionBody>

                <CListGroup flush>
                    <CListGroupItem>
                        <CFormInput type="text" id="floatingPlacement" floatingLabel="Placements"
                            v-model="member.placements"
                            :disabled="!helperStore.editFS"
                            class="bg-white"
                            @keyup="saveReport(member.report_field_services_id ?? member.id, member.report_field_services_id ? 'exist':'not', 'placements', n, $event.target.value)"
                        />
                    </CListGroupItem>
                    <CListGroupItem>
                        <CFormInput type="text" id="floatingVideoShowings" floatingLabel="Video Showings"
                            v-model="member.video_showings"
                            :disabled="!helperStore.editFS"
                            class="bg-white"
                            @keyup="saveReport(member.report_field_services_id ?? member.id, member.report_field_services_id ? 'exist':'not', 'video_showings', n, $event.target.value)"
                        />
                    </CListGroupItem>
                    <CListGroupItem>
                        <CFormInput type="text" id="floatingHours" floatingLabel="Hours"
                            v-model="member.hours"
                            :disabled="!helperStore.editFS"
                            class="bg-white"
                            @keyup="saveReport(member.report_field_services_id ?? member.id, member.report_field_services_id ? 'exist':'not', 'hours', n, $event.target.value)"
                        />
                    </CListGroupItem>
                    <CListGroupItem>
                        <CFormInput type="text" id="floatingReturnVisits" floatingLabel="Return Visits"
                            v-model="member.return_visits"
                            :disabled="!helperStore.editFS"
                            class="bg-white"
                            @keyup="saveReport(member.report_field_services_id ?? member.id, member.report_field_services_id ? 'exist':'not', 'return_visits', n, $event.target.value)"
                        />
                    </CListGroupItem>
                    <CListGroupItem>
                        <CFormInput type="text" id="floatingBibleStudies" floatingLabel="Bible Studies"
                            v-model="member.bible_studies"
                            :disabled="!helperStore.editFS"
                            class="bg-white"
                            @keyup="saveReport(member.report_field_services_id ?? member.id, member.report_field_services_id ? 'exist':'not', 'bible_studies', n, $event.target.value)"
                        />
                    </CListGroupItem>
                    <CListGroupItem>
                        <CFormInput type="text" id="floatingBibleStudies" floatingLabel="Credit Hours"
                            v-model="member.credit_hours"
                            :disabled="!helperStore.editFS"
                            class="bg-white"
                            @keyup="saveReport(member.report_field_services_id ?? member.id, member.report_field_services_id ? 'exist':'not', 'credit_hours', n, $event.target.value)"
                        />
                    </CListGroupItem>
                    <div class="ms-3">
                        <span
                            v-if="!helperStore.editFS && enable_edit"
                            class="text-primary pointer"
                            @click="helperStore.editFS == 1 ? helperStore.editFS=0 : helperStore.editFS=1
                        ">
                            <CIcon icon="cil-pencil" class="me-2 ms-1" />
                        </span>
                        <CIcon icon="cil-user" class="pointer" @click="viewedit(member.id)"/>
                    </div>
                </CListGroup>
            </CAccordionBody>
        </CAccordionItem>
    </template>

    <div class="p-3 bg-white mb-4">
        <CRow>
            <CCol md="2" class="fw-bolder">Placements: <span class="text-danger me-5" style="float:right">{{ fieldServiceStore.showTotalReport([group, 'placements']) }}</span> </CCol>
            <CCol md="2" class="fw-bolder">Video Showings: <span class="text-danger me-5" style="float:right">{{ fieldServiceStore.showTotalReport([group, 'video_showings']) }}</span> </CCol>
            <CCol md="2" class="fw-bolder">Hours: <span class="text-danger me-5" style="float:right">{{ fieldServiceStore.showTotalReport([group, 'hours']) }}</span> </CCol>
            <CCol md="2" class="fw-bolder">Return Visits: <span class="text-danger me-5" style="float:right">{{ fieldServiceStore.showTotalReport([group, 'return_visits']) }}</span> </CCol>
            <CCol md="2" class="fw-bolder">Bible Studies: <span class="text-danger me-5" style="float:right">{{ fieldServiceStore.showTotalReport([group, 'bible_studies']) }}</span> </CCol>
            <CCol md="2" class="fw-bolder">Credit Hours: <span class="text-danger me-5" style="float:right">{{ fieldServiceStore.showTotalReport([group, 'credit_hours']) }}</span> </CCol>
        </CRow>
    </div>
</template>


<script>

    import { useFieldServiceStore } from '@/store/field_service'
    import { useHelperStore } from '@/services/helper'
    import router from '@/router'

    const fieldServiceStore = useFieldServiceStore()
    const helperStore = useHelperStore()

    export default {

        name: 'FieldServiceGridExt',

        props: ['group', 'date_rendered', 'enable_edit'],

        data() {

            return {
                fieldServiceStore: fieldServiceStore,
                helperStore: helperStore,

                old_type: '',
                timeout: 0,
                delay: 1500,
            }
        },

        methods: {
            saveReport(id, stat, type, group, val)
            {
                group = group-=1
                this.formData = {} // reset all objects
                this.formData.date_rendered = this.date_rendered
                this.formData[type] = val * 1
                // this.formData[type] = this.forms[group].members[index][type] * 1

                if (this.old_type == '' || this.old_type == type) {
                    clearTimeout(this.timeout);
                }

                this.timeout = setTimeout(function(formData, stat, id) {
                    this.saveReportNow(formData, stat, id)
                }.bind(this), this.delay, this.formData, stat, id);

                this.old_type = type
            },

            saveReportNow(formData, stat, id) {

                if (stat == 'exist') {
                    fieldServiceStore.saveReport(formData, id)
                }
                else {
                    formData.member_id = id
                    fieldServiceStore.storeReport(formData)
                }
            },

            viewedit(id) {
                router.push({name: 'View Member', params: { id: id } })
            },

        },

    }

</script>
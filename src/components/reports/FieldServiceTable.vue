<template>
    <CTable striped hover responsive>
        <CTableHead color="dark">
            <CTableRow>
                <CTableHeaderCell scope="col" width="19.5%">{{ designate }}</CTableHeaderCell>
                <CTableHeaderCell scope="col" width="17.5%">Designate</CTableHeaderCell>
                <!-- <CTableHeaderCell scope="col" width="10.5%">
                    <span v-c-tooltip="{content: 'Printed and Electronic', placement: 'top'}">Placements</span>
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" width="10.5%">
                    <span v-c-tooltip="{content: 'Video Showings', placement: 'top'}">V.S.</span>
                </CTableHeaderCell> -->
                <CTableHeaderCell scope="col" width="21%">
                    <span v-if="designate == 'Publisher'" v-c-tooltip="{content: 'Check the box if brother/sister shared in any form of the ministry during the month.', placement: 'top'}">
                        Is Ministry?
                    </span>
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" width="21%">Bible Studies</CTableHeaderCell>
                <CTableHeaderCell scope="col" width="21%"><span v-if="designate != 'Publisher'">Hours</span></CTableHeaderCell>
            </CTableRow>
        </CTableHead>
        <CTableBody>
            <CTableRow v-for="(member, index) in group" :key="member">
                <CTableDataCell>
                    <a href="javascript:void" class="text-decoration-none" @click="viewedit(member.id)">
                        {{ index + 1}}. {{ member.full_name }}
                    </a>
                </CTableDataCell>
                <CTableDataCell>
                    <template v-for="designate in member.designates" :key= "designate">
                        <CBadge v-if="designate.position" color="success" class="m-1">
                            {{ designate.position.name }}
                        </CBadge>
                    </template>
                </CTableDataCell>

                <CTableDataCell>
                    <CFormSwitch size="xl"
                        @change="saveReport(member.report_field_services_id ?? member.id, member.report_field_services_id ? 'exist':'not', 'is_ministry', n, $event.target.checked)"
                        :checked="parseInt(member.is_ministry)"
                        :disabled="!helperStore.editFS ? 1:0"
                        v-model="member.is_ministry"
                        v-if="designate=='Publisher'"
                    />
                </CTableDataCell>

                <CTableDataCell>
                    <span v-if="!helperStore.editFS">{{ member.bible_studies ?? 0 }}</span>
                    <span v-else>
                        <CFormInput
                            size="sm"
                            @keyup="saveReport(member.report_field_services_id ?? member.id, member.report_field_services_id ? 'exist':'not', 'bible_studies', n, $event.target.value)"
                            v-model="member.bible_studies"
                            :placeholder="!member.bible_studies ? 0 : ''"
                        />
                    </span>
                </CTableDataCell>

                <CTableDataCell>
                    <template v-if="designate != 'Publisher'">
                        <span v-if="!helperStore.editFS">{{ member.hours ?? 0 }}</span>
                        <span v-else>
                            <CFormInput
                                size="sm"
                                @keyup="saveReport(member.report_field_services_id ?? member.id, member.report_field_services_id ? 'exist':'not', 'hours', n, $event.target.value)"
                                v-model="member.hours"
                                :placeholder="!member.hours ? 0 : ''"
                            />
                        </span>
                    </template>
                </CTableDataCell>

            </CTableRow>
        </CTableBody>
        <CTableFoot color="dark">
            <CTableRow>
                <CTableDataCell colspan="2" class="text-end"><b >Total : </b> </CTableDataCell>
                <CTableDataCell><i v-if="designate == 'Publisher'">{{ fieldServiceStore.showTotalReport([group, 'is_ministry']) }}</i></CTableDataCell>
                <CTableDataCell><i>{{ fieldServiceStore.showTotalReport([group, 'bible_studies']) }}</i></CTableDataCell>
                <CTableDataCell><i v-if="designate != 'Publisher'">{{ fieldServiceStore.showTotalReport([group, 'hours']) }}</i></CTableDataCell>
            </CTableRow>
        </CTableFoot>
    </CTable>
</template>

<script>

    import { useFieldServiceStore } from '@/store/field_service'
    import { useHelperStore } from '@/services/helper'
    import router from '@/router'

    const fieldServiceStore = useFieldServiceStore()
    const helperStore = useHelperStore()

    export default {

        name: 'FieldService',

        props: ['group', 'designate', 'date_rendered'],

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

                if (type == 'is_ministry') {
                    this.saveReportNow(this.formData, stat, id)
                } else {

                    if (this.old_type == '' || this.old_type == type) {
                        clearTimeout(this.timeout);
                    }

                    this.timeout = setTimeout(function(formData, stat, id) {
                        this.saveReportNow(formData, stat, id)
                    }.bind(this), this.delay, this.formData, stat, id);
                }
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
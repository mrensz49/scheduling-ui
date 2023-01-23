<template>
    <CTable striped hover responsive>
        <CTableHead color="dark">
            <CTableRow>
                <CTableHeaderCell scope="col" width="20%">{{ designate }}</CTableHeaderCell>
                <CTableHeaderCell scope="col" width="17.5%">Designate</CTableHeaderCell>
                <CTableHeaderCell scope="col" width="12.5%">
                    <span v-c-tooltip="{content: 'Printed and Electronic', placement: 'top'}">Placements</span>
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" width="12.5%">Video Showings</CTableHeaderCell>
                <CTableHeaderCell scope="col" width="12.5%">Hours</CTableHeaderCell>
                <CTableHeaderCell scope="col" width="12.5%">Return Visits</CTableHeaderCell>
                <CTableHeaderCell scope="col" width="12.5%">Bible Studies</CTableHeaderCell>
            </CTableRow>
        </CTableHead>
        <CTableBody>
            <CTableRow v-for="(member, index) in group" :key="member">
                <CTableDataCell>
                    <a href="javascript:void" class="text-decoration-none" @click="viewedit(member.id)">
                        {{ index + 1}}. {{ member.last_name + ' ' + member.first_name }} {{ (member.middle_name) ? member.middle_name: '' }}
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
                    <span v-if="!edit">{{ member.placements ?? 0 }}</span>
                    <span v-else>
                        <CFormInput
                            style="width:35%"
                            size="sm"
                            @keyup="saveReport(member.report_field_services_id ?? member.id, member.report_field_services_id ? 'exist':'not', 'placements', n, $event.target.value)"
                            v-model="member.placements"
                            :placeholder="!member.placements ? 0 : ''"
                        />
                    </span>
                </CTableDataCell>

                <CTableDataCell>
                    <span v-if="!edit">{{ member.video_showings ?? 0 }}</span>
                    <span v-else>
                        <CFormInput
                            style="width:35%"
                            size="sm"
                            @keyup="saveReport(member.report_field_services_id ?? member.id, member.report_field_services_id ? 'exist':'not', 'video_showings', n, $event.target.value)"
                            v-model="member.video_showings"
                            :placeholder="!member.video_showings ? 0 : ''"
                        />
                    </span>
                </CTableDataCell>

                <CTableDataCell>
                    <span v-if="!edit">{{ member.hours ?? 0 }}</span>
                    <span v-else>
                        <CFormInput
                            style="width:35%"
                            size="sm"
                            @keyup="saveReport(member.report_field_services_id ?? member.id, member.report_field_services_id ? 'exist':'not', 'hours', n, $event.target.value)"
                            v-model="member.hours"
                            :placeholder="!member.hours ? 0 : ''"
                        />
                    </span>
                </CTableDataCell>

                <CTableDataCell>
                    <span v-if="!edit">{{ member.return_visits ?? 0 }}</span>
                    <span v-else>
                        <CFormInput
                            style="width:35%"
                            size="sm"
                            @keyup="saveReport(member.report_field_services_id ?? member.id, member.report_field_services_id ? 'exist':'not', 'return_visits', n, $event.target.value)"
                            v-model="member.return_visits"
                            :placeholder="!member.return_visits ? 0 : ''"
                        />
                    </span>
                </CTableDataCell>

                <CTableDataCell>
                    <span v-if="!edit">{{ member.bible_studies ?? 0 }}</span>
                    <span v-else>
                        <CFormInput
                            style="width:35%"
                            size="sm"
                            @keyup="saveReport(member.report_field_services_id ?? member.id, member.report_field_services_id ? 'exist':'not', 'bible_studies', n, $event.target.value)"
                            v-model="member.bible_studies"
                            :placeholder="!member.bible_studies ? 0 : ''"
                        />
                    </span>
                </CTableDataCell>

            </CTableRow>
        </CTableBody>
        <CTableFoot color="dark">
            <CTableRow>
                <CTableDataCell colspan="2" class="text-end"><b >Total : </b> </CTableDataCell>
                <CTableDataCell><i>{{ fieldServiceStore.showTotalReport([group, 'placements']) }}</i></CTableDataCell>
                <CTableDataCell><i>{{ fieldServiceStore.showTotalReport([group, 'video_showings']) }}</i></CTableDataCell>
                <CTableDataCell><i>{{ fieldServiceStore.showTotalReport([group, 'hours']) }}</i></CTableDataCell>
                <CTableDataCell><i>{{ fieldServiceStore.showTotalReport([group, 'return_visits']) }}</i></CTableDataCell>
                <CTableDataCell><i>{{ fieldServiceStore.showTotalReport([group, 'bible_studies']) }}</i></CTableDataCell>
            </CTableRow>
        </CTableFoot>
    </CTable>
</template>

<script>

    import { useFieldServiceStore } from '@/store/field_service'
    import router from '@/router'

    const fieldServiceStore = useFieldServiceStore()

    export default {

        name: 'FieldService',

        props: ['group', 'edit', 'designate', 'date_rendered'],

        data() {

            return {
                fieldServiceStore: fieldServiceStore,
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

                if (stat == 'exist') {
                    fieldServiceStore.saveReport(this.formData, id)
                }
                else {
                    this.formData.member_id = id
                    fieldServiceStore.storeReport(this.formData)
                }
            },

            viewedit(id) {
                router.push({name: 'View Member', params: { id: id } })
            },

        }
    }

</script>
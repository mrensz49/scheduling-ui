<template>
    <CRow>
        <CCol>
            <CSpinner component="span" size="sm" aria-hidden="true" v-if="memberStore.loading"/>
            <h5 v-if="!memberStore.loading">Group Co-Members</h5>
            <CTable hover responsive class="table-sm" striped >
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">Names</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    <CTableRow v-for="(member) in memberStore.co_members" :key="member">
                        <CTableDataCell>
                            {{ member.full_name }}
                        </CTableDataCell>
                        <CTableDataCell>
                            <CIcon icon="cil-user"
                                class="pointer"
                                title="View Info"
                                @click="viewedit(member.id)"
                            />
                        </CTableDataCell>
                    </CTableRow>
                </CTableBody>
            </CTable>
        </CCol>
    </CRow>

</template>

<script>

    import router from '@/router'
    import { useMemberStore } from '@/store/member'
    import { useAuxilaryStore } from '@/store/auxilary'

    const memberStore = useMemberStore()
    const auxilaryStore = useAuxilaryStore()

    export default {

        name: 'CoMembers',


        data() {
            return {
                memberStore: memberStore,
                auxilaryStore: auxilaryStore,
            }
        },

        methods: {
            async viewedit(id) {

                await memberStore.getMember(id)
                auxilaryStore.fetchAuxiDates(id)

                router.push({name: 'View Member', params: { id: id } })


            }
        },
    }

</script>
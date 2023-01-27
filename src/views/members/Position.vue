<template>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader> <CIcon icon="cil-people" />
                {{ positionStore.members.name }}s
                <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="positionStore.loading"/>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol :md="12">
                        <CTable striped hover responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Group</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Date of Baptized</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow v-for="(member, index) in positionStore.members.congregation_designates" :key="member.id">
                                <CTableDataCell>{{ index+1 }}</CTableDataCell>
                                <CTableDataCell>{{ member.last_name + ' ' + member.first_name }} {{ (member.middle_name) ? member.middle_name: '' }}</CTableDataCell>
                                <CTableDataCell>{{ member.group_no }}</CTableDataCell>
                                <CTableDataCell>{{ getHumanDate(member.dobap) }}</CTableDataCell>
                                <CTableDataCell>
                                    <CButton color="primary" shape="rounded-pill" class="btn-sm" @click="viewedit(member.id)">
                                        <CIcon icon="cil-user" />
                                    </CButton>
                                </CTableDataCell>
                            </CTableRow>
                        </CTableBody>
                    </CTable>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
      </CCol>
    </CRow>
</template>

<script>

    import moment from 'moment'
    import router from '@/router'
    import { usePositionStore } from '@/store/position'

    const positionStore = usePositionStore()

    export default {

        name: 'View Member',

        async created() {

            positionStore.getPosition(this.$route.params.id)
            positionStore.getPositions()

        },

        data() {
            return {
                positionStore: positionStore
            }
        },
        methods: {
            viewedit(id) {
                router.push({name: 'View Member', params: { id: id } })
            },

            getHumanDate(date) {
                if (date) {
                    return moment(date, 'YYYY-MM-DD').format('MMM. DD, YYYY - dd');
                }
            },
        }
    }

</script>
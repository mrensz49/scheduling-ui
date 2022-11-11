<template>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader> <CIcon icon="cil-people" />
            View Members
            <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="memberStore.loading"/></CCardHeader>
          <CCardBody>
            <CRow>
                <CInputGroup class="mb-3" :md="6">
                    <CFormInput @change="memberStore.search($event)" placeholder="Member's name" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <CInputGroupText id="basic-addon2">
                        <span v-if="!memberStore.loading_search">search</span>
                        <span v-else>
                            <CSpinner color="primary" component="span" size="sm" aria-hidden="true"/>&nbsp;
                            searching...
                        </span>
                    </CInputGroupText>
                </CInputGroup>
                <CCol :md="12">
                    <CTable striped hover responsive>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Group</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Designate</CTableHeaderCell>
                                <!-- <CTableHeaderCell scope="col">Gender</CTableHeaderCell> -->
                                <CTableHeaderCell scope="col">Date of Birth</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Date of Baptized</CTableHeaderCell>
                                <!-- <CTableHeaderCell scope="col">Phone</CTableHeaderCell> -->
                                <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                            </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow v-for="(member, index) in memberStore.showMembers" :key="member.id">
                            <CTableDataCell>{{ index+1 }}</CTableDataCell>
                            <CTableDataCell>{{ member.last_name + ' ' + member.first_name + ' ' + member.middle_name}}</CTableDataCell>
                            <CTableDataCell>{{ member.group_no }}</CTableDataCell>
                            <CTableDataCell>
                                <template v-if="typeof member.positions !== 'undefined'">
                                    <CBadge color="success" class="m-1" v-for="position in member.positions" :key="position.id"> {{ position.name }}</CBadge>
                                </template>
                            </CTableDataCell>
                            <CTableDataCell>
                                <template v-if="member.dobirth">
                                    {{ getHumanDate(member.dobirth) }}
                                </template>
                            </CTableDataCell>
                            <CTableDataCell>
                                <template v-if="member.dobap">
                                    {{ getHumanDate(member.dobap) }}
                                </template>
                            </CTableDataCell>
                            <CTableDataCell>
                                <template v-if="typeof member.brgy !== 'undefined'">
                                    {{ member.brgy.brgy_name }}
                                </template>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CButton color="primary" shape="rounded-pill" class="btn-sm"><CIcon icon="cil-user" /></CButton> |
                                <CButton
                                    color="warning"
                                    shape="rounded-pill"
                                    class="btn-sm"
                                    @click="memberStore.deleteMember(member.id)"
                                >Delete - {{ member.id }}</CButton>
                            </CTableDataCell>
                        </CTableRow>
                        <CTableRow v-if="typeof memberStore.showMembers !== 'undefined' && !memberStore.showMembers.length">
                            <CTableDataCell colspan='10'>No data found!</CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                    </CTable>
                </CCol>

                <Pagination type="members" :items="memberStore.members"/>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </template>

  <script>

    import Pagination from '@/components/Pagination.vue'
    import moment from 'moment'
    import { useMemberStore } from '@/store/member'
    import { usePositionStore } from '@/store/position'

    const positionStore = usePositionStore()
    const memberStore = useMemberStore()

    export default {

        name: 'View Member',

        data() {

            return {
                positionStore: positionStore,
                memberStore: memberStore,
            }
        },
        components: {
            Pagination,
        },
        mounted() {
            memberStore.loadDefBrgys('071230') // temporary
            positionStore.getPositions()
            memberStore.getMembers()
        },
        methods: {
            getHumanDate(date) {
                return moment(date, 'YYYY-MM-DD').format('MM/DD/YYYY - dd');
            }
        }
    }
  </script>

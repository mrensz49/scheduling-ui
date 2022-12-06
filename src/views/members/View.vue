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
                            <CTableDataCell>{{ member.last_name + ' ' + member.first_name }} {{ (member.middle_name) ? member.middle_name: '' }}</CTableDataCell>
                            <CTableDataCell>{{ member.group_no }}</CTableDataCell>
                            <CTableDataCell>
                                <template v-if="typeof member.positions !== 'undefined' && member.positions.length">
                                    <template v-for="(position, index) in member.positions" :key="index">
                                        <CBadge v-if="typeof position !== 'undefined'" color="success" class="m-1">
                                            {{ position.name }}
                                        </CBadge>
                                    </template>
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
                                <CButton color="primary" shape="rounded-pill" class="btn-sm" @click="viewedit(member.id)"><CIcon icon="cil-user" /></CButton> |
                                <CButton
                                    color="warning"
                                    shape="rounded-pill"
                                    class="btn-sm"
                                    @click="helperStore.confirmDelete(member.id)"
                                >Delete</CButton>
                            </CTableDataCell>
                        </CTableRow>
                        <CTableRow v-if="typeof memberStore.showMembers !== 'undefined' && !memberStore.showMembers.length">
                            <CTableDataCell colspan='10'>No data found!</CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                    </CTable>
                </CCol>
                <Pagination type="members" :items="memberStore.members"/>
                <ModalConfirmation data="Are you sure you want to delete this?" type="members" />
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </template>

  <script>

    import router from '@/router'
    import moment from 'moment'
    import Pagination from '@/components/Pagination.vue'
    import ModalConfirmation from '@/components/ModalConfirmation.vue'

    import { useMemberStore } from '@/store/member'
    import { usePositionStore } from '@/store/position'
    import { useHelperStore } from '@/services/helper'

    const positionStore = usePositionStore()
    const memberStore = useMemberStore()
    const helperStore = useHelperStore()

    export default {

        name: 'View Members',

        data() {

            return {
                positionStore: positionStore,
                memberStore: memberStore,
                helperStore: helperStore,
            }
        },
        components: {
            Pagination, ModalConfirmation,
        },
        mounted() {
            positionStore.getPositions()
            memberStore.getMembers()
        },
        methods: {
            getHumanDate(date) {
                return moment(date, 'YYYY-MM-DD').format('MM/DD/YYYY - dd');
            },

            viewedit(id) {
                router.push({name: 'View Member', params: { id: id } })
            }
        }
    }
  </script>

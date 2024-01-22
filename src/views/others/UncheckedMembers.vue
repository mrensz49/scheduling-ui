<template>
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardHeader> Unchecked Members </CCardHeader>
          <CCardBody>

            <CAlert color="warning" class="mt-2">
                The names found below may have been transferred to another congregation, deceased, are not enrolled or are enrolled but not yet an unbaptized publisher.
            </CAlert>

            <CSpinner  v-if="memberStore.loading"  color="primary" component="span" size="sm" aria-hidden="true"/>
            <CTable align="middle" class="border mt-2" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell class="text-center">
                    <CIcon name="cil-people" />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Publishers</CTableHeaderCell>
                  <CTableHeaderCell>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="member in memberStore.unchecked_members" :key="member.id">

                  <CTableDataCell class="text-center">
                    <CAvatar color="secondary" text-color="white" size="md" class="text-uppercase">
                        {{  member.full_name.slice(0,1) }}
                    </CAvatar>
                  </CTableDataCell>

                  <CTableDataCell>
                    {{ member.full_name }}
                  </CTableDataCell>

                  <CTableDataCell>
                    <a href="javascript:void(0)" class="text-decoration-none" @click="viewedit(member.id)">
                        <CButton
                            color="primary"
                            shape="rounded-pill"
                            class="btn-sm m-1"
                            @click="viewedit(member.id)
                        "><CIcon icon="cil-user" /></CButton>
                    </a>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

  </template>

<script>

import router from '@/router'
import { useMemberStore } from '@/store/member'
const memberStore = useMemberStore()

export default {

    id: 'unchecked_members',

    mounted() {
        memberStore.fetchUncheckedMembers()
    },

    data() {
        return {
            memberStore: memberStore,
        }
    },

    methods: {
        viewedit(id) {
            router.push({name: 'View Member', params: { id: id } })
        },
    }


}

</script>
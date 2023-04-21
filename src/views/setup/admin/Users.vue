<template>
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardHeader> Traffic &amp; Sales </CCardHeader>
          <CCardBody>
            <CTable align="middle" class="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell class="text-center">
                    <CIcon name="cil-people" />
                  </CTableHeaderCell>
                  <CTableHeaderCell>User</CTableHeaderCell>
                  <CTableHeaderCell width="25%">Congregation</CTableHeaderCell>
                  <CTableHeaderCell>Registered</CTableHeaderCell>
                  <CTableHeaderCell>Email Verified</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="(user, index) in userStore.users" :key="user.id">

                  <CTableDataCell class="text-center">
                    <CAvatar color="secondary" text-color="white" size="md" class="text-uppercase">
                        {{  user.name.slice(0,1) }}
                    </CAvatar>
                  </CTableDataCell>

                    <CTableDataCell>
                      <div>{{ user.name }}</div>
                      <div class="small text-medium-emphasis">
                        <span>Role</span>
                      </div>
                    </CTableDataCell>

                    <CTableDataCell>
                      <CInputGroup size="sm">
                        <CFormSelect
                            required
                            feedbackInvalid="This is required!"
                            @change="setCongregation($event, user.id)"
                        >
                          <option value="" :disabled="index+1 == edit ? false:true">Choose...</option>
                              <option
                                  v-for="congregation in congregationStore.congregations"
                                  :key="congregation"
                                  :selected="congregation.id == user.current_congregation_id ? true:false"
                                  :disabled="index+1 == edit ? false:true"
                                  :value="congregation.id"
                              >{{ congregation.name }}</option>
                          </CFormSelect>
                          <CInputGroupText component="label" for="inputGroupSelect01">
                            <span v-if="index+1 == edit">
                              <small  class="pointer" @click="edit=0">cancel</small>
                              <small  class="ms-1 pointer" @click="setUserCongregation(), edit=0">save</small>
                            </span>
                            <span v-else>
                              <CIcon icon="cil-pencil" @click="edit=index+1, formData.current_congregation_id=user.current_congregation_id, formData.id=user.id"/>
                            </span>
                          </CInputGroupText>
                      </CInputGroup>
                    </CTableDataCell>

                    <CTableDataCell>
                      {{ getHumanDate(user.created_at) }}
                  </CTableDataCell>

                  <CTableDataCell>
                      {{ getHumanDate(user.email_verified_at) }}
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

import moment from 'moment'

import { useUserStore } from '@/store/user'
import { useCongregationStore } from '@/store/congregation'

const userStore = useUserStore()
const congregationStore = useCongregationStore()

export default {

    mounted() {
        userStore.fetchUsers()
        congregationStore.getCongregations()
    },

    data() {
        return {
            userStore: userStore,
            congregationStore: congregationStore,

            edit: 0,
            formData: {
              current_congregation_id: '',
              id: '',
            }
        }
    },

    methods: {

        setCongregation(event, id) {
            this.formData.current_congregation_id =  event.target.value
            this.formData.id =  id
        },

        setUserCongregation() {
          userStore.setUserCongregation(this.formData)
        },

        getHumanDate(date) {
            if (date) {
                return moment(date).format('LLL');
            }
        },
    },

}
</script>
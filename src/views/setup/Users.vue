<template>
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardHeader> <h4>{{ authStore.user.congregation?.name }} - Users</h4>  </CCardHeader>
          <CCardBody>
            <CSpinner v-if="userStore.loading" color="primary" component="span" size="sm" aria-hidden="true"/>
            <CTable align="middle" class="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell class="text-center">
                    <CIcon name="cil-people" />
                  </CTableHeaderCell>
                  <CTableHeaderCell>User</CTableHeaderCell>
                  <CTableHeaderCell>Designate</CTableHeaderCell>
                  <CTableHeaderCell>Group</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Registered</CTableHeaderCell>
                  <CTableHeaderCell v-if="authStore.user.role_id != 4">Action</CTableHeaderCell>
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
                    </CTableDataCell>

                    <CTableDataCell>
                      <span v-if="index+1 != edit">
                        {{ helperStore.searchRole(user.role_id, userStore.roles)?.name }}
                      </span>
                      <span v-else>
                        <CFormSelect
                              required
                              feedbackInvalid="This is required!"
                              @change="setRoles($event, user.id)"
                              :disabled="index+1 == edit ? false:true"
                              class="bg-white"
                          >
                            <option value="">Choose...</option>
                                <option
                                v-for="(role) in userStore.roles"
                                    :key="role"
                                    :selected="role.id == user.role_id ? true:false"
                                    :value="role.id"
                                  >{{ role.name }}</option>
                            </CFormSelect>
                        </span>

                    </CTableDataCell>

                    <CTableDataCell>
                      <span v-if="index+1 != edit">
                        {{ user.group_no }}
                      </span>
                      <span v-else>
                        <CFormSelect
                        required
                            feedbackInvalid="This is required!"
                            v-model="formData.group_no"
                        >
                          <option value="">-select-</option>
                            <option
                                v-for="index in parseInt(authStore.user.congregation.total_groups)"
                                :key="index"
                                :selected="index == parseInt(user.group_no) ? true:false"
                                :value="index"
                            >{{ index }}</option>
                        </CFormSelect>
                      </span>
                    </CTableDataCell>

                    <CTableDataCell>
                      {{ user.email }}
                    </CTableDataCell>
                    <CTableDataCell>
                      {{ helperStore.getHumanDateTime(user.created_at) }}
                    </CTableDataCell>
                    <CTableDataCell v-if="authStore.user.role_id != 4">
                      <span v-if="index+1 == edit">
                        <small  class="pointer" @click="cancellSetRoles()">cancel</small> |
                        <small  class="ms-1 pointer" @click="updateRoles(), edit=0">save</small>
                      </span>
                      <span v-else>
                        <CIcon icon="cil-pencil"
                            @click="edit=index+1,
                            formData.role_id=user.role_id,
                            formData.id=user.id,
                            formData.group_no=user.group_no
                            "
                            size="sm"
                            class="pointer"

                        />
                      </span>
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

import { useUserStore } from '@/store/user'
import { useCongregationStore } from '@/store/congregation'
import { useAuthStore } from '@/store/auth'
import { useHelperStore } from '@/services/helper'

const userStore = useUserStore()
const congregationStore = useCongregationStore()
const authStore = useAuthStore()
const helperStore = useHelperStore()

export default {

    mounted() {
        userStore.fetchCongregationUsers()
        congregationStore.getCongregations()
        userStore.getRoles()
    },

    data() {
        return {
            userStore: userStore,
            congregationStore: congregationStore,
            authStore:authStore,
            helperStore:helperStore,

            edit: 0,
            formData: {
              role_id: '',
              group_no: '',
              id: '',
            }
        }
    },

    methods: {
        setRoles(event, id) {
            this.formData.role_id =  event.target.value
            this.formData.id =  id
        },

        cancellSetRoles() {
          this.edit=0
          userStore.getRoles()
        },

        updateRoles() {
          userStore.updateRoles(this.formData)

        },
    },

}
</script>
<template>
    <CModal alignment="center" backdrop="static" :visible="helperStore.confirm" @close="() => { helperStore.confirm = 0 }">
      <CModalBody>
        {{ data }}<hr/>

        <div class="text-end">
            <CButton class="me-2" color="secondary" @click="() => { helperStore.confirm = 0 }">
                No
            </CButton>
            <CButton
                color="primary"
                @click="comfirmedDelete(helperStore.confirm)"
                :disabled="memberStore.loading_delete && memberStore.loading_delete == helperStore.confirm"
            >
                <span v-if="memberStore.loading_delete && memberStore.loading_delete == helperStore.confirm">
                    <CSpinner color="danger" component="span" size="sm" aria-hidden="true"/>&nbsp;
                    deleting...
                </span>
                <span v-else>Yes</span>
            </CButton>
        </div>
        </CModalBody>
    </CModal>
  </template>
  <script>

    import { useHelperStore } from '@/services/helper'
    import { useMemberStore } from '@/store/member'

    const helperStore = useHelperStore()
    const memberStore = useMemberStore()

    export default {

        props: ['data', 'type'],

        data() {
            return {
                helperStore: helperStore,
                memberStore: memberStore,
            }
        },

        methods: {
            comfirmedDelete(id) {

                if (this.type == 'members') {
                    memberStore.deleteMember(id)
                }
            }
        }
    }
  </script>

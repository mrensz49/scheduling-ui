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
                :disabled="helperStore.loading_delete"
            >
                <span v-if="helperStore.loading_delete">
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
    import { useSongStore } from '@/store/song'
    import { useTreasureStore } from '@/store/treasure'

    const helperStore = useHelperStore()
    const memberStore = useMemberStore()
    const songStore = useSongStore()
    const treasureStore = useTreasureStore()

    export default {

        props: ['data', 'type'],

        data() {
            return {
                helperStore: helperStore,
                memberStore: memberStore,
                songStore: songStore,
            }
        },

        methods: {
            comfirmedDelete(id) {

                if (this.type == 'members') {
                    memberStore.deleteMember(id)
                }
                else if (this.type == 'meeting-song') {
                    songStore.deleteMeetingSong(id)
                }
                else if (this.type == 'treasure') {
                    treasureStore.deleteMeetingTreasure(id)
                }
            }
        }
    }
  </script>

<template>
    <CModal backdrop="static"  alignment="center" :visible="helperStore.visibleModalNotificationInform" size="lg">
    <!-- <CModalHeader>
      <CModalTitle>Reminder</CModalTitle>
    </CModalHeader> -->
      <CModalBody>
        <div class="bg-info bg-opacity-10 border-start border-start-5 border-start-info p-4 pb-3">
          <strong>Reminder:</strong>
          <hr>
          <p>
            {{ helperStore.notification_inform.message }}
          </p>
          <p class="text-end">
            <CButton color="primary"
              @click="helperStore.seenNotificationInform()"
              shape="rounded-pill"
              class="text-end me-3"
              :disabled=helperStore.loading_seen
            >OKAY</CButton>
          </p>
        </div>
      </CModalBody>
    </CModal>
  </template>

  <script>

    import { useHelperStore } from '@/services/helper'
    const helperStore = useHelperStore()

    export default {

        name: 'ModalNotificationInform',

        data() {
            return {
                helperStore:helperStore,
            }
        },
    }
  </script>

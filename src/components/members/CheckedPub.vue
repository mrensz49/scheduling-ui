<template>
    <CFormSwitch
        @click="memberStore.isCountAP({'id': memberStore.member.id})"
        label="Publisher"
        id="formSwitchCheckDefault"
        :checked="parseInt(memberStore.is_count_ap)"
    />
</template>

<script>

    import { useMemberStore } from '@/store/member'
    const memberStore = useMemberStore()

    export default {

        props: ['member', 'member_id'],

        data() {
            return {
                memberStore: memberStore,
            }
        },


    }
</script>
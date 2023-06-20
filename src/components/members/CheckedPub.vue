<template>
    <span v-if="$can('can-add-member')">
        <CFormSwitch
            @click="memberStore.isCountAP({'id': memberStore.member.id})"
            label="Publisher"
            id="formSwitchCheckDefault"
            :checked="parseInt(memberStore.is_count_ap)"
        />
    </span>
    <span v-else>
        <CFormSwitch
            label="Publisher"
            id="formSwitchCheckDefault"
            :checked="parseInt(memberStore.is_count_ap)"
            :disabled="1"
        />
    </span>

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
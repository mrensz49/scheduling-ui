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
    <span v-c-tooltip="{content: 'Unchecked Publisher?', placement: 'top'}" @click="viewinfo()">
        <CIcon icon="cil-info"/>
    </span>
</template>

<script>

    import router from '@/router'
    import { useMemberStore } from '@/store/member'
    const memberStore = useMemberStore()

    export default {

        props: ['member', 'member_id'],

        data() {
            return {
                memberStore: memberStore,
            }
        },

        methods: {
            viewinfo() {
                router.push({name: 'Unchecked Members'})
            },
        }

    }
</script>
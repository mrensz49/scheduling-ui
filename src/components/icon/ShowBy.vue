<template>
    <span class="me-2 mt-1">Show By:</span>
    <CIcon
        icon="cil-list"
        @click="helperStore.screen = 'wider'"
        :class="helperStore.screen === 'wider' ? 'text-primary' : ''"
        class="pointer"
        size="xxl"
    />&nbsp;
    <CIcon
        icon="cil-screen-smartphone"
        @click="helperStore.screen = 'smaller'"
        :class="helperStore.screen === 'smaller' ? 'text-primary' : ''"
        class="pointer"
        size="xxl"
    />
</template>

<script>
    import { useHelperStore } from '@/services/helper'
    const helperStore = useHelperStore()

    export default {
        name: 'ShowBy',

        created() {
            helperStore.screen = this.$isMobile() ? 'smaller' : 'wider'
        },

        data() {

            return {
                helperStore: helperStore
            }
        },
    }
</script>

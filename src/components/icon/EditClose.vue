<template>
    <span v-if="$can('can-add-schedule') && treasureStore.treasure.enable_edit">
        <span v-if="!helperStore.edit_name[edit_val]">
            <CIcon icon="cil-pencil" class="me-2 ms-1 pointer" />
        </span>
        <span v-else class="pointer text-danger">
            <span v-c-tooltip="{content: 'Save & Close', placement: 'top'}">save</span>
        </span>
    </span>
</template>

<script>
    import { useHelperStore } from '@/services/helper'
    import { useTreasureStore } from '@/store/treasure'

    const helperStore = useHelperStore()
    const treasureStore = useTreasureStore()

    export default {

        props: ['edit_val'],
        data() {
            return {
                helperStore: helperStore,
                treasureStore: treasureStore,
            }
        }
    }
</script>

<template>
    <CPagination aria-label="Page navigation example">
        <CPaginationItem aria-label="Previous"
            :disabled="!items.prev_page_url"
            href="javascript:void(0)"
            @click="newPage(items.current_page - 1)"
        ><span aria-hidden="true">&laquo;</span></CPaginationItem>
            <CPaginationItem
                v-for="(item, index) in items.last_page"
                :key="index"
                :active="index+1 == items.current_page"
                href="javascript:void(0)"
                @click="newPage(index+1)"
            >{{ index+1 }}</CPaginationItem>
        <CPaginationItem aria-label="Next"
            :disabled="!items.next_page_url"
            href="javascript:void(0)"
            @click="newPage(items.current_page + 1)"
        ><span aria-hidden="true">&raquo;</span></CPaginationItem>
    </CPagination>
</template>

<script>

    import { useMemberStore } from '@/store/member'
    const memberStore = useMemberStore()

    export default {

        props: ['items', 'type'],

        data() {
            return {
                memberStore: memberStore,
            }
        },

        methods: {

            newPage(page) {
                if (
                    page && // not empty
                    page <= this.items.last_page && // check if page no is greater than the actual data
                    page != this.items.current_page // check if same page no was clicked
                ) {
                    if (this.type == 'members') memberStore.getMembers(page)
                }
            }
        }
    }
</script>

<template>
    <div class="p-3 bg-primary bg-opacity-10 text-dark"><h4>Publisher</h4></div>
    <CAccordion :active-item-key="1" always-open class="mb-4 mt-n3">
        <div v-for="(group, index) in congregationStore.groups.members.publisher" :key="group" :item-key="index">
            <div v-show="defShowGroup == index">
                <FServiceGridExt :group="group" :date_rendered="date_rendered"/>
            </div>
        </div>
    </CAccordion>

    <div class="p-3 bg-primary bg-opacity-10 text-dark"><h4>Regular Pioneer</h4></div>
    <CAccordion :active-item-key="1" always-open class="mb-4 mt-n3">
        <div v-for="(group, index) in congregationStore.groups.members.regular_pioneer" :key="group" :item-key="index">
            <div v-show="defShowGroup == index">
                <FServiceGridExt :group="group" :date_rendered="date_rendered"/>
            </div>
        </div>
    </CAccordion>

    <div class="p-3 bg-primary bg-opacity-10 text-dark"><h4>Auxillary Pioneer</h4></div>
    <CAccordion :active-item-key="1" always-open class="mb-4 mt-n3">
        <div v-for="(group, index) in congregationStore.groups.members.auxillary_pioneer" :key="group" :item-key="index">
            <div v-show="defShowGroup == index">
                <FServiceGridExt :group="group" :date_rendered="date_rendered"/>
            </div>
        </div>
    </CAccordion>

    <div class="p-3 bg-primary bg-opacity-10 text-dark"><h4>Special Pioneer</h4></div>
    <CAccordion :active-item-key="1" always-open class="mb-4 mt-n3">
        <div v-for="(group, index) in congregationStore.groups.members.special_pioneer" :key="group" :item-key="index">
            <div v-show="defShowGroup == index">
                <FServiceGridExt :group="group" :date_rendered="date_rendered"/>
            </div>
        </div>
    </CAccordion>
</template>

<script>

import FServiceGridExt from '@/components/reports/FServiceGridExt'

import { useCongregationStore } from '@/store/congregation'

const congregationStore = useCongregationStore()

export default {

    name: 'FieldServiceGrid',

    props: ['defShowGroup', 'date_rendered', 'edit'],

    data() {

        return {
            congregationStore: congregationStore,
        }
    },

    components: {
        FServiceGridExt,
    },
}

</script>
<template>
    <CTableRow :color="row_color" v-for="(pub, index) in positions" :key="pub.id">
        <CTableDataCell>{{ counter ? countPub(count_, index) : index+1 }}</CTableDataCell>
        <CTableDataCell>{{ pub.last_name + ', ' + pub.first_name }}</CTableDataCell>
        <CTableDataCell>{{ pub.placements }}</CTableDataCell>
        <CTableDataCell>{{ pub.video_showings }}</CTableDataCell>
        <CTableDataCell>{{ pub.hours }}</CTableDataCell>
        <CTableDataCell>{{ pub.return_visits }}</CTableDataCell>
        <CTableDataCell>{{ pub.bible_studies }}</CTableDataCell>
    </CTableRow>
</template>

<script>

    export default {
        name: 'NoOfReportsPubExt',

        props: ['positions', 'row_color', 'counter'],

        data() {
            return {
                count_: this.counter
            }
        },

        methods: {
            countPub(val, index) {
                return val+=(index + 1)
            }
        }
    }
</script>
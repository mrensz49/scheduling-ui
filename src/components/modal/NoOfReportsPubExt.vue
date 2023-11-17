<template>
    <CTableRow :color="row_color" v-for="(pub, index) in positions" :key="pub.id">
        <CTableDataCell>{{ counter ? countPub(count_, index) : index+1 }}</CTableDataCell>
        <CTableDataCell>{{ pub.last_name + ', ' + pub.first_name }}</CTableDataCell>
        <CTableDataCell v-if="showFS(pub)">
            <template v-if="designate == 'Publishers'">
                <CFormSwitch size="xl"
                    v-model="pub.is_ministry"
                    disabled
                />
            </template>
        </CTableDataCell>
        <CTableDataCell v-if="showFS(pub)">{{ pub.placements }}</CTableDataCell>
        <CTableDataCell v-if="showFS(pub)">{{ pub.video_showings }}</CTableDataCell>
        <CTableDataCell v-if="showFS(pub)">{{ pub.hours }}</CTableDataCell>
        <CTableDataCell v-if="showFS(pub)">{{ pub.return_visits }}</CTableDataCell>
        <CTableDataCell v-if="showFS(pub)">{{ pub.bible_studies }}</CTableDataCell>

        <CTableDataCell v-if="!showFS(pub)" colspan="5">
            <center><CIcon icon="cil-report-slash" /></center>
        </CTableDataCell>
    </CTableRow>

</template>

<script>

    import { useAuthStore } from '@/store/auth'
    const authStore = useAuthStore()

    export default {
        name: 'NoOfReportsPubExt',

        props: ['positions', 'row_color', 'counter', 'designate'],

        data() {
            return {
                authStore: authStore,

                count_: this.counter
            }
        },

        methods: {
            countPub(val, index) {
                return val+=(index + 1)
            },

            showFS(pub) {
                if (parseInt(authStore.user.role_id) != 4 ||
                (parseInt(authStore.user.role_id) == 4 && parseInt(authStore.user.group_no) == parseInt(pub.group_no))) {
                    return true
                }
                return false
            }
        }
    }
</script>
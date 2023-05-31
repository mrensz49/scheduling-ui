<template>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader> <CIcon icon="cil-people" />
                View Group
                <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="congregationStore.loading"/>
            </CCardHeader>
            <CCardBody>
                <CRow class="ms-1">
                    <CCol
                        class="border-start border-start-4 border-start-info py-1 px-3 mb-3"
                        :sm="2"
                        v-for="position in congregationStore.groups.positions" :key="position.id"
                    >
                    <div class="text-medium-emphasis small">{{  position.name }}</div>
                    <div class="fs-5 fw-semibold">
                        <a href="javascript:void" class="text-danger text-decoration-none" @click="viewposition(position.id)">
                            {{  position.congregation_designates_count }}
                        </a>
                    </div>
                    </CCol>
                </CRow>
                <CRow>
                    <template v-for="group in congregationStore.showGroups" :key="group.group">
                        <CCol :md="6">
                            <CListGroup class="mt-4 shadow bg-body rounded">
                                <CListGroupItem color="dark">
                                    <strong>Group {{ group.group }}</strong>
                                </CListGroupItem>
                                <template v-for="member in group.members" :key="member">
                                    <CListGroupItem component="a" href="javascript:void" @click="viewedit(member.id)">
                                        <table width="100%">
                                            <tr>
                                                <td width="50%">
                                                    {{ member.last_name + ' ' + member.first_name }} {{ (member.middle_name) ? member.middle_name: '' }}
                                                </td>
                                                <td>
                                                    <template v-for="designate in member.designates" :key= "designate">
                                                            <CBadge v-if="designate.position" color="success" class="m-1">
                                                                {{ designate.position.name }}
                                                            </CBadge>
                                                    </template>
                                                </td>
                                            </tr>
                                        </table>

                                    </CListGroupItem>
                                </template>
                            </CListGroup>
                        </CCol>
                    </template>
                </CRow>
            </CCardBody>
            <scroll-top/>
        </CCard>
        </CCol>
    </CRow>
</template>

<script>

    import router from '@/router'
    import { useCongregationStore } from '@/store/congregation'

    const congregationStore = useCongregationStore()

    export default {

        name: 'Group',

        async created() {
            await congregationStore.getGroups()
        },

        data() {

            return {
                congregationStore: congregationStore,
            }
        },

        computed: {
            countPosition(position) {
                return position
            }
        },

        methods: {
            viewedit(id) {
                router.push({name: 'View Member', params: { id: id } })
            },

            viewposition(id) {
                router.push({name: 'Position', params: { id: id } })
            },
        }

    }

</script>
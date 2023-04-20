<template>
    <CRow>
      <CCol>
        <CCard class="mb-4">
          <CCardHeader> <CIcon icon="cil-people" />
                {{ positionStore.members.name }}(s)
                <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="positionStore.loading"/>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol :md="12">
                        <CAccordion>
                            <CAccordionItem v-for="(member, index) in positionStore.members.congregation_designates" :key="member.id" :item-key="index">
                                <CAccordionHeader>
                                    {{ index+1 }}.
                                    {{ member.last_name + ', ' + member.first_name }}
                                    <small class="ms-3">{{ getHumanAge(member.dobirth) }} y.o.</small>
                                </CAccordionHeader>
                                <CAccordionBody>
                                    <CRow>
                                        <CCol :md="3" :sm="6" :xs="6">
                                            <span class="me-2 fw-semibold">Group :</span>
                                        </CCol>
                                        <CCol :md="9" :sm="6" :xs="6">
                                            {{ member.group_no }}
                                        </CCol>
                                    </CRow>

                                    <CRow class="mt-2">
                                        <CCol :md="3" :sm="12" :xs="12">
                                            <span class="me-2 fw-semibold">Date of Baptized :</span>
                                        </CCol>
                                        <CCol :md="9" :sm="12" :xs="12">
                                            {{ getHumanDate(member.dobap) }} / {{ getHumanAge(member.dobap) }}
                                            <sup>yr(s) ago</sup>
                                        </CCol>
                                    </CRow>

                                    <CRow class="mt-2">
                                        <CCol :md="3" :sm="12" :xs="12">
                                            <span class="me-2 fw-semibold">Date of Birth :</span>
                                        </CCol>
                                        <CCol :md="9" :sm="12" :xs="12">
                                            {{ getHumanDate(member.dobirth) }} / {{ getHumanAge(member.dobirth) }}
                                            <sup>yr(s) old</sup>
                                        </CCol>
                                    </CRow>

                                    <CRow class="mt-2">
                                        <CCol :md="3" :sm="6" :xs="6">
                                            <span class="me-2 fw-semibold">View More :</span>
                                        </CCol>
                                        <CCol :md="9" :sm="6" :xs="6">
                                            <CButton color="primary" shape="rounded-pill" class="btn-sm" @click="viewedit(member.id)">
                                                <CIcon icon="cil-user"/>
                                            </CButton>
                                        </CCol>
                                    </CRow>
                                </CAccordionBody>
                            </CAccordionItem>
                        </CAccordion>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
      </CCol>
    </CRow>
</template>

<script>

    import moment from 'moment'
    import router from '@/router'
    import { usePositionStore } from '@/store/position'

    const positionStore = usePositionStore()

    export default {

        name: 'View Member',

        async created() {

            positionStore.getPosition(this.$route.params.id)
            positionStore.getPositions()

        },

        data() {
            return {
                positionStore: positionStore
            }
        },
        methods: {
            viewedit(id) {
                router.push({name: 'View Member', params: { id: id } })
            },

            getHumanDate(date) {
                if (date) {
                    return moment(date, 'YYYY-MM-DD').format('MMM. DD, YYYY - dd');
                }
            },

            getHumanAge(date) {
                if (date) {
                    return moment().diff(date, 'years');
                }
            }
        }
    }

</script>
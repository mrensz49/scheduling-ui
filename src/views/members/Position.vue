<template>
    <CRow>
      <CCol>
        <CCard class="mb-4">
          <CCardHeader> <CIcon icon="cil-people" />
                {{ positionStore.members.name ?? 'All Member' }}(s)
                <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="positionStore.loading || memberStore.loading"/>
            </CCardHeader>
            <CCardBody>
                <CRow  v-if="this.$route.params.id == 'all'">
                    <template v-for="genders in memberStore.members" :key="genders.id">
                        <CCol md="6" sm="12" xs="12">
                            <CAccordion class="mt-2">
                            <CAccordionItem class="p-2">
                                <strong >
                                    <CIcon icon="cil-user" class="me-2" size="lg" />
                                    Male
                                </strong>
                            </CAccordionItem>
                            <CAccordionItem v-for="(gender, index) in genders.member_male" :key="gender.id" :item-key="index">
                                <CAccordionHeader>
                                    {{ index+1 }}.
                                    {{ gender.full_name }}
                                    <small class="ms-3">{{ getHumanAge(gender.dobirth) }} y.o.</small>
                                </CAccordionHeader>
                                <CAccordionBody>
                                    <ShortInfo :detail="gender"/>
                                </CAccordionBody>
                            </CAccordionItem>
                            </CAccordion>
                        </CCol>

                        <CCol md="6" sm="12" xs="12">
                            <CAccordion class="mt-2">
                            <CAccordionItem class="p-2">
                                <strong >
                                    <CIcon icon="cil-user-female" class="me-2" size="lg" />
                                    Female
                                </strong>
                            </CAccordionItem>
                            <CAccordionItem v-for="(gender, index) in genders.member_female" :key="gender.id" :item-key="index">
                                <CAccordionHeader>
                                    {{ index+1 }}.
                                    {{ gender.full_name }}
                                    <small class="ms-3">{{ getHumanAge(gender.dobirth) }} y.o.</small>
                                </CAccordionHeader>
                                <CAccordionBody>
                                    <ShortInfo :detail="gender"/>
                                </CAccordionBody>
                            </CAccordionItem>
                            </CAccordion>
                        </CCol>
                    </template>
                </CRow>
                <CRow v-else>
                    <CCol :md="12">
                        <CAccordion>
                            <CAccordionItem v-for="(member, index) in positionStore.members.congregation_designates" :key="member.id" :item-key="index">
                                <CAccordionHeader>
                                    {{ index+1 }}.
                                    {{ member.last_name + ', ' + member.first_name }}
                                    <small class="ms-3">{{ getHumanAge(member.dobirth) }} y.o.</small>
                                </CAccordionHeader>
                                <CAccordionBody>
                                    <ShortInfo :detail="member"/>
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

    import  ShortInfo from '@/components/members/ShortInfo'

    import { usePositionStore } from '@/store/position'
    import { useMemberStore } from '@/store/member'

    const positionStore = usePositionStore()
    const memberStore = useMemberStore()

    export default {

        name: 'View Member',

        async created() {

            if (this.$route.params.id == 'all') {

                memberStore.getAllMembers()
            }
            else {
                positionStore.getPosition(this.$route.params.id)
            }

        },

        data() {
            return {
                positionStore: positionStore,
                memberStore: memberStore,
            }
        },

        components: { ShortInfo },

        methods: {

            getHumanAge(date) {
                if (date) {
                    return moment().diff(date, 'years');
                }
            }
        }
    }

</script>
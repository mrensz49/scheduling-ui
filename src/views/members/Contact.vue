<template>
    <CRow>
      <CCol>
        <CCard class="mb-4">
          <CCardHeader> <CIcon icon="cil-people" />
                All Members
                <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="positionStore.loading || memberStore.loading"/>

                <span style="float:right">
                    <CButton type="submit" @click="downloadContacts()" class="btn btn-sm" color="primary" :disabled="loading">
                        <CIcon icon="cil-cloud-download" v-if="!loading"/>
                        <CSpinner class="mt-2" component="span" v-if="loading" size="sm" aria-hidden="true"/>
                    </CButton>
                </span>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <template v-for="genders in memberStore.members" :key="genders.id">
                        <CCol md="6" sm="12" xs="12">
                            <CAccordion>
                            <CAccordionItem class="p-2">
                                <strong >
                                    <CIcon icon="cil-user" class="me-2" size="lg" />
                                    Name & Contact(s)
                                </strong>
                            </CAccordionItem>
                            <CAccordionItem v-for="(gender, index) in genders.member_male" :key="gender.id" :item-key="index">
                                <CAccordionHeader>
                                    {{ gender.full_name }}
                                    <small class="ms-4" v-for="number in gender.numbers" :key="number">
                                        {{ number.number }}
                                    </small>
                                </CAccordionHeader>
                                <CAccordionBody>
                                    <ShortInfo :detail="gender"/>
                                </CAccordionBody>
                            </CAccordionItem>
                            </CAccordion>
                        </CCol>

                        <CCol md="6" sm="12" xs="12">
                            <CAccordion>
                            <CAccordionItem class="p-2">
                                <strong >
                                    <CIcon icon="cil-user-female" class="me-2" size="lg" />
                                    Name & Contact(s)
                                </strong>
                            </CAccordionItem>
                            <CAccordionItem v-for="(gender, index) in genders.member_female" :key="gender.id" :item-key="index">
                                <CAccordionHeader>
                                    {{ gender.full_name }}
                                    <small class="ms-4" v-for="number in gender.numbers" :key="number">
                                        {{ number.number }}
                                    </small>
                                </CAccordionHeader>
                                <CAccordionBody>
                                    <ShortInfo :detail="gender"/>
                                </CAccordionBody>
                            </CAccordionItem>
                            </CAccordion>
                        </CCol>
                    </template>
                </CRow>
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
    import { notify } from "@kyvg/vue3-notification"
    import EventService from "@/services/EventService.js"

    import  ShortInfo from '@/components/members/ShortInfo'

    import { usePositionStore } from '@/store/position'
    import { useMemberStore } from '@/store/member'

    const positionStore = usePositionStore()
    const memberStore = useMemberStore()

    export default {

        name: 'View Member',

        async created() {
            memberStore.getAllMembers()
        },

        data() {
            return {
                positionStore: positionStore,
                memberStore: memberStore,

                loading: false,
            }
        },

        components: { ShortInfo },

        methods: {

            downloadContacts() {
                this.loading = 1
                EventService.downloadContacts()
                .then(response => {

                    var fileURL = window.URL.createObjectURL(
                        new Blob([response.data], {type:'application/pdf'})
                    );

                    var fileLink = document.createElement('a');
                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', 'CONG_CONTACTS.pdf');
                    document.body.appendChild(fileLink);
                    fileLink.click();
                    this.loading = 0

                    notify({ type: "success", duration: 6000, title: "Successfully Downloaded!" });
                })
            },

            getHumanAge(date) {
                if (date) {
                    return moment().diff(date, 'years');
                }
            }
        }
    }

</script>
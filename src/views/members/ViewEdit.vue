<template>
    <CRow>
      <CCol>
        <CCard>

        <CForm
            novalidate
            :validated="validationUpdate"
            @submit="handleUpdate"
        >

            <CCardHeader> <CIcon icon="cil-user" />
                View Member
                <span v-if="!memberStore.edit">
                    <a href="javascript:void" @click="editInfo(1)">
                        <CIcon icon="cil-pencil" class="me-2 ms-1" />
                    </a>
                </span>
                <span v-else>
                    <CButton class="btn-sm me-1 ms-1" color="primary" type="submit" :disabled="memberStore.loading_update">
                        <span v-if="memberStore.loading_update"><CSpinner color="warning" component="span" size="sm" aria-hidden="true" v-if="memberStore.loading_update"/> Updating...</span>
                        <span v-else>Update</span>
                    </CButton>
                    <CButton class="btn-sm" color="secondary" type="submit" @click="editInfo(0)" :disabled="memberStore.loading_update">
                        Cancel
                    </CButton>
                </span>

                <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="memberStore.loading"/>
                </CCardHeader>
                <CCardBody>
                    <CRow class="mt-3 mb-4" v-if="typeof memberStore.showMember !== 'undefined'">
                        <CCol :md="6">
                            <h2>Personal Information</h2>

                            <CRow class="mt-3">
                                <CCol :md="3" :sm="6">Last Name</CCol>
                                <CCol :md="9" :sm="6">
                                    <span v-if="!memberStore.edit"> - {{ memberStore.showMember.last_name }}</span>
                                    <span v-else>
                                        <CFormInput
                                            class="mb-2"
                                            placeholder="Last Name"
                                            required
                                            feedbackInvalid="This is required!"
                                            v-model="formData.last_name"
                                            :value="memberStore.showMember.last_name"
                                        />
                                    </span>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol :md="3" :sm="6">First Name</CCol>
                                <CCol :md="9" :sm="6">
                                    <span v-if="!memberStore.edit"> - {{ memberStore.showMember.first_name }}</span>
                                    <span v-else>
                                        <CFormInput
                                            class="mb-2"
                                            placeholder="First Name"
                                            required
                                            feedbackInvalid="This is required!"
                                            v-model="formData.first_name"
                                            :value="memberStore.showMember.first_name"
                                        />
                                    </span>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol :md="3" :sm="6">Middle Init <sup>Optional</sup></CCol>
                                <CCol :md="9" :sm="6">
                                    <span v-if="!memberStore.edit"> - {{ memberStore.showMember.middle_name }}</span>
                                    <span v-else>
                                        <CFormInput
                                            class="mb-2"
                                            placeholder="Middle Initial (optional)"
                                            v-model="formData.middle_name"
                                            :value="memberStore.showMember.middle_name"
                                        />
                                    </span>

                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol :md="3" :sm="6">Gender</CCol>
                                <CCol :md="9" :sm="6">
                                    <span v-if="!memberStore.edit"> - {{ memberStore.showMember.gender }}</span>
                                    <span v-else>
                                        <CFormSelect required feedbackInvalid="This is required!" v-model="memberStore.showMember.gender" class="mb-2">
                                            <option value="">Choose...</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </CFormSelect>
                                    </span>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol :md="3" :sm="6">Designate</CCol>
                                <CCol :md="9" :sm="6">
                                    <span v-if="!memberStore.edit">
                                        <template v-if="typeof memberStore.showMember.positions !== 'undefined'">
                                            -
                                            <template v-for="(position, index) in memberStore.showMember.positions" :key="index">
                                                <CBadge  v-if="typeof position !== 'undefined'" color="success" class="m-1"
                                            > {{ position.name }}</CBadge>
                                            </template>
                                        </template>
                                    </span>
                                    <span v-else>
                                        <Multiselect required feedbackInvalid="This is required!"
                                            class="mb-2"
                                            v-model="formData.position_id"
                                            placeholder="Choose"
                                            label="name"
                                            trackBy="name"
                                            :options="positionStore.getDesignates"
                                            :searchable="true"
                                            mode="tags"
                                            :value="memberStore.defPosition"
                                        ></Multiselect>
                                    </span>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol :md="3" :sm="6">Date of Birth</CCol>
                                <CCol :md="9" :sm="6">
                                    <span v-if="!memberStore.edit"> - {{ getHumanDate(memberStore.showMember.dobirth) }}</span>
                                    <span v-else>
                                        <CFormInput
                                            class="mb-2"
                                            type="date"
                                            placeholder="Date of Birth"
                                            v-model="formData.dobirth"
                                            :value="getHumanDate(memberStore.showMember.dobirth)"
                                        />
                                    </span>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol :md="3" :sm="6">Date of Baptized</CCol>
                                <CCol :md="9" :sm="6">
                                    <span v-if="!memberStore.edit"> - {{ getHumanDate(memberStore.showMember.dobap) }}</span>
                                    <span v-else>
                                        <CFormInput
                                            class="mb-2"
                                            type="date"
                                            placeholder="Date of Baptized"
                                            v-model="formData.dobap"
                                            :value="getHumanDate(memberStore.showMember.dobap)"
                                        />
                                    </span>
                                </CCol>
                            </CRow>

                            <CRow class="mb-4">
                                <CCol :md="3" :sm="6">Phone</CCol>
                                <CCol :md="9" :sm="6">
                                    <span v-if="!memberStore.edit"> - {{ memberStore.showMember.phone }}</span>
                                    <span v-else>
                                        <CFormInput
                                            class="mb-2"
                                            placeholder="Phone"
                                            v-model="formData.phone"
                                            :value="memberStore.showMember.phone"
                                        />
                                    </span>
                                </CCol>
                            </CRow>

                            <h2>Congregation</h2>
                            <CRow class="mt-3">
                                <CCol :md="3" :sm="6">Congregation</CCol>
                                <CCol :md="9" :sm="6">
                                    <span v-if="!memberStore.edit">
                                        <template v-if="typeof memberStore.showMember.congregation !== 'undefined'">
                                        - {{ memberStore.showMember.congregation.name }}
                                        </template>
                                    </span>
                                    <span v-else>
                                        <CFormSelect
                                            class="mb-2"
                                            required
                                            feedbackInvalid="This is required!"
                                            v-model="congregation_id"
                                            >
                                            <option value="">Choose...</option>
                                            <option
                                            v-for="congregation in congregationStore.congregations"
                                            :key="congregation"
                                            :value="congregation.id+','+congregation.total_groups"
                                            :selected="congregation.id == memberStore.showMember.congregation_id"
                                            >{{ congregation.name }}</option>
                                        </CFormSelect>
                                </span>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol :md="3" :sm="6">Group</CCol>
                                <CCol :md="9" :sm="6">
                                    <span v-if="!memberStore.edit">
                                        - {{ memberStore.showMember.group_no }}
                                    </span>
                                    <span v-else>
                                        <CFormSelect
                                            required
                                            feedbackInvalid="This is required!"
                                            v-model="formData.group_no"
                                            >
                                        <option value="">Choose...</option>
                                            <option
                                                v-for="index in authStore.user.congregation.total_groups"
                                                :key="index"
                                                :value="index"
                                                :selected="index == memberStore.showMember.group_no"
                                                >{{ index }}</option>
                                                <option value="0">To be followed</option>
                                        </CFormSelect>
                                    </span>
                                </CCol>
                            </CRow>
                        </CCol>
                        <CCol :md="6">
                            <h2>Address</h2>

                            <CRow class="mt-3">
                                <CCol :md="3" :sm="6">Country</CCol>
                                <CCol :md="9" :sm="6">- Philippines</CCol>
                            </CRow>
                            <CRow>
                                <CCol :md="3" :sm="6">Region</CCol>
                                <CCol :md="9" :sm="6">- </CCol>
                            </CRow>
                            <CRow>
                                <CCol :md="3" :sm="6">Province</CCol>
                                <CCol :md="9" :sm="6">- </CCol>
                            </CRow>
                            <CRow>
                                <CCol :md="3" :sm="6">City/Town</CCol>
                                <CCol :md="9" :sm="6">- </CCol>
                            </CRow>
                            <CRow>
                                <CCol :md="3" :sm="6">Brgy</CCol>
                                <CCol :md="9" :sm="6">
                                    <span v-if="!memberStore.edit">
                                        <template v-if="typeof memberStore.showMember.brgy !== 'undefined'">
                                            - {{ memberStore.showMember.brgy.brgy_name}}
                                        </template>
                                    </span>
                                    <span v-else>
                                        <CFormSelect
                                            required
                                            feedbackInvalid="This is required!"
                                            @change="changeBrgy($event)"
                                            v-model="formData.brgy_code"
                                        >
                                        <option value="">Choose...</option>
                                        <option
                                            v-for="barangay in memberStore.def_brgys" :key="barangay"
                                            :selected="barangay.brgy_code == memberStore.showMember.address.brgy_code"
                                            :value="barangay.brgy_code"
                                        >
                                            {{ barangay.brgy_name }}
                                        </option>
                                        </CFormSelect>
                                    </span>
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CForm>
        </CCard>
      </CCol>
    </CRow>
  </template>

<script>

    import moment from 'moment'
    import { useMemberStore } from '@/store/member'
    import { useCongregationStore } from '@/store/congregation'
    import { usePositionStore } from '@/store/position'
    import { useAuthStore } from '@/store/auth'
    import { useAddressStore } from '@/store/address'

    import Multiselect from '@vueform/multiselect'

    const memberStore = useMemberStore()
    const positionStore = usePositionStore()
    const congregationStore = useCongregationStore()
    const authStore = useAuthStore()
    const addressStore = useAddressStore()

    export default {

        name: 'View Member',

        async created() {

            await authStore.getUser()
            positionStore.getPositions()
            congregationStore.getCongregations()

            addressStore.fetchBrgys(authStore.showCongregation.city_town_code)
        },

        mounted() {
            memberStore.getMember(this.$route.params.id)
            memberStore.edit=0;

        },
        components: { Multiselect, },
        data() {
            return {
                memberStore: memberStore,
                positionStore: positionStore,
                congregationStore: congregationStore,
                authStore: authStore,
                edit: 0,
                validationUpdate: null,
                formData: {},
            }
        },

        methods: {

            getHumanDate(date) {
                if (date) {
                    return moment(date, 'YYYY-MM-DD').format('MMM. DD, YYYY - dd');
                }
            },

            getHumanDateUpdate(date) {
                return moment(date, 'YYYY-MM-DD').format('MM/DD/YYYY');
            },

            editInfo(val) {
                memberStore.edit = val
                if (val) {
                    this.formData = memberStore.member
                }
            },

            changeBrgy(event) {
                // console.log(event.target.value)
                this.formData.brgy_code = event.target.value
            },

            handleUpdate(event) {
                const form = event.currentTarget

                this.validationUpdate = true
                if (form.checkValidity() === false) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                else {
                    console.log(this.formData)
                }
                memberStore.updateMember(this.formData)

            }
        }
    }
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
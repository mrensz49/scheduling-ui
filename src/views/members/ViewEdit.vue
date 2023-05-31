<template>
    <CRow>
      <CCol>
        <CCard>

        <CForm
            novalidate
            :validated="validationUpdate"
            @submit="handleUpdate"
        >

            <CCardHeader> <CIcon icon="cil-address-book" />
                View Member
                <a href="javascript:void" class="text-decoration-none" style="float:right" @click="this.$router.go(-1)">back</a>
                <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="memberStore.loading"/>
            </CCardHeader>
            <CCardBody>

                <CAlert color="warning" v-if="Object.keys(memberStore.errors).length">
                    <span v-for="error in memberStore.errors" :key="error"> * {{ error[0] }}<br/></span>
                </CAlert>

                <CAvatar color="secondary" text-color="white" size="xl">
                    {{  memberStore.showMember?.first_name.slice(0,1) }}{{  memberStore.showMember?.last_name.slice(0,1) }}
                </CAvatar>

                <CRow class="mt-3" v-if="typeof memberStore.showMember !== 'undefined'">
                    <CCol :sm="12" :md="7" class="mb-2">
                        <CCol :sm="12" :md="12">
                            <h2>Personal Information</h2>
                            <span v-if="!memberStore.edit" style="float:right;margin-top: -8%;">
                                <a href="javascript:void" @click="editInfo(1)">
                                    <CIcon icon="cil-pencil" class="me-4" />
                                </a>
                            </span>
                            <CRow class="mt-3">
                                <CCol :md="4" :sm="6" class="fw-semibold">Last Name</CCol>
                                <CCol :md="8" :sm="6">
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
                                <CCol :md="4" :sm="6" class="fw-semibold">First Name</CCol>
                                <CCol :md="8" :sm="6">
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
                                <CCol :md="4" :sm="6" class="fw-semibold">Middle Init <sup>Optional</sup></CCol>
                                <CCol :md="8" :sm="6">
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
                                <CCol :md="4" :sm="6" class="fw-semibold">Gender</CCol>
                                <CCol :md="8" :sm="6">
                                    <span v-if="!memberStore.edit"> -
                                        {{ memberStore.showMember.gender == 'Male' ? 'Brother':'Sister' }}
                                    </span>
                                    <span v-else>
                                        <CFormSelect required feedbackInvalid="This is required!" v-model="memberStore.showMember.gender" class="mb-2">
                                            <option value="">Choose...</option>
                                            <option value="Male">Brother</option>
                                            <option value="Female">Sister</option>
                                        </CFormSelect>
                                    </span>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol :md="4" :sm="6" class="fw-semibold">Designate</CCol>
                                <CCol :md="8" :sm="6">
                                    <span v-if="!memberStore.edit">
                                            -
                                            <template v-for="(position, index) in memberStore.showMember?.positions" :key="index">
                                                <CBadge  v-if="typeof position !== 'undefined'" color="success" class="m-1"
                                            > {{ position.name }}</CBadge>
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
                                            ></Multiselect>
                                    </span>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol :md="4" :sm="6" class="fw-semibold">Date of Birth</CCol>
                                <CCol :md="8" :sm="6">
                                    <template v-if="!memberStore.edit">
                                            -
                                            <template v-if="memberStore.showMember.dobirth?.date">
                                                {{ helperStore.getHumanDateDay(memberStore.showMember.dobirth?.date) }} /
                                                {{ memberStore.showMember.dobirth?.age }} <sup>yrs. old</sup>
                                            </template>
                                    </template>
                                    <template v-else>
                                        <CFormInput
                                            class="mb-2"
                                            type="date"
                                            placeholder="Date of Birth"
                                            v-model="dobirth"
                                            :value="helperStore.getHumanDate(dobirth)"
                                        />
                                    </template>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol :md="4" :sm="6" class="fw-semibold">Date of Baptism</CCol>
                                <CCol :md="8" :sm="6">
                                    <template v-if="!memberStore.edit">
                                        -
                                        <template v-if="memberStore.showMember.dobap?.date">
                                            {{ helperStore.getHumanDateDay(memberStore.showMember.dobap?.date) }} /
                                            {{ memberStore.showMember.dobap?.human }}
                                        </template>
                                    </template>
                                    <template v-else>
                                        <CFormInput
                                            class="mb-2"
                                            type="date"
                                            placeholder="Date of Baptism"
                                            v-model="dobap"
                                            :value="helperStore.getHumanDate(dobap)"
                                        />
                                    </template>
                                </CCol>
                            </CRow>

                            <CRow class="mb-4">
                                <CCol :md="4" :sm="6" class="fw-semibold">Phone</CCol>
                                <CCol :md="8" :sm="6">
                                    <table width="100%">
                                        <template v-for="(phone, index) in memberStore.phones" :key="index">
                                            <tr v-show="!rows[phone.id]">
                                                <td width="97%">
                                                    <span v-if="!memberStore.edit">
                                                        <CBadge color="success" class="m-1">
                                                            {{ phone.number }}
                                                        </CBadge>
                                                    </span>
                                                    <span v-else>
                                                        <CFormInput
                                                            class="mb-2"
                                                            placeholder="Phone"
                                                            v-model="phone.number"
                                                        />

                                                    </span>
                                                </td>
                                                <td>
                                                    <a
                                                        v-show="memberStore.edit"
                                                        @click="numberStore.deleteMemberPhone(phone.id); rows[phone.id]=1"
                                                        class="ms-2 fw-bolder text-decoration-none text-danger"
                                                        href="javascript:void"
                                                    >
                                                        <span v-c-tooltip="{content: 'Delete this number? ', placement: 'top'}">x</span>
                                                    </a>
                                                </td>
                                            </tr>
                                        </template>
                                    </table>
                                    <CFormInput
                                        v-if="showAddPhone"
                                        class="mb-2"
                                        placeholder="Add phone number..."
                                        v-model="addPhoneNumber"
                                    />
                                    <small v-show = "memberStore.edit" @click="showAddPhone == 1 ? showAddPhone=0:showAddPhone=1, addPhone=''">
                                    <a href="javascript:void" class="text-decoration-none">
                                        <span v-if="!showAddPhone">+ add phone number</span>
                                        <span v-else>cancel</span>
                                        </a>
                                    </small>
                                </CCol>
                            </CRow>
                        </CCol>

                        <CCol :sm="12" :md="12" class="mb-4">
                            <h2>Congregation</h2>
                            <CRow class="mt-3">
                                <CCol :md="4" :sm="6" class="fw-semibold">Congregation</CCol>
                                <CCol :md="8" :sm="6">
                                    <span>
                                        <template v-if="typeof memberStore.showMember.congregation !== 'undefined'">
                                        - {{ memberStore.showMember.congregation.name }}
                                        </template>
                                    </span>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol :md="4" :sm="6" class="fw-semibold">Group</CCol>
                                <CCol :md="8" :sm="6">
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
                                                v-for="index in parseInt(authStore.user.congregation.total_groups)"
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

                        <CCol :sm="12" :md="12">
                            <h2>Address</h2>
                            <!-- <CRow class="mt-3">
                                <CCol :md="4" :sm="6" class="fw-semibold">Country</CCol>
                                <CCol :md="8" :sm="6">- Philippines</CCol>
                            </CRow>
                            <CRow>
                                <CCol :md="4" :sm="6" class="fw-semibold">Region</CCol>
                                <CCol :md="8" :sm="6">- VII</CCol>
                            </CRow> -->
                            <CRow>
                                <CCol :md="4" :sm="6" class="fw-semibold">Province</CCol>
                                <CCol :md="8" :sm="6">- Bohol</CCol>
                            </CRow>
                            <CRow>
                                <CCol :md="4" :sm="6" class="fw-semibold">City/Town</CCol>
                                <CCol :md="8" :sm="6">
                                    <span v-if="!memberStore.edit">
                                        - {{ memberStore.showMember.city_town?.city_name }}
                                    </span>
                                    <span v-else>
                                        <CFormSelect
                                            required
                                            feedbackInvalid="This is required!"
                                            @change="changeCityTown($event)"
                                            v-model="formData.city_code"
                                            class="mb-2"
                                        >
                                        <option value="">Choose...</option>
                                        <option
                                            v-for="city in memberStore.def_cities" :key="city"
                                            :selected="city.city_code == memberStore.showMember.address.city_town_code"
                                            :value="city.city_code"
                                        >
                                            {{ city.city_name }}
                                        </option>
                                        </CFormSelect>
                                    </span>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol :md="4" :sm="6" class="fw-semibold">Brgy</CCol>
                                <CCol :md="8" :sm="6">
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

                            <CRow class="mb-4">
                                <CCol :md="4" :sm="6" class="fw-semibold"></CCol>
                                <CCol :md="8" :sm="6">
                                    <div class="mt-4"  v-if="memberStore.edit">
                                        <CButton class="btn-sm me-1 ms-1" color="primary" type="submit" :disabled="memberStore.loading_update">
                                            <span v-if="memberStore.loading_update"><CSpinner color="warning" component="span" size="sm" aria-hidden="true" v-if="memberStore.loading_update"/> Updating...</span>
                                            <span v-else>Update</span>
                                        </CButton>
                                        <CButton class="btn-sm" color="secondary" type="submit" @click="editInfo(0)" :disabled="memberStore.loading_update">
                                            Cancel
                                        </CButton>
                                    </div>
                                </CCol>
                            </CRow>
                            <hr class="mb-4">
                        </CCol>
                        <AuxiMonths/>
                        <CheckedPub/>

                    </CCol>
                    <CCol :sm="12" :md="5">
                        <CoGroupMembers/>
                    </CCol>

                </CRow>
            </CCardBody>
            </CForm>

        </CCard>
      </CCol>
    </CRow>

    <MemberFieldServiceReport :member_id="memberStore.member.id" v-if="formData"/>
    <scroll-top/>
  </template>

<script>

    import { useMemberStore } from '@/store/member'
    import { useCongregationStore } from '@/store/congregation'
    import { usePositionStore } from '@/store/position'
    import { useAuthStore } from '@/store/auth'
    import { useAddressStore } from '@/store/address'
    import { useNumberStore } from '@/store/number'
    import { useFieldServiceStore } from '@/store/field_service'
    import { useHelperStore } from '@/services/helper'

    import Multiselect from '@vueform/multiselect'
    import MemberFieldServiceReport from '@/components/reports/MemberFieldServiceReport.vue'
    import AuxiMonths from '@/components/members/AuxiMonths'
    import CoGroupMembers from '@/components/members/CoGroupMembers'
    import CheckedPub from '@/components/members/CheckedPub'

    const memberStore = useMemberStore()
    const positionStore = usePositionStore()
    const congregationStore = useCongregationStore()
    const authStore = useAuthStore()
    const addressStore = useAddressStore()
    const numberStore = useNumberStore()
    const fieldServiceStore = useFieldServiceStore()
    const helperStore = useHelperStore()

    export default {

        name: 'View Member',

        async created() {

            await authStore.getUser()
            positionStore.getPositions()
            congregationStore.getCongregations()
        },

        async mounted() {
            await memberStore.getMember(this.$route.params.id)

            memberStore.edit=0;

            memberStore.getCoMembers({
                'congregation_id' : memberStore.showMember.congregation_id,
                'group_no' : memberStore.showMember.group_no
            })
            this.formData.position_id = memberStore.defPosition
            addressStore.fetchCities(memberStore.member.address?.province_code)
            addressStore.fetchBrgys(memberStore.member.address?.city_town_code)
        },

        components: { Multiselect, MemberFieldServiceReport, AuxiMonths, CoGroupMembers, CheckedPub, },

        data() {
            return {
                memberStore: memberStore,
                positionStore: positionStore,
                congregationStore: congregationStore,
                numberStore: numberStore,
                authStore: authStore,
                fieldServiceStore: fieldServiceStore,
                helperStore: helperStore,

                rows: [], // hide phone rows when deleted
                edit: 0,
                showAddPhone: 0,
                validationUpdate: null,
                addPhoneNumber: '',
                dobirth: '',
                dobap: '',
                formData: {},
            }
        },

        methods: {

            editInfo(val) {
                memberStore.edit = val
                if (val) {
                    this.formData = memberStore.member
                    this.formData.position_id = memberStore.defPosition
                    this.dobirth = this.formData.dobirth.date
                    this.dobap = this.formData.dobap.date
                }
            },

            changeBrgy(event) {
                this.formData.brgy_code = event.target.value
            },

            changeCityTown(event) {
                this.formData.brgy_code = ''
                this.formData.city_town_code = event.target.value
                addressStore.fetchBrgys(event.target.value)
            },

            handleUpdate(event) {
                const form = event.currentTarget

                this.validationUpdate = true
                if (form.checkValidity() === false) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                else {

                    this.formData.dobirth = this.dobirth
                    this.formData.dobap = this.dobap
                    this.formData.addPhoneNumber = this.addPhoneNumber

                    memberStore.updateMember(this.formData)
                    this.showAddPhone = 0
                }

            }
        }
    }
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<template>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader> <CIcon icon="cil-user-follow" /> Add a Member </CCardHeader>
          <CCardBody>
            <CRow>
                <CForm
                    class="row g-3"
                    novalidate
                    :validated="validationAdd"
                    @submit="handleAdd"
                >
                    <CCallout color="danger" v-if="Object.keys(memberStore.errors).length" class="bg-warning bg-opacity-10 border-start-5 ms-2">
                        <ul>
                            <li v-for="error in memberStore.errors" :key="error" class="text-danger">{{ error[0] }}<br/></li>
                        </ul>
                    </CCallout>

                    <p class="text-end "><span class="text-danger">* - Required fields</span>  </p>
                    <h5>Personal Information</h5>

                    <CCol :md="4">
                        <CFormLabel for="validationTextarea" class="form-label"
                        ><sup class="text-danger">*</sup> Last Name</CFormLabel>
                        <CFormInput
                        placeholder="Last Name"
                        required
                        feedbackInvalid="This is required!"
                        v-model="formData.last_name"
                        />
                    </CCol>

                    <CCol :md="4">
                        <CFormLabel for="validationTextarea" class="form-label"
                        ><sup class="text-danger">*</sup> First Name</CFormLabel>
                        <CFormInput
                        placeholder="First Name"
                        required
                        feedbackInvalid="This is required!"
                        v-model="formData.first_name"
                        />
                    </CCol>

                    <CCol :md="4">
                        <CFormLabel for="validationTextarea" class="form-label"
                        >Middle Initial (optional)</CFormLabel>
                        <CFormInput
                        placeholder="Middle Initial (optional)"
                        feedbackInvalid="This is required!"
                        v-model="formData.middle_name"
                        />
                    </CCol>


                    <CCol :md="4">
                        <CFormLabel><sup class="text-danger">*</sup> Gender</CFormLabel>
                        <CFormSelect required feedbackInvalid="This is required!" v-model="formData.gender">
                            <option value="">Choose...</option>
                            <option value="Male">Brother</option>
                            <option value="Female">Sister</option>
                        </CFormSelect>
                    </CCol>

                    <CCol :md="4">
                        <CFormLabel><sup class="text-danger">*</sup> Designate</CFormLabel>
                        <Multiselect required feedbackInvalid="This is required!"
                            v-model="formData.position_id"
                            placeholder="Choose"
                            label="name"
                            trackBy="name"
                            :options="positionStore.getDesignates"
                            :searchable="true"
                            mode="tags"
                        ></Multiselect>
                    </CCol>

                    <CCol :md="4">
                        <CFormLabel for="validationTextarea" class="form-label"
                        >Date of Birth</CFormLabel>
                        <CFormInput
                            type="date"
                            placeholder="Date of Birth"
                            v-model="formData.dobirth"
                        />
                    </CCol>

                    <CCol :md="4">
                        <CFormLabel for="validationTextarea" class="form-label"
                        >Date of Baptism</CFormLabel>
                        <CFormInput
                            type="date"
                            placeholder="Date of Baptism"
                            v-model="formData.dobap"
                        />
                    </CCol>

                    <CCol :md="4" class="mb-4">
                        <CFormLabel for="validationTextarea" class="form-label"
                        >Phone</CFormLabel>
                        <CFormInput
                            placeholder="Phone"
                            v-model="formData.phone"
                        />
                    </CCol>

                    <h5>Address</h5>

                    <CCol :md="4">
                        <CFormLabel for="validationTextarea" class="form-label"
                        ><sup class="text-danger">*</sup> Country</CFormLabel>
                        <CFormInput
                            placeholder="Country"
                            disabled
                            required
                            v-model="formData.country_code"
                        />
                    </CCol>

                    <CCol :md="4">
                        <CFormLabel><sup class="text-danger">*</sup> Region</CFormLabel>
                        <CFormSelect
                            required
                            feedbackInvalid="This is required!"
                            v-model="formData.region_code"
                        >
                        <option disabled value="">Choose...</option>
                        <option
                            v-for="region in addressStore.regions" :key="region"
                            :value="region.region_code"
                            :disabled="region.region_code == authStore.showCongregation.region_code ? false:true"
                            :selected="region.region_code == authStore.showCongregation.region_code ? true:false"
                        >
                            {{ region.region_name }}
                        </option>
                        </CFormSelect>
                    </CCol>

                    <CCol :md="4">
                        <CFormLabel><sup class="text-danger">*</sup> Province</CFormLabel>
                        <CFormSelect
                            required
                            feedbackInvalid="This is required!"
                            v-model="formData.province_code"
                        >
                        <option value="">Choose...</option>
                        <option
                            v-for="province in addressStore.provinces" :key="province" :value="province.province_code"
                            :disabled="province.province_code == authStore.showCongregation.province_code ? false:true"
                            :selected="province.province_code == authStore.showCongregation.province_code ? true:false"
                        >
                            {{ province.province_name }}
                        </option>
                        </CFormSelect>
                    </CCol>


                    <CCol :md="4">
                        <CFormLabel><sup class="text-danger">*</sup> City/Town</CFormLabel>
                        <CFormSelect
                            required
                            feedbackInvalid="This is required!"
                            v-model="formData.city_town_code"
                            @change="changeCityTown($event)"
                        >
                        <!-- :disabled="city.city_code == authStore.showCongregation.city_town_code ? false:true" -->
                        <option value="">Choose...</option>
                        <option
                        v-for="city in addressStore.cities" :key="city" :value="city.city_code"
                            :selected="city.city_code == authStore.showCongregation.city_town_code ? true:false"
                        >
                            {{ city.city_name }}
                        </option>
                        </CFormSelect>
                    </CCol>

                    <CCol :md="4">
                        <CFormLabel><sup class="text-danger">*</sup> Brgy. </CFormLabel>
                        <CFormSelect
                            required
                            feedbackInvalid="This is required!"
                            v-model="formData.brgy_code"
                        >
                        <option value="">Choose...</option>
                        <option
                            v-for="barangay in addressStore.barangays" :key="barangay" :value="barangay.brgy_code"
                        >
                            {{ barangay.brgy_name }}
                        </option>
                        </CFormSelect>
                    </CCol>

                    <h5>Congregation</h5>
                    <CCol :md="4" class="mb-3">
                        <CFormLabel><sup class="text-danger">*</sup> Congregation</CFormLabel>
                        <CFormSelect
                            required
                            feedbackInvalid="This is required!"
                            v-model="congregation_id"
                            @change="showTotalGroup($event)"
                        >
                        <option value="">Choose...</option>
                            <option
                                v-for="congregation in congregationStore.congregations"
                                :key="congregation"
                                :disabled="congregation.id == authStore.user.current_congregation_id ? false:true"
                                :selected="congregation.id == authStore.user.current_congregation_id ? true:false"
                                :value="congregation.id+','+congregation.total_groups"
                            >{{ congregation.name }}</option>
                        </CFormSelect>
                    </CCol>

                    <CCol :md="4" class="mb-4">
                        <CFormLabel><sup class="text-danger">*</sup> Group </CFormLabel>
                        <CFormSelect
                            required
                            feedbackInvalid="This is required!"
                            v-model="formData.group_no"
                        >
                        <option value="">Choose...</option>
                            <option
                                v-for="index in (totalGroups * 1)"
                                :key="index"
                                :value="index"
                            >{{ index }}</option>
                        </CFormSelect>
                    </CCol>
                    <CCol :xs="12" class="mb-3">
                        <CButton disabled v-if="memberStore.loading">
                            <CSpinner component="span" size="sm" aria-hidden="true"/>
                            Adding member...
                        </CButton>
                        <CButton color="primary" type="submit" :disabled="memberStore.loading" v-else>
                            Submit
                        </CButton>
                    </CCol>
                </CForm>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </template>

  <script>


    import { usePositionStore } from '@/store/position'
    import { useCongregationStore } from '@/store/congregation'
    import { useMemberStore } from '@/store/member'
    import { useAuthStore } from '@/store/auth'
    import { useAddressStore } from '@/store/address'

    import Multiselect from '@vueform/multiselect'

    const positionStore = usePositionStore()
    const congregationStore = useCongregationStore()
    const memberStore = useMemberStore()
    const authStore = useAuthStore()
    const addressStore = useAddressStore()

    export default {
        name: 'Add Member',

        async created() {
            await authStore.getUser()
            positionStore.getPositions()
            congregationStore.getCongregations()

            addressStore.fetchRegions()
            addressStore.fetchProvinces(authStore.showCongregation.region_code)
            addressStore.fetchCities(authStore.showCongregation.province_code)
            addressStore.fetchBrgys(authStore.showCongregation.city_town_code)

            this.formData.region_code = authStore.showCongregation.region_code
            this.formData.province_code = authStore.showCongregation.province_code
            this.formData.city_town_code = authStore.showCongregation.city_town_code
            this.formData.congregation_id = authStore.user.current_congregation_id

            this.totalGroups = authStore.user.congregation.total_groups

        },

        mounted() {
            memberStore.errors = {}
        },

        components: {
            Multiselect,
        },
        data() {
            return {
                positionStore: positionStore,
                congregationStore: congregationStore,
                memberStore: memberStore,
                authStore: authStore,
                addressStore: addressStore,
                value: null,

                options: positionStore.positions,
                totalGroups: 0,
                congregation_id: '',
                validationAdd: null,

                formData: {
                    last_name: '',
                    first_name: '',
                    middle_name: '',
                    gender: '',
                    position_id: [],
                    dobirth: '',
                    dobap: '',
                    phone: '',
                    country_code: 'Philippines',
                    region_code: '',
                    province_code: '',
                    city_town_code: '',
                    brgy_code: '',
                    congregation_id: '',
                    group_no: '',
                }
            }
        },

        methods: {

            showTotalGroup(event) {
                var c = event.target.value.split(',')
                this.formData.congregation_id=parseInt(c[0])
                this.totalGroups=parseInt(c[1])
            },

            handleAdd(event) {
                const form = event.currentTarget
                this.validationAdd = true
                if (form.checkValidity() === false) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                else {
                    // console.log('s - ', this.formData)
                    memberStore.addMember(this.formData)
                }
            },

            changeCityTown(event) {
                this.formData.brgy_code = ''
                this.formData.city_town_code = event.target.value
                addressStore.fetchBrgys(event.target.value)
            },
        }

    }
  </script>

<style src="@vueform/multiselect/themes/default.css"></style>
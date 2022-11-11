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
                    <CCallout color="danger" v-if="Object.keys(memberStore.errors).length" class="bg-warning bg-opacity-10 border-start-5">
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
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
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
                        >Date of Baptized</CFormLabel>
                        <CFormInput
                            type="date"
                            placeholder="Date of Baptized"
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
                            v-for="region in regions" :key="region"
                            :value="region.region_code"
                            :disabled="region.region_code == '07' ? false:true"
                            :selected="region.region_code == '07' ? true:false"
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
                            v-for="province in provinces" :key="province" :value="province.province_code"
                            :disabled="province.province_code == '0712' ? false:true"
                            :selected="province.province_code == '0712' ? true:false"
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
                            @change="selectBrgy($event)"
                        >
                        <option value="">Choose...</option>
                        <option
                            v-for="city in cities" :key="city" :value="city.city_code"
                            :disabled="city.city_code == '071230' ? false:true"
                            :selected="city.city_code == '071230' ? true:false"
                        >
                            {{ city.city_name }}
                        </option>
                        </CFormSelect>
                    </CCol>

                    <CCol :md="4">
                        <CFormLabel><sup class="text-danger">*</sup> Brgy. </CFormLabel>
                        <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="loading.brgys"/>
                        <CFormSelect
                            required
                            feedbackInvalid="This is required!"
                            v-model="formData.brgy_code"
                        >
                        <option value="">Choose...</option>
                        <option
                            v-for="barangay in barangays" :key="barangay" :value="barangay.brgy_code"
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
                            v-model="formData.congregation_id"
                            @change="totalGroups=parseInt($event.target.value)"
                        >
                        <option value="">Choose...</option>
                            <option
                                v-for="congregation in congregationStore.congregations"
                                :key="congregation"
                                :value="congregation.total_groups"
                            >{{ congregation.name }}</option>
                        </CFormSelect>
                    </CCol>

                    <CCol :md="4" class="mb-4">
                        <CFormLabel><sup class="text-danger">*</sup> Group </CFormLabel>
                        <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="loading.brgys"/>
                        <CFormSelect
                            required
                            feedbackInvalid="This is required!"
                            v-model="formData.group_no"
                        >
                        <option value="">Choose...</option>
                            <option
                                v-for="index in totalGroups"
                                :key="index"
                                :value="index"
                            >{{ index }}</option>
                            <option value="0">To be followed</option>
                        </CFormSelect>
                    </CCol>
                    <CCol :xs="12" class="mb-3">
                        <CButton disabled v-if="memberStore.loading">
                            <CSpinner component="span" size="sm" aria-hidden="true"/>
                            Adding member...
                        </CButton>
                        <CButton color="primary" type="submit" :disabled="memberStore.loading" v-else>
                            Submit form
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
    import {
        regions,
        provinces,
        cities,
        barangays,
    } from "select-philippines-address";

    import Multiselect from '@vueform/multiselect'

    const positionStore = usePositionStore()
    const congregationStore = useCongregationStore()
    const memberStore = useMemberStore()

    export default {
        name: 'Add Member',

        mounted() {

            regions().then((region) => this.regions = region);
            provinces('07').then((province) => this.provinces = province);
            cities("0712").then((city) => this.cities = city);
            barangays("071230").then((barangay) => this.barangays = barangay);

            this.formData.region_code = '07' // selected location
            this.formData.province_code = '0712' // selected location
            this.formData.city_town_code = '071230' // selected location

            positionStore.getPositions()
            congregationStore.getCongregations()
        },
        components: {
            Multiselect,
        },
        data() {
            return {
                positionStore: positionStore,
                congregationStore: congregationStore,
                memberStore: memberStore,
                value: null,

                options: positionStore.positions,
                totalGroups: 0,
                validationAdd: null,
                regions: {},
                provinces: {},
                cities: {},
                barangays: {},
                loading: {
                    regions: false,
                    provinces: false,
                    cities: false,
                    brgys: false,
                },
                formData: {
                    last_name: '',
                    first_name: '',
                    middle_name: '',
                    gender: '',
                    position_id: [],
                    dobirth: '',
                    dobap: '',
                    phone: '',
                    country_code: 'Philippnes',
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

            selectBrgy(event) {
                this.loading.brgys = true
                barangays(event.target.value).then((barangay) => this.barangays = barangay, this.loading.brgys = false );
            },


            handleAdd(event) {
                const form = event.currentTarget
                this.validationAdd = true
                if (form.checkValidity() === false) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                else {
                    console.log('1')
                }
                memberStore.addMember(this.formData)

            },
        }

    }
  </script>

<style src="@vueform/multiselect/themes/default.css"></style>
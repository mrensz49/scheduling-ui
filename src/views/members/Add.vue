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
                <!-- v-if="Object.keys(authStore.errors_register).length && !this.v$.$error" -->

                    <CCallout color="danger" v-if="Object.keys(memberStore.errors).length" class="bg-warning bg-opacity-10 border-start-5">
                        <ul>
                            <li v-for="error in memberStore.errors" :key="error" class="text-danger">{{ error[0] }}<br/></li>
                        </ul>
                    </CCallout>



                    <h5>Personal Information</h5>
                    <CCol :md="4">
                        <CFormLabel for="validationTextarea" class="form-label"
                        >Full Name</CFormLabel>
                        <CFormInput
                        placeholder="Full Name"
                        required
                        feedbackInvalid="This is required!"
                        v-model="formData.name"
                        />
                    </CCol>

                    <CCol :md="4">
                        <CFormLabel>Gender</CFormLabel>
                        <CFormSelect required feedbackInvalid="This is required!" v-model="formData.gender">
                            <option value="">Choose...</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </CFormSelect>
                    </CCol>

                    <CCol :md="4">
                        <CFormLabel>Designate</CFormLabel>
                        <CFormSelect required feedbackInvalid="This is required!" v-model="formData.position_id">
                            <option value="">Choose...</option>
                            <option
                                v-for="position in positionStore.positions"
                                :key="position"
                                :value="position.id"
                            >{{ position.name }}</option>
                            <option value="0">To be followed</option>
                        </CFormSelect>
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
                        >Country</CFormLabel>
                        <CFormInput
                            placeholder="Country"
                            disabled
                            required
                            v-model="formData.country_code"
                        />
                    </CCol>

                    <CCol :md="4">
                        <CFormLabel>Region</CFormLabel>
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
                        <CFormLabel>Province</CFormLabel>
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
                        <CFormLabel>City/Town</CFormLabel>
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
                        <CFormLabel>Brgy. </CFormLabel>
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
                        <CFormLabel>Congregation</CFormLabel>
                        <CFormSelect
                            required
                            feedbackInvalid="This is required!"
                            v-model="formData.congregation_id"
                        >
                        <option value="" @click="this.totalGroups=''">Choose...</option>
                            <option
                                v-for="congregation in congregationStore.congregations"
                                :key="congregation"
                                :value="congregation.id"
                                @click="this.totalGroups=congregation.total_groups"
                            >{{ congregation.name }}</option>
                        </CFormSelect>
                    </CCol>

                    <CCol :md="4" class="mb-4">
                        <CFormLabel>Group </CFormLabel>
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

    import {
        regions,
        provinces,
        cities,
        barangays,
    } from "select-philippines-address";


    import { usePositionStore } from '@/store/position'
    import { useCongregationStore } from '@/store/congregation'
    import { useMemberStore } from '@/store/member'

    const positionStore = usePositionStore()
    const congregationStore = useCongregationStore()
    const memberStore = useMemberStore()

    export default {
        name: 'Add Member',

        mounted() {

            regions().then((region) => this.regions = region);
            provinces('07').then((province) => this.provinces = province);
            cities("0712").then((city) => this.cities = city);

            this.formData.region_code = '07' // selected location
            this.formData.province_code = '0712' // selected location

            positionStore.getPosition()
            congregationStore.getCongregation()
        },

        data() {
            return {
                positionStore: positionStore,
                congregationStore: congregationStore,
                memberStore: memberStore,
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
                    name: '',
                    gender: '',
                    position_id: '',
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

                    // console.log('success', this.formData)
                }
                memberStore.addMember(this.formData)

            },
        }

    }
  </script>

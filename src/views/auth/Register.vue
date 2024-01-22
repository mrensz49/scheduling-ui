<template>
    <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow class="justify-content-center">
          <CCol :md="9" :lg="7" :xl="6">
            <CCard class="mx-4">
              <CCardBody class="p-4">

                <CAlert color="warning" v-if="Object.keys(authStore.errors_register).length && !this.v$.$error">
                  <span v-for="error in authStore.errors_register" :key="error"> * {{ error[0] }}<br/></span>
                </CAlert>

                <div class="text-center">
                  <a href="javascript:void(0)" @click="handleHomePageLink()">
                    <img src="@/assets/images/logo/calendar-clock.png" :height="60" alt="logo">
                  </a>
                </div>

                <CForm
                  class="row g-3 needs-validation"
                  @submit.prevent="handleRegister"
                  novalidate
                  >

                  <h1>Register</h1>
                  <p class="text-medium-emphasis">Create your account</p>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Name"
                      required
                      v-model="state.formData.name"
                      :invalid="v$.formData.name.$error"
                      />
                  </CInputGroup>
                  <div v-if="v$.formData.name.$error" class="text-danger">
                    {{ v$.formData.name.$errors[0].$message }}
                  </div>

                  <CInputGroup class="mt-4">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autocomplete="email"
                      required
                      type="email"
                      v-model="state.formData.email"
                      :invalid="v$.formData.email.$error"
                      />
                  </CInputGroup>
                  <div v-if="v$.formData.email.$error" class="text-danger">
                    {{ v$.formData.email.$errors[0].$message }}
                  </div>

                  <CInputGroup class="mt-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      required
                      v-model="state.formData.password"
                      :invalid="v$.formData.password.$error"
                      />
                  </CInputGroup>
                  <div v-if="v$.formData.password.$error" class="text-danger">
                    {{ v$.formData.password.$errors[0].$message }}
                  </div>

                  <CInputGroup class="mt-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      required
                      v-model="state.formData.password_confirmation"
                      :invalid="v$.formData.password_confirmation.$error"
                      />
                  </CInputGroup>
                  <div v-if="v$.formData.password_confirmation.$error" class="text-danger">
                    {{ v$.formData.password_confirmation.$errors[0].$message }}
                  </div>

                  <CRow class="mt-5">
                    <CCol :xs="12" :sm="6" :md="6">
                      <CButton disabled v-if="authStore.user_loading">
                        <CSpinner component="span" size="sm" aria-hidden="true"/>
                        Registering...
                      </CButton>
                      <CButton color="info" type="submit" :disabled="authStore.user_loading" v-else>
                        Create Account
                      </CButton>
                    </CCol>
                    <CCol :xs="12" :sm="6" :md="6" class="text-right">
                      <CButton color="link" class="px-0"  @click="handleLoginLink" :disabled="authStore.user_loading">
                        Already registered?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
                <CRow class="mt-4">
                  <a
                    href="javascript:void(0)"
                    v-if="authStore.isLoggedIn"
                    @click="redirectDashboard()">
                    Click here if you are not redirected automatically
                  </a>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  </template>

<script>

  import { reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { email, required, minLength } from '@vuelidate/validators'

  import { useAuthStore } from '@/store/auth'

  const authStore = useAuthStore()

  export default {

    data() {
      return {
        authStore: authStore
      }
    },

    setup () {

      const state = reactive({
        formData: {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          device_name: 'browser',
        },
      })
      const rules = {
        formData: {
          name: { required },
          email: { required, email },
          password: { required, minLength: minLength(8) },
          password_confirmation: { required },
          device_name: { required },
        }
      }

      const v$ = useVuelidate(rules, state)

      return { state, v$ }
    },

    methods: {
      handleRegister() {

        this.v$.$validate()

        if (!this.v$.$error) {
          authStore.handleRegister(this.state.formData)
        }
      },

      handleLoginLink() {
        this.$router.push('/auth/login')
      },

      handleHomePageLink() {
        this.$router.push('/')
      },

      redirectDashboard() {
        let url = window.location.origin
        location.href = url+'/?#/dashboard';
      }

    }
  }

</script>

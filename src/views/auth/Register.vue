<template>
    <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow class="justify-content-center">
          <CCol :md="9" :lg="7" :xl="6">
            <CCard class="mx-4">
              <CCardBody class="p-4">

                <CAlert color="warning" v-if="Object.keys(errors).length && !this.v$.$error">
                  <span v-show="!this.v$.$error" v-for="error in errors" :key="error"> * {{ error[0] }}<br/></span>
                </CAlert>

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
                      v-model="state.formData.name"
                      required
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
                      v-model="state.formData.email"
                      required
                      type="email"
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
                      v-model="state.formData.password"
                      required
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
                      v-model="state.formData.password_confirmation"
                      required
                      :invalid="v$.formData.password_confirmation.$error"
                    />
                  </CInputGroup>
                  <div v-if="v$.formData.password_confirmation.$error" class="text-danger">
                    {{ v$.formData.password_confirmation.$errors[0].$message }}
                  </div>

                  <CRow class="mt-5">
                    <CCol :xs="6">
                      <CButton disabled v-if="loading">
                        <CSpinner component="span" size="sm" aria-hidden="true"/>
                        Registering...
                      </CButton>
                      <CButton color="info" type="submit" :disabled="loading" v-else>
                        Create Account
                      </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0"  @click="handleLoginLink" :disabled="loading">
                        Already registered?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  </template>

  <script>

  import {  mapActions, mapState } from 'vuex'
  import { reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { email, required, minLength } from '@vuelidate/validators'

  export default {

    name: 'Register',

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

    computed: {
      ...mapState({
        loading: state => state.auth.user_loading,
        errors: state => state.auth.errors,
      }),
    },

    methods: {

        handleRegister() {

          this.v$.$validate()
          console.log(this.state.formData.password)
          console.log(this.state.formData.password_confirmation)

          if (!this.v$.$error) {
            this.login(this.state.formData)
          }

        },

        handleLoginLink() {
            this.$router.push('/auth/login')
        },

        ...mapActions('auth', ['login']),
    }
  }
  </script>

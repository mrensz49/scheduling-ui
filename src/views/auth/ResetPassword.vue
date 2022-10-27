<template>
    <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow class="justify-content-center">
          <CCol :md="9" :lg="7" :xl="6">
            <CCard class="mx-4">
              <CCardBody class="p-4">
                <CForm @submit.prevent="handleResetPassword">
                  <h1>Reset Password</h1>
                  <p class="text-medium-emphasis">Reset your password</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" autocomplete="email" v-model="formData.email" readonly/>
                  </CInputGroup>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      v-model="formData.password"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      v-model="formData.password_confirmation"
                    />
                  </CInputGroup>
                  <div class="d-grid">
                    <CButton color="success"  type="submit">Submit</CButton>
                    <p class="text-center">or</p>
                    <CButton color="secondary" class="mt-n8" @click="handleLoginLink">Login</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  </template>

  <script>

  import axios from 'axios';

  export default {

    name: 'ResetPassword',

    data() {
        return {

            formData: {
                token: this.$route.params.token,
                email: this.$route.params.email,
                password: '',
                password_confirmation: '',
            },
            errors: {}
        }
    },

    methods: {

        handleResetPassword() {
            axios.post('/api/reset-password', this.formData).then(response => {
                console.log(response)
            }).catch((errors) => {
                this.errors = errors.response.data.errors
            });
        },

        handleLoginLink() {
            this.$router.push('/auth/login')
        }
    }
  }
  </script>

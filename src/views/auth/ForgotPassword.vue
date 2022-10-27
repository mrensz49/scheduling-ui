<template>
    <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow class="justify-content-center">
          <CCol :md="9" :lg="7" :xl="6">
            <CCard class="mx-4">
              <CCardBody class="p-4">
                <CForm @submit.prevent="handleForgotPassword">
                  <h1>Forgot Password?</h1>
                  <p class="text-medium-emphasis">No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one. </p>

                  <CInputGroup class="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" autocomplete="email" v-model="formData.email"/>
                  </CInputGroup>

                  <div class="d-grid">
                    <CButton color="success"  type="submit">Email Password Reset Link</CButton>
                    <p class="text-center">or</p>
                    <CButton color="secondary" class="mt-n8" @click="handleLoginLink">Back to Login</CButton>
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

    name: 'ForgotPassword',

    data() {
        return {

            formData: {
                email: '',
            },
            errors: {}
        }
    },

    methods: {

        handleForgotPassword() {
            axios.post('/api/forgot-password', this.formData).then(response => {
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

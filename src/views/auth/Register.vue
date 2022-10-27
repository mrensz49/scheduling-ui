<template>
    <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow class="justify-content-center">
          <CCol :md="9" :lg="7" :xl="6">
            <CCard class="mx-4">
              <CCardBody class="p-4">
                <CForm @submit.prevent="handleRegister">
                  <h1>Register</h1>
                  <p class="text-medium-emphasis">Create your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput placeholder="Name" autocomplete="name" v-model="formData.name"/>
                  </CInputGroup>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" autocomplete="email" v-model="formData.email"/>
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
                    <CButton color="success"  type="submit">Create Account</CButton>
                    <p class="text-center">or</p>
                    <CButton color="secondary" class="mt-n8" @click="handleLoginLink">Already registered?</CButton>
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

    name: 'Register',

    data() {
        return {

            formData: {
                name: '',
                email: '',
                password: 'password',
                password_confirmation: 'password',
                device_name: 'browser',
            },
            errors: {}
        }
    },

    methods: {

        handleRegister() {
            axios.post('/api/register', this.formData).then(response => {
                localStorage.setItem('scheduling_token', response.data.token)
                this.$router.push('/')
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

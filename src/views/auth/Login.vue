<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm
                  novalidate
                  :validated="validatedCustom01"
                  @submit.prevent="handleLogin"
                >
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      v-model="formData.email"
                      required
                      feedbackValid="Looks good!"
                      id="validationCustom01"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autocomplete="current-password"
                      v-model="formData.password"
                      required
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" type="submit" class="px-4"> Login </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0"  @click="handleForgotPasswordLink">
                        Forgot password?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <CButton color="light" variant="outline" class="mt-3" @click="handleRegisterLink()">
                    Register Now!
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'Login',

  data() {
    return {
        secrets: [],
        formData: {
          email: 'asd',
          password: null,
          device_name: 'browser',
        },
        errors: {}
    }
  },

  methods: {


    validatedCustom01() {

      return true;

    },

    handleLogin() {

      axios.get('/sanctum/csrf-cookie').then(response => {

          console.log('response', response)
          axios.post('/api/login', this.formData).then(response => {

              localStorage.setItem('scheduling_token', response.data)
              this.$router.push('/')
            }).catch((errors) => {
              this.errors = errors.response.data.errors
          });
      });
    },

    handleRegisterLink() {

      this.$router.push('/auth/register')
    },

    handleForgotPasswordLink() {

      this.$router.push('/auth/forgot-password')
    }
  },

}
</script>

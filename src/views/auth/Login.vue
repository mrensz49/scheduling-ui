<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>

                <CAlert color="warning" v-if="Object.keys(authStore.errors_login).length && !this.v$.$error">
                  <span v-for="error in authStore.errors_login" :key="error"> * {{ error[0] }}<br/></span>
                </CAlert>

                <CForm
                  novalidate
                  @submit.prevent="handleLogin"
                >
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      required
                      v-model="state.formData.email"
                      :invalid="v$.formData.email.$error"
                    />
                  </CInputGroup>
                  <div v-if="v$.formData.email.$error" class="text-danger">
                    {{ v$.formData.email.$errors[0].$message }}
                  </div>

                  <CInputGroup class="mt-3">
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

                  <CRow class="mt-4">
                    <CCol :xs="6">
                      <CButton disabled v-if="authStore.user_loading">
                        <CSpinner component="span" size="sm" aria-hidden="true"/>
                        Logging In...
                      </CButton>
                      <CButton color="primary" type="submit" class="px-4" :disabled="authStore.user_loading" v-else> Login </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0" :disabled="authStore.user_loading" @click="handleForgotPasswordLink">
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
                  <CButton color="light" variant="outline" class="mt-3" :disabled="authStore.user_loading" @click="handleRegisterLink()">
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

  import { reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { email, required } from '@vuelidate/validators'

  import { useAuthStore } from '@/store/auth'

  const authStore = useAuthStore()

export default {
  name: 'Login',

  data() {
    return {
      authStore: authStore
    }
  },

  setup () {

    const state = reactive({
      formData: {
        email: 'asd@yahoo.com',
        password: '',
        device_name: 'browser',
      },
    })
    const rules = {
      formData: {
        email: { required, email },
        password: { required },
        device_name: { required },
      }
    }

    const v$ = useVuelidate(rules, state)

    return { state, v$ }
  },


  methods: {


    handleLogin() {

      this.v$.$validate()

      if (!this.v$.$error) {
        authStore.handleLogin(this.state.formData)
      }
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

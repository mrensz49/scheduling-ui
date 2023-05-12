<template>
    <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow class="justify-content-center">

            <span class="text-center" v-if="loading">
                <CSpinner  component="span" aria-hidden="true"/>
                <i class="ms-2">verifying ....</i>
            </span>

            <CAlert color="danger" v-if="Object.keys(errors).length">
                <h5>{{ errors }} </h5>
                <p v-if="errors == 'Unauthorized action.'">
                    For security purposes, you must use the same browser you registered with to validate your account.
                </p>
            </CAlert>

            <CBadge color="success" v-if="Object.keys(success).length">
                <h3 class="text-center text-uppercase">{{ success == 1 ? 'Already Verified':success }}</h3>
                <small v-show="success!=1">redirecting to dashboard.</small>
            </CBadge>

        </CRow>
      </CContainer>
    </div>
</template>
<script>

    import axios from 'axios';

    export default {

        name: 'VerifyEmail',

        data() {
            return {
                success: {},
                errors: {},
                loading: false
            }
        },

        mounted() {
            let url = window.location.origin
            const hash = process.env.NODE_ENV == 'development'
                            ? this.$route.params.hash+'?expires='+this.$route.query.expires+'?signature='+this.$route.query.signature
                            : this.$route.params.hash

            this.loading = true
            axios.interceptors.request.use(function(config) {
                const token = localStorage.getItem('scheduling_token');
                if(token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            }, function(err) {
                return Promise.reject(err);
            });

            let path = process.env.NODE_ENV == 'development' ? process.env.VUE_APP_URL+'api/verify-email/' : 'https://rscheduling.xyz/be/api/verify-email/'
            axios.get(`${path}${this.$route.params.id}/${hash}`).then(response => {

                this.success = response.data.message

                if (response.data.message != 1) {
                    localStorage.setItem('scheduling_token', response.data.token)
                    localStorage.setItem('scheduling_id', response.data.user.id)
                    setTimeout(()=>{
                        location.href = url+'/?#/dashboard';
                    },1500)
                }
                this.loading = false
            }).catch((errors) => {
                this.loading = false
                this.errors = errors.response.data?.message
            });

        }
    }
</script>
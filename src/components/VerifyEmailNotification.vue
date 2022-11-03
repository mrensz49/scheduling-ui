<template>
    <CAlert color="warning" v-if="authStore.isLoggedIn && !authStore.user.email_verified_at">
        Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? <br />
        If you didn't receive the email, we will gladly send you another.

            <CButton class="btn-sm ml-3" disabled v-if="authStore.verification_loading">
                <CSpinner component="span" size="sm" aria-hidden="true"/>
                Resending verification...
            </CButton>
            <CButton color="dark" class="btn-sm ml-3" :disabled="authStore.verification_loading" @click="authStore.handleResendVerification()" v-else>
                Resend verification
            </CButton>
    </CAlert>
</template>

<script setup>
    import { useAuthStore } from '@/store/auth'

    const authStore = useAuthStore()

    authStore.getUser()
</script>

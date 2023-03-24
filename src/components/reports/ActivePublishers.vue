<template>
    <CCard class="mb-4"  width="50%">
        <CCardBody>
            <h5>Active Publishers</h5>
            <p>Count all persons in the congregation who reported at least once in the last 6 months.</p>

            <CInputGroup class="flex-nowrap">
                <CInputGroupText
                    id="addon-wrapping"
                    class="pointer"
                    @click="fieldServiceStore.calculateAP(this.$route.params.year+'-'+this.$route.params.month+'-01')"
                >Calculate</CInputGroupText>
                <CFormInput
                    :value="fieldServiceStore.countsAP"
                    placeholder="Click the button to calculate"
                    aria-label="Calculate"
                    readonly
                    aria-describedby="addon-wrapping"
                />
            </CInputGroup>
        </CCardBody>
    </CCard>
</template>

<script setup>

    import { useFieldServiceStore } from '@/store/field_service'
    const fieldServiceStore = useFieldServiceStore()

</script>
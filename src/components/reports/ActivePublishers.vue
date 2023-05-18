<template>
    <CCard class="mb-4 shadow bg-body rounded"  width="50%">
        <CCardBody>
            <h5>Active Publishers</h5>
            <p>Count all persons in the congregation who reported at least once in the last 6 months.</p>

            <CInputGroup class="flex-nowrap">
                <CInputGroupText
                    id="addon-wrapping"
                    class="pointer"
                    @click="fieldServiceStore.activePublishers({
                        'date': fieldServiceStore.date_rendered,
                        'type': 'count',
                    })"
                >
                    <span v-if="fieldServiceStore.active_publishers.active">Re-calculate</span>
                    <span v-else>Calculate</span>
                    <span v-if="fieldServiceStore.ap_loading">...<CSpinner color="primary" class="ms-1" component="span" size="sm" aria-hidden="true"/></span>
                </CInputGroupText>
                <CFormInput
                    :value="fieldServiceStore.active_publishers.active"
                    placeholder="Click the button to calculate"
                    aria-label="Calculate"
                    readonly
                    aria-describedby="addon-wrapping"
                />
                <CInputGroupText
                    v-if="fieldServiceStore.active_publishers.active"
                    class="pointer"
                    @click="fieldServiceStore.activePublishers({
                        'date': fieldServiceStore.date_rendered,
                        'type': 'get',
                    })"
                >
                    Show
                </CInputGroupText>
            </CInputGroup>
        </CCardBody>
    </CCard>
</template>

<script setup>

    import { useFieldServiceStore } from '@/store/field_service'
    const fieldServiceStore = useFieldServiceStore()

    fieldServiceStore.activePublishers({
        'date': fieldServiceStore.date_rendered,
        'type': 'show',
    })

</script>
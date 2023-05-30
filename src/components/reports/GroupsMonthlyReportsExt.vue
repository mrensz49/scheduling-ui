<template>
    <CListGroup flush>
        <CListGroupItem>
            <CFormInput type="text" :id="floatId" :floatingLabel="label"
                readonly
                :value="data"
            />
        </CListGroupItem>
    </CListGroup>
</template>

<script>

    export default {

        name: 'GroupsMonthlyReportsExt',
        props: [
            'floatId',
            'label',
            'data',
        ]
    }

</script>
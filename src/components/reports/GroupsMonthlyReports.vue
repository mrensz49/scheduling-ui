<template>
    <CAccordion :active-item-key="1" always-open class="mt-4">
         <CAccordionItem :item-key="1">
            <CAccordionHeader>
               <h3>Grand Total</h3>
            </CAccordionHeader>
            <CAccordionBody>
                <GroupsMonthlyReportsExt
                    floatId="floatingPlacement"
                    label="Placements"
                    :data="fieldServiceStore.data['placements']"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingVideoShowings"
                    label="Video Showings"
                    :data="fieldServiceStore.data['video_showings']"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingHours"
                    label="Hours"
                    :data="fieldServiceStore.data['hours']"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingReturnVisits"
                    label="Return Visits"
                    :data="fieldServiceStore.data['return_visits']"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingBibleStudies"
                    label="Bible Studies"
                    :data="fieldServiceStore.data['bible_studies']"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingBibleStudies"
                    label="Credit Hours"
                    :data="fieldServiceStore.data['credit_hours']"
                />
            </CAccordionBody>
        </CAccordionItem>
    </CAccordion>

    <CAccordion :active-item-key="1" always-open class="mt-4">
         <CAccordionItem :item-key="1">
            <CAccordionHeader>
               <h3 class="text-warning">Publishers</h3>
            </CAccordionHeader>
            <CAccordionBody>
                <GroupsMonthlyReportsExt
                    floatId="floatingNoOfReports"
                    label="No. of Reports"
                    :data="reportsPubs.reports.publishers ?? 0"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingPlacement"
                    label="Placements"
                    :data="fieldServiceStore.data['publshr_placements']"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingVideoShowings"
                    label="Video Showings"
                    :data="fieldServiceStore.data['publshr_vs']"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingHours"
                    label="Hours"
                    :data="fieldServiceStore.data['publshr_hours']"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingReturnVisits"
                    label="Return Visits"
                    :data="fieldServiceStore.data['publshr_rv']"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingBibleStudies"
                    label="Bible Studies"
                    :data="fieldServiceStore.data['publshr_bs']"
                />
            </CAccordionBody>
        </CAccordionItem>
    </CAccordion>

    <CAccordion :active-item-key="1" always-open class="mt-4">
         <CAccordionItem :item-key="1">
            <CAccordionHeader>
               <h3 class="text-warning">Auxiliary Pioneers</h3>
            </CAccordionHeader>
            <CAccordionBody>
                <GroupsMonthlyReportsExt
                    floatId="floatingNoOfReports"
                    label="No. of Reports"
                    :data="reportsPubs.reports.auxiliary_pioneers ?? 0"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingPlacement"
                    label="Placements"
                    :data="fieldServiceStore.data['reports']['auxillary_pioneer']['placements']"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingVideoShowings"
                    label="Video Showings"
                    :data="fieldServiceStore.data['reports']['auxillary_pioneer']['video_showings']"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingHours"
                    label="Hours"
                    :data="fieldServiceStore.data['reports']['auxillary_pioneer']['hours']"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingReturnVisits"
                    label="Return Visits"
                    :data="fieldServiceStore.data['reports']['auxillary_pioneer']['return_visits']"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingBibleStudies"
                    label="Bible Studies"
                    :data="fieldServiceStore.data['reports']['auxillary_pioneer']['bible_studies']"
                />
            </CAccordionBody>
        </CAccordionItem>
    </CAccordion>

    <CAccordion :active-item-key="1" always-open class="mt-4">
         <CAccordionItem :item-key="1">
            <CAccordionHeader>
               <h3 class="text-warning">Special/Regular Pioneers</h3>
            </CAccordionHeader>
            <CAccordionBody>
                <GroupsMonthlyReportsExt
                    floatId="floatingNoOfReports"
                    label="No. of Reports"
                    :data="reportsPubs.reports.regular_pioneers ?? 0"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingPlacement"
                    label="Placements"
                    :data="fieldServiceStore.data['reports']['regular_pioneer']['placements'] + fieldServiceStore.data['reports']['special_pioneer']['placements']"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingVideoShowings"
                    label="Video Showings"
                    :data="fieldServiceStore.data['reports']['regular_pioneer']['video_showings'] + fieldServiceStore.data['reports']['special_pioneer']['video_showings']"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingHours"
                    label="Hours"
                    :data="fieldServiceStore.data['reports']['regular_pioneer']['hours'] + fieldServiceStore.data['reports']['special_pioneer']['hours']"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingReturnVisits"
                    label="Return Visits"
                    :data="fieldServiceStore.data['reports']['regular_pioneer']['return_visits'] + fieldServiceStore.data['reports']['special_pioneer']['return_visits']"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingBibleStudies"
                    label="Bible Studies"
                    :data="fieldServiceStore.data['reports']['regular_pioneer']['bible_studies'] + fieldServiceStore.data['reports']['special_pioneer']['bible_studies']"
                />
            </CAccordionBody>
        </CAccordionItem>
    </CAccordion>

    <CAccordion :active-item-key="1" always-open class="mt-4">
         <CAccordionItem :item-key="1">
            <CAccordionHeader>
               <h3>Regular Pioneers</h3>
            </CAccordionHeader>
            <CAccordionBody>
                <GroupsMonthlyReportsExt
                    floatId="floatingPlacement"
                    label="Placements"
                    :data="fieldServiceStore.data['reports']['regular_pioneer']['placements']"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingVideoShowings"
                    label="Video Showings"
                    :data="fieldServiceStore.data['reports']['regular_pioneer']['video_showings']"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingHours"
                    label="Hours"
                    :data="fieldServiceStore.data['reports']['regular_pioneer']['hours']"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingReturnVisits"
                    label="Return Visits"
                    :data="fieldServiceStore.data['reports']['regular_pioneer']['return_visits']"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingBibleStudies"
                    label="Bible Studies"
                    :data="fieldServiceStore.data['reports']['regular_pioneer']['bible_studies']"
                />
            </CAccordionBody>
        </CAccordionItem>
    </CAccordion>

    <CAccordion :active-item-key="1" always-open class="mt-4 mb-4">
         <CAccordionItem :item-key="1">
            <CAccordionHeader>
               <h3>Special Pioneers</h3>
            </CAccordionHeader>
            <CAccordionBody>
                <GroupsMonthlyReportsExt
                    floatId="floatingPlacement"
                    label="Placements"
                    :data="fieldServiceStore.data['reports']['special_pioneer']['placements']"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingVideoShowings"
                    label="Video Showings"
                    :data="fieldServiceStore.data['reports']['special_pioneer']['video_showings']"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingHours"
                    label="Hours"
                    :data="fieldServiceStore.data['reports']['special_pioneer']['hours']"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingReturnVisits"
                    label="Return Visits"
                    :data="fieldServiceStore.data['reports']['special_pioneer']['return_visits']"
                />

                <GroupsMonthlyReportsExt
                    floatId="floatingBibleStudies"
                    label="Bible Studies"
                    :data="fieldServiceStore.data['reports']['special_pioneer']['bible_studies']"
                />
            </CAccordionBody>
        </CAccordionItem>
    </CAccordion>

</template>

<script>

    import GroupsMonthlyReportsExt from '@/components/reports/GroupsMonthlyReportsExt'
    import { useFieldServiceStore } from '@/store/field_service'
    import { useReportsPubsStore } from '@/store/reportspubs'

    const fieldServiceStore = useFieldServiceStore()
    const reportsPubs = useReportsPubsStore()

    export default {

        name: 'GroupsMonthlyReports',
        data() {

            return {
                fieldServiceStore: fieldServiceStore,
                reportsPubs: reportsPubs,
            }
        },

        components: {
            GroupsMonthlyReportsExt
        },
    }

</script>
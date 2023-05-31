<template>
  <div>

    <VerifyEmailNotification />
    <ModalNoSetupCongregation v-if="typeof authStore.user?.current_congregation_id !== 'undefined' && !authStore.user?.current_congregation_id"/>

    <CRow>
      <CCol :md="12" :sm="12">
        <CCard class="mb-4 shadow bg-body rounded">
          <CCardHeader>
            <h4>{{ authStore.user.congregation?.name }}</h4>
            <span v-if="congregationStore.loading"><CSpinner color="primary" class="ms-1" component="span" size="sm" aria-hidden="true"/></span>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol :sm="12">
                <CRow>
                  <CCol :sm="3">
                    <div
                      class="border-start border-start-4 border-start-info py-1 px-3 mb-3"
                    >
                      <div class="text-medium-emphasis small">Members</div>
                      <div class="fs-5 fw-semibold">
                        <a href="javascript:void" class="text-dark text-decoration-none" @click="viewAllMembers()">
                          {{ congregationStore.genders.members_count}}
                        </a>
                      </div>
                    </div>
                  </CCol>
                  <CCol :sm="3">
                    <div
                      class="border-start border-start-4 border-start-success py-1 px-3 mb-3"
                    >
                      <div class="text-medium-emphasis small">Number of Group</div>
                      <div class="fs-5 fw-semibold">
                        <a href="javascript:void" class="text-dark text-decoration-none" @click="viewgroup()">
                          {{ authStore.user.congregation?.total_groups }}
                        </a>
                      </div>
                    </div>
                  </CCol>

                  <template v-for="(position, index) in positionStore.positions" :key="position">
                  <CCol :sm="3" v-if="showOnlyDesignates(position.name)">
                    <div
                      :class="'border-start-'+[showColor(index+=1)] + ' border-start border-start-4 py-1 px-3 mb-3'"
                    >

                      <div class="text-medium-emphasis small">{{ position.name }}</div>
                      <div class="fs-5 fw-semibold">
                        <a href="javascript:void" class="text-dark text-decoration-none" @click="viewposition(position.id)">
                          {{ position.congregation_designates_count }}
                        </a>
                      </div>
                    </div>
                  </CCol>
                </template>
                </CRow>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol :md="8" :sm="12">
        <CCard class="mb-4 shadow bg-body rounded">
          <CCardHeader>
            <h5>Stats</h5>
          </CCardHeader>
          <CCardBody>
            <CRow>

              <CCol :sm="12" :md="5" :lg="5">

                <div
                  class="progress-group"
                >
                  <div class="progress-group-header">
                    <CIcon icon="cil-user" class="me-2" size="lg" />
                    <span class="title">Brother</span>
                    <span class="ms-auto fw-semibold">
                      {{ congregationStore.genders.member_male_count }} <sup>or</sup> {{ congregationStore.genders.member_male_percent }}%
                    </span>
                  </div>
                  <div class="progress-group-bars">
                    <CProgress thin :value="congregationStore.genders.member_male_percent" :color="congregationStore.genders.member_male_count > congregationStore.genders.member_female_count ? 'success':'warning'" />
                  </div>
                </div>

                <div
                  class="progress-group"
                >
                  <div class="progress-group-header">
                    <CIcon icon="cil-user-female" class="me-2" size="lg" />
                    <span class="title">Sister</span>
                    <span class="ms-auto fw-semibold">
                      {{ congregationStore.genders.member_female_count }} <sup>or</sup> {{ congregationStore.genders.member_female_percent }}%
                    </span>
                  </div>
                  <div class="progress-group-bars">
                    <CProgress thin :value="congregationStore.genders.member_female_percent" :color="congregationStore.genders.member_male_count < congregationStore.genders.member_female_count ? 'success':'warning'" />
                  </div>
                </div>

                <div class="mb-5"></div>

              </CCol>
              <CCol :sm="12" :md="7" :lg="7">

                <div
                  class="progress-group"
                >
                  <div class="progress-group-header">
                    <CIcon icon="cil-phone" class="me-2" size="lg" />
                    <span class="title">Phone registered</span>
                    <span class="ms-auto fw-semibold">
                      {{ congregationStore.data.numbers?.registered_count }} /
                      {{ congregationStore.genders.members_count}}
                      <sup>or</sup> {{ congregationStore.data.numbers?.registered_percent }}%
                    </span>
                  </div>
                  <div class="progress-group-bars">
                    <CProgress thin :value="congregationStore.data.numbers?.registered_percent" :color="congregationStore.data.numbers?.registered_percent > congregationStore.data.numbers?.unregistered_percent ? 'success':'warning'" />
                  </div>
                </div>

                <div
                  class="progress-group"
                >
                  <div class="progress-group-header">
                    <CIcon icon="cil-calendar" class="me-2" size="lg" />
                    <span class="title">DOBirth setup</span>
                    <span class="ms-auto fw-semibold">
                      {{ congregationStore.data.dobirths?.setup }} /
                      {{ congregationStore.genders.members_count }}
                      <sup>or</sup> {{ congregationStore.data.dobirths?.setup_percent }}%
                    </span>
                  </div>
                  <div class="progress-group-bars">
                    <CProgress thin :value="congregationStore.data.dobirths?.setup_percent" :color="congregationStore.data.dobirths?.setup_percent > congregationStore.data.dobirths?.unsetup_percent ? 'success':'warning'" />
                  </div>
                </div>
                <div class="mb-5"></div>
              </CCol>
            </CRow>

            <CRow>
              <CCol :sm="12" :md="9" :lg="9">

                <hr class="mt-0" />
                <CSpinner v-if="fieldServiceStore.loading" color="warning" class="ms-1" component="span" size="sm" aria-hidden="true"/>
                <CChartBar v-if="fieldServiceStore.show_fs"
                  :data="{
                    labels: fieldServiceStore.fs_report.group,
                    datasets: [
                      {
                        label: fieldServiceStore.fs_report.hours,
                        backgroundColor: '#FFCE56',
                        data: fieldServiceStore.fs_report.count,
                      },
                    ],
                  }"
                  labels="months"
                />
              </CCol>
            </CRow>

          </CCardBody>
        </CCard>
      </CCol>
      <CCol :md="4" :sm="12">
        <CCard class="mb-4 shadow bg-body rounded">
          <CCardHeader>
            <h5>Avg. Meeting Att.</h5>
          </CCardHeader>
          <CCardBody>
            <div class="table-responsive">
            <CTable small>
              <CTableHeaderCell scope="col" class="w-25">Date</CTableHeaderCell>
              <CTableHeaderCell scope="col" class="w-25"><small>Midweek</small></CTableHeaderCell>
              <CTableHeaderCell scope="col" class="w-25"><small>Weekend</small></CTableHeaderCell>
              <CTableBody>
                <CTableRow v-for="attendance in attendanceStore.attendances" :key="attendance">
                  <CTableDataCell><code>{{ getHumanDate(attendance.year_month) }}</code></CTableDataCell>
                  <CTableDataCell><code>{{ attendance.midweek }}</code></CTableDataCell>
                  <CTableDataCell><code>{{ attendance.weekend }}</code></CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

  </div>
</template>

<script>
  import moment from 'moment'
  import router from '@/router'
  import { CChartBar } from '@coreui/vue-chartjs'
  import VerifyEmailNotification from '@/components/VerifyEmailNotification.vue'
  import  ModalNoSetupCongregation from '@/components/modal/ModalNoSetupCongregation.vue'


  import { useCongregationStore } from '@/store/congregation'
  import { usePositionStore } from '@/store/position'
  import { useAttendanceStore } from '@/store/attendance'
  import { useAuthStore } from '@/store/auth'
  import { useFieldServiceStore } from '@/store/field_service'

  const congregationStore = useCongregationStore()
  const positionStore = usePositionStore()
  const authStore = useAuthStore()
  const fieldServiceStore = useFieldServiceStore()
  const attendanceStore = useAttendanceStore()

  congregationStore.getCongregationGenders()
  congregationStore.getCongregationDetails()


  positionStore.getPositions()

  fieldServiceStore.latestFSReport()

  attendanceStore.congAttendances()

  export default {

    name: 'Dashboard',

    data() {
      return {
        congregationStore:congregationStore,
        positionStore:positionStore,
        authStore:authStore,
        fieldServiceStore:fieldServiceStore,
        attendanceStore:attendanceStore,
      }
    },
    mounted() {},
    components: {

      VerifyEmailNotification, CChartBar, ModalNoSetupCongregation
    },
    methods: {

      viewposition(id) {
          router.push({name: 'Position', params: { id: id } })
      },

      viewgroup() {
          router.push({name: 'Group' })
      },

      viewAllMembers() {
        this.$router.push('/member/position/all')
      },

      showOnlyDesignates(name) {
        if (name == 'Elder' || name == 'Ministerial' || name == 'Special Pioneer' || name == 'Regular Pioneer' || name == 'Auxillary Pioneer') {
          return name
        }
      },

      getHumanDate(date) {
          return moment(date, 'YYYY-MM-DD').format('MMM Y');
      },

      showColor(index) {
        switch(index) {
          case 1:
          case 5:
            return 'warning'
          case 2:
            return 'danger'
          case 3:
            return 'info'
          case 4:
            return 'success'
          default:
            return 'default'
        }
      }
    }

  }
</script>

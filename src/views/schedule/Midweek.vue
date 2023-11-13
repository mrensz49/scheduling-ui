<template>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader> <CIcon icon="cil-calendar" /> Setup Midweek Schedule </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol :md="4">
                <CFormSelect
                required
                    feedbackInvalid="This is required!"
                    @change="splitDate($event)"
                    >
                    <option value="">Select a week...</option>
                    <option
                    v-for="week in helperStore.showWeeks" :key="week"
                    :value="week.dateStart+'-'+week.dateEnd"
                    >
                    {{ week.start }} - {{ week.end }}
                  </option>
                </CFormSelect>
              </CCol>
              <CCol>
                <CSpinner class="mt-2" v-if="assignmentStore.loading" component="span" size="sm" aria-hidden="true"/>
              </CCol>
              <CCol>
                <p class="text-end pointer" @click="helperStore.visibleModalMemberAssigments=true">
                  <CIcon icon="cil-history" /> view assignments
                </p>
              </CCol>

              <CCol :md="12" v-if="this.date_start">
                <CCard class="mt-4 mb-4 shadow-lg bg-body rounded">
                  <CCardBody class="table-responsive mb-4">
                    <table width="100%">
                      <tr>
                        <td class="text-uppercase"><h5><b>{{ assignmentStore.data.congregation?.name }}</b></h5></td>
                        <td class="text-end"><h3><b>Eskedyul sa Midweek nga Tigom</b></h3></td>
                      </tr>
                    </table>
                    <hr class="border border-dark border-3 mt-0">
                    <table class="fw-bolder" width="100%">
                      <tr>
                        <td colspan="2" width="55%" class="ps-2">{{ week_date }} | SENEMANANG PAGBASA SA BIBLIYA</td>
                        <td class="text-end fw-semibold text-muted">Tsirman:</td>
                        <td class="ps-2" width="30%">
                          <span v-if="!helperStore.edit_name['edit_intro']">
                            <span v-if="assignmentStore.data.chairman_member_id?.gender == 'Female'">Sis.</span>
                            <span v-else>Bro.</span>
                            {{ assignmentStore.data.chairman_member_id?.abbr_name }}
                          </span>
                          <span v-else>
                            <v-select label="name" v-model="formData.chairman_member_id" :filterable="false" :options="optionsEMS" @search="onSearchEMS"></v-select>
                          </span>
                        </td>
                        <td class="ps-2">
                          <EditClose
                            edit_val = 'edit_intro'
                            @click="helperStore.edit_name['edit_intro']
                                    ? updateSetup('edit_intro') : setData('edit_intro')"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>&nbsp;</td>
                      </tr>

                      <tr>
                        <td class="ps-2" width="7%">0:00</td>
                        <td>

                          <span v-if="!helperStore.edit_name['edit_intro']">
                            <span style="color:#4f5d73;">&#x2022;</span>
                            Awit {{ assignmentStore.data.song_no_opening?.song_no }} &#8212;
                            {{ assignmentStore.data.song_no_opening?.title }}
                          </span>
                          <span v-else>
                            <v-select label="song_no_title" v-model="formData.song_no_opening" placeholder="Song No" :filterable="false" :options="optionSongs" @search="onSearchSong"></v-select>
                          </span>

                        </td>
                        <td class="text-end fw-semibold text-muted">Pag-ampo:</td>
                        <td class="ps-2">
                          <span v-if="assignmentStore.data.chairman_member_id?.gender == 'Female'">Sis.</span>
                            <span v-else>Bro.</span>
                            {{ assignmentStore.data.chairman_member_id?.abbr_name }}
                        </td>
                      </tr>

                      <tr>
                        <td class="ps-2">0:00</td>
                        <td><span style="color:#4f5d73;">&#x2022;</span> Introduksiyon 1(min.)</td>
                      </tr>

                      <tr>
                        <td>&nbsp;</td>
                      </tr>

                      <!-- BAHANDI GIKAN SA PULONG SA DIYOS -->
                      <tr>
                        <td style="border:1px solid black; background-color: #4f5d73; color:white" colspan="2" class="ps-2">BAHANDI GIKAN SA PULONG SA DIYOS</td>
                        <td></td>
                        <td class="ps-2 text-muted">Main Hall</td>
                        <td class="ps-2">
                          <EditClose
                            edit_val = 'edit_treasures'
                            @click="helperStore.edit_name['edit_treasures']
                                    ? updateSetup('edit_treasures') : setData('edit_treasures')"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="ps-2">0:00</td>
                        <td>

                          <span style="color:#4f5d73;" class="me-1">&#x2022;</span>
                          <span v-if="treasureStore.treasure.title" :class="[treasureStore.treasure.title.length >= 40 ? 'text-sm-14':'']">
                            {{  treasureStore.treasure.title }}
                          </span>
                          <span v-else class="text-primar">
                            <span v-if="$can('can-add-setup')" class="pointer text-decoration-underline text-primary" @click="addTreasure()" title="Click here to add a Title">+add</span>
                          </span>
                          <small class="ms-3">(10 min)</small>

                        </td>
                        <td class="text-end fw-semibold"></td>
                        <td class="ps-2">
                          <span v-if="!helperStore.edit_name['edit_treasures']">
                            <span v-if="assignmentStore.data.meeting_treasures_member_id?.gender == 'Female'">Sis.</span>
                            <span v-else>Bro.</span>
                            {{ assignmentStore.data.meeting_treasures_member_id?.abbr_name }}
                          </span>
                          <span v-else>
                            <v-select label="name" v-model="formData.meeting_treasures_member_id" :filterable="false" :options="optionsEMS" @search="onSearchEMS"></v-select>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="ps-2">0:00</td>
                        <td><span style="color:#4f5d73;">&#x2022;</span> Espiritwal nga Bahandi <small>(10 min)</small></td>
                        <td class="text-end fw-semibold"></td>
                        <td class="ps-2">

                          <span v-if="!helperStore.edit_name['edit_treasures']">
                            <span v-if="assignmentStore.data.spiritual_gem_member_id?.gender == 'Female'">Sis.</span>
                            <span v-else>Bro.</span>
                            {{ assignmentStore.data.spiritual_gem_member_id?.abbr_name }}
                          </span>
                          <span v-else>
                            <v-select label="name" v-model="formData.spiritual_gem_member_id" :filterable="false" :options="optionsEMS" @search="onSearchEMS"></v-select>
                          </span>

                        </td>
                      </tr>
                      <tr>
                        <td class="ps-2">0:00</td>
                        <td>
                          <table width="100%">
                            <tr>
                              <td>
                                <span style="color:#4f5d73;">&#x2022;</span> Pagbasa sa Bibliya <small>(5 min)</small>
                              </td>
                              <td class="text-end text-muted"><small>Estudyante:</small></td>
                            </tr>
                          </table>
                        </td>
                        <td class="text-end fw-semibold"></td>
                        <td class="ps-2">
                          <span v-if="!helperStore.edit_name['edit_treasures']">
                            <span v-if="assignmentStore.data.bible_reading_member_id?.gender == 'Female'">Sis.</span>
                            <span v-else>Bro.</span>
                            {{ assignmentStore.data.bible_reading_member_id?.name }}
                          </span>
                          <span v-else>
                            <v-select label="name" v-model="formData.bible_reading_member_id" :filterable="false" :options="options" @search="onSearch"></v-select>
                          </span>
                        </td>
                      </tr>
                      <!-- END OF BAHANDI GIKAN SA PULONG SA DIYOS -->

                      <tr>
                        <td>&nbsp;</td>
                      </tr>

                      <!-- MAGMAEPEKTIBO SA MINISTERYO -->
                      <tr>
                        <td style="border:1px solid black; background-color: #d39717; color:white" colspan="2" class="ps-2">MAGMAEPEKTIBO SA MINISTERYO</td>
                        <td></td>
                        <td class="ps-2 text-muted">Main Hall</td>
                        <td class="ps-2">
                          <EditClose
                            edit_val = 'edit_em'
                            @click="helperStore.edit_name['edit_em']
                                    ? updateSetup('edit_em') : setData('edit_em')"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="ps-2">0:00</td>
                        <td>
                          <table width="100%">
                            <tr>
                              <td>

                                <span v-if="!helperStore.edit_name['edit_em']">
                                  <span style="color:#d39717;">&#x2022;</span>
                                  {{ assignmentStore.data.first_effective_ministries_id?.type }}
                                  <small>({{ assignmentStore.data.first_effective_ministries_id?.duration }})</small>
                                </span>
                                <span v-else>
                                  <v-select label="type" v-model="formData.first_effective_ministries_id" placeholder="Select" :filterable="false" :options="ministryStore.ministries" ></v-select>
                                </span>

                              </td>
                              <td class="text-end text-muted"  v-if="!helperStore.edit_name['edit_em']"><small>{{ assignmentStore.data.first_effective_ministries_id?.participants }}:</small></td>
                            </tr>
                          </table>
                        </td>
                        <td class="text-end fw-semibold"></td>
                        <td class="ps-2">

                          <span v-if="!helperStore.edit_name['edit_em']">
                            <span v-if="assignmentStore.data.first_hh_member_id?.gender == 'Female'">Sis.</span>
                            <span v-else>Bro.</span>
                            <small class="ms-1">
                              {{ assignmentStore.data.first_hh_member_id?.name }} <span v-show="assignmentStore.data.first_effective_ministries_id?.id != 4">/</span>
                              {{ assignmentStore.data.first_partner_member_id?.name }}
                            </small>
                          </span>
                          <span v-else>
                            <v-select label="name" v-model="formData.first_hh_member_id" placeholder="Stu." :filterable="false" :options="options" @search="onSearch" class="mt-2"></v-select>
                            <v-select label="name" v-model="formData.first_partner_member_id" placeholder="Pr." :filterable="false" :options="options" @search="onSearch" class="mt-1"></v-select>
                          </span>

                        </td>
                      </tr>
                      <tr>
                        <td class="ps-2">0:00</td>
                        <td>
                          <table width="100%">
                            <tr>
                              <td>

                                <span v-if="!helperStore.edit_name['edit_em']">
                                  <span style="color:#d39717;">&#x2022;</span>
                                  {{ assignmentStore.data.second_effective_ministries_id?.type }}
                                  <small>({{ assignmentStore.data.second_effective_ministries_id?.duration }})</small>
                                </span>
                                <span v-else>
                                  <v-select label="type" v-model="formData.second_effective_ministries_id" placeholder="Select" :filterable="false" :options="ministryStore.ministries" ></v-select>
                                </span>

                              </td>
                              <td class="text-end text-muted" v-if="!helperStore.edit_name['edit_em']"><small>{{ assignmentStore.data.second_effective_ministries_id?.participants }}:</small></td>
                            </tr>
                          </table>
                        </td>
                        <td class="text-end fw-semibold"></td>
                        <td class="ps-2">

                          <span v-if="!helperStore.edit_name['edit_em']">
                            <span v-if="assignmentStore.data.second_hh_member_id?.gender == 'Female'">Sis.</span>
                            <span v-else>Bro.</span>
                            <small class="ms-1">
                              {{ assignmentStore.data.second_hh_member_id?.name }} /
                              {{ assignmentStore.data.second_partner_member_id?.name }}
                            </small>
                          </span>
                          <span v-else>
                            <v-select label="name" v-model="formData.second_hh_member_id" placeholder="Stu." :filterable="false" :options="options" @search="onSearch" class="mt-2"></v-select>
                            <v-select label="name" v-model="formData.second_partner_member_id" placeholder="Pr." :filterable="false" :options="options" @search="onSearch" class="mt-1"></v-select>
                          </span>

                        </td>
                      </tr>
                      <tr>
                        <td class="ps-2">0:00</td>
                        <td>
                          <table width="100%">
                            <tr>
                              <td>

                                <span v-if="!helperStore.edit_name['edit_em']">
                                  <span style="color:#d39717;">&#x2022;</span>
                                  {{ assignmentStore.data.third_effective_ministries_id?.type }}
                                  <small>({{ assignmentStore.data.third_effective_ministries_id?.duration }})</small>
                                </span>
                                <span v-else>
                                  <v-select label="type" v-model="formData.third_effective_ministries_id" placeholder="Select" :filterable="false" :options="ministryStore.ministries" ></v-select>
                                </span>

                              </td>
                              <td class="text-end text-muted" v-if="!helperStore.edit_name['edit_em']"><small>{{ assignmentStore.data.third_effective_ministries_id?.participants }}:</small></td>
                            </tr>
                          </table>
                        </td>
                        <td class="text-end fw-semibold"></td>
                        <td class="ps-2">

                          <span v-if="!helperStore.edit_name['edit_em']">
                            <span v-if="assignmentStore.data.third_hh_member_id?.gender == 'Female'">Sis.</span>
                            <span v-else>Bro.</span>
                            <small class="ms-1">
                              {{ assignmentStore.data.third_hh_member_id?.name }} <span v-show="assignmentStore.data.third_effective_ministries_id?.id != 6">/</span> <!-- if student only -->
                              {{ assignmentStore.data.third_partner_member_id?.name }}
                            </small>
                          </span>
                          <span v-else>
                            <v-select label="name" v-model="formData.third_hh_member_id" placeholder="Stu." :filterable="false" :options="options" @search="onSearch" class="mt-2"></v-select>
                            <v-select label="name" v-model="formData.third_partner_member_id" placeholder="Pr." :filterable="false" :options="options" @search="onSearch" class="mt-1"></v-select>
                          </span>

                        </td>
                      </tr>
                      <!-- End of MAGMAEPEKTIBO SA MINISTERYO -->
                      <tr>
                        <td>&nbsp;</td>
                      </tr>

                      <!-- KRISTOHANONG PAGKINABUHI -->
                      <tr>
                        <td style="border:1px solid black; background-color:#b73333; color:white" colspan="2" class="ps-2">KRISTOHANONG PAGKINABUHI</td>
                        <td></td>
                        <td></td>
                        <td class="ps-2">
                          <CIcon v-if="$can('can-add-setup')" icon="cil-plus" class="pointer text-primary text-size-20 me-1" @click="addLiving()" title="Add new title if necessarry."/>
                          <EditClose
                            edit_val = 'edit_cl'
                            @click="helperStore.edit_name['edit_cl']
                                    ? updateSetup('edit_cl') : setData('edit_cl')"
                          />
                          <!-- {{ formData.living_member_ids }} -->
                        </td>
                      </tr>

                      <tr>
                        <td class="ps-2">0:00</td>
                        <td>

                          <span v-if="!helperStore.edit_name['edit_cl']">
                            <span style="color:#b73333;">&#x2022;</span>
                            Awit {{ assignmentStore.data.song_no_middle?.song_no }} &#8212;
                            {{ assignmentStore.data.song_no_middle?.title }}
                          </span>
                          <span v-else>
                            <v-select label="song_no_title" v-model="formData.song_no_middle" placeholder="Song No" :filterable="false" :options="optionSongs" @search="onSearchSong" class="mt-2"></v-select>
                          </span>
                        </td>
                      </tr>
                      <tr v-for="(living, index) in christianLivingStore.titles" :key="living">
                        <td class="ps-2">0:00</td>
                        <td>
                          <span style="color:#b73333;">&#x2022;</span> {{ living.title }} <small>({{ living.duration }})</small></td>
                        <td class="text-end fw-semibold"></td>
                        <td class="ps-2">
                          <span v-if="!helperStore.edit_name['edit_cl']">
                            <span v-if="assignmentStore.data.living_member_ids[index]?.abbr_name == 'Female'">Sis.</span>
                            <span v-else>Bro.</span>
                            {{ assignmentStore.data.living_member_ids[index]?.abbr_name }}
                          </span>
                          <span v-else>
                            <v-select label="name" v-model="formData.living_member_ids[index]" placeholder="Incharge" :filterable="false" :options="optionsEMS" @search="onSearchEMS" class="mt-1"></v-select>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="ps-2">0:00</td>
                        <td><span style="color:#b73333;">&#x2022;</span> Pagtuon sa Kongregasyon <small>(30 min)</small></td>
                        <td class="text-end fw-semibold"></td>
                        <td class="ps-2">

                          <span v-if="!helperStore.edit_name['edit_cl']">
                            <span v-if="assignmentStore.data.cvs_member_id?.gender == 'Female'">Sis.</span>
                            <span v-else>Bro.</span>
                            <small class="ms-1">
                              {{ assignmentStore.data.cvs_member_id?.name }} /
                              {{ assignmentStore.data.cvs_reading_member_id?.name }}
                            </small>
                          </span>
                          <span v-else>
                            <v-select label="name" v-model="formData.cvs_member_id" placeholder="CVS Incharge" :filterable="false" :options="optionsEMS" @search="onSearchEMS" class="mt-2"></v-select>
                            <v-select label="name" v-model="formData.cvs_reading_member_id" placeholder="CVS Reader" :filterable="false" :options="options" @search="onSearch" class="mt-1"></v-select>
                          </span>

                        </td>
                      </tr>
                      <tr>
                        <td class="ps-2">0:00</td>
                        <td><span style="color:#b73333;">&#x2022;</span> Konklusyon (3 min.)</td>
                      </tr>
                        <tr>
                        <td class="ps-2">0:00</td>
                        <td>

                          <span v-if="!helperStore.edit_name['edit_cl']">
                            <span style="color:#b73333;">&#x2022;</span>
                            Awit {{ assignmentStore.data.song_no_closing?.song_no }} &#8212;
                            {{ assignmentStore.data.song_no_closing?.title }}
                          </span>
                          <span v-else>
                            <v-select label="song_no_title" v-model="formData.song_no_closing" placeholder="Song No" :filterable="false" :options="optionSongs" @search="onSearchSong"></v-select>
                          </span>

                        </td>
                        <td class="text-end fw-semibold text-muted">Pag-ampo:</td>
                        <td class="ps-2">

                          <span v-if="!helperStore.edit_name['edit_cl']">
                            <span v-if="assignmentStore.data.closing_prayer_member_id?.gender == 'Female'">Sis.</span>
                            <span v-else>Bro.</span>
                            <small class="ms-1">
                              {{ assignmentStore.data.closing_prayer_member_id?.name }}
                            </small>
                          </span>
                          <span v-else>
                            <v-select label="name" v-model="formData.closing_prayer_member_id" placeholder="Closing Prayer" :filterable="false" :options="optionsEMS" @search="onSearchEMS" class="mt-2"></v-select>
                          </span>

                        </td>
                      </tr>

                    </table>

                  </CCardBody>
                </CCard>

              </CCol>
            </CRow>
          </CCardBody>

          <hr/>
          <CCol>
            <ScheduleMidweekDownload/>
          </CCol>
        </CCard>
      </CCol>
    </CRow>
    <scroll-top/>
    <ModalMemberAssignments/>

    <CRow>
    </CRow>
  </template>

  <script>

  import moment from 'moment'
  import router from '@/router'
  import { useToast } from 'vue-toastification'

  import EventService from "@/services/EventService.js"
  import EditClose from "@/components/icon/EditClose"
  import ScheduleMidweekDownload from "@/components/reports/ScheduleMidweekDownload.vue"
  import ModalMemberAssignments from "@/components/modal/ModalMemberAssigments"

  import { useAuthStore } from '@/store/auth'
  import { useAssignmentStore } from '@/store/assignment'
  import { useMinistryStore } from '@/store/ministry'
  import { useTreasureStore } from '@/store/treasure'
  import { useChristianLivingStore } from '@/store/christian_living'
  import { useHelperStore } from '@/services/helper'

  const helperStore = useHelperStore()
  const authStore = useAuthStore()
  const assignmentStore = useAssignmentStore()
  const ministryStore = useMinistryStore()
  const treasureStore = useTreasureStore()
  const christianLivingStore = useChristianLivingStore()
  const toast = useToast()

  export default {
    name: 'Midweek',

    async created() {
      await authStore.getUser()
    },

    mounted() {
      helperStore.fetchWeeks()
      ministryStore.fetchMeetingMinistries()
    },

    data() {
        return {
            helperStore:helperStore,
            assignmentStore:assignmentStore,
            ministryStore:ministryStore,
            treasureStore:treasureStore,
            christianLivingStore:christianLivingStore,

            week_date: '',
            date_start: '',
            date_end: '',

            options: [],
            optionsEMS: [],
            optionSongs: [],
            formData: {
              living_member_ids: {}
            }
        }
    },

    components: {
      EditClose,
      ScheduleMidweekDownload,
      ModalMemberAssignments,
    },

    methods: {

      setData(name) {
        helperStore.edit_name[name]=1

        this.formData.song_no_opening = assignmentStore.data.song_no_opening
        this.formData.song_no_middle = assignmentStore.data.song_no_middle
        this.formData.song_no_closing = assignmentStore.data.song_no_closing

        this.formData.chairman_member_id = assignmentStore.data.chairman_member_id
        this.formData.meeting_treasures_member_id = assignmentStore.data.meeting_treasures_member_id
        this.formData.spiritual_gem_member_id = assignmentStore.data.spiritual_gem_member_id
        this.formData.bible_reading_member_id = assignmentStore.data.bible_reading_member_id

        this.formData.first_effective_ministries_id = assignmentStore.data.first_effective_ministries_id
        this.formData.first_hh_member_id = assignmentStore.data.first_hh_member_id
        this.formData.first_partner_member_id = assignmentStore.data.first_partner_member_id

        this.formData.second_effective_ministries_id = assignmentStore.data.second_effective_ministries_id
        this.formData.second_hh_member_id = assignmentStore.data.second_hh_member_id
        this.formData.second_partner_member_id = assignmentStore.data.second_partner_member_id

        this.formData.third_effective_ministries_id = assignmentStore.data.third_effective_ministries_id
        this.formData.third_hh_member_id = assignmentStore.data.third_hh_member_id
        this.formData.third_partner_member_id = assignmentStore.data.third_partner_member_id

        this.formData.cvs_member_id = assignmentStore.data.cvs_member_id
        this.formData.cvs_reading_member_id = assignmentStore.data.cvs_reading_member_id

        this.formData.closing_prayer_member_id = assignmentStore.data.closing_prayer_member_id
        this.formData.living_member_ids = assignmentStore.data.living_member_ids
      },

      updateSetup(name) {
        helperStore.edit_name[name]=0

        this.formData.id = assignmentStore.data.id

        assignmentStore.updateAssignment(this.formData)
      },

      splitDate(event) {
        var c = event.target.value.split('-')
        this.date_start = c[0]
        this.date_end = c[1]

        this.resetEdit()

        treasureStore.showTreasure({'date_start': c[0], 'date_end' : c[1]})
        christianLivingStore.fetchChristianLivingTitles(c[0].replace(/\//g, '-'))

        this.week_date = this.getHumanDate(c[0], 'MMM') == this.getHumanDate(c[1], 'MMM')
                         ? this.getHumanDate(c[0], 'MMM DD') +' - '+ this.getHumanDate(c[1], 'DD')
                         : this.getHumanDate(c[0], 'MMM DD') +' - '+ this.getHumanDate(c[1], 'MMM DD')

        if (this.date_start) {
          assignmentStore.showAssignment({
            'date_start': this.date_start,
            'date_end': this.date_end,
          })
        }
      },

      onSearch(search, loading) {
          if(search.length) {
            loading(true);
            this.search(loading, search);
          }
      },
      search(loading, search) {
        EventService.search(`${escape(search)}`)
          .then(response => {
              this.options = response.data.data
              loading(false);
          })
          .catch(error => {
            loading(false);
            if (error.response.status == 401) {
                toast.error("Session Timeout. Please log in.")
                router.push({name: 'Login'})
            }
          })
      },

      onSearchEMS(search, loading) {
          if(search.length) {
            loading(true);
            this.searchEMS(loading, search);
          }
      },
      searchEMS(loading, search) {
        EventService.searchEMS(`${escape(search)}`)
          .then(response => {
              this.optionsEMS = response.data.data
              loading(false);
          })
          .catch(error => {
            loading(false);
            if (error.response.status == 401) {
                toast.error("Session timeout. Please log in again.")
                router.push({name: 'Login'})
            }
          })
      },

      onSearchSong(search, loading) {
          if(search.length) {
            loading(true);
            this.searchSong(loading, search);
          }
      },
      searchSong(loading, search) {

        EventService.searchSong(`${escape(search)}`)
          .then(response => {
              this.optionSongs = response.data
              loading(false);
          })
          .catch(error => {
            loading(false);
            if (error.response.status == 401) {
                router.push({name: 'Login'})
            }
          })
      },

      addTreasure() {
        this.$router.push('/setup/treasures')
      },

      addLiving() {
        this.$router.push('/setup/christian-living')
      },

      resetEdit() {
        helperStore.edit_name['edit_cl'] = 0
        helperStore.edit_name['edit_intro'] = 0
        helperStore.edit_name['edit_treasures'] = 0
        helperStore.edit_name['edit_em'] = 0
      },

      getHumanDate(date, format) {
        return moment(date, 'YYYY-MM-DD').format(format);
      },

    },
  }
  </script>
<template>
    <CRow>
      <CCol>
        <CCard>
            <CCardHeader>
                <CIcon icon="cil-notes" />
                Malipayong Mag-awit—Tigom
                <CSpinner color="primary" component="span" size="sm" aria-hidden="true" v-if="songStore.loading"/>
                <a href="javascript:void" @click="handleAddSong(song)" class="text-sm">
                    <span style="float:right">
                        Add Song
                    </span>
                </a>
            </CCardHeader>
            <CCardBody>
                <CTable striped hover responsive>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col" width="10%">Awit No.</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                            </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow v-for="song in songStore.meetings" :key="song.id">
                            <CTableDataCell>{{ song.song_no }}</CTableDataCell>
                            <CTableDataCell>{{ song.title }}</CTableDataCell>
                            <CTableDataCell>
                                <CButton
                                    color="primary"
                                    shape="rounded-pill"
                                    class="btn-sm"
                                    @click="handleEditSong(song)"
                                    ><CIcon icon="cil-pencil" /></CButton> |
                                <CButton
                                    color="warning"
                                    shape="rounded-pill"
                                    class="btn-sm"
                                    @click="helperStore.confirmDelete(song.id)"
                                >Delete</CButton>
                            </CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <ModalForm
        :type="type"
        title="Malipayong Mag-awit—Tigom"
        :data=formData
    />
    <ModalConfirmation data="Are you sure you want to delete this?" type="meeting-song" />
</template>

<script>

    import ModalConfirmation from '@/components/ModalConfirmation.vue'
    import ModalForm from '@/components/modal/ModalForm.vue'

    import { useSongStore } from '@/store/song'
    import { useHelperStore } from '@/services/helper'

    const songStore = useSongStore()
    const helperStore = useHelperStore()

  export default {

    name: 'SongsMeeting',

    created() {

        songStore.fetchSongsMeeting()
    },

    data() {
      return {
        songStore:songStore,
        helperStore:helperStore,

        type: 'AddSongMeeting',
        formData: {
            song_no: '',
            title: '',
        }
      }
    },
    components: {
        ModalConfirmation, ModalForm
    },
    methods: {

        handleAddSong() {
            helperStore.errors = {}
            this.formData.song_no = ''
            this.formData.title = ''
            helperStore.visibleModalSongsMeeting = true
        },

        handleEditSong(song) {

            helperStore.visibleModalSongsMeeting = true
            this.type = "EditSongMeeting"
            this.formData.id = song.id
            this.formData.song_no = song.song_no
            this.formData.title = song.title
        }
    }
  }
</script>
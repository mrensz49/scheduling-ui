import axios from 'axios'

const apiClient = axios.create({
    baseURL: `http://localhost:8080/`,
    //   baseURL: `http://localhost:8081/`,
//   withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 15000
})
auth(apiClient)

const apiClientReport = axios.create({
    baseURL: `http://localhost:8080/`,
    responseType: 'blob',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 15000
})

auth(apiClientReport)

function auth(apiC) {

    apiC.interceptors.request.use(function (config) {
        const token = localStorage.getItem('scheduling_token');
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, null, { synchronous: true });
}

export default {

    register(payloads) {
        return apiClient.post(`/api/register`, payloads)
    },

    login(payloads) {
        return apiClient.post(`/api/login`, payloads)
    },

    logout() {
        return apiClient.post(`/api/logout`)
    },

    resendVerification() {
        return apiClient.post(`/api/email/verification-notification`)
    },

    getUser() {
        return apiClient.get(`/api/user`)
    },

    getPositions() {
        return apiClient.get(`/api/positions`)
    },

    getPosition(id) {
        return apiClient.get(`/api/positions/${id}`)
    },

    getCongregations() {
        return apiClient.get(`/api/congregations`)
    },

    addMember(payloads) {
        return apiClient.post(`/api/members`, payloads)
    },

    updateMember(payloads) {
        return apiClient.put(`/api/members/${payloads.id}`, payloads)
    },

    getMembers(page) {
        return apiClient.get(`/api/congregation/members?page=`+page)
    },

    getMember(id) {
        return apiClient.get(`/api/members/${id}`)
    },

    deleteMember(id) {
        return apiClient.delete(`/api/members/`+id)
    },

    search(payload) {
        return apiClient.get(`/api/search?q=`+payload)
    },

    searchSong(payload) {
        return apiClient.get(`/api/search/song?q=`+payload)
    },

    addSongMeeting(payloads) {
        return apiClient.post(`/api/song-meeting`, payloads)
    },

    fetchSongsMeeting() {
        return apiClient.get(`/api/song-meeting`)
    },

    deleteMeetingSong(id) {
        return apiClient.delete(`/api/song-meeting/`+id)
    },

    editSongMeeting(payload) {
        return apiClient.put(`/api/song-meeting/${payload.id}`, payload.formData)
    },

    addTreasure(payloads) {
        return apiClient.post(`/api/meeting-treasure`, payloads)
    },

    fetchMeetingTreasures() {
        return apiClient.get(`/api/meeting-treasure`)
    },

    editTreasure(payload) {
        return apiClient.put(`/api/meeting-treasure/${payload.id}`, payload.formData)
    },

    deleteMeetingTreasure(id) {
        return apiClient.delete(`/api/meeting-treasure/`+id)
    },

    getGroups(payload='default') {
        return apiClient.get(`/api/congregation/groups/${payload}`)
    },

    saveReport(payload, id){
        return apiClient.put(`/api/report-field-services/${id}`, payload)
    },

    storeReport(payload){
        return apiClient.post(`/api/report-field-services`, payload)
    },

    fetchMonthlyReport(payloads){
        return apiClient.get(`/api/monthly-reports/${payloads.year}/${payloads.month}`)
    },

    grandTotalReports(date){
        return apiClient.get(`/api/grand-total-reports/${date}`)
    },

    deleteMemberPhone(id){
        return apiClient.delete(`/api/numbers/${id}`)
    },

    memberReports(id) {
        return apiClient.get(`/api/member-reports/${id}`)
    },

    fetchMeetingLivings() {
        return apiClient.get(`/api/meeting-christian-living`)
    },

    addChristianLiving(payloads) {
        return apiClient.post(`/api/meeting-christian-living`, payloads)
    },

    deleteChristianLiving(id) {
        return apiClient.delete(`/api/meeting-christian-living/`+id)
    },

    editChristianLiving(payload) {
        return apiClient.put(`/api/meeting-christian-living/${payload.id}`, payload.formData)
    },

    saveAttendance(payloads) {
        return apiClient.post(`/api/meeting-attendances`, payloads)
    },

    getAttendances(payload) {
        return apiClient.get(`/api/get-meeting-attendances/${payload}`)
    },

    showAssignment(payloads) {
        return apiClient.post(`/api/meeting-assignment/show-assignment`, payloads)
    },

    updateAssignment(payloads) {
        return apiClient.put(`/api/meeting-assignment/${payloads.id}`, payloads)
    },

    fetchMeetingMinistries() {
        return apiClient.get(`/api/meeting-effective-ministry`)
    },

    showTreasure(payload) {
        return apiClient.post(`/api/meeting-treasures/show-treasure`, payload)
    },

    fetchChristianLivingTitles(payload) {
        return apiClient.get(`/api/meeting-christian-living/titles/${payload}`)
    },

    downloadMidweekSchedule(payload) {
        return apiClientReport.get(`/api/generate/midweek-schedule/${payload.date_start}/${payload.date_end}`)
    },

    //helper
    fetchWeeks() {
        return apiClient.get(`/api/weeks`)
    },

    fetchMonthYear() {
        return apiClient.get(`/api/month-year`)
    },



}
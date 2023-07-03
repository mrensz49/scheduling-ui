import axios from 'axios'

const apiClient = axios.create({
    baseURL: process.env.NODE_ENV == 'development'
            ? process.env.VUE_APP_URL : 'https://rscheduling.xyz/be/',
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
    baseURL: process.env.VUE_APP_URL,
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

    // admin side

    fetchUsers() {
        return apiClient.get(`/api/admin/user`)
    },

    setUserCongregation(payloads) {
        return apiClient.put(`/api/admin/user/${payloads.id}`, payloads)
    },


    fetchUsersActivity(pages) {
        return apiClient.get(`/api/admin/users-activity?page=${pages}`)
    },

    //end of admin side

    getToken() {
        return apiClient.get(`/sanctum/csrf-cookie`)
    },

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

    updateUser(payloads) {
        return apiClient.post(`/api/update-user`, payloads)
    },

    updateUserPassword(payloads) {
        return apiClient.post(`/api/update-user-password`, payloads)
    },

    getNotificationInform() {
        return apiClient.get(`/api/notifications/inform`)
    },

    seenNotificationInform() {
        return apiClient.post(`/api/notifications/inform-seen`)
    },

    fetchUserAccess() {
        return apiClient.get(`/api/user-access`)
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

    getCongregationGenders() {
        return apiClient.get(`/api/congregation/genders`)
    },

    getCongregationNumbers() {
        return apiClient.get(`/api/congregation/numbers`)
    },

    getDOBirths() {
        return apiClient.get(`/api/congregation/dobirths`)
    },

    getCongregationDetails() {
        return apiClient.get(`/api/congregation/details`)
    },

    addMember(payloads) {
        return apiClient.post(`/api/members`, payloads)
    },

    updateMember(payloads) {
        return apiClient.put(`/api/members/${payloads.id}`, payloads)
    },

    getAllMembers() {
        return apiClient.get(`/api/members/all`)
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

    searchEMS(payload) {
        return apiClient.get(`/api/search-ems?q=`+payload)
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

    fetchAuxiDates(payload) {
        return apiClient.get(`/api/auxilary/show-dates/${payload}`)
    },

    addAuxilary(payloads) {
        return apiClient.post(`/api/auxilary-dates`, payloads)
    },

    deleteAuxilary(id) {
        return apiClient.delete(`/api/auxilary-dates/delete/`+id)
    },

    activePublishers(payloads) {
        return apiClient.get(`/api/report-field-services/active-publishers/`+payloads.date+'/'+payloads.type)
    },

    latestFSReport() {
        return apiClient.get(`/api/report-field-services/latest/report`)
    },

    congAttendances() {
        return apiClient.get(`/api/meeting-attendances/meeting`)
    },

    getCoMembers(payloads) {
        return apiClient.get(`/api/members/co-members/${payloads.congregation_id}/${payloads.group_no}`)
    },

    isCountAP(payloads) {
        return apiClient.post(`/api/members/is-count-ap`, payloads)
    },

    getNoReportsPubs(payload) {
        return apiClient.get(`/api/no-of-reports-publishers/show-reports/${payload}`)
    },

    calcNoReportsPubs(payloads) {
        return apiClient.post(`/api/no-of-reports-publishers/calc-reports/${payloads.date_rendered}/${payloads.type}`)
    },


    // downloads info
        downloadMidweekSchedule(payload) {
            return apiClientReport.get(`/api/generate/midweek-schedule/${payload.date_start}/${payload.date_end}`)
        },

        downloadContacts() {
            return apiClientReport.get(`/api/generate/contacts`)
        },

        downloadInformations(payloads) {
            return apiClientReport.post(`/api/generate/informations`, payloads)
        },

        downloadPublishers(payloads) {
            return apiClientReport.post(`/api/generate/publishers`, payloads)
        },

        downloadPioneers(payloads) {
            return apiClientReport.post(`/api/generate/pioneers`, payloads)
        },

        downloadMonthlyFSReports(payloads) {
            return apiClientReport.post(`/api/generate/monthly-fs-reports`, payloads)
        },
    // end of downloads info

    showInformations(payloads) {
        return apiClient.post(`/api/generate/informations`, payloads)
    },

    showPublishers(payloads) {
        return apiClient.post(`/api/generate/publishers`, payloads)
    },

    showPioneers(payloads) {
        return apiClient.post(`/api/generate/pioneers`, payloads)
    },

    fetchCongregationUsers() {
        return apiClient.get(`/api/congregation-users`)
    },

    getRoles() {
        return apiClient.get(`/api/roles`)
    },

    updateRoles(payloads) {
        return apiClient.post(`/api/roles/update/${payloads.id}`, payloads)
    },

    //helper
    fetchWeeks() {
        return apiClient.get(`/api/weeks`)
    },

    getServiceYears() {
        return apiClient.get(`/api/service-years`)
    },

    fetchMonthYear() {
        return apiClient.get(`/api/month-year`)
    },



}
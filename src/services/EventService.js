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

apiClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem('scheduling_token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, null, { synchronous: true });

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

    getPosition(payload) {
        return apiClient.get(`/api/positions/${payload}`)
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

    getGroups() {
        return apiClient.get(`/api/congregation/groups`)
    },

    //helper
    fetchWeeks() {
        return apiClient.get(`/api/weeks`)
    },



}
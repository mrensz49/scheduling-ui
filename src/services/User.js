import EventService from "@/services/EventService.js";

export default {

    state: () => ({
        user: 'whatsasd',
    }),

 // update this code only if session is not expired
    fetchUser() {
        console.log('test - mounted');

        EventService.getUser()
        .then(response => {
            this.user = response.data
        })
        .catch(() => {
            // this.verification_loading = false
        })
},


}
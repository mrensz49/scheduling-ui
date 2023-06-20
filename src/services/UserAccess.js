import { useAbilityStore } from '@/services/Ability_'
import EventService from "@/services/EventService.js";

// import EventBus  from '../event-bus';




export const state = {

        errors: {},
        access: {
            'test': 'test',
        },
}

export const actions = {

    fetchUserAccess() {
        EventService.fetchUserAccess()
        .then(response => {
            console.log(response.data)
            // EventBus.$emit("send_user_access", response.data)
            const abilityStore = useAbilityStore()
            this.access = response.data
            abilityStore.access = response.data
            // toast.success("Successfully Added")
        })
        .catch(error => {
            this.errors = error.response.data.errors
        })
    },
}

export const can = {

    access(value) {

        console.log(value)

        return state.access
    }
    // return await state.access
}

// export default function can(value) {
//     console.log(value)
//     return state.access
//     // return await state.access
// }

// export const can = {
//     access(permission) {
//         if (permission) {
//             return permission
//         }
//     }
// }